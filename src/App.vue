<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { Application, Loader, External, onTick } from 'vue3-pixi'
import { storeToRefs } from 'pinia'
import { useWindowSize, watchArray } from '@vueuse/core'

import { resources, useGameStore } from '@/stores/game'
import type { Asset, AssetState } from '@/utils/types'
import CharacterGeneric from '@/components/Animation/Character/CharacterGeneric.vue'
import CharacterStationMaster from '@/components/Animation/Character/CharacterStationMaster.vue'
import Tram from '@/components/Animation/Tram.vue'
import StreetLamp from '@/components/Animation/StreetLamp.vue'
import Pigeon from '@/components/Animation/Pigeon.vue'
import Cloud from '@/components/Animation/Cloud.vue'
import Scene1 from '@/components/Scene/Scene1.vue'
import Scene2 from '@/components/Scene/Scene2.vue'
import Scene3 from '@/components/Scene/Scene3.vue'
import Scene4 from '@/components/Scene/Scene4.vue'
import Scene5 from '@/components/Scene/Scene5.vue'
import Scene6 from '@/components/Scene/Scene6.vue'

const mainWindow = window

const gameStore = useGameStore()
const { currentScenceIndex, currentMapPositionIndex } = storeToRefs(gameStore)

const { width: screenWidth, height: screenHeight } = useWindowSize()

const zoomFactor = computed(() => screenWidth.value / 1280)
const map = reactive<Asset>({
  loaded: false,
  alias: 'map',
  steps: [
    { x: -360, y: -260, scale: 0.46, time: 0 },
    { x: -540, y: -270, scale: 0.93, time: 3 },
    { x: -990, y: -560, scale: 1.96, time: 6 },
    { x: -795, y: -590, scale: 2.01, time: 8 },
    { x: -720, y: -405, scale: 1.97, time: 10 },
    { x: -600, y: -270, scale: 2.01, time: 11 },
    { x: -600, y: -270, scale: 2.01, time: 11 }
  ],
  position: { x: 0, y: 0, scale: 1, time: 0 },
  animation: 'init'
})

function onLoad() {
  map.position.x = map.steps[0].x
  map.position.y = map.steps[0].y
  map.position.scale = map.steps[0].scale
  map.position.time = map.steps[0].time
  map.loaded = true
  map.animation = 'started'
}

watch(screenWidth, () => {
  const newScale = (screenWidth.value / screenHeight.value < 1) ? 0.84 : 0.46
  map.steps[0].scale = newScale
  map.position.scale = newScale
})

let totalElaspedTime = 0
let progress = 0

onTick((delta) => {
  if (map.animation === 'started') {
    totalElaspedTime += delta / 100
    const dt = map.steps[currentMapPositionIndex.value + 1].time - map.steps[currentMapPositionIndex.value].time
    const dx = map.steps[currentMapPositionIndex.value + 1].x - map.steps[currentMapPositionIndex.value].x
    const dy = map.steps[currentMapPositionIndex.value + 1].y - map.steps[currentMapPositionIndex.value].y
    const ds = map.steps[currentMapPositionIndex.value + 1].scale - map.steps[currentMapPositionIndex.value].scale

    progress = Math.min(totalElaspedTime / dt, 1)
    map.position.x = map.steps[currentMapPositionIndex.value].x + dx * progress
    map.position.y = map.steps[currentMapPositionIndex.value].y + dy * progress
    map.position.scale = map.steps[currentMapPositionIndex.value].scale + ds * progress
    map.position.time = map.steps[currentMapPositionIndex.value].time + dt * progress

    if (progress == 1) {
      map.animation = 'finished'
      // console.log({ totalElaspedTime })
      totalElaspedTime = 0
    }
  }
})

watch(currentMapPositionIndex, (value) => {
  if (map.animation === 'finished') map.animation = 'started'
})

