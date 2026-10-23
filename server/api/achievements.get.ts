export default defineEventHandler(async (event) => {
  const locale = getQuery(event).locale === 'en' ? 'en' : 'pt'
  const items = await directusItems('achievements', {
    fields: 'id,organization,achievement_date,website_url,team_size,technologies,sort,translations.*',
    sort: '-achievement_date'
  })

  return items.map((item: any) => {
    const translation = directusTranslation(item, locale)
    return {
      id: item.id,
      title: translation.title,
      result: translation.result,
      summary: translation.summary,
      description: translation.description,
      organization: item.organization,
      achievementDate: item.achievement_date,
      websiteUrl: item.website_url,
      teamSize: item.team_size,
      technologies: item.technologies ?? []
    }
  })
})
