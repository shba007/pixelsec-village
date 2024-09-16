<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { useDataStore } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'
import AppButton from '@/components/AppButton.vue'

const props = defineProps<{
  zoomFactor: number
}>()

const dataStore = useDataStore()
const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()

const modal = computed(() => ({
  image: 'popupBgLandscape',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 0.9 * props.zoomFactor },
}))

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
  // DATA-COLLECT
  selectedOption.value = value
  dataStore.setReadTC(value)
  gameStore.playSFXSound('buttonPress')
  setTimeout(() => {
    gameStore.nextTimeline(value ? { screen: 1, id: 5 } : { screen: 2, id: 6 })
  }, 300)
}

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

const titleText = reactive({ x: 10, y: -85, anchor: 0.5, scale: 0.25, style: { fontFamily: 'LAN', fontSize: 54 * 4, align: 'center', lineHeight: 64 * 4, stroke: 1, strokeThickness: 1 * 4 } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
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
  </Container>
</template>
