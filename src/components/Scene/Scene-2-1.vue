<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { External } from 'vue3-pixi'
import { useWindowSize } from '@vueuse/core'

import { useDataStore, type ageChoice } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'
import CharacterStationMaster from '@/components/Animation/Character/CharacterStationMaster.vue'

const dataStore = useDataStore()
const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const modal = computed(() => ({
  image: 'popupScene11',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 0.9 * zoomFactor.value },
}))

const options = reactive<
  {
    type: ageChoice
    frames: string[]
    state: {
      x: number
      y: number
      scale: number
    }
  }[]
>([
  { type: '18-25', frames: ['popupScene11Button11', 'popupScene11Button12'], state: { x: -385, y: 50, scale: 0.5 } },
  { type: '26-35', frames: ['popupScene11Button21', 'popupScene11Button22'], state: { x: -192.5, y: 50, scale: 0.5 } },
  { type: '36-44', frames: ['popupScene11Button31', 'popupScene11Button32'], state: { x: 0, y: 50, scale: 0.5 } },
  { type: '45-54', frames: ['popupScene11Button41', 'popupScene11Button42'], state: { x: 192.5, y: 50, scale: 0.5 } },
])

const selectedOption = ref<ageChoice>()

const characterStationMaster = reactive({ x: -270, y: -75, scale: 1.1, alpha: 1, time: 0 })

function onClick(value: ageChoice) {
  selectedOption.value = value
  dataStore.setAge(value)
  gameStore.playSFXSound('buttonPress')
  // DATA-COLLECT
  setTimeout(() => {
    gameStore.nextTimeline({ id: 9 })
  }, 300)
}

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <CharacterStationMaster :state="characterStationMaster" place="station" />
    <Sprite v-for="{ type, frames, state } of options" :key="type" :texture="frames[Number(selectedOption === type)]"
      :texture-options="textureOptions" :x="state.x" :y="state.y" :scale="state.scale" cursor="pointer"
      @pointerdown="onClick(type)" />
  </Container>
</template>
