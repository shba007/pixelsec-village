<script setup lang="ts">
import { computed, onMounted, ref, reactive, onBeforeUnmount } from 'vue'
import { useInterval, useWindowSize } from '@vueuse/core'

import { textureOptions } from '@/components/AppSettings.vue'
import { useDataStore, type dataBreachActionChoice } from '@/stores/data'
import { useGameStore } from '@/stores/game'

const dataStore = useDataStore()
const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

const modal = computed(() => ({
  image: 'popupScene52',
  state: { x: 0, y: 0, scale: 0.9 * zoomFactor.value },
}))

const options = ref<
  {
    type: dataBreachActionChoice
    frames: string[]
    state: {
      x: number
      y: number
      scale: number
    }
  }[]
>([
  { type: 'do-nothing', frames: ['popupScene52Button11', 'popupScene52Button12'], state: { x: -175, y: -45, scale: 0.5 } },
  { type: 'take-action-only-when-prompted', frames: ['popupScene52Button21', 'popupScene52Button22'], state: { x: 130, y: -45, scale: 0.5 } },
  { type: 'alert-the-authority-change-login-details', frames: ['popupScene52Button31', 'popupScene52Button32'], state: { x: -120, y: 125, scale: 0.5 } },
  { type: 'delete-the-app', frames: ['popupScene52Button41', 'popupScene52Button42'], state: { x: 185, y: 125, scale: 0.5 } },
])

const selectedOption = ref<dataBreachActionChoice>()

const timerText = reactive({ x: -50, y: -220, scale: 3.5 })
const counter = useInterval(10)
const timer = computed(() => {
  const number = Math.max(8 * 100 - counter.value, 0)

  let minutes = Math.floor(number / 10000)
  let seconds = Math.floor((number % 10000) / 100)
  let milliseconds = number % 100

  // Pad with leading zeros if necessary
  let formattedMinutes = minutes.toString().padStart(2, '0')
  let formattedSeconds = seconds.toString().padStart(2, '0')
  let formattedMilliseconds = milliseconds.toString().padStart(2, '0')

  if (number === 1) {
    setTimeout(() => {
      gameStore.nextTimeline({ id: 33 })
    }, 50)
    return []
  }

  // Return the formatted timer string
  const digits = formattedSeconds.split('')
  return [`${formattedMinutes}`, `${digits[0]}`, `${digits[1]}`, `${formattedMilliseconds}`]
})

function onClick(value: dataBreachActionChoice) {
  // DATA-COLLECT
  selectedOption.value = value
  dataStore.setDataBreachAction(value)
  gameStore.playSFXSound('buttonPress')

  setTimeout(() => {
    gameStore.nextTimeline({ screen: 2, id: 34 })
  }, 300)
}

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
  gameStore.playBGMSound('countdown')
  gameStore.playSFXSound('countdown', 2)
})

onBeforeUnmount(() => {
  gameStore.stopSFXSound(2)
  gameStore.playBGMSound('panic')
  gameStore.playSFXSound('alarmLight')
})
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Container :x="timerText.x" :y="timerText.y" :scale="timerText.scale">
      <Text :style="{ fontFamily: 'INET' }" :texture-options="textureOptions" :x="-45"> {{ timer[0] }} : {{ timer[1] }} </Text>
      <Text :style="{ fill: 'red', fontFamily: 'INET' }" :texture-options="textureOptions" :x="18">
        {{ timer[2] }}
      </Text>
      <Text :style="{ fontFamily: 'INET' }" :texture-options="textureOptions" :x="35"> : {{ timer[3] }}</Text>
    </Container>
    <Sprite
      v-for="{ type, frames, state } of options"
      :key="type"
      :texture="frames[Number(selectedOption === type)]"
      :texture-options="textureOptions"
      :anchor="0.5"
      :x="state.x"
      :y="state.y"
      :scale="state.scale"
      cursor="pointer"
      @pointerdown="onClick(type)" />
  </Container>
</template>
