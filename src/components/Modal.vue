<script setup lang="ts">
import { External } from 'vue3-pixi'
import popupBar from '@/assets/popup/bg-bar.png'
import popupLandscape from '@/assets/popup/bg-landscape.png'
import popupPortrait from '@/assets/popup/bg-portrait.png'
import popupSquare from '@/assets/popup/bg-square.png'
import { computed, reactive, ref } from 'vue'
import { SCALE_MODES } from '@/utils/types'

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
    type: 'mid',
  }
)

const image = computed(() => {
  switch (props.type) {
    case 'long':
      return 'popupBar'
    case 'mid':
      return 'popupLandscape'
    case 'short':
      return 'popupSquare'
    default:
      return 'popupLandscape'
  }
})

const abcd = reactive({
  state: { x: 0, y: 0, scale: 4.5 },
})
</script>

<template>
  <Sprite :texture="image" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :x="abcd.state.x" :y="abcd.state.y" :scale="abcd.state.scale" :anchor="0.5" :z-index="-10" />
  <External class="absolute left-0 top-0 h-dvh w-dvw">
    <div class="fixed size-full" :class="{ 'bg-white/55': overlay }">
      <div
        class="absolute left-1/2 top-1/2 max-h-[80vh] -translate-x-1/2 -translate-y-1/2"
        :class="{ 'aspect-[263/73] w-4/5': type === 'long', 'aspect-[65/106] w-3/4 sm:aspect-[106/65] md:w-3/5': type === 'mid', 'aspect-[143/130] h-full': type === 'short' }">
        <img v-if="type === 'long'" :src="popupBar" alt="popupBar" class="invisible absolute left-0 top-0 size-full" />
        <picture v-else-if="type === 'mid'" class="invisible absolute left-0 top-0 size-full">
          <source media="(min-width:648px)" :srcset="popupLandscape" alt="popupLandscape" class="size-full" />
          <img :src="popupPortrait" alt="popupPortrait" class="size-full" />
        </picture>
        <img v-else :src="popupSquare" alt="popupSquare" class="invisible absolute left-0 top-0 size-full" />
        <div class="relative z-10 mx-auto flex size-full max-w-[820px] flex-col items-center justify-center gap-10 overflow-hidden px-6 py-0" :class="containerClass">
          <h1 v-if="title" class="text-3xl font-semibold uppercase lg:text-[2.5rem] lg:leading-[3rem]" v-html="title" />
          <p v-if="description" class="text-2xl text-[26px] lg:text-[2.5rem] lg:leading-[3rem]" v-html="description" />
          <slot />
        </div>
      </div>
    </div>
  </External>
</template>
