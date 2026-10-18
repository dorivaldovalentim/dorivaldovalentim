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

const env = readEnv('.env.directus')
const baseUrl = (env.DIRECTUS_PUBLIC_URL || 'http://localhost:8055').replace(/\/$/, '')
const token = env.DIRECTUS_ADMIN_TOKEN

async function request(endpoint, options = {}) {
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  })
  const text = await response.text()
  const body = text ? JSON.parse(text) : {}
  if (!response.ok) throw new Error(`${options.method || 'GET'} ${endpoint}: ${response.status} ${text}`)
  return body.data
}

const id = () => ({
  field: 'id', type: 'uuid',
  meta: { interface: 'input', hidden: true, readonly: true },
  schema: { is_primary_key: true, is_nullable: false }
})

const autoId = () => ({
  field: 'id', type: 'integer',
  meta: { interface: 'input', hidden: true, readonly: true },
  schema: { is_primary_key: true, has_auto_increment: true, is_nullable: false }
})

const string = (field, options = {}) => ({
  field, type: 'string',
  meta: {
    interface: options.interface || 'input',
    options: options.options,
    required: options.required ?? false,
    width: options.width || 'full',
    note: options.note
  },
  schema: {
    max_length: options.length || 255,
    is_nullable: !(options.required ?? false),
    is_unique: options.unique ?? false,
    default_value: options.defaultValue
  }
})

const text = (field, options = {}) => ({
  field, type: 'text',
  meta: { interface: options.interface || 'input-multiline', required: options.required ?? false, width: 'full' },
  schema: { is_nullable: !(options.required ?? false) }
})

const integer = (field, options = {}) => ({
  field, type: 'integer',
  meta: { interface: 'input', hidden: options.hidden ?? false, width: options.width || 'half' },
  schema: { is_nullable: true, default_value: options.defaultValue }
})

const date = field => ({ field, type: 'date', meta: { interface: 'datetime', width: 'half' }, schema: { is_nullable: true } })
const timestamp = field => ({ field, type: 'timestamp', meta: { interface: 'datetime', width: 'half' }, schema: { is_nullable: true } })
const json = field => ({ field, type: 'json', meta: { interface: 'tags', width: 'full' }, schema: { is_nullable: true } })
const uuid = (field, options = {}) => ({
  field, type: 'uuid',
  meta: { interface: options.interface || 'select-dropdown-m2o', special: ['m2o'], hidden: options.hidden ?? false, width: options.width || 'full' },
  schema: { is_nullable: options.nullable ?? true }
})
const languageRelation = () => ({
  field: 'languages_code', type: 'string',
  meta: { interface: 'select-dropdown-m2o', special: ['m2o'], hidden: true, width: 'half' },
  schema: { max_length: 10, is_nullable: false }
})
const alias = (field, special, interfaceName, options = {}) => ({
  field, type: 'alias', meta: { special: [special], interface: interfaceName, options, width: 'full' }, schema: null
})

