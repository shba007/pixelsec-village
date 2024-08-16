<script setup lang="ts">
import popupLandscape from '@/assets/popup/bg-landscape.png'
import popupPortrait from '@/assets/popup/bg-portrait.png'

const props = defineProps<{
  title: string
  containerClass?: string
}>()
</script>

<template>
  <div class="fixed size-full">
    <div class="absolute left-1/2 top-1/2 aspect-[65/106] max-h-[80vh] w-3/4 -translate-x-1/2 -translate-y-1/2 sm:aspect-[106/65] md:w-3/5">
      <picture class="absolute left-0 top-0 size-full">
        <source media="(min-width:648px)" :srcset="popupLandscape" alt="popupLandscape" class="size-full" />
        <img :src="popupPortrait" alt="popupPortrait" class="size-full" />
      </picture>
      <div class="relative z-10 mx-auto flex size-full max-w-[820px] flex-col items-center justify-center gap-10 overflow-hidden px-6 py-0" :class="containerClass">
        <h1 v-if="title" class="text-center text-3xl font-semibold uppercase lg:text-[2.5rem] lg:leading-[3rem]" v-html="title" />
        <slot />
      </div>
    </div>
  </div>
</template>
