export default defineEventHandler(async (event) => {
  const locale = getQuery(event).locale === 'en' ? 'en' : 'pt'
  const items = await squidexContents('experiences')

  return items
    .map((item: any) => ({
      id: item.id,
      role: localizedField(item.data, 'role', locale),
      company: localizedField(item.data, 'company', locale),
      location: localizedField(item.data, 'location', locale),
      startDate: localizedField(item.data, 'startDate', locale),
      endDate: localizedField(item.data, 'endDate', locale),
      description: richTextHtml(localizedField(item.data, 'description', locale)),
      technologies: localizedField(item.data, 'technologies', locale) ?? []
    }))
    .filter((item: any) => !`${item.company} ${item.description}`.toUpperCase().includes('[EXEMPLO]'))
    .sort((a: any, b: any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
})
