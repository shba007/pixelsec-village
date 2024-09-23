<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watchEffect } from 'vue'
import { External } from 'vue3-pixi'
import { useTimeoutFn, useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import type { Asset, State } from '@/utils/types'
import { textureOptions } from '@/components/AppSettings.vue'
import Cloud from '@/components/Animation/Cloud.vue'
import StationTram from '@/components/Animation/StationTram.vue'
import CharacterStationMaster from '@/components/Animation/Character/CharacterStationMaster.vue'
import CharacterGeneric from '@/components/Animation/Character/CharacterGeneric.vue'
import Pigeon from '@/components/Animation/Pigeon.vue'
import Scene1 from '@/components/Scene/Scene-2-1.vue'
import Scene2 from '@/components/Scene/Scene-2-2.vue'

const gameStore = useGameStore()
const { currentSceneIndex, currentPopupIndex, gamePause } = storeToRefs(gameStore)

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

const sky = reactive<Asset>({
  loaded: false,
  alias: 'stationSky',
  states: [{ x: 0, y: -360, scale: 1, alpha: 1, time: 0 }],
  state: { x: 0, y: -360, scale: 1, alpha: 1, time: 0 },
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

const tram = reactive({ x: -screenWidth.value - 800, y: -25 })

const platform = { bg: 'platformBackground', fg: 'platformForeground' }

const pegion = ref([
  { x: 360, y: 290, scale: 1, flip: false },
  { x: 450, y: 260, scale: 1, flip: true },
])

const characterStationMaster = reactive({
  states: [{ x: -210, y: 86, scale: 1, alpha: 1, time: 0 }],
  state: { x: 0, y: 0, scale: 1, alpha: 1, time: 0 },
})

const charactersGeneric = ref<State[]>([
  { x: screenWidth.value + 200, y: -10, scale: 1, alpha: 1, time: 0 },
  { x: screenWidth.value + 200, y: -10, scale: 1, alpha: 1, time: 2 },
  { x: 0, y: -10, scale: 1, alpha: 1, time: 8 },
])

watchEffect(() => {
  if (currentSceneIndex.value === 9) {
    gameStore.nextTimeline({ id: 71 })
    // emit('close', 2)
  }
})

onBeforeMount(() => {
  characterStationMaster.state = characterStationMaster.states[0]
})

useTimeoutFn(() => {
  gameStore.nextTimeline({ id: 8 })
}, 2000)
</script>

<template>
  <Container :x="screenWidth / 2" :y="screenHeight / 2" :scale="1 * zoomFactor">
    <Sprite :texture="sky.alias" :texture-options="textureOptions" :x="sky.state.x" :y="sky.state.y" :scale="sky.state.scale" :anchor="0.5" />
    <Cloud v-for="({ size, x, y, direction }, index) in clouds" :key="index" place="station" :width-range="screenWidth" :size="size" :x="x" :y="y" :scale="1" :direction="direction" />
    <Sprite :texture="platform.bg" :texture-options="textureOptions" :x="0" :y="-200" :scale="1" :anchor="0.5" />
    <CharacterGeneric :states="charactersGeneric" :animation="true" place="station" />
    <!-- <Sprite :texture="platform.fg" :texture-options="textureOptions" :x="0" :y="0" :scale="1" :anchor="0.5" /> -->
    <StationTram :x="tram.x" :y="tram.y" :width-range="screenWidth" />
    <Sprite :texture="platform.fg" :texture-options="textureOptions" :x="0" :y="0" :scale="1" :anchor="0.5" />
    <CharacterStationMaster :state="characterStationMaster.state" place="station" />
    <Pigeon v-for="({ x, y, scale, flip }, index) in pegion" :key="index" :x="x" :y="y" :scale="scale" :flip="flip" />
  </Container>
  <Container :renderable="!gamePause">
    <Scene1 v-if="currentPopupIndex === 5" :zoom-factor="zoomFactor" />
    <Scene2 v-else-if="currentPopupIndex === 6" :zoom-factor="zoomFactor" />
  </Container>
  <!-- DEBUG -->
  <!-- <External>
    <div class="absolute bottom-0 right-0 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="sky.state.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="sky.state.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="sky.state.scale" type="number" min="0" max="10" step="0.01" />
      </div>
        <div class="flex flex-col gap-2">
        <input v-model="charactersGeneric[0][0].x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="charactersGeneric[0][0].y" type="number" min="-10000" max="10000" step="10" />
      </div> 
    </div>
  </External> -->
</template>
