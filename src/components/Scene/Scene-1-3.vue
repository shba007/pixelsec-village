<script setup lang="ts">
import { computed } from 'vue'
import { useTimeoutFn, useWindowSize } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const modal = computed(() => ({
  image: 'popupScene02',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 0.9 * zoomFactor.value },
}))

useTimeoutFn(handleMove, 8000)

function handleMove() {
  gameStore.nextTimeline({ id: 3 })
}
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
  </Container>
</template>
