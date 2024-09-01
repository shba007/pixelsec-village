<script setup lang="ts">
import { computed, ref } from 'vue';
import { External } from 'vue3-pixi'
import { useWindowSize } from '@vueuse/core';

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/Settings.vue'

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const modal = computed(() => ({
  image: 'popupScene04',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 0.9 * zoomFactor.value },
}))

const options = [
  { type: false, frames: ['popupScene04Button11', 'popupScene04Button12'], state: { x: -340, y: 50, scale: 1 } },
  { type: true, frames: ['popupScene04Button21', 'popupScene04Button22'], state: { x: 40, y: 50, scale: 1 } }
]

const selectedOption = ref<boolean>()

function onClick(value: boolean) {
  selectedOption.value = value
  // DATA-COLLECT
  setTimeout(() => {
    gameStore.nextTimeline(value ? { screen: 1, id: 5 } : { screen: 2, id: 6 })
  }, 300)
}
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" />
    <Sprite v-for="{ type, frames, state } of options" :texture="frames[Number(selectedOption === type)]"
      :texture-options="textureOptions" :x="state.x" :y="state.y" :scale="state.scale" cursor="pointer"
      @click="onClick(type)" @touchstart="onClick(type)" />
  </Container>
</template>
