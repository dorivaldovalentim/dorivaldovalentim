export default defineEventHandler(async (event) => {
  const locale = getQuery(event).locale === 'en' ? 'en' : 'pt'
  const items = await squidexContents('skills')

  return items.map((item: any) => ({
    id: item.id,
    name: localizedField(item.data, 'name', locale),
    category: localizedField(item.data, 'category', locale),
    level: localizedField(item.data, 'level', locale),
    icon: localizedField(item.data, 'icon', locale)
  }))
})
