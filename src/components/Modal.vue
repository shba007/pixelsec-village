<script setup lang="ts">
import popupLandscape from '@/assets/popup/bg-landscape.png'
import popupPortrait from '@/assets/popup/bg-portrait.png'

const props = defineProps<{
  title: string
  description?: string
}>()
const emit = defineEmits<{
  (event: 'start'): void
}>()
</script>

<template>
  <div
    class="absolute left-1/2 top-1/2 aspect-[65/106] max-w-3xl w-4/5 -translate-x-1/2 -translate-y-1/2 p-1 md:aspect-[106/65]">
    <picture class="absolute left-0 top-0 size-full">
      <source media="(min-width:640px)" :srcset="popupLandscape" alt="popupPortrait" class="size-full" />
      <img :src="popupPortrait" alt="popupLandscape" class="size-full" />
    </picture>
    <div
      class="relative flex size-full flex-col justify-center items-center gap-10 px-7 py-8 max-w-[820px] mx-auto z-10 overflow-hidden">
      <h1 class="text-center text-4xl font-bold uppercase">{{ title }}</h1>
      <p v-if="description" class="text-center text-2xl">{{ description }}</p>
      <slot />
    </div>
  </div>
</template>
