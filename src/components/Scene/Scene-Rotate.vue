<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useTimeout, useWindowSize } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/Settings.vue'
import { onTick } from 'vue3-pixi'

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const modal = computed(() => ({
  image: 'popupSceneRotate',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 1.8 * zoomFactor.value },
}))

async function handleRotate() {
  await gameStore.toggleGameMode(true)
}

const ready = useTimeout(250)

const rotate = reactive({ x: 0, y: 305, scale: 0.3 })

let count = 0

onTick((delta) => {
  count += delta * 0.04
  rotate.scale = (75 + Math.sin(count) * 15) / 300
})
</script>

<template>
  <Container v-if="ready" :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite texture="popupSceneRotateOverlay" :anchor="0.5" :scale="10" />
    <Sprite
      :texture="modal.image"
      :texture-options="textureOptions"
      :anchor="0.5"
      :scale="0.5"
      cursor="pointer"
      @click="handleRotate"
      @mousedown="handleRotate"
      @pointerdown="handleRotate"
      @touchstart="handleRotate" />
    <Sprite texture="popupIconRotate" :x="rotate.x" :y="rotate.y" :scale="rotate.scale" :anchor="0.5" />
  </Container>
</template>
