export default defineNuxtPlugin(() => {
  const router = useRouter()

  router.afterEach((to) => {
    if (!to.hash) return

    const id = to.hash.slice(1)

    nextTick(() => {
      let attempts = 0

      const tryScroll = () => {
        const el = document.getElementById(id)

        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (attempts < 30) {
          attempts++
          requestAnimationFrame(tryScroll)
        }
      }

      tryScroll()
    })
  })
})
