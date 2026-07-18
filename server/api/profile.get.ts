export default defineEventHandler(async () => {
  const data = await squidexGraphQL(`
    query Fetch {
      queryProfileContents(top: 1) {
        flatData {
          name
          fullname
          role
          location
          email
          headline
          intro
          bio {
            html
          }
          avatar {
            id
            url
          }
        }
      }

      queryFunfactsContents {
        flatData {
          text
          order
        }
      }

      queryContactsContents {
        flatData {
          label
          url
          icon
          order
        }
      }
    }
  `)

  const profile = data.queryProfileContents?.[0]?.flatData

  const funFacts = (data.queryFunfactsContents ?? [])
    .map((f: any) => ({ text: f.flatData.text, order: f.flatData.order ?? 0 }))
    .sort((a: any, b: any) => a.order - b.order)
    .map((f: any) => f.text)

  const socials = (data.queryContactsContents ?? [])
    .map((c: any) => ({
      label: c.flatData.label,
      url: c.flatData.url,
      icon: c.flatData.icon,
      order: c.flatData.order ?? 0
    }))
    .sort((a: any, b: any) => a.order - b.order)
    .map(({ label, url, icon }: any) => ({ label, url, icon }))

  return {
    name: profile?.name,
    fullname: profile?.fullname,
    role: profile?.role,
    location: profile?.location,
    email: profile?.email,
    headline: profile?.headline,
    intro: profile?.intro,
    bio: profile?.bio?.html,
    avatar: profile?.avatar?.[0]?.url,
    funFacts,
    socials
  }
})
