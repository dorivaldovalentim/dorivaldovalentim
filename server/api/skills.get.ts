export default defineEventHandler(async () => {
  const data = await squidexGraphQL(`
    query Fetch {
      querySkillsContents {
        id

        flatData {
          name
          category
          level
          icon
        }
      }
    }
  `)

  return data.querySkillsContents.map((skill: any) => ({
    id: skill.id,
    name: skill.flatData.name,
    category: skill.flatData.category,
    level: skill.flatData.level,
    icon: skill.flatData.icon
  }))
})
