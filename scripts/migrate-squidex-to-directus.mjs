import { readFile } from 'node:fs/promises'
import { basename } from 'node:path'

const parseEnv = text => Object.fromEntries(text.split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith('#') && line.includes('=')).map(line => {
  const index = line.indexOf('=')
  return [line.slice(0, index), line.slice(index + 1).replace(/^['"]|['"]$/g, '')]
}))

const squidexEnv = parseEnv(await readFile(process.env.SQUIDEX_ENV_FILE || '.env', 'utf8'))
const directusEnv = parseEnv(await readFile(process.env.DIRECTUS_ENV_FILE || '.env.directus', 'utf8'))
const squidexUrl = (squidexEnv.NUXT_PUBLIC_SQUIDEX_URL || 'https://cloud.squidex.io').replace(/\/$/, '')
const squidexApp = squidexEnv.NUXT_PUBLIC_SQUIDEX_APP
const directusUrl = (directusEnv.DIRECTUS_PUBLIC_URL || 'http://localhost:8055').replace(/\/$/, '')
const directusToken = directusEnv.DIRECTUS_ADMIN_TOKEN
const dryRun = process.argv.includes('--dry-run')

if (!squidexApp || !squidexEnv.NUXT_SQUIDEX_CLIENT_ID || !squidexEnv.NUXT_SQUIDEX_CLIENT_SECRET) throw new Error('Squidex configuration is incomplete in .env')
if (!directusToken) throw new Error('DIRECTUS_ADMIN_TOKEN is missing in .env.directus')

async function fetchWithRetry(url, options = {}, attempts = 4) {
  let lastError
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, options)
      if (response.status < 500 || attempt === attempts) return response
      lastError = new Error(`${response.status} ${response.statusText}`)
    } catch (error) {
      lastError = error
    }
    await new Promise(resolve => setTimeout(resolve, attempt * 750))
  }
  throw lastError
}

