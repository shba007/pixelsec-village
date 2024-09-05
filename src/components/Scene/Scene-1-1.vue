<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useTimeoutFn, useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/Settings.vue'
import { onTick } from 'vue3-pixi'
import { reactive } from 'vue'

const gameStore = useGameStore()
const { isLandscape } = storeToRefs(gameStore)

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const modal = computed(() => ({
  image: isLandscape.value ? 'popupScene01Landscape' : 'popupScene01Portrait',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: (isLandscape.value ? 0.9 : 1.8) * zoomFactor.value },
}))

function handleStart() {
  setTimeout(async () => {
    await gameStore.toggleGameMode(true)
    gameStore.playBGMSound('normal')
    gameStore.nextTimeline({ id: 1 })
  }, 100)
}

onMounted(() => {
  if (isLandscape.value) useTimeoutFn(handleStart, 7000)
})

watch(isLandscape, (value) => {
  if (value) useTimeoutFn(handleStart, 7000)
})

const rotate = reactive({ x: 0, y: 305, scale: 0.3 })

let count = 0

onTick((delta) => {
  count += delta * 0.04
  rotate.scale = (75 + Math.sin(count) * 15) / 300
})
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite
      :texture="modal.image"
      :texture-options="textureOptions"
      :anchor="0.5"
      :scale="0.25"
      cursor="pointer"
      @click="handleStart"
      @mousedown="handleStart"
      @pointerdown="handleStart"
      @touchstart="handleStart" />
    <Sprite v-if="!isLandscape" texture="popupIconRotate" :x="rotate.x" :y="rotate.y" :scale="rotate.scale" :anchor="0.5" />
  </Container>
</template>
