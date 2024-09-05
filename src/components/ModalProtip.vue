<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/Settings.vue'
import AppAnimatedSprite from './AppAnimatedSprite.vue'

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

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const modal = computed(() => {
  let images = ['popupProtip11', 'popupProtip12']
  let scale = 0.8 / 2
  switch (props.title) {
    case '1':
      images = ['popupProtip11', 'popupProtip12']
      break
    case '2':
      images = ['popupProtip21', 'popupProtip22']
      break
    case '3':
      images = ['popupProtip31', 'popupProtip32']
      break
    case '4':
      images = ['popupProtip41', 'popupProtip42']
      break
    case '5':
      images = ['popupProtip51', 'popupProtip52']
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
    images,
    state: { x: screenWidth.value * xFactor, y: screenHeight.value * yFactor, scale: scale * zoomFactor.value },
    xFactor: xFactor * 100 + '%',
    yFactor: yFactor * 100 + '%',
  }
})

onMounted(() => {
  gameStore.playSFXSound('protip')
})
</script>

<template>
  <AppAnimatedSprite
    :textures="modal.images"
    :texture-options="textureOptions"
    :x="modal.state.x"
    :y="modal.state.y"
    :scale="modal.state.scale"
    :playing="true"
    :animation-speed="0.08"
    :anchor="0.5" />
</template>
