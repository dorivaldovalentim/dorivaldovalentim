export default defineEventHandler(async (event) => {
  const locale = getQuery(event).locale === 'en' ? 'en' : 'pt'
  const [profiles, facts, contacts] = await Promise.all([
    squidexContents('profile'), squidexContents('funfacts'), squidexContents('contacts')
  ])
  const data = profiles[0]?.data ?? {}

  return {
    name: localizedField(data, 'name', locale),
    fullname: localizedField(data, 'fullname', locale),
    role: localizedField(data, 'role', locale),
    location: localizedField(data, 'location', locale),
    email: localizedField(data, 'email', locale),
    phone: localizedField(data, 'phone', locale),
    education: localizedField(data, 'education', locale),
    languages: localizedField(data, 'languages', locale),
    headline: localizedField(data, 'headline', locale),
    intro: localizedField(data, 'intro', locale),
    bio: richTextHtml(localizedField(data, 'bio', locale)),
    avatar: assetUrl(localizedField(data, 'avatar', locale)?.[0]),
    funFacts: facts
      .map((item: any) => ({ text: localizedField(item.data, 'text', locale), order: localizedField(item.data, 'order', locale) ?? 0 }))
      .filter((item: any) => Boolean(item.text))
      .sort((a: any, b: any) => a.order - b.order)
      .map((item: any) => item.text),
    socials: contacts
      .map((item: any) => ({
        label: localizedField(item.data, 'label', locale),
        url: localizedField(item.data, 'url', locale),
        icon: localizedField(item.data, 'icon', locale),
        order: localizedField(item.data, 'order', locale) ?? 0
      }))
      .filter((social: any) => {
        try {
          const parsed = new URL(social.url)
          return parsed.protocol === 'mailto:' || parsed.pathname !== '/'
        } catch { return String(social.url ?? '').startsWith('mailto:') }
      })
      .sort((a: any, b: any) => a.order - b.order)
      .map(({ label, url, icon }: any) => ({ label, url, icon }))
  }
})
