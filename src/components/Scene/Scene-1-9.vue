<script setup lang="ts">
import { ref } from 'vue'

import { useDataStore, type annoyingPointChoice } from '@/stores/data'
import { useGameStore } from '@/stores/game'

import AppCheckbox from '@/components/AppCheckbox.vue'
import AppPopup from '@/components/AppPopup.vue'

defineProps<{
  zoomFactor: number
}>()

const emit = defineEmits<{
  (event: 'next'): void
}>()

const dataStore = useDataStore()
const gameStore = useGameStore()

const options: {
  key: annoyingPointChoice
  value: string
  state: {
    x: number
    y: number
  }
}[] = [
  { key: 'begin-followed', value: 'Being followed by third-parties', state: { x: -340, y: -230 } },
  { key: 'having-to-keep-giving-away-info', value: 'Having to keep giving away info', state: { x: -340, y: -130 + 10 } },
  { key: 'cant-save-autofill-details-in-incognito-mode', value: "Can't save autofill details in\nincognito mode", state: { x: -340, y: -30 + 20 } },
  { key: 'cant-store-all-my-digital-identities-in-one-place', value: "Can't store all my digital identites\nin one place", state: { x: -340, y: 70 + 30 } },
]

const selectedOption = ref<annoyingPointChoice>()
const showPopup = ref(true)

function onClick(option: annoyingPointChoice) {
  if (selectedOption.value !== undefined) return

  // DATA-COLLECT
  selectedOption.value = option
  dataStore.setAnnoyingPoint(option)
  gameStore.playSFXSound('buttonPress')
  onNext()
}

function onNext() {
  setTimeout(() => {
    emit('next')
    showPopup.value = false
  }, 100)
}
</script>

<template>
  <AppPopup v-if="showPopup" type="landscape" x="center" y="center" :zoom-factor="zoomFactor" :show-button="false">
    <AppCheckbox
      v-for="{ key, value, state } of options"
      :key="key"
      :text="value"
      :x="state.x + 20"
      :y="state.y + 60"
      :scale="0.75"
      :is-checked="selectedOption === key"
      :font-size="54"
      :gap="50"
      @click="onClick(key)" />
  </AppPopup>
</template>
