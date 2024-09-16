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
  image: 'popupBgSquare', //'popupScene64',
  state: { x: (screenWidth.value * 3) / 4, y: (screenHeight.value * 1) / 2, scale: 1.0 * props.zoomFactor },
}))

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

  setTimeout(() => {
    gameStore.nextTimeline({ id: 55 })
  }, 300)
}

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

const titleText = reactive({ x: -16, y: -70, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'left', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Text :anchor="titleText.anchor" :style="titleText.style" :x="titleText.x" :y="titleText.y"
      :scale="titleText.scale"> Are you willing to\nexchange your\ndata for rebates\nor rewards? </Text>
    <!--     <Sprite
      v-for="{ type, frames, state } of options"
      :key="String(type)"
      :texture="frames[Number(selectedOption === type)]"
      :texture-options="textureOptions"
      :x="state.x"
      :y="state.y"
      :scale="state.scale"
      cursor="pointer"
      @pointerdown="onClick(type)" /> -->
    <AppButton v-for="{ key, value, state } of options" :key="String(key)" type="short" :text="value" :x="state.x"
      :y="state.y" :scale="1" :is-pressed="key === selectedOption" @click="onClick(key)" />
  </Container>
</template>
