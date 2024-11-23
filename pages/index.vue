<script lang="ts" setup>
import type { ISocialNetwork } from "~/types";

const { find } = useStrapi();

const { data } = await find<ISocialNetwork>("social-networks");
</script>

<template>
  <div>
    Index
  </div>
</template>