const collections = [
  {
    collection: 'languages',
    meta: { icon: 'translate', note: 'Idiomas disponíveis no website', display_template: '{{name}}' },
    fields: [
      { field: 'code', type: 'string', meta: { interface: 'input', required: true, width: 'half' }, schema: { max_length: 10, is_primary_key: true, is_nullable: false } },
      string('name', { required: true, width: 'half', length: 100 }),
      string('direction', { required: true, width: 'half', length: 3, defaultValue: 'ltr' })
    ]
  },
  {
    collection: 'profile',
    meta: { icon: 'person', singleton: true, note: 'Perfil principal apresentado no website', display_template: '{{fullname}}' },
    fields: [id(), string('name', { required: true, width: 'half' }), string('fullname', { required: true, width: 'half' }), string('email', { required: true, width: 'half' }), string('phone', { width: 'half' }), uuid('avatar', { interface: 'file-image' }), alias('translations', 'translations', 'translations', { languageField: 'name', languageDirectionField: 'direction', defaultLanguage: 'pt' })]
  },
  {
    collection: 'profile_translations', meta: { icon: 'translate', hidden: true },
    fields: [autoId(), uuid('profile_id', { hidden: true }), languageRelation(), string('role', { required: true }), string('location'), string('education'), string('languages'), text('headline', { required: true }), text('intro', { required: true }), text('bio', { interface: 'input-rich-text-html' })]
  },
  {
    collection: 'fun_facts', meta: { icon: 'lightbulb', note: 'Factos pessoais apresentados na secção Sobre', sort_field: 'sort' },
    fields: [id(), integer('sort', { defaultValue: 1 }), alias('translations', 'translations', 'translations', { languageField: 'name', languageDirectionField: 'direction', defaultLanguage: 'pt' })]
  },
  { collection: 'fun_facts_translations', meta: { icon: 'translate', hidden: true }, fields: [autoId(), uuid('fun_facts_id', { hidden: true }), languageRelation(), text('text', { required: true })] },
  {
    collection: 'contacts', meta: { icon: 'share', note: 'Links de contacto e redes sociais', sort_field: 'sort', display_template: '{{label}}' },
    fields: [id(), string('label', { required: true, width: 'half' }), string('url', { required: true, width: 'half' }), string('icon', { width: 'half' }), integer('sort', { defaultValue: 1 })]
  },
  {
    collection: 'skills', meta: { icon: 'code', note: 'Competências técnicas', sort_field: 'sort' },
    fields: [id(), integer('level'), string('icon', { width: 'half' }), integer('sort', { defaultValue: 1 }), alias('translations', 'translations', 'translations', { languageField: 'name', languageDirectionField: 'direction', defaultLanguage: 'pt' })]
  },
  { collection: 'skills_translations', meta: { icon: 'translate', hidden: true }, fields: [autoId(), uuid('skills_id', { hidden: true }), languageRelation(), string('name', { required: true }), string('category_label', { required: true })] },
  {
    collection: 'experiences', meta: { icon: 'work', note: 'Experiência profissional', sort_field: 'sort', display_template: '{{company}}' },
    fields: [id(), string('company', { required: true }), date('start_date'), date('end_date'), json('technologies'), integer('sort', { defaultValue: 1 }), alias('translations', 'translations', 'translations', { languageField: 'name', languageDirectionField: 'direction', defaultLanguage: 'pt' })]
  },
  { collection: 'experiences_translations', meta: { icon: 'translate', hidden: true }, fields: [autoId(), uuid('experiences_id', { hidden: true }), languageRelation(), string('role', { required: true }), string('location'), text('description', { interface: 'input-rich-text-html' })] },
  {
    collection: 'projects', meta: { icon: 'rocket_launch', note: 'Projectos do portfólio', sort_field: 'sort', display_template: '{{slug}}' },
    fields: [id(), string('slug', { required: true, unique: true }), uuid('cover_image', { interface: 'file-image' }), json('technologies'), string('status_key', { width: 'half' }), date('start_date'), date('end_date'), string('website_url'), string('repository_url'), string('demo_url'), integer('sort', { defaultValue: 1 }), alias('gallery', 'o2m', 'list-o2m'), alias('translations', 'translations', 'translations', { languageField: 'name', languageDirectionField: 'direction', defaultLanguage: 'pt' })]
  },
  { collection: 'projects_translations', meta: { icon: 'translate', hidden: true }, fields: [autoId(), uuid('projects_id', { hidden: true }), languageRelation(), string('title', { required: true }), text('summary', { required: true }), text('description', { interface: 'input-rich-text-html' }), string('status_label'), string('client')] },
  {
    collection: 'projects_files', meta: { icon: 'image', hidden: true },
    fields: [autoId(), uuid('projects_id'), uuid('directus_files_id', { interface: 'file-image' }), integer('sort', { defaultValue: 1 })]
  },
  {
    collection: 'contact_messages',
    meta: { icon: 'mail', note: 'Mensagens enviadas pelo formulário', display_template: '{{name}} · {{email}}' },
    fields: [id(), string('name', { required: true, width: 'half' }), string('email', { required: true, width: 'half' }), text('message', { required: true }), string('locale', { required: true, width: 'half', length: 10 }), timestamp('submitted_at'), string('status', { required: true, width: 'half', defaultValue: 'new' })]
  }
]

