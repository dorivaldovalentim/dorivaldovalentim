<script setup lang="ts">
import type { IMenuItem } from "~/types/IMenuItem";
const localePath = useLocalePath();

const data: IMenuItem[] = [
  { label: "Página Inicial", link: localePath("index") },
  { label: "Sobre", link: localePath("about") },
  { label: "Portfolio", link: localePath("portfolio") },
  { label: "Contactos", link: localePath("contacts") },
];
</script>

<template>
  <div>
    <ul>
      <li v-for="(item, index) in data" :key="index">
        <a :href="item.link">{{ item.label }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
