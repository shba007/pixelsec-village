<script setup lang="ts">
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  return screenHeight.value / 720
})

const modal = computed(() => ({
  image: 'popupScene61',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 1 * zoomFactor.value },
}))
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
  </Container>
</template>
