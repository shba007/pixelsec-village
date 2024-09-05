<script setup lang="ts">
import { useTimeoutFn, useWindowSize } from '@vueuse/core'
import { useGameStore } from '@/stores/game'

import { textureOptions } from '@/components/Settings.vue'
import { computed, ref } from 'vue'

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

const image = ref('popupScene31')
const modal = computed(() => ({
  image: image.value,
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 4, scale: 0.9 * zoomFactor.value },
}))

function handleMove() {
  gameStore.nextTimeline({ id: 31 })
}

const { start } = useTimeoutFn(handleMove, 4000, { immediate: false })

useTimeoutFn(() => {
  image.value = 'popupScene32'
  start()
}, 8000)
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
  </Container>
</template>
