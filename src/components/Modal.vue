<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { External } from 'vue3-pixi'
import { storeToRefs } from 'pinia'
import { useWindowSize } from '@vueuse/core'

import { SCALE_MODES } from '@/utils/types'
import { useGameStore } from '@/stores/game'
import popupBar from '@/assets/popup/bg-bar.png'
import popupLandscape from '@/assets/popup/bg-landscape.png'
import popupPortrait from '@/assets/popup/bg-portrait.png'
import popupSquare from '@/assets/popup/bg-square.png'

const gameStore = useGameStore()
const { isLandscape } = storeToRefs(gameStore)

const props = withDefaults(
  defineProps<{
    title: string
    description?: string
    modalClass?: string
    containerClass?: string
    overlay?: boolean
    type?: 'long' | 'mid' | 'short'
    x?: 'left' | 'center' | 'right'
    y?: 'top' | 'center' | 'bottom'
  }>(),
  {
    modalClass: '',
    containerClass: 'text-center',
    overlay: false,
    type: 'mid',
    x: 'center',
    y: 'center',
  }
)

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const modal = computed(() => {
  let image = ''
  let scale = 1
  switch (props.type) {
    case 'long':
      image = 'popupBar'
      scale = 4
      break
    case 'mid':
      if (isLandscape.value) {
        image = 'popupLandscape'
        scale = 3.5
      } else {
        image = 'popupPortrait'
        scale = 7.5
      }
      break
    case 'short':
      image = 'popupSquare'
      scale = 3.5
      break
  }

  let xFactor = 2 / 4,
    yFactor = 2 / 4
  switch (props.x) {
    case 'left':
      xFactor = 1 / 4
      break
    case 'center':
      xFactor = 2 / 4
      break
    case 'right':
      xFactor = 3 / 4
      break
  }
  switch (props.y) {
    case 'top':
      yFactor = 1 / 4
      break
    case 'center':
      yFactor = 2 / 4
      break
    case 'bottom':
      yFactor = 3 / 4
      break
  }

  return {
    image,
    state: { x: screenWidth.value * xFactor, y: screenHeight.value * yFactor, scale: scale * zoomFactor.value },
    xFactor: xFactor * 100 + '%',
    yFactor: yFactor * 100 + '%',
  }
})
</script>

<template>
  <Sprite :texture="modal.image" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :x="modal.state.x"
    :y="modal.state.y" :scale="modal.state.scale" :anchor="0.5" />
  <External class="absolute left-0 top-0 h-dvh w-dvw">
    <div class="fixed size-full" :class="{ 'bg-white/55': overlay }">
      <div class="absolute max-h-[80vh] -translate-x-1/2 -translate-y-1/2"
        :class="[{ 'aspect-[263/73] w-4/5': type === 'long', 'aspect-[65/106] w-3/4 sm:aspect-[106/65] md:w-3/5': type === 'mid', 'aspect-[143/130] h-full': type === 'short' }]"
        :style="{ left: modal.xFactor, top: modal.yFactor }">
        <img v-if="type === 'long'" :src="popupBar" alt="popupBar" class="invisible absolute left-0 top-0 size-full" />
        <picture v-else-if="type === 'mid'" class="invisible absolute left-0 top-0 size-full">
          <source media="(min-width:648px)" :srcset="popupLandscape" alt="popupLandscape" class="size-full" />
          <img :src="popupPortrait" alt="popupPortrait" class="size-full" />
        </picture>
        <img v-else :src="popupSquare" alt="popupSquare" class="invisible absolute left-0 top-0 size-full" />
        <div
          class="relative z-10 mx-auto flex size-full max-w-[820px] flex-col items-center justify-center gap-10 overflow-hidden px-12 py-0"
          :class="containerClass">
          <h1 v-if="title"
            class="text-[1.75rem] font-semibold uppercase leading-[2rem] lg:text-[2.5rem] lg:leading-[3rem]"
            v-html="title" />
          <p v-if="description" class="text-[1.75rem] leading-[2rem] lg:text-[2.5rem] lg:leading-[3rem]"
            v-html="description" />
          <slot />
        </div>
      </div>
    </div>
  </External>
</template>
