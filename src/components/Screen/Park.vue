<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { External } from 'vue3-pixi'
import { useTimeoutFn, useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'

import CharacterIcecreamVendor from '@/components/Animation/Character/CharacterIcecreamVendor.vue'
import Cloud from '@/components/Animation/Cloud.vue'
import Pigeon from '@/components/Animation/Pigeon.vue'
import Scene1 from '@/components/Scene/Scene-3-1.vue'
import Scene2 from '@/components/Scene/Scene-3-2.vue'
import Scene3 from '@/components/Scene/Scene-3-3.vue'
import Fountain from '../Animation/Fountain.vue'
import BaloonStand from '../Animation/BaloonStand.vue'

const gameStore = useGameStore()
const { currentPopupIndex, gamePause } = storeToRefs(gameStore)

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

// Asset
const park = reactive<any>({
  loaded: false,
  alias: { bg: 'parkBg', fg: 'parkFg' },
  states: [{ x: 0, y: 0, scale: 1.05, alpha: 1, time: 0 }],
  state: { x: 0, y: 10, scale: 1.05, alpha: 1, time: 0 },
  animation: 'init',
})

const clouds = ref<
  {
    size: 'lg' | 'md' | 'sm'
    x: number
    y: number
    direction: number
  }[]
>([
  { size: 'md', x: -screenWidth.value / 2 - 200, y: 15 - 350, direction: 1 },
  { size: 'lg', x: -screenWidth.value / 2 - 150, y: 95 - 350, direction: 1 },
  { size: 'sm', x: -screenWidth.value / 2 - 100, y: 150 - 350, direction: 1 },
])

const fountain = reactive({ x: 500, y: -130, scale: 1 })

const pigeons = ref([
  { x: -400, y: -300, scale: 1, flip: false },
  { x: 540, y: 280, scale: 1, flip: true },
])

const characterIcecreamVendor = reactive({
  states: [{ x: -240, y: 170, scale: 1, alpha: 1, time: 0 }],
  state: { x: -240, y: 170, scale: 1, alpha: 1, time: 0 },
})

const baloonStand = reactive({ x: -560, y: -120, scale: 1.05 })

onBeforeMount(() => {})

useTimeoutFn(() => {
  gameStore.nextTimeline({ id: 23 })
}, 2000)
</script>

<template>
  <Container :x="screenWidth / 2" :y="screenHeight / 2" :scale="1 * zoomFactor">
    <Sprite :texture="park.alias.bg" :texture-options="textureOptions" :x="park.state.x" :y="park.state.y - 400" :scale="park.state.scale * 1.225" :anchor="0.5" />
    <Cloud v-for="({ size, x, y, direction }, index) in clouds" :key="index" place="park" :width-range="screenWidth" :size="size" :x="x" :y="y" :scale="1" :direction="direction" />
    <Sprite :texture="park.alias.fg" :texture-options="textureOptions" :x="park.state.x" :y="park.state.y" :scale="park.state.scale" :anchor="0.5" />
    <Fountain :x="fountain.x" :y="fountain.y" :scale="fountain.scale" place="park" />
    <Sprite texture="parkTruck" :texture-options="textureOptions" :x="park.state.x" :y="park.state.y" :scale="park.state.scale" :anchor="0.5" />
    <Pigeon v-for="({ x, y, scale, flip }, index) in pigeons" :key="index" :x="x" :y="y" :scale="scale" :flip="flip" />
    <BaloonStand :x="baloonStand.x" :y="baloonStand.y" :scale="baloonStand.scale" place="park" />
  </Container>
  <Container v-if="!gamePause">
    <Scene1 v-if="currentPopupIndex === 8" :zoom-factor="zoomFactor" />
    <Scene2 v-else-if="currentPopupIndex === 9" :zoom-factor="zoomFactor" />
    <Scene3 v-else-if="currentPopupIndex === 10" :zoom-factor="zoomFactor" />
  </Container>
  <Container :x="screenWidth / 2" :y="screenHeight / 2" :scale="1 * zoomFactor">
    <CharacterIcecreamVendor place="park" :state="characterIcecreamVendor.state" />
  </Container>
  <!-- DEBUG -->
  <!-- <External>
    <div class="absolute bottom-0 left-0 right-0 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="park.state.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="park.state.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="park.state.scale" type="number" min="0" max="10" step="0.01" />
      </div>
      <div class="flex flex-col gap-2">
        <input v-model="characterIcecreamVendor.state.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="characterIcecreamVendor.state.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="characterIcecreamVendor.state.scale" type="number" min="0" max="20" step="0.01" />
      </div>
    </div>
  </External> -->
</template>