const characterGenericSteps = ref<AssetState[][]>([
  [
    { x: 1250, y: 677.5, scale: 0.425, time: 0 },
    { x: 1250, y: 591.171875, scale: 0.425, time: 2 },
    { x: 1250, y: 677.5, scale: 0.425, time: 4 }
  ],
  [
    { x: 1480, y: 820, scale: 0.425, time: 0 },
    { x: 1480, y: 936, scale: 0.425, time: 2 },
    { x: 1480, y: 820, scale: 0.425, time: 4 }
  ],
  [
    { x: 1140, y: 550, scale: 0.425, time: 0 },
    { x: 1606, y: 550, scale: 0.425, time: 5 },
    { x: 1140, y: 550, scale: 0.425, time: 10 }
  ],
  [
    { x: 820, y: 687, scale: 0.425, time: 0 },
    { x: 820, y: 768, scale: 0.425, time: 3 },
    { x: 820, y: 687, scale: 0.425, time: 6 }
  ]
])

const characterStationMaster = reactive({ x: 840, y: 515, scale: 0.48 })

const tram = reactive<Asset>({
  loaded: false,
  alias: 'tram',
  steps: [
    { x: 896, y: 551, scale: 0.5, alpha: 0, time: 0 },
    { x: 896, y: 561, scale: 0.5, alpha: 1, time: 0.5 },
    { x: 1180, y: 561, scale: 0.5, alpha: 1, time: 4 },
    { x: 1180, y: 1008, scale: 0.5, alpha: 1, time: 6 },
    { x: 1670, y: 1008, scale: 0.5, alpha: 1, time: 8 },
    { x: 1670, y: 2040, scale: 0.5, alpha: 1, time: 14 },
    { x: 2490, y: 2040, scale: 0.5, alpha: 1, time: 18 },
    { x: 2490, y: 1708, scale: 0.5, alpha: 1, time: 20 },
    { x: 2490, y: 1695, scale: 0.5, alpha: 0, time: 20.5 }
  ],
  position: { x: 0, y: 0, scale: 0, alpha: 0, time: 0 },
  animation: 'init'
})

const pegions = ref([
  { x: 780, y: 725, scale: 0.5, flip: false },
  { x: 860, y: 750, scale: 0.5, flip: false },
  { x: 970, y: 880, scale: 0.5, flip: true },
  { x: 1010, y: 900, scale: 0.5, flip: false },
  { x: 740, y: 930, scale: 0.5, flip: false },
  { x: 800, y: 940, scale: 0.5, flip: true },
  { x: 1470, y: 970, scale: 0.5, flip: true },
  { x: 1205, y: 1145, scale: 0.5, flip: true },
  { x: 970, y: 1425, scale: 0.5, flip: true },
  { x: 1060, y: 1885, scale: 0.5, flip: false },
  { x: 1100, y: 1900, scale: 0.5, flip: true },
  { x: 1050, y: 2075, scale: 0.5, flip: false },
  { x: 1570, y: 2370, scale: 0.5, flip: true },
  { x: 620, y: 2580, scale: 0.5, flip: true },
  { x: 600, y: 2600, scale: 0.5, flip: true }
])

const streetLamp = ref([
  { x: 1615, y: 515, scale: 0.5 },
  { x: 710, y: 610, scale: 0.5 },
  { x: 710, y: 1240, scale: 0.5 },
  { x: 1130, y: 1240, scale: 0.5 },
  { x: 370, y: 2290, scale: 0.5 },
  { x: 370, y: 2490, scale: 0.5 },
  { x: 370, y: 2650, scale: 0.5 },
  { x: 370, y: 2800, scale: 0.5 },
  { x: 1710, y: 2540, scale: 0.5 },
  { x: 1710, y: 2660, scale: 0.5 },
  { x: 2050, y: 2540, scale: 0.5 },
  { x: 2320, y: 2540, scale: 0.5 },
  { x: 2500, y: 2540, scale: 0.5 }
])

