export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') ?? ''

  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid asset identifier' })
  }

  const { apiUrl, token } = getDirectusConfig()
  const response = await fetch(`${apiUrl}/assets/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  })

  if (!response.ok || !response.body) {
    const body = await response.text()
    console.error(`[directus] asset ${id} request failed: ${response.status} - ${body}`)
    throw createError({
      statusCode: response.status === 404 ? 404 : 502,
      statusMessage: response.status === 404 ? 'Asset not found' : 'Unable to load asset'
    })
  }

  for (const header of ['content-type', 'content-length', 'etag', 'last-modified', 'content-disposition']) {
    const value = response.headers.get(header)
    if (value) setResponseHeader(event, header, value)
  }

  setResponseHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800')
  return sendStream(event, response.body)
})
