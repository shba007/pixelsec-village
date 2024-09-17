<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import { useDataStore, type ageChoice } from '@/stores/data'
import { useGameStore } from '@/stores/game'

import AppPopup from '@/components/AppPopup.vue'
import AppButton from '@/components/AppButton.vue'
import CharacterStationMaster from '@/components/Animation/Character/CharacterStationMaster.vue'

defineProps<{
  zoomFactor: number
}>()

const dataStore = useDataStore()
const gameStore = useGameStore()

const options: {
  type: ageChoice
  value: string
  state: {
    x: number
    y: number
  }
}[] = [
  { type: '18-25', value: '18-25', state: { x: -385 + 95, y: 50 + 60 + 25 } },
  { type: '26-35', value: '26-35', state: { x: -192.5 + 95, y: 50 + 60 + 25 } },
  { type: '36-44', value: '36-44', state: { x: 0 + 95, y: 50 + 60 + 25 } },
  { type: '45-54', value: '45-54', state: { x: 192.5 + 95, y: 50 + 60 + 25 } },
]

const selectedOption = ref<ageChoice>()

const characterStationMaster = reactive({ x: -270, y: -50, scale: 1.1, alpha: 1, time: 0 })

function onClick(value: ageChoice) {
  // DATA-COLLECT
  selectedOption.value = value
  dataStore.setAge(value)
  gameStore.playSFXSound('buttonPress')
}

function handleMove() {
  gameStore.nextTimeline({ id: 9 })
}

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

const titleText = reactive({ x: 120, y: -30, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'left', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <AppPopup type="landscape" x="center" y="center" :zoom-factor="zoomFactor" @next="handleMove">
    <Container :x="titleText.x" :y="titleText.y">
      <Text :anchor="titleText.anchor" :style="titleText.style" :scale="titleText.scale"> Please verify your age\nfor tram ticket purchase </Text>
    </Container>
    <CharacterStationMaster :state="characterStationMaster" place="station" />
    <AppButton
      v-for="{ type, value, state } of options"
      :key="String(type)"
      type="short"
      :text="value"
      :x="state.x"
      :y="state.y"
      :scale="1"
      :is-pressed="type === selectedOption"
      @click="onClick(type)" />
  </AppPopup>
</template>
