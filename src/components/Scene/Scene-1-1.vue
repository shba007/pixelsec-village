<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useTimeoutFn, useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/Settings.vue'

const gameStore = useGameStore()
const { isLandscape } = storeToRefs(gameStore)

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const modal = computed(() => ({
  image: isLandscape.value ? 'popupScene01Landscape' : 'popupScene01Portrait',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: (isLandscape.value ? 0.9 : 1.8) * zoomFactor.value },
}))

async function handleStart() {
  gameStore.gameStart()
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
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" cursor="pointer" @click="handleStart" @touchstart="handleStart" />
  </Container>
</template>