const relations = [
  ['profile_translations', 'profile_id', 'profile', 'translations'],
  ['profile_translations', 'languages_code', 'languages', null],
  ['fun_facts_translations', 'fun_facts_id', 'fun_facts', 'translations'],
  ['fun_facts_translations', 'languages_code', 'languages', null],
  ['skills_translations', 'skills_id', 'skills', 'translations'],
  ['skills_translations', 'languages_code', 'languages', null],
  ['experiences_translations', 'experiences_id', 'experiences', 'translations'],
  ['experiences_translations', 'languages_code', 'languages', null],
  ['projects_translations', 'projects_id', 'projects', 'translations'],
  ['projects_translations', 'languages_code', 'languages', null],
  ['projects_files', 'projects_id', 'projects', 'gallery'],
  ['projects_files', 'directus_files_id', 'directus_files', null],
  ['profile', 'avatar', 'directus_files', null],
  ['projects', 'cover_image', 'directus_files', null]
]

const current = await request('/collections')
const existing = new Set(current.map(item => item.collection))

for (const definition of collections) {
  if (existing.has(definition.collection)) continue
  await request('/collections', {
    method: 'POST',
    body: JSON.stringify({ ...definition, schema: { name: definition.collection } })
  })
  console.log(`created collection ${definition.collection}`)
}

const currentRelations = await request('/relations')
for (const [collection, field, relatedCollection, oneField] of relations) {
  if (currentRelations.some(item => item.collection === collection && item.field === field)) continue
  await request('/relations', {
    method: 'POST',
    body: JSON.stringify({
      collection,
      field,
      related_collection: relatedCollection,
      meta: {
        many_collection: collection,
        many_field: field,
        one_collection: relatedCollection,
        one_field: oneField,
        junction_field: oneField === 'translations' ? 'languages_code' : null,
        one_deselect_action: 'nullify'
      },
      schema: {
        table: collection,
        column: field,
        foreign_key_table: relatedCollection,
        foreign_key_column: relatedCollection === 'languages' ? 'code' : 'id',
        constraint_name: `${collection}_${field}_foreign`,
        on_update: 'NO ACTION',
        on_delete: 'CASCADE'
      }
    })
  })
  console.log(`created relation ${collection}.${field}`)
}

for (const language of [{ code: 'pt', name: 'Português', direction: 'ltr' }, { code: 'en', name: 'English', direction: 'ltr' }]) {
  try {
    await request('/items/languages', { method: 'POST', body: JSON.stringify(language) })
  } catch (error) {
    if (!String(error).includes('RECORD_NOT_UNIQUE')) throw error
  }
}

for (const collection of ['profile', 'fun_facts', 'skills', 'experiences', 'projects']) {
  await request(`/fields/${collection}/translations`, {
    method: 'PATCH',
    body: JSON.stringify({
      meta: {
        special: ['translations'],
        interface: 'translations',
        options: { languageField: 'name', languageDirectionField: 'direction', defaultLanguage: 'pt' }
      }
    })
  })
}

for (const [translationCollection, parentField] of [
  ['profile_translations', 'profile_id'],
  ['fun_facts_translations', 'fun_facts_id'],
  ['skills_translations', 'skills_id'],
  ['experiences_translations', 'experiences_id'],
  ['projects_translations', 'projects_id']
]) {
  await request(`/relations/${translationCollection}/${parentField}`, {
    method: 'PATCH',
    body: JSON.stringify({ meta: { junction_field: 'languages_code' } })
  })
  await request(`/fields/${translationCollection}/${parentField}`, {
    method: 'PATCH',
    body: JSON.stringify({ meta: { interface: 'select-dropdown-m2o', special: ['m2o'], hidden: true } })
  })
  await request(`/fields/${translationCollection}/languages_code`, {
    method: 'PATCH',
    body: JSON.stringify({ meta: { interface: 'select-dropdown-m2o', special: ['m2o'], hidden: true } })
  })
}

console.log('Directus schema is ready.')
