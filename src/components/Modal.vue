<script setup lang="ts">
import popupLandscape from '@/assets/popup/bg-landscape.png'
import popupPortrait from '@/assets/popup/bg-portrait.png'

const props = withDefaults(defineProps<{
  title: string
  description?: string
  containerClass?: string
  overlay?: boolean
}>(), {
  overlay: false
})
</script>

<template>
  <div class="fixed size-full" :class="{ 'bg-white/55': overlay }">
    <div
      class="max-h-[80vh] w-3/4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-[0.61] sm:aspect-[1.64] ">
      <picture class="absolute left-0 top-0 size-full">
        <source media="(min-width:648px)" :srcset="popupLandscape" alt="popupLandscape" class="size-full" />
        <img :src="popupPortrait" alt="popupPortrait" class="size-full" />
      </picture>
      <div
        class="relative flex size-full flex-col justify-center items-center gap-10 px-6 pb-0 pt-[2.25rem] max-w-[820px] mx-auto z-10 overflow-hidden"
        :class="containerClass">
        <h1 v-if="title" class="text-center text-3xl lg:text-[2.5rem] lg:leading-[3rem] font-semibold uppercase"
          v-html="title" />
        <p v-if="description" class="text-center text-3xl lg:text-[2.5rem] lg:leading-[3rem]" v-html="description" />
        <slot />
      </div>
    </div>
  </div>
</template>
