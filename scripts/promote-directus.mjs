import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')

function readEnv(file) {
  const result = {}
  for (const line of fs.readFileSync(path.join(root, file), 'utf8').split(/\r?\n/)) {
    const match = line.match(/^([^#=]+)=(.*)$/)
    if (match) result[match[1]] = match[2].replace(/^['"]|['"]$/g, '')
  }
  return result
}

const env = readEnv(process.env.DIRECTUS_ENV_FILE || '.env.directus')
const sourceUrl = (process.env.SOURCE_DIRECTUS_URL || env.DIRECTUS_PUBLIC_URL || 'http://localhost:8055').replace(/\/$/, '')
const sourceToken = process.env.SOURCE_DIRECTUS_TOKEN || env.DIRECTUS_ADMIN_TOKEN
const targetUrl = (process.env.TARGET_DIRECTUS_URL || 'https://bo.dorivaldovalentim.ao').replace(/\/$/, '')
const targetToken = process.env.TARGET_DIRECTUS_TOKEN || env.TOKEN

if (!sourceToken || !targetToken) throw new Error('Source or target Directus token is missing')
if (sourceUrl === targetUrl) throw new Error('Source and target Directus URLs must be different')

async function request(baseUrl, token, endpoint, options = {}) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers
    }
  })
  const text = await response.text()
  const body = text ? JSON.parse(text) : {}
  if (!response.ok) throw new Error(`${options.method || 'GET'} ${endpoint}: ${response.status} ${text}`)
  return body.data
}

const source = (endpoint, options) => request(sourceUrl, sourceToken, endpoint, options)
const target = (endpoint, options) => request(targetUrl, targetToken, endpoint, options)

async function items(collection) {
  const data = await source(`/items/${collection}?limit=-1&fields=*`)
  return Array.isArray(data) ? data : data ? [data] : []
}

async function targetItem(collection, id) {
  const response = await fetch(`${targetUrl}/items/${collection}/${encodeURIComponent(id)}`, {
    headers: { Authorization: `Bearer ${targetToken}` }
  })
  // Directus intentionally returns 403 for missing item IDs to avoid leaking
  // whether a protected record exists.
  if (response.status === 403 || response.status === 404) return null
  const text = await response.text()
  if (!response.ok) throw new Error(`GET /items/${collection}/${id}: ${response.status} ${text}`)
  return text ? JSON.parse(text).data : null
}

async function upsert(collection, key, item) {
  const current = await targetItem(collection, key)
  if (current) {
    await target(`/items/${collection}/${encodeURIComponent(key)}`, { method: 'PATCH', body: JSON.stringify(item) })
    return 'updated'
  }
  await target(`/items/${collection}`, { method: 'POST', body: JSON.stringify(item) })
  return 'created'
}

async function upsertByFilter(collection, filter, item) {
  const params = new URLSearchParams({ limit: '1', fields: 'id' })
  for (const [field, value] of Object.entries(filter)) params.set(`filter[${field}][_eq]`, value)
  const found = await target(`/items/${collection}?${params}`)
  if (found.length) {
    await target(`/items/${collection}/${found[0].id}`, { method: 'PATCH', body: JSON.stringify(item) })
    return 'updated'
  }
  await target(`/items/${collection}`, { method: 'POST', body: JSON.stringify(item) })
  return 'created'
}

const data = {}
for (const collection of [
  'languages', 'profile', 'fun_facts', 'contacts', 'skills', 'experiences', 'achievements', 'projects',
  'profile_translations', 'fun_facts_translations', 'skills_translations',
  'experiences_translations', 'achievements_translations', 'projects_translations', 'projects_files', 'contact_messages'
]) data[collection] = await items(collection)

const fileIds = new Set([
  ...data.profile.map(item => item.avatar),
  ...data.projects.map(item => item.cover_image),
  ...data.projects_files.map(item => item.directus_files_id)
].filter(Boolean))

console.log('Directus local content found:')
for (const [collection, records] of Object.entries(data)) console.log(`- ${collection}: ${records.length}`)
console.log(`- files: ${fileIds.size}`)

for (const id of fileIds) {
  const existing = await fetch(`${targetUrl}/files/${id}`, { headers: { Authorization: `Bearer ${targetToken}` } })
  if (existing.ok) continue
  const metadata = await source(`/files/${id}`)
  const download = await fetch(`${sourceUrl}/assets/${id}`, { headers: { Authorization: `Bearer ${sourceToken}` } })
  if (!download.ok) throw new Error(`Unable to download local file ${id}: ${download.status}`)
  const filename = metadata.filename_download || `${id}.bin`
  const form = new FormData()
  form.append('id', id)
  form.append('title', metadata.title || filename)
  form.append('file', await download.blob(), filename)
  await target('/files', { method: 'POST', body: form })
}

let created = 0
let updated = 0
const count = result => result === 'created' ? created++ : updated++
const withoutAliases = ({ translations: _translations, gallery: _gallery, ...item }) => item

for (const item of data.languages) count(await upsert('languages', item.code, item))

for (const collection of ['fun_facts', 'contacts', 'skills', 'experiences', 'achievements', 'projects', 'contact_messages']) {
  for (const item of data[collection]) {
    const payload = withoutAliases(item)
    count(await upsert(collection, payload.id, payload))
  }
}

if (data.profile[0]) {
  const profile = withoutAliases(data.profile[0])
  const current = await target('/items/profile').catch(() => null)
  await target('/items/profile', { method: 'PATCH', body: JSON.stringify(profile) })
  count(current?.id ? 'updated' : 'created')
}

for (const [collection, relationField] of [
  ['profile_translations', 'profile_id'],
  ['fun_facts_translations', 'fun_facts_id'],
  ['skills_translations', 'skills_id'],
  ['experiences_translations', 'experiences_id'],
  ['achievements_translations', 'achievements_id'],
  ['projects_translations', 'projects_id']
]) {
  for (const { id: _id, ...item } of data[collection]) {
    count(await upsertByFilter(collection, {
      [relationField]: item[relationField],
      languages_code: item.languages_code
    }, item))
  }
}

for (const { id: _id, ...item } of data.projects_files) {
  count(await upsertByFilter('projects_files', {
    projects_id: item.projects_id,
    directus_files_id: item.directus_files_id
  }, item))
}

console.log(`Promotion complete: ${created} created, ${updated} updated, ${fileIds.size} files verified.`)
