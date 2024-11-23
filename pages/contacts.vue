<script setup lang="ts">
const { t } = useI18n();
const { app } = useRuntimeConfig();

useSeoMeta({
  title: t("pages.contacts"),
  titleTemplate: (titleChunk: any) => {
    return titleChunk ? `${titleChunk} » ${app.appName}` : app.appName;
  },
});

defineI18nRoute({
  paths: {
    "pt-AO": "/contactos",
    en: "/contacts",
  },
});
</script>

<template>
  <div>Page: contacts</div>
</template>

<style scoped></style>
