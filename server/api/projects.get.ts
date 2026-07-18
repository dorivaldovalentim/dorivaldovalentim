export default defineEventHandler(async () => {
  const data = await squidexGraphQL(`
    query Fetch {
      queryProjectsContents {
        id

        flatData {
          coverImage {
            id
            url
          }

          title
          slug
          summary
          description {
            text
          }

          technologies

          status

          startDate
          endDate

          client

          websiteUrl
          repositoryUrl
          demoUrl

          gallery {
            id
            url
          }
        }
      }
    }
  `)

  return data.queryProjectsContents
    .filter((project: any) => Boolean(project.flatData.title))
    .map((project: any) => ({
      id: project.id,
      title: project.flatData.title,
      slug: project.flatData.slug,
      summary: project.flatData.summary,
      description: project.flatData.description?.text,
      coverImage: project.flatData.coverImage?.[0]?.url,
      gallery: project.flatData.gallery?.map((image: any) => image.url) ?? [],
      technologies: project.flatData.technologies ?? [],
      status: project.flatData.status,
      startDate: project.flatData.startDate,
      endDate: project.flatData.endDate,
      client: project.flatData.client,
      websiteUrl: project.flatData.websiteUrl,
      repositoryUrl: project.flatData.repositoryUrl,
      demoUrl: project.flatData.demoUrl
    }))
})
