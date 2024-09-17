<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useWindowSize, watchDebounced } from '@vueuse/core'

import { useDataStore, type dataExchangeChoice } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'
import AppCheckbox from '@/components/AppCheckbox.vue'

const props = defineProps<{
  zoomFactor: number
}>()

const dataStore = useDataStore()
const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()

const modal = computed(() => ({
  texture: 'popupBgSquare',
  state: { x: (screenWidth.value * 1) / 4, y: 0, scale: 1.0 * props.zoomFactor },
}))

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

function onClick(option: dataExchangeChoice) {
  gameStore.playSFXSound('buttonPress')
  if (selectedOptions.value.has(option)) selectedOptions.value.delete(option)
  else selectedOptions.value.add(option)
}

watchDebounced(() => [...selectedOptions.value.values()], onComplete, { debounce: 2000 })

function onComplete() {
  // DATA-COLLECT
  dataStore.setDataExchange([...selectedOptions.value.values()])
  gameStore.nextTimeline({ id: 25 })
}

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.texture" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <AppCheckbox v-for="{ type, value, state } of options" :key="type" :text="value" :x="state.x - 220" :y="state.y + 50" :scale="1" :is-checked="selectedOptions.has(type)" @click="onClick(type)" />
  </Container>
</template>
