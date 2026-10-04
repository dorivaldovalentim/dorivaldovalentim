const attempts = new Map<string, { count: number, resetAt: number }>()
const windowMs = 15 * 60 * 1000
const maxAttempts = 5

const clean = (value: unknown) => typeof value === 'string' ? value.trim() : ''

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Bots commonly fill this field, while it stays invisible to real visitors.
  if (clean(body?.website)) return { ok: true }

  const name = clean(body?.name)
  const email = clean(body?.email).toLowerCase()
  const message = clean(body?.message)
  const locale = body?.locale === 'en' ? 'en' : 'pt'

  if (name.length < 2 || name.length > 120) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid name' })
  }

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid email' })
  }

  if (message.length < 10 || message.length > 5000) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid message' })
  }

  const now = Date.now()
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const current = attempts.get(ip)

  if (!current || current.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + windowMs })
  } else {
    if (current.count >= maxAttempts) {
      throw createError({ statusCode: 429, statusMessage: 'Too many contact requests' })
    }
    current.count += 1
  }

  await squidexCreateContent('contact-messages', {
    name: { iv: name },
    email: { iv: email },
    message: { iv: message },
    locale: { iv: locale },
    submittedAt: { iv: new Date(now).toISOString() },
    status: { iv: 'New' }
  })

  return { ok: true }
})
