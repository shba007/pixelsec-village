<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { External } from 'vue3-pixi'
import { useWindowSize, watchDebounced } from '@vueuse/core'

import { useDataStore, type dataExchangeChoice } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'

const dataStore = useDataStore()
const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})
const toggle = ref(true)

const modal = computed(() => ({
  image: toggle.value ? 'popupBgSquare' : 'popupScene33',
  state: { x: (screenWidth.value * 1) / 4, y: 0, scale: 0.9 * zoomFactor.value },
}))

const options = ref<
  {
    type: dataExchangeChoice
    value: string
    state: {
      x: number
      y: number
      scale: number
    }
  }[]
>([
  { type: 'shopping-info', value: 'Past online shopping info', state: { x: 0, y: -245, scale: 5.5 / 4 } },
  { type: 'bank-card-details', value: 'Bank/Card details', state: { x: 0, y: -151.25, scale: 5.5 / 4 } },
  { type: 'social-media-profile', value: 'Social media profile', state: { x: 0, y: -57.5, scale: 5.5 / 4 } },
  { type: 'personal-preferences', value: 'Personal preferences', state: { x: 0, y: 36.25, scale: 5.5 / 4 } },
  { type: 'personal-details', value: 'Personal details', state: { x: 0, y: 130, scale: 5.5 / 4 } },
])

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

const frames = ['buttonSquare', 'buttonSquarePressed']

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

const titleText = reactive({ x: 100, y: 20, style: { fontFamily: 'LAN', fontSize: 44, align: 'center', lineHeight: 76, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Container :x="-255">
      <Container v-for="{ type, value, state } of options" :x="state.x" :y="state.y" cursor="pointer"
        @pointerdown="onClick(type)">
        <Sprite :key="type" :texture="frames[Number(selectedOptions.has(type))]" :texture-options="textureOptions"
          :scale="state.scale" />
        <Text v-if="toggle" :style="titleText.style" :x="titleText.x" :y="titleText.y">{{ value }}</Text>
      </Container>
    </Container>
  </Container>
  <External>
    <div class="fixed bottom-0 left-0 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="titleText.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="titleText.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="titleText.style.fontSize" type="number" min="0" max="120" step="4" />
        <input v-model="titleText.style.lineHeight" type="number" min="0" max="120" step="4" />
      </div>
      <div class="fixed right-0 bottom-0 z-[99999] flex flex-col gap-2 bg-white p-2">
        <button @click="toggle = !toggle">Toggle {{ toggle }}</button>
      </div>
    </div>
  </External>
</template>
