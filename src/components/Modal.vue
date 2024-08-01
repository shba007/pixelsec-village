<script setup lang="ts">
import popupLandscape from '@/assets/popup/bg-landscape.png'
import popupPortrait from '@/assets/popup/bg-portrait.png'

defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="absolute left-1/2 top-1/2 aspect-[65/106] max-h-[80vh] max-w-2xl w-3/4 -translate-x-1/2 -translate-y-1/2 p-1 sm:aspect-[106/65]">
    <picture class="absolute left-0 top-0 size-full">
      <source media="(min-width:648px)" :srcset="popupLandscape" alt="popupLandscape" class="size-full" />
      <img :src="popupPortrait" alt="popupPortrait" class="size-full" />
    </picture>
    <div class="relative flex size-full flex-col justify-center items-center gap-10 px-7 py-8 max-w-[820px] mx-auto z-10 overflow-hidden">
      <h1 class="text-center text-4xl font-bold uppercase">{{ title }}</h1>
      <p v-if="description" class="text-center text-2xl" v-html="description" />
      <slot />
    </div>
  </div>
</template>
