<script setup lang="ts">
const { t } = useI18n();
const { app } = useRuntimeConfig();

useSeoMeta({
  title: t("pages.portfolio"),
  titleTemplate: (titleChunk: any) => {
    return titleChunk ? `${titleChunk} » ${app.appName}` : app.appName;
  },
});

defineI18nRoute({
  paths: {
    "pt-AO": "/portfolio",
    en: "/portfolio",
  },
});
</script>

<template>
  <div>Page: portfolio</div>
</template>

<style scoped></style>
