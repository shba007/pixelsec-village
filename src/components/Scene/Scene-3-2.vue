<script setup lang="ts">
import { computed, ref } from 'vue'
import { useWindowSize, watchDebounced } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/Settings.vue'

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

const options = ref([
  { type: 'shopping-info', state: { x: -255, y: -245, scale: 5.5 } },
  { type: 'bank-card-details', state: { x: -255, y: -151.25, scale: 5.5 } },
  { type: 'social-media-profile', state: { x: -255, y: -57.5, scale: 5.5 } },
  { type: 'personal-preferences', state: { x: -255, y: 36.25, scale: 5.5 } },
  { type: 'personal-details', state: { x: -255, y: 130, scale: 5.5 } },
])

const selectedOptions = ref<Set<string>>(new Set())

function onClick(option: string) {
  gameStore.playSound('buttonPress')
  if (selectedOptions.value.has(option)) selectedOptions.value.delete(option)
  else selectedOptions.value.add(option)
}

watchDebounced(() => [...selectedOptions.value.values()], onComplete, { debounce: 2000 })

function onComplete() {
  // DATA-COLLECT
  gameStore.nextTimeline({ id: 24 })
}

const frames = ['buttonSquare', 'buttonSquarePressed']
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" />
    <Sprite
      v-for="{ type, state } of options"
      :key="type"
      :texture="frames[Number(selectedOptions.has(type))]"
      :texture-options="textureOptions"
      :x="state.x"
      :y="state.y"
      :scale="state.scale"
      cursor="pointer"
      @click="onClick(type)"
      @touchstart="onClick(type)" />
  </Container>
</template>
