<script setup lang="ts">
const props = defineProps<{ title: string; summary?: string; slug: string }>()
const { t } = useLocale()
const requestUrl = useRequestURL()
const copied = ref(false)
const shareUrl = computed(() => new URL(`/projetos/${props.slug}`, requestUrl.origin).toString())

const share = async () => {
  if (import.meta.client && navigator.share) {
    try { await navigator.share({ title: props.title, text: props.summary, url: shareUrl.value }) } catch (error: any) {
      if (error?.name !== 'AbortError') await copy()
    }
  } else await copy()
}

const copy = async () => {
  if (!import.meta.client) return
  await navigator.clipboard.writeText(shareUrl.value)
  copied.value = true
  window.setTimeout(() => { copied.value = false }, 2200)
}
</script>

<template>
  <div class="share-actions d-flex flex-wrap gap-2">
    <button type="button" class="btn btn-brand fw-bold" @click="share">
      <span aria-hidden="true">↗</span> {{ t('share') }}
    </button>
    <button type="button" class="btn btn-soft" @click="copy">
      {{ copied ? t('copied') : t('copyLink') }}
    </button>
  </div>
</template>
