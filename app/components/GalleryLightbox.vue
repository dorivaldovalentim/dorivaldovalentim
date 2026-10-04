<script setup lang="ts">
const props = defineProps<{ images: string[]; title: string }>()
const { t } = useLocale()
const activeIndex = ref<number | null>(null)
const isOpen = computed(() => activeIndex.value !== null)
const activeImage = computed(() => activeIndex.value === null ? '' : props.images[activeIndex.value])

const open = (index: number) => { activeIndex.value = index }
const close = () => { activeIndex.value = null }
const previous = () => {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length
}
const next = () => {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value + 1) % props.images.length
}
const handleKey = (event: KeyboardEvent) => {
  if (!isOpen.value) return
  if (event.key === 'Escape') close()
  if (event.key === 'ArrowLeft') previous()
  if (event.key === 'ArrowRight') next()
}

watch(isOpen, (value) => {
  if (import.meta.client) document.body.style.overflow = value ? 'hidden' : ''
})
onMounted(() => window.addEventListener('keydown', handleKey))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="gallery-grid">
    <button v-for="(image, index) in images" :key="image" type="button" class="gallery-item" :aria-label="`${t('openImage')} ${index + 1}`" @click="open(index)">
      <img :src="image" :alt="`${title} ${index + 1}`" loading="lazy" />
      <span aria-hidden="true">⌕</span>
    </button>
  </div>

  <Teleport to="body">
    <div v-if="isOpen" class="lightbox" role="dialog" aria-modal="true" :aria-label="title" @click.self="close">
      <button type="button" class="lightbox-close" :aria-label="t('close')" @click="close">×</button>
      <button v-if="images.length > 1" type="button" class="lightbox-nav previous" :aria-label="t('previousImage')" @click="previous">←</button>
      <figure>
        <img :src="activeImage" :alt="`${title} ${(activeIndex ?? 0) + 1}`" />
        <figcaption>{{ (activeIndex ?? 0) + 1 }} / {{ images.length }}</figcaption>
      </figure>
      <button v-if="images.length > 1" type="button" class="lightbox-nav next" :aria-label="t('nextImage')" @click="next">→</button>
    </div>
  </Teleport>
</template>

<style scoped>
.gallery-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
.gallery-item { position: relative; overflow: hidden; border: 0; border-radius: 1rem; background: var(--portfolio-card); padding: 0; cursor: zoom-in; }
.gallery-item img { display: block; width: 100%; aspect-ratio: 16/10; object-fit: cover; transition: transform .25s ease, filter .25s ease; }
.gallery-item span { position: absolute; right: 1rem; bottom: 1rem; display: grid; width: 2.5rem; aspect-ratio: 1; place-items: center; border-radius: 50%; background: rgba(8,17,15,.82); color: #fff; font-size: 1.2rem; opacity: 0; transition: opacity .2s ease; }
.gallery-item:hover img { transform: scale(1.025); filter: brightness(.8); }
.gallery-item:hover span { opacity: 1; }
.lightbox { position: fixed; inset: 0; z-index: 2000; display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 1rem; background: rgba(3,8,7,.96); padding: clamp(1rem, 4vw, 4rem); }
.lightbox figure { display: grid; justify-items: center; margin: 0; }
.lightbox figure img { max-width: 100%; max-height: 82vh; border-radius: .8rem; object-fit: contain; }
.lightbox figcaption { margin-top: .8rem; color: var(--portfolio-muted); }
.lightbox-close, .lightbox-nav { border: 1px solid var(--portfolio-line); border-radius: 50%; background: rgba(17,34,30,.9); color: #fff; }
.lightbox-close { position: absolute; top: 1rem; right: 1rem; width: 3rem; height: 3rem; font-size: 1.8rem; }
.lightbox-nav { width: 3.25rem; height: 3.25rem; font-size: 1.4rem; }
@media (max-width: 575.98px) { .gallery-grid { grid-template-columns: 1fr; } .lightbox { grid-template-columns: 1fr; } .lightbox-nav { position: absolute; bottom: 1.5rem; } .lightbox-nav.previous { left: 1rem; } .lightbox-nav.next { right: 1rem; } }
</style>
