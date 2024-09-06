<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useWindowSize, watchDebounced } from '@vueuse/core'

import { useDataStore, type dataExchangeChoice } from '@/stores/data'
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
  image: 'popupScene33',
  state: { x: (screenWidth.value * 3) / 4, y: (screenHeight.value * 1) / 2, scale: 0.9 * zoomFactor.value },
}))

const options = ref<
  {
    type: dataExchangeChoice
    state: {
      x: number
      y: number
      scale: number
    }
  }[]
>([
  { type: 'shopping-info', state: { x: -255, y: -245, scale: 5.5 / 4 } },
  { type: 'bank-card-details', state: { x: -255, y: -151.25, scale: 5.5 / 4 } },
  { type: 'social-media-profile', state: { x: -255, y: -57.5, scale: 5.5 / 4 } },
  { type: 'personal-preferences', state: { x: -255, y: 36.25, scale: 5.5 / 4 } },
  { type: 'personal-details', state: { x: -255, y: 130, scale: 5.5 / 4 } },
])

const selectedOptions = ref<Set<dataExchangeChoice>>(new Set())

function onClick(option: dataExchangeChoice) {
  gameStore.playSFXSound('buttonPress')
  if (selectedOptions.value.has(option)) selectedOptions.value.delete(option)
  else selectedOptions.value.add(option)
}

watchDebounced(() => [...selectedOptions.value.values()], onComplete, { debounce: 2000 })

function onComplete() {
  // DATA-COLLECT
  dataStore.setDataExchange([...selectedOptions.value.values()])
  gameStore.nextTimeline({ id: 25 })
}

const frames = ['buttonSquare', 'buttonSquarePressed']

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Sprite v-for="{ type, state } of options" :key="type" :texture="frames[Number(selectedOptions.has(type))]"
      :texture-options="textureOptions" :x="state.x" :y="state.y" :scale="state.scale" cursor="pointer"
      @pointerdown="onClick(type)" />
  </Container>
</template>
