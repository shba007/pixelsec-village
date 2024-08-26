<script setup lang="ts">
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { SCALE_MODES } from '@/utils/types'

const props = withDefaults(
  defineProps<{
    title: string
    x?: 'left' | 'center' | 'right'
    y?: 'top' | 'center' | 'bottom'
  }>(),
  {
    x: 'center',
    y: 'center',
  }
)

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const modal = computed(() => {
  let image = ['popupProtip11', 'popupProtip12']
  let scale = 0.8
  switch (props.title) {
    case '1':
      image = ['popupProtip11', 'popupProtip12']
      break
    case '2':
      image = ['popupProtip21', 'popupProtip22']
      break
    case '3':
      image = ['popupProtip31', 'popupProtip32']
      break
    case '4':
      image = ['popupProtip41', 'popupProtip42']
      break
    case '5':
      image = ['popupProtip51', 'popupProtip52']
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
  <AnimatedSprite :playing="true" :animation-speed="0.1" :textures="modal.image" :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale" :anchor="0.5" />
</template>
