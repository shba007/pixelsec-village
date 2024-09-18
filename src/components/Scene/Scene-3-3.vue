<script setup lang="ts">
import { reactive, ref } from 'vue'

import { useDataStore } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import AppCheckbox from '@/components/AppCheckbox.vue'
import AppPopup from '@/components/AppPopup.vue'

defineProps<{
  zoomFactor: number
}>()

const dataStore = useDataStore()
const gameStore = useGameStore()

const options: {
  type: boolean
  value: string
  state: {
    x: number
    y: number
  }
}[] = [
  { type: true, value: 'Yes', state: { x: 65 + 40, y: -30 + 45 } },
  { type: false, value: 'No', state: { x: 65 + 40, y: 80 + 45 } },
]

const selectedOption = ref<boolean | null>(null)

function onClick(option: boolean) {
  // DATA-COLLECT
  selectedOption.value = option
  dataStore.setCollectData(option)
  gameStore.playSFXSound('buttonPress')
}

function handleMove() {
  gameStore.nextTimeline({ id: 26 })
}

const titleText = reactive({ x: -10, y: -125, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'left', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <AppPopup type="landscape" x="center" y="center" :zoom-factor="zoomFactor" @next="handleMove">
    <Text :anchor="titleText.anchor" :style="titleText.style" :x="titleText.x" :y="titleText.y" :scale="titleText.scale">
      Would you like to collect all your\ndata from one place for\nconvenience
    </Text>
    <AppCheckbox v-for="{ type, value, state } of options" :key="String(type)" :text="value" :x="state.x" :y="state.y" :scale="1" :is-checked="selectedOption === type" @click="onClick(type)" />
  </AppPopup>
</template>
