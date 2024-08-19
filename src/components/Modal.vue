<script setup lang="ts">
import popupBar from '@/assets/popup/bg-bar.png'
import popupLandscape from '@/assets/popup/bg-landscape.png'
import popupPortrait from '@/assets/popup/bg-portrait.png'
import popupSquare from '@/assets/popup/bg-square.png'

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    containerClass?: string
    overlay?: boolean
    type?: 'long' | 'mid' | 'short'
  }>(),
  {
    containerClass: 'text-center',
    overlay: false,
    type: 'mid'
  }
)
</script>

<template>
  <div class="fixed size-full" :class="{ 'bg-white/55': overlay }">
    <div class="absolute left-1/2 top-1/2  max-h-[80vh] -translate-x-1/2 -translate-y-1/2"
      :class="{ 'aspect-[263/73] w-4/5': type === 'long', 'aspect-[65/106] sm:aspect-[106/65] w-3/4 md:w-3/5': type === 'mid', 'aspect-[143/130] h-full': type === 'short' }">
      <img v-if="type === 'long'" :src="popupBar" alt="popupBar" class="absolute left-0 top-0 size-full" />
      <picture v-else-if="type === 'mid'" class="absolute left-0 top-0 size-full">
        <source media="(min-width:648px)" :srcset="popupLandscape" alt="popupLandscape" class="size-full" />
        <img :src="popupPortrait" alt="popupPortrait" class="size-full" />
      </picture>
      <img v-else :src="popupSquare" alt="popupSquare" class="absolute left-0 top-0 size-full" />
      <div
        class="relative z-10 mx-auto flex size-full max-w-[820px] flex-col items-center justify-center gap-10 overflow-hidden px-6 py-0"
        :class="containerClass">
        <h1 v-if="title" class="text-3xl font-semibold uppercase lg:text-[2.5rem] lg:leading-[3rem]" v-html="title" />
        <p v-if="description" class="text-2xl text-[26px] lg:text-[2.5rem] lg:leading-[3rem]" v-html="description" />
        <slot />
      </div>
    </div>
  </div>
</template>
