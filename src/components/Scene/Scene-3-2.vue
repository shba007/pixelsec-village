<script setup lang="ts">
import { computed, ref } from 'vue'

import { useDataStore, type dataExchangeChoice } from '@/stores/data'
import { useGameStore } from '@/stores/game'

import AppCheckbox from '@/components/AppCheckbox.vue'
import AppPopup from '@/components/AppPopup.vue'

defineProps<{
  zoomFactor: number
}>()

const dataStore = useDataStore()
const gameStore = useGameStore()

const options: {
  type: dataExchangeChoice
  value: string
  state: {
    x: number
    y: number
  }
}[] = [
  { type: 'shopping-info', value: 'Past online shopping info', state: { x: 0, y: -245 } },
  { type: 'bank-card-details', value: 'Bank/Card details', state: { x: 0, y: -151.25 } },
  { type: 'social-media-profile', value: 'Social media profile', state: { x: 0, y: -57.5 } },
  { type: 'personal-preferences', value: 'Personal preferences', state: { x: 0, y: 36.25 } },
  { type: 'personal-details', value: 'Personal details', state: { x: 0, y: 130 } },
]

const selectedOptions = ref<Set<dataExchangeChoice>>(new Set())
const isInputValid = computed(() => [...selectedOptions.value.values()].length)

function onClick(option: dataExchangeChoice) {
  gameStore.playSFXSound('buttonPress')
  if (selectedOptions.value.has(option)) selectedOptions.value.delete(option)
  else selectedOptions.value.add(option)
}

function onNext() {
  if (!isInputValid.value) return

  // DATA-COLLECT
  dataStore.setDataExchange([...selectedOptions.value.values()])
  gameStore.nextTimeline({ id: 25 })
}
</script>

<template>
  <AppPopup type="square" x="right" y="center" :zoom-factor="zoomFactor" :button-disabled="!isInputValid" @next="onNext">
    <AppCheckbox v-for="{ type, value, state } of options" :key="type" :text="value" :x="state.x - 220" :y="state.y + 50" :scale="1" :is-checked="selectedOptions.has(type)" @click="onClick(type)" />
  </AppPopup>
</template>
