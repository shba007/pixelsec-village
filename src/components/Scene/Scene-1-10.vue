<script setup lang="ts">
import { computed, ref } from 'vue'
import { External } from 'vue3-pixi'
import { useWindowSize } from '@vueuse/core'

import { useDataStore } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/Settings.vue'

const dataStore = useDataStore()
const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const modal = computed(() => ({
  image: 'popupScene63',
  state: { x: (screenWidth.value * 3) / 4, y: (screenHeight.value * 1) / 2, scale: 0.9 * zoomFactor.value },
}))

const options = [
  { type: true, frames: ['popupScene63Button11', 'popupScene63Button12'], state: { x: -195, y: 80, scale: 0.4 } },
  { type: false, frames: ['popupScene63Button21', 'popupScene63Button22'], state: { x: 15, y: 80, scale: 0.4 } },
]

const selectedOption = ref<boolean>()

function onClick(value: boolean) {
  // DATA-COLLECT
  selectedOption.value = value
  dataStore.setDataVault(value)
  gameStore.playSFXSound('buttonPress')

  setTimeout(() => {
    gameStore.nextTimeline({ id: 54 })
  }, 300)
}
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Sprite
      v-for="{ type, frames, state } of options"
      :texture="frames[Number(selectedOption === type)]"
      :texture-options="textureOptions"
      :x="state.x"
      :y="state.y"
      :scale="state.scale"
      cursor="pointer"
      @pointerdown="onClick(type)" />
  </Container>
</template>
