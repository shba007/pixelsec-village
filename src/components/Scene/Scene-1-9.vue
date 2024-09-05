<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { useDataStore, type annoyingPointChoice } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'

const emit = defineEmits<{
  (event: 'update'): void
}>()

const dataStore = useDataStore()
const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

const modal = computed(() => ({
  image: 'popupScene62',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 1 * zoomFactor.value },
}))

const options = ref<
  {
    type: annoyingPointChoice
    state: {
      x: number
      y: number
      scale: number
    }
  }[]
>([
  { type: 'begin-followed', state: { x: -340, y: -210, scale: 1 } },
  { type: 'having-to-keep-giving-away-info', state: { x: -340, y: -120, scale: 1 } },
  { type: 'cant-save-autofill-details-in-incognito-mode', state: { x: -340, y: -30, scale: 1 } },
  { type: 'cant-store-all-my-digital-identities-in-one-place', state: { x: -340, y: 70, scale: 1 } },
])

const selectedOption = ref<annoyingPointChoice>()
const showPopup = ref(true)

function onClick(option: annoyingPointChoice) {
  if (selectedOption.value !== undefined) return

  // DATA-COLLECT
  selectedOption.value = option
  dataStore.setAnnoyingPoint(option)
  gameStore.playSFXSound('buttonPress')

  setTimeout(() => {
    emit('update')
    showPopup.value = false
  }, 300)
}

const frames = ['buttonSquare', 'buttonSquarePressed']
</script>

<template>
  <Container v-if="showPopup" :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
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
