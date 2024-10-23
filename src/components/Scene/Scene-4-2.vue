<script setup lang="ts">
import { computed, onMounted, ref, reactive, onBeforeUnmount } from 'vue'
import { useInterval } from '@vueuse/core'

import { useDataStore, type dataBreachActionChoice } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import AppButton from '@/components/AppButton.vue'
import AppPopup from '@/components/AppPopup.vue'

defineProps<{
  zoomFactor: number
}>()

const dataStore = useDataStore()
const gameStore = useGameStore()

const options: {
  key: dataBreachActionChoice
  value: string
  type: 'long' | 'short'
  state: {
    x: number
    y: number
  }
}[] = [
  { key: 'do-nothing', value: 'Do nothing', type: 'short', state: { x: -210, y: -45 } },
  { key: 'take-action-only-when-prompted', value: 'Take action only\nwhen prompted', type: 'long', state: { x: 130, y: -45 } },
  { key: 'alert-the-authority-change-login-details', value: 'Alert the authority\nchange login details', type: 'long', state: { x: -140, y: 140 } },
  { key: 'delete-the-app', value: 'Delete\nthe app', type: 'short', state: { x: 200, y: 140 } },
]

const selectedOption = ref<dataBreachActionChoice>()

const counter = useInterval(10)
const timer = computed(() => {
  const number = Math.max(8 * 100 - counter.value, 0)

  const minutes = Math.floor(number / 10000)
  const seconds = Math.floor((number % 10000) / 100)
  const milliseconds = number % 100

  // Pad with leading zeros if necessary
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = seconds.toString().padStart(2, '0')
  const formattedMilliseconds = milliseconds.toString().padStart(2, '0')

  if (number === 1) {
    onNext(true)
    return []
  }

  return [formattedMinutes.split(''), formattedSeconds.split(''), formattedMilliseconds.split('')]
})

function onClick(value: dataBreachActionChoice) {
  if (selectedOption.value !== undefined) return

  // DATA-COLLECT
  selectedOption.value = value
  dataStore.setDataBreachAction(value)
  gameStore.playSFXSound('buttonPress')
  onNext(false)
}

function onNext(skip: boolean) {
  setTimeout(() => gameStore.nextTimeline(!skip ? { screen: 2, id: 34 } : { id: 33 }), 300)
}

onMounted(() => {
  gameStore.playBGMSound('countdown')
  gameStore.playSFXSound('countdown', 2)
})

onBeforeUnmount(() => {
  gameStore.stopSFXSound(2)
  gameStore.playBGMSound('panic')
  gameStore.playSFXSound('alarmLight', 2)
})

const titleText = reactive({ x: 185, y: -52, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 34, align: 'left', lineHeight: 54, stroke: 1, strokeThickness: 1 } })
const timerText = reactive({ x: -180, y: -175, scale: 1, style: { fontFamily: 'INET', fontSize: 88, lineHeight: 64, stroke: 0, strokeThickness: 0 } })
</script>

<template>
  <AppPopup type="landscape" x="center" y="center" :zoom-factor="zoomFactor" :show-button="false">
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
    <AppButton
      v-for="{ key, value, state, type } of options"
      :key="key"
      :text="value"
      :x="state.x"
      :y="state.y"
      :type="type"
      :scale="1.375"
      :is-pressed="selectedOption === key"
      @click="onClick(key)" />
  </AppPopup>
</template>
