<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/Settings.vue'

const emit = defineEmits<{
  (event: 'update'): void
}>()

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

const options = ref([
  { type: 'begin-followed', state: { x: -340, y: -210, scale: 4 } },
  { type: 'having-to-keep-giving-away-info', state: { x: -340, y: -120, scale: 4 } },
  { type: 'cant-save-autofill-details-in-incognito-mode', state: { x: -340, y: -30, scale: 4 } },
  { type: 'cant-store-all-my-digital-identities-in-one-place', state: { x: -340, y: 70, scale: 4 } },
])

const selectedOption = ref<string>()

function onClick(option: string) {
  gameStore.playSound('buttonPress')
  // DATA-COLLECT
  selectedOption.value = option

  setTimeout(() => {
    emit('update')
  }, 300)
}

const frames = ['buttonSquare', 'buttonSquarePressed']
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" />
    <Sprite v-for="{ type, state } of options" :key="String(type)" :texture="frames[Number(selectedOption === type)]"
      :texture-options="textureOptions" :x="state.x" :y="state.y" :scale="state.scale" cursor="pointer"
      @click="onClick(type)" @touchstart="onClick(type)" />
  </Container>
</template>
