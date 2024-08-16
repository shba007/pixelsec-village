<script setup lang="ts">
defineProps<{
  image: string
  highlighted: boolean
}>()
</script>

<template>
  <button class="relative block aspect-[256/284] max-w-[128px] scale-[85%]">
    <img :src="`/images/smartphone/${image}${highlighted ? '-highlighted' : ''}.png`" :alt="image" class="aspect-[256/284] object-contain" />
  </button>
</template>
