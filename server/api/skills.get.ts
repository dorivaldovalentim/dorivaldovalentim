export default defineEventHandler(async (event) => {
  const locale = getQuery(event).locale === 'en' ? 'en' : 'pt'
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
})
