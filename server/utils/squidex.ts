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

  const { access_token } = await tokenResponse.json()

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

  const { data } = await graphqlResponse.json()
  return data
}