const height = ref(3844 * 2)
const widthRange = ref(3124 * 2)
const clouds = ref<
  {
    size: 'lg' | 'md' | 'sm'
    x: number
    y: number
    direction: number
  }[]
>([
  { size: 'lg', x: -100, y: height.value * 0.2, direction: 1 },
  { size: 'lg', x: -300, y: height.value * 0.32, direction: 1 },
  { size: 'lg', x: -600, y: height.value * 0.46, direction: 1 },
  { size: 'sm', x: -200, y: height.value * 0.54, direction: 1 },
  { size: 'md', x: -50, y: height.value * 0.66, direction: 1 },
  { size: 'lg', x: -250, y: height.value * 0.69, direction: 1 },
  { size: 'sm', x: -50, y: height.value * 0.78, direction: 1 },
  { size: 'md', x: -300, y: height.value * 0.9, direction: 1 },
  { size: 'sm', x: -600, y: height.value * 0.96, direction: 1 }
])
</script>

<template>
  <Application ref="app" :resize-to="mainWindow">
    <Loader :resources="resources" :on-resolved="onLoad">
      <template #fallback>
        <Text :x="120" :y="120" :anchor="0.5">Loading...</Text>
      </template>
      <template #default>
        <Container :x="map.position.x * map.position.scale * zoomFactor"
          :y="map.position.y * map.position.scale * zoomFactor" :scale="map.position.scale * zoomFactor">
          <Sprite :texture="map.alias" :x="0" :y="0" :scale="0.667" :anchor="0" />
          <Pigeon v-for="{ x, y, flip, scale } in pegions" :x="x" :y="y" :scale="scale" :flip="flip" />
          <StreetLamp v-for="{ x, y, scale } in streetLamp" :x="x" :y="y" :scale="scale" />
          <CharacterGeneric v-for="genericCharacter of characterGenericSteps" :steps="genericCharacter"
            :animation="true" />
          <CharacterStationMaster :x="characterStationMaster.x" :y="characterStationMaster.y"
            :scale="characterStationMaster.scale" />
          <Tram :steps="tram.steps" :animation="true" initalOrientation="right" />
          <Cloud v-for="{ size, x, y, direction } in clouds" :width-range="widthRange" :size="size" :x="x" :y="y"
            :direction="direction" />
          <template v-if="currentScenceIndex === 0">
            <Scene1 v-if="map.animation === 'finished'" />
          </template>
          <template v-else-if="currentScenceIndex === 1">
            <Scene2 v-if="map.animation === 'finished'" />
          </template>
          <template v-else-if="currentScenceIndex === 2">
            <Scene3 v-if="map.animation === 'finished'" />
          </template>
          <template v-else-if="currentScenceIndex === 3">
            <Scene4 v-if="map.animation === 'finished'" />
          </template>
          <template v-else-if="currentScenceIndex === 4">
            <Scene5 v-if="map.animation === 'finished'" />
          </template>
          <template v-else-if="currentScenceIndex === 5">
            <Scene6 v-if="map.animation === 'finished'" />
          </template>
        </Container>
      </template>
    </Loader>
    <External>
      <div class="flex items-center absolute gap-8 bottom-0 left-0 right-0 z-50">
        <div class="flex flex-col gap-2">
          <input v-model="map.position.x" type="number" min="-10000" max="10000" step="10" />
          <input v-model="map.position.y" type="number" min="-10000" max="10000" step="10" />
          <input v-model="map.position.scale" type="number" min="0" max="3" step="0.01" />
        </div>
        <div class="flex flex-col gap-2">
          <input v-model="pegions[0].x" type="number" min="-10000" max="10000" step="10" />
          <input v-model="pegions[0].y" type="number" min="-10000" max="10000" step="10" />
          <input v-model="pegions[0].scale" type="number" min="0" max="20" step="0.01" />
          <input v-model="pegions[0].flip" type="checkbox" />
        </div>
      </div>
    </External>
  </Application>
</template>

<style>
input {
  @apply px-2 py-1;
}
</style>
