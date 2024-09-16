<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'

import { useDataStore } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'
import AppCheckbox from '@/components/AppCheckbox.vue'

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

  setTimeout(() => {
    gameStore.nextTimeline({ id: 26 })
  }, 300)
}

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

const titleText = reactive({ x: -10, y: -125, anchor: 0.5, scale: 0.25, style: { fontFamily: 'LAN', fontSize: 54 * 4, align: 'left', lineHeight: 64 * 4, stroke: 1, strokeThickness: 1 * 4 } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Text :anchor="titleText.anchor" :style="titleText.style" :x="titleText.x" :y="titleText.y" :scale="titleText.scale">
      Would you like to collect all your\ndata from one place for\nconvenience
    </Text>
    <!-- <Sprite v-for="{ type, state } of options" :key="String(type)" :texture="frames[Number(selectedOption === type)]"
      :texture-options="textureOptions" :x="state.x" :y="state.y" :scale="state.scale" cursor="pointer"
      @pointerdown="onClick(type)" /> -->
    <AppCheckbox v-for="{ type, value, state } of options" :key="String(type)" :text="value" :x="state.x" :y="state.y" :scale="1" :is-checked="selectedOption === type" @click="onClick(type)" />
  </Container>
</template>