const tokenResponse = await fetchWithRetry(`${squidexUrl}/identity-server/connect/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: squidexEnv.NUXT_SQUIDEX_CLIENT_ID,
    client_secret: squidexEnv.NUXT_SQUIDEX_CLIENT_SECRET,
    scope: 'squidex-api'
  })
})
if (!tokenResponse.ok) throw new Error(`Squidex authentication failed (${tokenResponse.status})`)
const squidexToken = (await tokenResponse.json()).access_token

async function squidex(endpoint) {
  const response = await fetchWithRetry(`${squidexUrl}${endpoint}`, { headers: { Authorization: `Bearer ${squidexToken}` } })
  if (!response.ok) throw new Error(`Squidex GET ${endpoint}: ${response.status} ${await response.text()}`)
  return response.json()
}

async function directus(endpoint, options = {}) {
  const response = await fetch(`${directusUrl}${endpoint}`, {
    ...options,
    headers: { Authorization: `Bearer ${directusToken}`, ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }), ...options.headers }
  })
  const text = await response.text()
  if (!response.ok) throw new Error(`Directus ${options.method || 'GET'} ${endpoint}: ${response.status} ${text}`)
  return text ? JSON.parse(text) : {}
}

const content = async schema => (await squidex(`/api/content/${squidexApp}/${schema}/?$top=1000`)).items ?? []
const local = (data, field, locale) => {
  const value = data?.[field]
  if (value === null || value === undefined) return value
  if (typeof value !== 'object' || Array.isArray(value)) return value
  return value[locale] ?? value.pt ?? value.en ?? value.iv
}
const invariant = (data, field) => local(data, field, 'iv') ?? local(data, field, 'pt') ?? local(data, field, 'en')
const slugify = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character])
const richTextHtml = document => {
  if (!document?.content) return typeof document === 'string' ? document : ''
  const render = node => {
    if (node.type === 'text') {
      let value = escapeHtml(node.text ?? '')
      for (const mark of node.marks ?? []) {
        if (mark.type === 'bold') value = `<strong>${value}</strong>`
        if (mark.type === 'italic') value = `<em>${value}</em>`
        if (mark.type === 'link') value = `<a href="${escapeHtml(mark.attrs?.href ?? '')}">${value}</a>`
      }
      return value
    }
    const children = (node.content ?? []).map(render).join('')
    if (node.type === 'paragraph') return `<p>${children}</p>`
    if (node.type === 'bulletList') return `<ul>${children}</ul>`
    if (node.type === 'orderedList') return `<ol>${children}</ol>`
    if (node.type === 'listItem') return `<li>${children}</li>`
    if (node.type === 'heading') return `<h${node.attrs?.level ?? 3}>${children}</h${node.attrs?.level ?? 3}>`
    if (node.type === 'hardBreak') return '<br>'
    return children
  }
  return document.content.map(render).join('\n')
}

const exists = async (collection, id) => {
  const query = new URLSearchParams({ limit: '1', 'filter[id][_eq]': id, fields: 'id' })
  const result = await directus(`/items/${collection}?${query}`)
  const data = result.data
  return Array.isArray(data) ? data.length > 0 : data?.id === id
}
const createItem = async (collection, item) => {
  if (await exists(collection, item.id)) return false
  if (!dryRun) await directus(`/items/${collection}`, { method: collection === 'profile' ? 'PATCH' : 'POST', body: JSON.stringify(item) })
  return true
}
const createTranslation = async (collection, relationField, relationId, locale, values) => {
  const query = new URLSearchParams({
    limit: '1',
    [`filter[${relationField}][_eq]`]: relationId,
    'filter[languages_code][_eq]': locale
  })
  const found = await directus(`/items/${collection}?${query}`).then(result => result.data ?? [])
  if (found.length) return false
  if (!dryRun) await directus(`/items/${collection}`, { method: 'POST', body: JSON.stringify({ [relationField]: relationId, languages_code: locale, ...values }) })
  return true
}

const assetIds = new Set()
const registerAssets = (data, ...fields) => fields.forEach(field => {
  const value = invariant(data, field)
  for (const id of Array.isArray(value) ? value : value ? [value] : []) assetIds.add(id)
})

const schemas = ['profile', 'funfacts', 'contacts', 'skills', 'experiences', 'projects', 'contact-messages']
const source = Object.fromEntries(await Promise.all(schemas.map(async schema => [schema, await content(schema)])))
for (const item of source.profile) registerAssets(item.data, 'avatar')
for (const item of source.projects) registerAssets(item.data, 'coverImage', 'gallery')

console.log('Squidex content found:')
for (const schema of schemas) console.log(`- ${schema}: ${source[schema].length}`)
console.log(`- assets: ${assetIds.size}`)
if (dryRun) process.exit(0)

async function migrateAsset(id) {
  const existing = await fetch(`${directusUrl}/files/${id}`, { headers: { Authorization: `Bearer ${directusToken}` } })
  if (existing.ok) return id
  const response = await fetchWithRetry(`${squidexUrl}/api/assets/${squidexApp}/${id}/`, { headers: { Authorization: `Bearer ${squidexToken}` } })
  if (!response.ok) throw new Error(`Unable to download Squidex asset ${id} (${response.status})`)
  const disposition = response.headers.get('content-disposition') ?? ''
  const matchedName = disposition.match(/filename\*?=(?:UTF-8''|"?)([^";]+)/i)?.[1]
  const filename = matchedName ? decodeURIComponent(matchedName.replace(/"/g, '')) : `${id}.${response.headers.get('content-type')?.split('/')[1] || 'bin'}`
  const form = new FormData()
  form.append('id', id)
  form.append('title', basename(filename))
  form.append('file', await response.blob(), basename(filename))
  await directus('/files', { method: 'POST', body: form })
  return id
}
for (const id of assetIds) await migrateAsset(id)
console.log(`Migrated ${assetIds.size} assets.`)

let created = 0
for (const item of source.profile) {
  const data = item.data
  created += Number(await createItem('profile', {
    id: item.id,
    name: invariant(data, 'name'), fullname: invariant(data, 'fullname'), email: invariant(data, 'email'), phone: invariant(data, 'phone'),
    avatar: invariant(data, 'avatar')?.[0] ?? null
  }))
  for (const locale of ['pt', 'en']) created += Number(await createTranslation('profile_translations', 'profile_id', item.id, locale, {
    role: local(data, 'role', locale), location: local(data, 'location', locale), education: local(data, 'education', locale),
    languages: local(data, 'languages', locale), headline: local(data, 'headline', locale), intro: local(data, 'intro', locale),
    bio: richTextHtml(local(data, 'bio', locale))
  }))
}

for (const [index, item] of source.funfacts.entries()) {
  created += Number(await createItem('fun_facts', { id: item.id, sort: invariant(item.data, 'order') ?? index + 1 }))
  for (const locale of ['pt', 'en']) created += Number(await createTranslation('fun_facts_translations', 'fun_facts_id', item.id, locale, { text: local(item.data, 'text', locale) }))
}

for (const [index, item] of source.contacts.entries()) created += Number(await createItem('contacts', {
  id: item.id, label: invariant(item.data, 'label'), url: invariant(item.data, 'url'), icon: invariant(item.data, 'icon'), sort: invariant(item.data, 'order') ?? index + 1
}))

for (const [index, item] of source.skills.entries()) {
  created += Number(await createItem('skills', { id: item.id, level: invariant(item.data, 'level'), icon: invariant(item.data, 'icon'), sort: index + 1 }))
  for (const locale of ['pt', 'en']) created += Number(await createTranslation('skills_translations', 'skills_id', item.id, locale, {
    name: local(item.data, 'name', locale), category_label: local(item.data, 'categoryLabel', locale) ?? local(item.data, 'category', locale)
  }))
}

for (const [index, item] of source.experiences.entries()) {
  created += Number(await createItem('experiences', {
    id: item.id, company: invariant(item.data, 'company'), start_date: invariant(item.data, 'startDate'), end_date: invariant(item.data, 'endDate') || null,
    technologies: invariant(item.data, 'technologies') ?? [], sort: index + 1
  }))
  for (const locale of ['pt', 'en']) created += Number(await createTranslation('experiences_translations', 'experiences_id', item.id, locale, {
    role: local(item.data, 'role', locale), location: local(item.data, 'location', locale), description: richTextHtml(local(item.data, 'description', locale))
  }))
}

const statusKeys = { Planning: 'Planning', Planeado: 'Planning', 'In Progress': 'In Progress', 'Em curso': 'In Progress', Completed: 'Completed', 'Concluído': 'Completed', Maintained: 'Maintained', 'Em manutenção': 'Maintained', Archived: 'Archived', Arquivado: 'Archived' }
for (const [index, item] of source.projects.entries()) {
  const data = item.data
  created += Number(await createItem('projects', {
    id: item.id, slug: invariant(data, 'slug') || slugify(local(data, 'title', 'pt')) || `project-${item.id}`, cover_image: invariant(data, 'coverImage')?.[0] ?? null,
    technologies: invariant(data, 'technologies') ?? [], status_key: statusKeys[local(data, 'status', 'en')] ?? statusKeys[local(data, 'status', 'pt')] ?? 'Completed',
    start_date: invariant(data, 'startDate') || null, end_date: invariant(data, 'endDate') || null, website_url: invariant(data, 'websiteUrl') || null,
    repository_url: invariant(data, 'repositoryUrl') || null, demo_url: invariant(data, 'demoUrl') || null, sort: index + 1
  }))
  for (const locale of ['pt', 'en']) {
    const fallbackTitle = invariant(data, 'slug') || `Project ${index + 1}`
    created += Number(await createTranslation('projects_translations', 'projects_id', item.id, locale, {
      title: local(data, 'title', locale) || fallbackTitle,
      summary: local(data, 'summary', locale) || (locale === 'pt' ? 'Detalhes do projeto em atualização.' : 'Project details are being updated.'),
      description: richTextHtml(local(data, 'description', locale)),
      status_label: local(data, 'statusLabel', locale) ?? local(data, 'status', locale), client: local(data, 'client', locale)
    }))
  }
  const gallery = invariant(data, 'gallery') ?? []
  const currentGallery = await directus(`/items/projects_files?filter[projects_id][_eq]=${item.id}&limit=100`).then(result => result.data ?? [])
  if (!currentGallery.length) for (const [galleryIndex, assetId] of gallery.entries()) {
    await directus('/items/projects_files', { method: 'POST', body: JSON.stringify({ projects_id: item.id, directus_files_id: assetId, sort: galleryIndex + 1 }) })
    created++
  }
}

for (const item of source['contact-messages']) created += Number(await createItem('contact_messages', {
  id: item.id, name: invariant(item.data, 'name'), email: invariant(item.data, 'email'), message: invariant(item.data, 'message'),
  locale: invariant(item.data, 'locale') ?? 'pt', submitted_at: invariant(item.data, 'submittedAt') ?? item.created, status: String(invariant(item.data, 'status') ?? 'New').toLowerCase()
}))

console.log(`Migration complete. ${created} new records created; existing records were preserved.`)
