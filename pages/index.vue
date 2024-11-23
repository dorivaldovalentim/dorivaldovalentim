<script lang="ts" setup>
const { t } = useI18n();
const { app } = useRuntimeConfig();

useSeoMeta({
  title: t("pages.home"),
  titleTemplate: (titleChunk: any) => {
    return titleChunk ? `${titleChunk} » ${app.appName}` : app.appName;
  },
});

defineI18nRoute({
  paths: {
    "pt-AO": "/",
    en: "/",
  },
});
</script>

<template>
  <div>Index</div>
</template>
