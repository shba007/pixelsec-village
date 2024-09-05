<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWindowSize, watchDebounced } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useDataStore, type dataResponsibilityChoice } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/Settings.vue'
import { onUnmounted } from 'vue'

const dataStore = useDataStore()
const gameStore = useGameStore()
const { currentPopupIndex } = storeToRefs(gameStore)

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  return screenHeight.value / 720
})

const modal = computed(() => ({
  image: currentPopupIndex.value == 14 ? 'popupScene53' : 'popupScene54',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 0.9 * zoomFactor.value },
}))

const options = ref<
  {
    type: dataResponsibilityChoice
    state: {
      x: number
      y: number
      scale: number
    }
  }[]
>([
  { type: 'me-myself-i', state: { x: -375, y: -40, scale: 5.5 / 4 } },
  { type: 'government', state: { x: 0, y: -40, scale: 5.5 / 4 } },
  { type: 'companies', state: { x: -375, y: 110, scale: 5.5 / 4 } },
  { type: 'not-sure', state: { x: 0, y: 110, scale: 5.5 / 4 } },
])

const selectedOption = ref<dataResponsibilityChoice>()

function onClick(value: dataResponsibilityChoice) {
  // DATA-COLLECT
  selectedOption.value = value
  dataStore.setDataResponsibility(value)
  gameStore.playSFXSound('buttonPress', 2)

  setTimeout(() => {
    gameStore.nextTimeline({ screen: 2, id: 32 })
  }, 300)
}

const frames = ['buttonSquare', 'buttonSquarePressed']
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Sprite
      v-for="{ type, state } of options"
      :key="type"
      :texture="frames[Number(selectedOption === type)]"
      :texture-options="textureOptions"
      :x="state.x"
      :y="state.y"
      :scale="state.scale"
      cursor="pointer"
      @click="onClick(type)"
      @touchstart="onClick(type)" />
  </Container>
</template>
