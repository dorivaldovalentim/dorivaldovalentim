<script setup lang="ts">
const { t } = useI18n();
const { app } = useRuntimeConfig();

useSeoMeta({
  title: t("pages.about"),
  titleTemplate: (titleChunk: any) => {
    return titleChunk ? `${titleChunk} » ${app.appName}` : app.appName;
  },
});

defineI18nRoute({
  paths: {
    "pt-AO": "/sobre",
    en: "/about",
  },
});
</script>

<template>
  <div>Page: about</div>
</template>

<style scoped></style>
