<script setup lang="ts">
import { computed } from 'vue'

import { useTimeout, useWindowSize } from '@vueuse/core'
import { useGameStore } from '@/stores/game'

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

const gameStore = useGameStore()

const ready = useTimeout(250)

function handleClick() {
  gameStore.resume()
}
</script>

<template>
  <Container v-if="ready && !gameStore.isVisible" :x="screenWidth * 0.5" :y="screenHeight * 0.5" :scale="zoomFactor" cursor="pointer" @pointerdown="handleClick">
    <Sprite texture="popupSceneRotateOverlay" :anchor="0.5" :scale="10" />
    <Sprite texture="popupResumeButton" :anchor="0.5" :scale="1" />
  </Container>
</template>
