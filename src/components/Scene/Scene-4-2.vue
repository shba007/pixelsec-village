<script setup lang="ts">
import { computed, onMounted, ref, reactive, onBeforeUnmount } from 'vue'
import { useInterval } from '@vueuse/core'

import { textureOptions } from '@/components/AppSettings.vue'
import { useDataStore, type dataBreachActionChoice } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import AppButton from '@/components/AppButton.vue'

const props = defineProps<{
  zoomFactor: number
}>()

const dataStore = useDataStore()
const gameStore = useGameStore()

const modal = computed(() => ({
  image: 'popupBgLandscape',
  state: { x: 0, y: 0, scale: 1.0 * props.zoomFactor },
}))

const options: {
  key: dataBreachActionChoice
  value: string
  type: 'long' | 'short'
  state: {
    x: number
    y: number
  }
}[] = [
  { key: 'do-nothing', value: 'Do nothing', type: 'short', state: { x: -175, y: -45 } },
  { key: 'take-action-only-when-prompted', value: 'Take action only\nwhen prompted', type: 'long', state: { x: 130, y: -45 } },
  { key: 'alert-the-authority-change-login-details', value: 'Alert the authority\nchange login details', type: 'long', state: { x: -120, y: 125 } },
  { key: 'delete-the-app', value: 'Delete\nthe app', type: 'short', state: { x: 185, y: 125 } },
]

const selectedOption = ref<dataBreachActionChoice>()

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

  return [formattedMinutes.split(''), formattedSeconds.split(''), formattedMilliseconds.split('')]
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

const titleText = reactive({ x: 185, y: -52, anchor: 0.5, scale: 0.25, style: { fontFamily: 'LAN', fontSize: 44 * 4, align: 'left', lineHeight: 36 * 4, stroke: 1, strokeThickness: 1 * 4 } })
const timerText = reactive({ x: -180, y: -175, scale: 0.25, style: { fontFamily: 'INET', fontSize: 88 * 4, lineHeight: 64 * 4, stroke: 0, strokeThickness: 0 * 4 } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Container :x="timerText.x" :y="timerText.y">
      <Text :x="titleText.x" :y="titleText.y" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style">Countdown timer:</Text>
      <template v-for="(digits, digitsIndex) of timer" :key="digitsIndex">
        <Text
          v-for="(digit, digitIndex) of digits"
          :key="digitsIndex + '-' + digitIndex"
          :x="170 * digitsIndex + 50 * digitIndex"
          :scale="timerText.scale"
          :anchor="0.5"
          :style="{ ...timerText.style, fill: digitsIndex == 1 && digitIndex == 1 ? 'red' : 'black' }">
          {{ digit }}
        </Text>
        <Text v-if="digitsIndex !== 2" :x="165 * digitsIndex + 110" :y="-2" :scale="timerText.scale" :anchor="0.5" :style="timerText.style">:</Text>
      </template>
    </Container>
    <!-- <Sprite v-for="{ type, frames, state } of options" :key="type" :texture="frames[Number(selectedOption === type)]"
      :texture-options="textureOptions" :anchor="0.5" :x="state.x" :y="state.y" :scale="state.scale" cursor="pointer"
      @pointerdown="onClick(type)" /> -->
    <AppButton
      v-for="{ key, value, state, type } of options"
      :key="key"
      :text="value"
      :x="state.x"
      :y="state.y"
      :type="type"
      :scale="1.25"
      :is-pressed="selectedOption === key"
      :font-size="36"
      @click="onClick(key)" />
  </Container>
</template>
