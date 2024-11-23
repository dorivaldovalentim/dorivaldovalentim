<script setup lang="ts">
import type { IMenuItem } from "~/types/IMenuItem";
const { t, locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const data: IMenuItem[] = [
  { label: "pages.home", link: "index" },
  { label: "pages.about", link: "about" },
  { label: "pages.portfolio", link: "portfolio" },
  { label: "pages.contacts", link: "contacts" },
];
</script>

<template>
  <div>
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <NuxtLinkLocale :to="item.link">{{ t(item.label) }}</NuxtLinkLocale>
      </li>
    </ul>

    <ul>
      <li v-for="(item, index) in locales" :key="index">
        <NuxtLink :to="switchLocalePath(item.code)">{{ item.name }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
