export default defineEventHandler(async (event) => {
  const locale = getQuery(event).locale === 'en' ? 'en' : 'pt'
  const items = await directusItems('experiences', {
    fields: 'id,company,start_date,end_date,technologies,sort,translations.*',
    sort: '-start_date'
  })

  return items.map((item: any) => {
    const translation = directusTranslation(item, locale)
    return {
      id: item.id,
      role: translation.role,
      company: item.company,
      location: translation.location,
      startDate: item.start_date,
      endDate: item.end_date,
      description: translation.description,
      technologies: item.technologies ?? []
    }
  })
})
