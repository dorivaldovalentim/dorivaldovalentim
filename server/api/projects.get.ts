export default defineEventHandler(async (event) => {
  const locale = getQuery(event).locale === 'en' ? 'en' : 'pt'
  const items = await directusItems('projects', {
    fields: 'id,slug,cover_image,gallery.directus_files_id,technologies,featured,status_key,start_date,end_date,website_url,repository_url,demo_url,sort,translations.*',
    sort: 'sort,-start_date'
  })

  return items.map((item: any) => {
    const translation = directusTranslation(item, locale)
    return {
      id: item.id,
      title: translation.title,
      slug: item.slug,
      summary: translation.summary,
      description: translation.description,
      coverImage: directusAssetUrl(item.cover_image),
      gallery: directusGallery(item.gallery),
      technologies: item.technologies ?? [],
      featured: Boolean(item.featured),
      badge: translation.badge,
      problem: translation.problem,
      solution: translation.solution,
      role: translation.role,
      outcome: translation.outcome,
      status: translation.status_label,
      statusKey: item.status_key,
      startDate: item.start_date,
      endDate: item.end_date,
      client: translation.client,
      websiteUrl: item.website_url,
      repositoryUrl: item.repository_url,
      demoUrl: item.demo_url
    }
  }).filter((project: any) => Boolean(project.title))
})
