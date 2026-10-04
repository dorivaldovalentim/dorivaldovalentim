export default defineEventHandler(async (event) => {
  const locale = getQuery(event).locale === 'en' ? 'en' : 'pt'
  const items = await squidexContents('projects')

  const statusKeys: Record<string, string> = {
    Planning: 'Planning',
    Planeado: 'Planning',
    'In Progress': 'In Progress',
    'Em curso': 'In Progress',
    Completed: 'Completed',
    'Concluído': 'Completed',
    Maintained: 'Maintained',
    'Em manutenção': 'Maintained',
    Archived: 'Archived',
    Arquivado: 'Archived'
  }

  return items
    .map((item: any) => ({
      id: item.id,
      title: localizedField(item.data, 'title', locale),
      slug: localizedField(item.data, 'slug', locale),
      summary: localizedField(item.data, 'summary', locale),
      description: richTextText(localizedField(item.data, 'description', locale)),
      coverImage: assetUrl(localizedField(item.data, 'coverImage', locale)?.[0]),
      gallery: (localizedField(item.data, 'gallery', locale) ?? []).map((id: string) => assetUrl(id)),
      technologies: localizedField(item.data, 'technologies', locale) ?? [],
      status: localizedField(item.data, 'statusLabel', locale) ?? localizedField(item.data, 'status', locale),
      statusKey: statusKeys[localizedField(item.data, 'status', 'en')] ?? statusKeys[localizedField(item.data, 'status', 'pt')],
      startDate: localizedField(item.data, 'startDate', locale),
      endDate: localizedField(item.data, 'endDate', locale),
      client: localizedField(item.data, 'client', locale),
      websiteUrl: localizedField(item.data, 'websiteUrl', locale),
      repositoryUrl: localizedField(item.data, 'repositoryUrl', locale),
      demoUrl: localizedField(item.data, 'demoUrl', locale)
    }))
    .filter((project: any) => Boolean(project.title))
})
