export default defineEventHandler(async (event) => {
  const locale = getQuery(event).locale === 'en' ? 'en' : 'pt'
  const [profiles, facts, contacts] = await Promise.all([
    directusItems('profile', { fields: '*,translations.*', limit: 1 }),
    directusItems('fun_facts', { fields: 'id,sort,translations.*', sort: 'sort' }),
    directusItems('contacts', { fields: 'id,label,url,icon,sort', sort: 'sort' })
  ])
  const profile = profiles[0] ?? {}
  const translation = directusTranslation(profile, locale)

  return {
    name: profile.name,
    fullname: profile.fullname,
    role: translation.role,
    location: translation.location,
    email: profile.email,
    phone: profile.phone,
    education: translation.education,
    languages: translation.languages,
    headline: translation.headline,
    intro: translation.intro,
    bio: translation.bio,
    avatar: directusAssetUrl(profile.avatar),
    funFacts: facts.map((item: any) => directusTranslation(item, locale).text).filter(Boolean),
    socials: contacts
      .filter((social: any) => {
        try {
          return ['http:', 'https:', 'mailto:', 'tel:'].includes(new URL(social.url).protocol)
        } catch { return false }
      })
      .map(({ label, url, icon }: any) => ({ label, url, icon }))
  }
})
