type DirectusQuery = Record<string, string | number | boolean | undefined>

const directusConfig = () => {
  const config = useRuntimeConfig()
  const url = String(config.public.directusUrl || '').replace(/\/$/, '')

  if (!url) {
    throw createError({ statusCode: 500, statusMessage: 'Directus URL is not configured' })
  }

  return { url, token: String(config.directusToken || '') }
}

export const isDirectusProvider = () => useRuntimeConfig().cmsProvider === 'directus'

export async function directusItems<T = any>(collection: string, query: DirectusQuery = {}): Promise<T[]> {
  const { url, token } = directusConfig()
  const search = new URLSearchParams()

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined) search.set(key, String(value))
  }

  const response = await fetch(`${url}/items/${collection}?${search}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  })

  if (!response.ok) {
    const body = await response.text()
    console.error(`[directus] ${collection} request failed: ${response.status} - ${body}`)
    throw createError({ statusCode: 502, statusMessage: `Directus request failed (${response.status})` })
  }

  return (await response.json()).data ?? []
}

export async function directusCreateItem<T = any>(collection: string, data: Record<string, any>): Promise<T> {
  const { url, token } = directusConfig()
  const response = await fetch(`${url}/items/${collection}`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const body = await response.text()
    console.error(`[directus] ${collection} creation failed: ${response.status} - ${body}`)
    throw createError({ statusCode: 502, statusMessage: 'Unable to save content in Directus' })
  }

  return (await response.json()).data
}

export function directusTranslation(item: any, locale: string) {
  const translations = Array.isArray(item?.translations) ? item.translations : []
  const language = (translation: any) =>
    typeof translation.languages_code === 'string'
      ? translation.languages_code
      : translation.languages_code?.code

  return translations.find((translation: any) => language(translation) === locale)
    ?? translations.find((translation: any) => language(translation) === 'pt')
    ?? translations[0]
    ?? {}
}

export function directusAssetUrl(file?: string | { id?: string } | null) {
  const id = typeof file === 'string' ? file : file?.id
  if (!id) return undefined
  return `${directusConfig().url}/assets/${id}`
}

export function directusGallery(items?: any[]) {
  return (items ?? [])
    .map(item => directusAssetUrl(item?.directus_files_id ?? item?.file ?? item))
    .filter(Boolean)
}
