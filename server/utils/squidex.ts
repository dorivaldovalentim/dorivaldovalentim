export async function squidexGraphQL<T = any>(query: string, locale = 'pt'): Promise<T> {
  const config = useRuntimeConfig()

  const tokenResponse = await fetch(
    `${config.public.squidexUrl}/identity-server/connect/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: `${config.squidexClientId}`,
        client_secret: config.squidexClientSecret,
        scope: 'squidex-api'
      })
    }
  )

  if (!tokenResponse.ok) {
    const body = await tokenResponse.text()
    console.error(`[squidex] token request failed: ${tokenResponse.status} ${tokenResponse.statusText} - ${body}`)
    throw createError({
      statusCode: 502,
      statusMessage: `Squidex authentication failed (${tokenResponse.status})`
    })
  }

  const { access_token } = await tokenResponse.json()

  if (!access_token) {
    console.error('[squidex] token response did not include access_token')
    throw createError({ statusCode: 502, statusMessage: 'Squidex authentication returned no token' })
  }

  const graphqlResponse = await fetch(
    `${config.public.squidexUrl}/api/content/${config.public.squidexApp}/graphql`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
        'X-Languages': locale === 'en' ? 'en, pt' : 'pt'
      },
      body: JSON.stringify({ query })
    }
  )

  if (!graphqlResponse.ok) {
    const body = await graphqlResponse.text()
    console.error(`[squidex] graphql request failed: ${graphqlResponse.status} ${graphqlResponse.statusText} - ${body}`)
    throw createError({
      statusCode: 502,
      statusMessage: `Squidex GraphQL request failed (${graphqlResponse.status})`
    })
  }

  const { data, errors } = await graphqlResponse.json()

  if (errors?.length) {
    console.error('[squidex] graphql returned errors:', JSON.stringify(errors))
    throw createError({ statusCode: 502, statusMessage: 'Squidex GraphQL returned errors' })
  }

  return data
}

async function squidexToken() {
  const config = useRuntimeConfig()
  const response = await fetch(`${config.public.squidexUrl}/identity-server/connect/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: `${config.squidexClientId}`,
      client_secret: config.squidexClientSecret,
      scope: 'squidex-api'
    })
  })

  if (!response.ok) throw createError({ statusCode: 502, statusMessage: 'Squidex authentication failed' })
  return (await response.json()).access_token as string
}

export async function squidexCreateContent(schema: string, data: Record<string, any>) {
  const config = useRuntimeConfig()
  const token = await squidexToken()
  const response = await fetch(`${config.public.squidexUrl}/api/content/${config.public.squidexApp}/${schema}?publish=true`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const body = await response.text()
    console.error(`[squidex] content creation failed: ${response.status} ${response.statusText} - ${body}`)
    throw createError({ statusCode: 502, statusMessage: 'Unable to save contact message' })
  }

  return response.json()
}

export async function squidexContents(schema: string) {
  const config = useRuntimeConfig()
  const token = await squidexToken()
  const response = await fetch(`${config.public.squidexUrl}/api/content/${config.public.squidexApp}/${schema}/`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  if (!response.ok) throw createError({ statusCode: 502, statusMessage: `Squidex content request failed (${response.status})` })
  return (await response.json()).items ?? []
}

export function localizedField(data: Record<string, any>, field: string, locale: string) {
  const value = data?.[field]
  if (!value || typeof value !== 'object') return value
  return value[locale] ?? value.pt ?? value.en ?? value.iv
}

export function assetUrl(assetId?: string) {
  if (!assetId) return undefined
  const config = useRuntimeConfig()
  return `${config.public.squidexUrl}/api/assets/${config.public.squidexApp}/${assetId}/`
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character]!)

export function richTextHtml(document: any): string {
  if (!document?.content) return ''
  const render = (node: any): string => {
    if (node.type === 'text') return escapeHtml(node.text ?? '')
    const children = (node.content ?? []).map(render).join('')
    if (node.type === 'paragraph') return `<p>${children}</p>`
    if (node.type === 'bulletList') return `<ul>${children}</ul>`
    if (node.type === 'orderedList') return `<ol>${children}</ol>`
    if (node.type === 'listItem') return `<li>${children}</li>`
    if (node.type === 'heading') return `<h${node.attrs?.level ?? 3}>${children}</h${node.attrs?.level ?? 3}>`
    return children
  }
  return document.content.map(render).join('\n')
}

export function richTextText(document: any): string {
  if (!document?.content) return ''
  const read = (node: any): string => node.type === 'text' ? (node.text ?? '') : (node.content ?? []).map(read).join(' ')
  return document.content.map(read).join('\n').trim()
}
