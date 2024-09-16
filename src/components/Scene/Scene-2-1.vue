<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useDataStore, type ageChoice } from '@/stores/data'
import { useGameStore } from '@/stores/game'

import { textureOptions } from '@/components/AppSettings.vue'
import AppButton from '@/components/AppButton.vue'
import CharacterStationMaster from '@/components/Animation/Character/CharacterStationMaster.vue'

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
  type: ageChoice
  value: string
  state: {
    x: number
    y: number
  }
}[] = [
  { type: '18-25', value: '18-25', state: { x: -385 + 95, y: 50 + 60 } },
  { type: '26-35', value: '26-35', state: { x: -192.5 + 95, y: 50 + 60 } },
  { type: '36-44', value: '36-44', state: { x: 0 + 95, y: 50 + 60 } },
  { type: '45-54', value: '45-54', state: { x: 192.5 + 95, y: 50 + 60 } },
]

const selectedOption = ref<ageChoice>()

const characterStationMaster = reactive({ x: -270, y: -75, scale: 1.1, alpha: 1, time: 0 })

function onClick(value: ageChoice) {
  selectedOption.value = value
  dataStore.setAge(value)
  gameStore.playSFXSound('buttonPress')
  // DATA-COLLECT
  setTimeout(() => {
    gameStore.nextTimeline({ id: 9 })
  }, 300)
}

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

const titleText = reactive({ x: 120, y: -55, anchor: 0.5, scale: 0.25, style: { fontFamily: 'LAN', fontSize: 54 * 4, align: 'left', lineHeight: 64 * 4, stroke: 1, strokeThickness: 1 * 4 } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Container :x="titleText.x" :y="titleText.y">
      <Text :anchor="titleText.anchor" :style="titleText.style" :scale="titleText.scale"> Please verify your age\nfor tram ticket purchase </Text>
    </Container>
    <CharacterStationMaster :state="characterStationMaster" place="station" />
    <!--     <Sprite v-for="{ type, frames, state } of options" :key="type" :texture="frames[Number(selectedOption === type)]"
      :texture-options="textureOptions" :x="state.x" :y="state.y" :scale="state.scale" cursor="pointer"
      @pointerdown="onClick(type)" /> -->
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
  </Container>
</template>
