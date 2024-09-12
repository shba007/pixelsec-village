<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { External } from 'vue3-pixi'
import { useWindowSize } from '@vueuse/core'

import { useDataStore } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'

const dataStore = useDataStore()
const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)
const toggle = ref(true)

const modal = computed(() => ({
  image: toggle.value ? 'popupBgLandscape' : 'popupScene04',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 0.9 * zoomFactor.value },
}))

const options = computed(() => [
  { type: false, value: 'Skip T&Cs', frames: toggle.value ? ['buttonLong', 'buttonLongPressed'] : ['popupScene04Button11', 'popupScene04Button12'], state: { x: -340 + 144, y: 50 + 60, scale: toggle.value ? 4 : 0.5 } },
  { type: true, value: 'Read T&Cs', frames: toggle.value ? ['buttonLong', 'buttonLongPressed'] : ['popupScene04Button21', 'popupScene04Button22'], state: { x: 40 + 144, y: 50 + 60, scale: toggle.value ? 4 : 0.5 } },
])

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

const titleText = reactive({ x: 10, y: -85, anchor: 0.5, style: { fontFamily: 'LAN', fontSize: 66, align: 'center', lineHeight: 76, stroke: 1, strokeThickness: 1 } })
const buttonText = reactive({ x: 0, y: -5, anchor: 0.5, style: { fontFamily: 'INET', fontSize: 48, align: 'center', lineHeight: 76, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Container v-if="toggle" :x="titleText.x" :y="titleText.y">
      <Text :anchor="titleText.anchor" :style="titleText.style">Before we begin,\nlet's go through the T&Cs.</Text>
    </Container>
    <Container v-for="{ type, value, frames, state } of options" :key="String(type)" :x="state.x" :y="state.y"
      cursor="pointer" @pointerdown="onClick(type)">
      <Sprite :texture="frames[Number(selectedOption === type)]" :texture-options="textureOptions" :scale="state.scale"
        :anchor="buttonText.anchor" />
      <Text :x="buttonText.x" :y="buttonText.y" :anchor="buttonText.anchor"
        :style="{ ...buttonText.style, fill: type === selectedOption ? '#506745' : 'black' }">
        {{ value }}
      </Text>
    </Container>
  </Container>
  <!--   <External>
    <div class="fixed bottom-0 left-0 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="buttonText.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="buttonText.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="buttonText.style.fontSize" type="number" min="0" max="120" step="4" />
        <input v-model="buttonText.style.lineHeight" type="number" min="0" max="120" step="4" />
      </div>
      <div class="fixed right-0 bottom-0 z-[99999] flex flex-col gap-2 bg-white p-2">
        <button @click="toggle = !toggle">Toggle {{ toggle }}</button>
      </div>
    </div>
  </External> -->
</template>
