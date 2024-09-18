<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import { useDataStore } from '@/stores/data'
import { useGameStore } from '@/stores/game'

import AppButton from '@/components/AppButton.vue'
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
  { type: false, value: 'Skip T&Cs', state: { x: -340 + 144, y: 50 + 60 } },
  { type: true, value: 'Read T&Cs', state: { x: 40 + 144, y: 50 + 60 } },
]

const selectedOption = ref<boolean>()

function onClick(value: boolean) {
  if (selectedOption.value !== undefined) return

  // DATA-COLLECT
  selectedOption.value = value
  dataStore.setReadTC(value)
  gameStore.playSFXSound('buttonPress')
  onNext()
}

function onNext() {
  setTimeout(() => gameStore.nextTimeline(selectedOption.value ? { screen: 1, id: 5 } : { screen: 2, id: 6 }), 100)
}

const titleText = reactive({ x: 10, y: -85, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'center', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <AppPopup type="landscape" x="center" y="center" :zoom-factor="zoomFactor" :show-button="false">
    <Container :x="titleText.x" :y="titleText.y">
      <Text :anchor="titleText.anchor" :style="titleText.style" :scale="titleText.scale"> Before we begin,\nlet's go through the T&Cs. </Text>
    </Container>
    <AppButton
      v-for="{ type, value, state } of options"
      :key="String(type)"
      type="long"
      :text="value"
      :x="state.x"
      :y="state.y"
      :scale="1"
      :is-pressed="type === selectedOption"
      @click="onClick(type)" />
  </AppPopup>
</template>
