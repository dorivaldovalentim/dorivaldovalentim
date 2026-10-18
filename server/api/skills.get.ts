export default defineEventHandler(async (event) => {
  const locale = getQuery(event).locale === 'en' ? 'en' : 'pt'

  if (isDirectusProvider()) {
    const items = await directusItems('skills', {
      fields: 'id,level,icon,sort,translations.*',
      sort: 'sort'
    })

    return items.map((item: any) => {
      const translation = directusTranslation(item, locale)
      return {
        id: item.id,
        name: translation.name,
        category: translation.category_label,
        level: item.level,
        icon: item.icon
      }
    })
  }

  const items = await squidexContents('skills')

  return items.map((item: any) => ({
    id: item.id,
    name: localizedField(item.data, 'name', locale),
    category: localizedField(item.data, 'categoryLabel', locale)
      || localizedField(item.data, 'category', locale),
    level: localizedField(item.data, 'level', locale),
    icon: localizedField(item.data, 'icon', locale)
  }))
})
