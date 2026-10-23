import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const env = Object.fromEntries(fs.readFileSync(path.join(root, '.env.directus'), 'utf8')
  .split(/\r?\n/)
  .map(line => line.match(/^([^#=]+)=(.*)$/))
  .filter(Boolean)
  .map(match => [match[1], match[2].replace(/^['"]|['"]$/g, '')]))

const baseUrl = (process.env.DIRECTUS_PUBLIC_URL || env.DIRECTUS_PUBLIC_URL).replace(/\/$/, '')
const token = process.env.DIRECTUS_ADMIN_TOKEN || env.DIRECTUS_ADMIN_TOKEN

async function request(endpoint, options = {}) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...options.headers }
  })
  const text = await response.text()
  if (!response.ok) throw new Error(`${options.method || 'GET'} ${endpoint}: ${response.status} ${text}`)
  return text ? JSON.parse(text).data : null
}

const policies = await request('/policies?filter[name][_eq]=Website&fields=id&limit=1')
if (!policies.length) throw new Error('Website policy was not found')
const policy = policies[0].id
const existing = await request(`/permissions?filter[policy][_eq]=${policy}&fields=collection,action&limit=-1`)
const keys = new Set(existing.map(permission => `${permission.collection}:${permission.action}`))

const rules = [
  ['contact_messages', 'create'],
  ...[
    'contacts', 'experiences', 'experiences_translations', 'achievements', 'achievements_translations',
    'fun_facts', 'fun_facts_translations', 'languages', 'profile', 'profile_translations',
    'projects', 'projects_files', 'projects_translations', 'skills', 'skills_translations',
    'directus_collections', 'directus_files'
  ].map(collection => [collection, 'read'])
]

let created = 0
for (const [collection, action] of rules) {
  if (keys.has(`${collection}:${action}`)) continue
  await request('/permissions', {
    method: 'POST',
    body: JSON.stringify({ policy, collection, action, fields: ['*'], permissions: null, validation: null, presets: null })
  })
  created++
}

console.log(`Website policy configured at ${baseUrl}: ${created} permission(s) created.`)
