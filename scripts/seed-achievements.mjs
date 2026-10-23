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

const params = new URLSearchParams({
  'filter[organization][_eq]': 'Sócia',
  'filter[achievement_date][_eq]': '2021-09-01',
  fields: 'id',
  limit: '1'
})
const current = await request(`/items/achievements?${params}`)
const payload = {
  organization: 'Sócia',
  achievement_date: '2021-09-01',
  website_url: 'https://socia.ao/',
  team_size: 2,
  technologies: ['Git', 'JavaScript', 'Node.js', 'Vue.js'],
  sort: 1
}

let achievementId
if (current.length) {
  achievementId = current[0].id
  await request(`/items/achievements/${achievementId}`, { method: 'PATCH', body: JSON.stringify(payload) })
} else {
  const created = await request('/items/achievements', { method: 'POST', body: JSON.stringify(payload) })
  achievementId = created.id
}

const translations = {
  pt: {
    title: 'Desafio Sócia 24h',
    result: '1.º lugar',
    summary: 'Protótipo vencedor de uma aplicação de compras colaborativas, concebido e desenvolvido em dupla durante um desafio de 24 horas.',
    description: '<p>Em setembro de 2021, participei num hackathon promovido pela Sócia com o desafio de transformar, em apenas 24 horas, o modelo de compra colectiva numa experiência digital. Em conjunto com um colega, desenvolvi um protótipo que permitia criar ou aderir a uma “sócia”, reunir pessoas interessadas no mesmo produto e dividir o custo da compra. A solução conquistou o primeiro lugar, demonstrando capacidade de entrega sob pressão, colaboração e foco no produto.</p>'
  },
  en: {
    title: 'Sócia 24h Challenge',
    result: '1st place',
    summary: 'Award-winning collaborative shopping prototype, designed and built by a two-person team during a 24-hour challenge.',
    description: '<p>In September 2021, I took part in a hackathon organized by Sócia, with the challenge of turning the collaborative purchasing model into a digital experience in just 24 hours. Working with one colleague, I built a prototype that enabled people to create or join a group purchase, bring together participants interested in the same product, and split the purchase cost. The solution won first place, demonstrating fast delivery, teamwork, and product-focused execution.</p>'
  }
}

for (const [locale, translation] of Object.entries(translations)) {
  const search = new URLSearchParams({
    'filter[achievements_id][_eq]': achievementId,
    'filter[languages_code][_eq]': locale,
    fields: 'id',
    limit: '1'
  })
  const existing = await request(`/items/achievements_translations?${search}`)
  const translationPayload = { achievements_id: achievementId, languages_code: locale, ...translation }
  if (existing.length) {
    await request(`/items/achievements_translations/${existing[0].id}`, { method: 'PATCH', body: JSON.stringify(translationPayload) })
  } else {
    await request('/items/achievements_translations', { method: 'POST', body: JSON.stringify(translationPayload) })
  }
}

console.log(`Achievement seeded at ${baseUrl}.`)
