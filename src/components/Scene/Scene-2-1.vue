<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { External } from 'vue3-pixi'
import { useWindowSize } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/Settings.vue'
import CharacterStationMaster from '@/components/Animation/Character/CharacterStationMaster.vue'

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const modal = computed(() => ({
  image: 'popupScene11',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 0.9 * zoomFactor.value },
}))

const options = [
  { type: '18-25', frames: ['popupScene11Button11', 'popupScene11Button12'], state: { x: -385, y: 50, scale: 1 } },
  { type: '26-35', frames: ['popupScene11Button21', 'popupScene11Button22'], state: { x: -192.5, y: 50, scale: 1 } },
  { type: '36-44', frames: ['popupScene11Button31', 'popupScene11Button32'], state: { x: 0, y: 50, scale: 1 } },
  { type: '45-54', frames: ['popupScene11Button41', 'popupScene11Button42'], state: { x: 192.5, y: 50, scale: 1 } },
]

const selectedOption = ref<string>()

const characterStationMaster = reactive({ x: -270, y: -75, scale: 1.1, alpha: 1, time: 0 })

function onClick(value: string) {
  selectedOption.value = value
  gameStore.playSound('buttonPress')
  // DATA-COLLECT
  setTimeout(() => {
    gameStore.nextTimeline({ id: 9 })
  }, 300)
}
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" />
    <CharacterStationMaster :state="characterStationMaster" place="station" />
    <Sprite
      v-for="{ type, frames, state } of options"
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
