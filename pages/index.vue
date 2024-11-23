<script lang="ts" setup>
import type { ISocialNetwork } from "~/types/ISocialNetwork";

const { find } = useStrapi();
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

const { data } = await find<ISocialNetwork>("social-networks");
</script>

<template>
  <div>Index</div>
</template>
