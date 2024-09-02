<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/Settings.vue'

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
  let image = ['popupProtip1', 'popupProtip1']
  let scale = 0.8
  switch (props.title) {
    case '1':
      image = ['popupProtip1', 'popupProtip1']
      break
    case '2':
      image = ['popupProtip2', 'popupProtip2']
      break
    case '3':
      image = ['popupProtip3', 'popupProtip3']
      break
    case '4':
      image = ['popupProtip4', 'popupProtip4']
      break
    case '5':
      image = ['popupProtip5', 'popupProtip5']
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

onMounted(() => {
  gameStore.playSound('protip')
})
</script>

<template>
  <Sprite :texture="modal.image[0]" :texture-options="textureOptions" :x="modal.state.x" :y="modal.state.y"
    :scale="modal.state.scale" :anchor="0.5" />
</template>
