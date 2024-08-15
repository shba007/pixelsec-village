<script setup lang="ts">
defineProps<{
  image: string
  highlighted: boolean
}>()
</script>

<template>
  <button class="aspect-square w-full">
    <img :src="`/images/smartphone/${image}${highlighted ? '-highlighted' : ''}.png`" :alt="image" class="size-full" />
  </button>
</template>
