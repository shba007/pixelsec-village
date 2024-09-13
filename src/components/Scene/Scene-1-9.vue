<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { useDataStore, type annoyingPointChoice } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'
import AppCheckbox from '@/components/AppCheckbox.vue'

const emit = defineEmits<{
  (event: 'update'): void
}>()

const dataStore = useDataStore()
const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

const modal = computed(() => ({
  image: 'popupBgLandscape', //'popupScene62',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 1 * zoomFactor.value },
}))

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

  setTimeout(() => {
    emit('update')
    showPopup.value = false
  }, 300)
}

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

// const frames = ['buttonSquare', 'buttonSquarePressed']
</script>

<template>
  <Container v-if="showPopup" :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <!--     <Sprite v-for="{ type, value,  state } of options" :key="String(type)" :texture="frames[Number(selectedOption === type)]"
      :texture-options="textureOptions" :x="state.x" :y="state.y" :scale="1" cursor="pointer"
      @pointerdown="onClick(type)" /> -->
    <AppCheckbox
      v-for="{ key, value, state } of options"
      :key="key"
      :text="value"
      :x="state.x + 20"
      :y="state.y + 60"
      :scale="0.75"
      :is-checked="selectedOption === key"
      :font-size="56"
      :gap="50"
      @click="onClick(key)" />
  </Container>
</template>
