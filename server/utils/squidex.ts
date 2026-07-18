export async function squidexGraphQL<T = any>(query: string): Promise<T> {
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
        'Content-Type': 'application/json'
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
