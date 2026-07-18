export default defineEventHandler(async () => {
  const data = await squidexGraphQL(`
    query Fetch {
      queryExperiencesContents {
        id

        flatData {
          role
          company
          location
          startDate
          endDate
          description {
            html
          }
          technologies
        }
      }
    }
  `)

  return data.queryExperiencesContents
    .map((experience: any) => ({
      id: experience.id,
      role: experience.flatData.role,
      company: experience.flatData.company,
      location: experience.flatData.location,
      startDate: experience.flatData.startDate,
      endDate: experience.flatData.endDate,
      description: experience.flatData.description?.html,
      technologies: experience.flatData.technologies
    }))
    .sort((a: any, b: any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
})
