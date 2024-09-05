<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { useDataStore } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'

const dataStore = useDataStore()
const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

const modal = computed(() => ({
  image: 'popupScene34',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 0.9 * zoomFactor.value },
}))

const options = ref([
  { type: true, state: { x: 65, y: -30, scale: 5.5 / 4 } },
  { type: false, state: { x: 65, y: 80, scale: 5.5 / 4 } },
])

const selectedOption = ref<boolean | null>(null)

function onClick(option: boolean) {
  // DATA-COLLECT
  selectedOption.value = option
  dataStore.setCollectData(option)
  gameStore.playSFXSound('buttonPress')

  setTimeout(() => {
    gameStore.nextTimeline({ id: 26 })
  }, 300)
}

const frames = ['buttonSquare', 'buttonSquarePressed']
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Sprite
      v-for="{ type, state } of options"
      :key="String(type)"
      :texture="frames[Number(selectedOption === type)]"
      :texture-options="textureOptions"
      :x="state.x"
      :y="state.y"
      :scale="state.scale"
      cursor="pointer"
      @pointerdown="onClick(type)" />
  </Container>
</template>
