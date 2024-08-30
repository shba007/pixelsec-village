<script setup lang="ts">
import { computed, onMounted, reactive, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTimeoutFn, useWindowSize } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { SCALE_MODES } from '@/utils/types'
import rotateIndicator from '@/assets/rotate-indicator.png'

const gameStore = useGameStore()
const { isLandscape } = storeToRefs(gameStore)

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const modal = computed(() => ({
  image: isLandscape.value ? 'popupScene11Landscape' : 'popupScene11Portrait',
  state: { x: screenWidth.value * 1 / 2, y: screenHeight.value * 1 / 2, scale: (isLandscape.value ? 0.9 : 1.8) * zoomFactor.value },
}))

async function handleStart() {
  gameStore.nextTimeline({ id: 1 })
  await gameStore.toggleGameMode(true)
}

onMounted(() => {
  if (isLandscape.value) useTimeoutFn(handleStart, 3000)
})

watch(isLandscape, (value) => {
  if (value) useTimeoutFn(handleStart, 3000)
})
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :anchor="0.5" />
  </Container>
</template>
