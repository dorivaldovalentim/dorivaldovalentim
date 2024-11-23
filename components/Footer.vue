<script setup lang="ts">
import type { ISocialNetwork } from "~/types/ISocialNetwork";

const { locale } = useI18n();
const { find } = useStrapi();


const { data } = await find<ISocialNetwork>("social-networks", {
  locale: locale.value,
});
</script>

<template>
  <div>Component: Footer</div>
</template>

<style scoped></style>
