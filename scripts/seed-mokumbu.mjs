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
const logoPath = 'C:\\Users\\doriv\\OneDrive\\Documentos\\Projectos\\mokumbu-mobileapp\\assets\\images\\brand\\logo.png'

async function request(endpoint, options = {}) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers
    }
  })
  const text = await response.text()
  if (!response.ok) throw new Error(`${options.method || 'GET'} ${endpoint}: ${response.status} ${text}`)
  return text ? JSON.parse(text).data : null
}

const fileQuery = new URLSearchParams({ 'filter[title][_eq]': 'MoKumbu — cover', fields: 'id', limit: '1' })
let [cover] = await request(`/files?${fileQuery}`)
if (!cover) {
  const form = new FormData()
  form.append('title', 'MoKumbu — cover')
  form.append('description', 'Identidade visual do produto MoKumbu')
  form.append('file', new Blob([fs.readFileSync(logoPath)], { type: 'image/png' }), 'mokumbu-cover.png')
  cover = await request('/files', { method: 'POST', body: form })
}

const projectQuery = new URLSearchParams({ 'filter[slug][_eq]': 'mokumbu', fields: 'id', limit: '1' })
const current = await request(`/items/projects?${projectQuery}`)
const payload = {
  slug: 'mokumbu',
  cover_image: cover.id,
  technologies: ['Flutter', 'Dart', 'Laravel', 'PHP', 'Vue.js', 'TypeScript', 'Inertia.js', 'Firebase', 'MySQL', 'Docker', 'GitHub Actions'],
  featured: true,
  status_key: 'In Progress',
  start_date: '2026-01-17',
  end_date: null,
  website_url: 'https://mokumbu.com',
  repository_url: null,
  demo_url: 'https://app.mokumbu.com',
  sort: 0
}

let projectId
if (current.length) {
  projectId = current[0].id
  await request(`/items/projects/${projectId}`, { method: 'PATCH', body: JSON.stringify(payload) })
} else {
  const created = await request('/items/projects', { method: 'POST', body: JSON.stringify(payload) })
  projectId = created.id
}

const translations = {
  pt: {
    title: 'MoKumbu',
    badge: 'Produto em destaque · Multiplataforma',
    status_label: 'Em evolução',
    client: 'Produto independente',
    summary: 'Plataforma multiplataforma de gestão financeira pessoal, construída para funcionar com confiança dentro e fora da internet.',
    problem: 'Gerir as finanças do dia a dia torna-se mais difícil quando cartões, movimentos, despesas e valores a receber ficam dispersos — e uma ferramenta financeira não pode deixar de funcionar quando a ligação à internet falha.',
    solution: 'Uma experiência integrada para web, Android e iOS que reúne a vida financeira num só lugar. A arquitectura offline-first já implementada permite registar operações e consultar dados essenciais sem internet, sincronizando tudo com segurança quando a conectividade regressa.',
    role: 'Conduzi o produto de ponta a ponta: definição funcional, arquitectura, API, dashboard web, aplicação mobile, experiência offline, autenticação, testes, observabilidade, infraestrutura e preparação para publicação nas lojas.',
    outcome: 'Um produto proprietário com aplicações web e mobile, autenticação e segurança multicamada, sincronização resiliente, pipelines de entrega e um percurso real de validação para Google Play e App Store.',
    description: '<h2>Um produto, não apenas uma aplicação</h2><p>O MoKumbu nasceu para tornar a gestão financeira pessoal mais clara e acessível. A plataforma permite organizar cartões, categorias, movimentos, despesas e devedores, apresentando uma visão unificada da situação financeira do utilizador.</p><h2>O desafio offline-first</h2><p>A conectividade não deveria impedir alguém de registar um movimento. Por isso, cartões, categorias e transações podem ser criados localmente e reflectem-se de imediato no histórico e nos saldos. UUIDs gerados no dispositivo, uma fila ordenada de sincronização e operações idempotentes no backend reduzem duplicações e mantêm a experiência consistente quando a internet regressa.</p><h2>Engenharia de produto end-to-end</h2><p>O ecossistema combina uma aplicação Flutter para Android e iOS com um dashboard web em Laravel, Inertia e Vue. A solução integra autenticação por email, biometria e provedores sociais, segurança de conta, tours guiados, observabilidade, testes automatizados, Docker e pipelines de CI/CD para ambientes de desenvolvimento e produção.</p><h2>Da implementação às lojas</h2><p>O trabalho ultrapassou o desenvolvimento de funcionalidades: incluiu requisitos de privacidade, eliminação permanente de conta, adequação do Sign in with Apple, builds assinados, TestFlight, Google Play e ciclos reais de revisão. Isso transformou o MoKumbu num exercício completo de product engineering.</p>'
  },
  en: {
    title: 'MoKumbu',
    badge: 'Featured product · Cross-platform',
    status_label: 'In active development',
    client: 'Independent product',
    summary: 'A cross-platform personal finance platform designed to work reliably both online and offline.',
    problem: 'Everyday money management becomes harder when cards, transactions, expenses, and receivables are scattered across different places—and a financial tool cannot stop working when connectivity drops.',
    solution: 'An integrated web, Android, and iOS experience that brings personal finances together. Its implemented offline-first architecture lets users record operations and access essential data without internet, then synchronizes everything safely when connectivity returns.',
    role: 'I led the product end to end: functional definition, architecture, API, web dashboard, mobile application, offline experience, authentication, testing, observability, infrastructure, and store-readiness.',
    outcome: 'A proprietary product spanning web and mobile, with layered authentication and security, resilient synchronization, delivery pipelines, and a real validation journey across Google Play and the App Store.',
    description: '<h2>A product, not just an application</h2><p>MoKumbu was created to make personal finance management clearer and more accessible. The platform organizes cards, categories, transactions, expenses, and debtors, providing a unified view of the user’s financial position.</p><h2>The offline-first challenge</h2><p>Connectivity should not prevent someone from recording a transaction. Cards, categories, and transactions can therefore be created locally and immediately reflected in history and balances. Device-generated UUIDs, an ordered synchronization queue, and idempotent backend operations reduce duplication and keep the experience consistent when the internet returns.</p><h2>End-to-end product engineering</h2><p>The ecosystem combines a Flutter application for Android and iOS with a Laravel, Inertia, and Vue web dashboard. It includes email, biometric, and social authentication, account security, guided tours, observability, automated testing, Docker, and CI/CD pipelines for development and production.</p><h2>From implementation to the stores</h2><p>The work went beyond feature development: it covered privacy requirements, permanent account deletion, Sign in with Apple compliance, signed builds, TestFlight, Google Play, and real review cycles. This turned MoKumbu into a complete product-engineering case study.</p>'
  }
}

for (const [locale, translation] of Object.entries(translations)) {
  const query = new URLSearchParams({
    'filter[projects_id][_eq]': projectId,
    'filter[languages_code][_eq]': locale,
    fields: 'id',
    limit: '1'
  })
  const existing = await request(`/items/projects_translations?${query}`)
  const translationPayload = { projects_id: projectId, languages_code: locale, ...translation }
  if (existing.length) {
    await request(`/items/projects_translations/${existing[0].id}`, { method: 'PATCH', body: JSON.stringify(translationPayload) })
  } else {
    await request('/items/projects_translations', { method: 'POST', body: JSON.stringify(translationPayload) })
  }
}

console.log(`MoKumbu seeded at ${baseUrl}.`)
