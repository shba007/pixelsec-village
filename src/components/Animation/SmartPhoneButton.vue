<script setup lang="ts">
const props = defineProps<{
  image: string
  highlighted: boolean
}>()
</script>

<template>
  <button class="h-full aspect-square">
    <img :src="`/smartphone/${image}${highlighted ? '-highlighted' : ''}.png`" :alt="image" class="size-full" />
  </button>
</template>
