<script setup lang="ts">
import { reactive, ref } from 'vue'

import { useDataStore } from '@/stores/data'
import { useGameStore } from '@/stores/game'

import AppButton from '@/components/AppButton.vue'
import AppPopup from '@/components/AppPopup.vue'

defineProps<{
  zoomFactor: number
}>()

const dataStore = useDataStore()
const gameStore = useGameStore()

const options = [
  { key: true, value: 'Yes', state: { x: -200 + 90, y: 80 + 70 } },
  { key: false, value: 'No', state: { x: 10 + 90, y: 80 + 70 } },
]

const selectedOption = ref<boolean>()

function onClick(value: boolean) {
  if (selectedOption.value !== undefined) return

  // DATA-COLLECT
  selectedOption.value = value
  dataStore.setDataRewardsTradeoff(value)
  gameStore.playSFXSound('buttonPress')
  onNext()
}

function onNext() {
  setTimeout(() => gameStore.nextTimeline({ id: 55 }), 100)
}

const titleText = reactive({ x: -16, y: -70, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'left', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <AppPopup type="square" x="right" y="center" :zoom-factor="zoomFactor" :show-button="false">
    <Text :anchor="titleText.anchor" :style="titleText.style" :x="titleText.x" :y="titleText.y" :scale="titleText.scale"> Are you willing to\nexchange your\ndata for rebates\nor rewards? </Text>
    <AppButton v-for="{ key, value, state } of options" :key="String(key)" type="short" :text="value" :x="state.x" :y="state.y" :scale="1" :is-pressed="key === selectedOption" @click="onClick(key)" />
  </AppPopup>
</template>
