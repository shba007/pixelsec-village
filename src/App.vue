<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { Application, Loader, External, onTick } from 'vue3-pixi'
import { storeToRefs } from 'pinia'
import { useWindowSize } from '@vueuse/core'

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

const isMobile = computed(() => screenHeight.value < 640 || screenWidth.value < 640)

const map = reactive<Asset>({
  loaded: false,
  alias: 'map',
  steps: [
    /*   ...(isMobile.value
        ? [
          { x: -424, y: -348, scale: 0.46, time: 0 },
          { x: -270, y: -125, scale: 0.25, time: 3 }
        ]
        : [
          { x: -424, y: -348, scale: 0.72, time: 0 },
          { x: -270, y: -125, scale: 0.3, time: 3 }
        ]), */
    { x: -990, y: -560, scale: 1.96, time: 6 },
    // 1.38
    { x: -670, y: -620, scale: 0.53, time: 8 },
    { x: -670, y: -430, scale: 0.53, time: 10 },
    { x: -550, y: -280, scale: 0.53, time: 11 },
    { x: -550, y: -280, scale: 0.53, time: 11 }
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
  map.animation = 'init'
}

function autoScale() {
  const x = screenWidth.value
  const y = 0.0015104166666667 * x + 3.893333333333333
  return y / 2.95
}

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
    { x: 2500, y: 1350, scale: 0.85, time: 0 },
    { x: 2500, y: 1180, scale: 0.85, time: 2 },
    { x: 2500, y: 1350, scale: 0.85, time: 4 }
  ],
  [
    { x: 2960, y: 1630, scale: 0.85, time: 0 },
    { x: 2960, y: 1860, scale: 0.85, time: 2 },
    { x: 2960, y: 1630, scale: 0.85, time: 4 }
  ],
  [
    { x: 2260, y: 1100, scale: 0.85, time: 0 },
    { x: 3180, y: 1100, scale: 0.85, time: 5 },
    { x: 2260, y: 1100, scale: 0.85, time: 10 }
  ],
  [
    { x: 1660, y: 1370, scale: 0.85, time: 0 },
    { x: 1660, y: 1530, scale: 0.85, time: 3 },
    { x: 1660, y: 1370, scale: 0.85, time: 6 }
  ]
])

const characterStationMaster = reactive({
  x: 1670,
  y: 1030,
  scale: 1
})

const tram = reactive<Asset>({
  loaded: false,
  alias: 'tram',
  steps: [
    { x: 1810, y: 1100, scale: 1, time: 0 },
    { x: 1810, y: 1120, scale: 1, time: 0.5 },
    { x: 2355, y: 1120, scale: 1, time: 4 },
    { x: 2355, y: 2000, scale: 1, time: 6 },
    { x: 3340, y: 2000, scale: 1, time: 8 },
    { x: 3340, y: 4060, scale: 1, time: 14 },
    { x: 4980, y: 4060, scale: 1, time: 18 },
    { x: 4980, y: 3380, scale: 1, time: 20 }
  ],
  position: { x: 0, y: 0, scale: 0, time: 0 },
  animation: 'init'
})

const pegions = ref([
  { x: 1570, y: 1450, scale: 1, flip: false },
  { x: 1720, y: 1490, scale: 1, flip: false },
  { x: 1940, y: 1760, scale: 1, flip: true },
  { x: 2020, y: 1810, scale: 1, flip: false },
  { x: 1490, y: 1860, scale: 1, flip: false },
  { x: 1620, y: 1890, scale: 1, flip: true },
  { x: 2930, y: 1930, scale: 1, flip: true },
  { x: 2410, y: 2290, scale: 1, flip: true },
  { x: 1940, y: 2850, scale: 1, flip: true },
  { x: 2110, y: 3760, scale: 1, flip: false },
  { x: 2190, y: 3800, scale: 1, flip: true },
  { x: 2110, y: 4150, scale: 1, flip: false },
  { x: 3140, y: 4740, scale: 1, flip: true },
  { x: 1250, y: 5150, scale: 1, flip: true },
  { x: 1210, y: 5200, scale: 1, flip: true }
])

const streetLamp = ref([
  { x: 3240, y: 1030, scale: 1 },
  { x: 1420, y: 1220, scale: 1 },
  { x: 1440, y: 2475, scale: 1 },
  { x: 2240, y: 2475, scale: 1 },
  { x: 745, y: 4570, scale: 1 },
  { x: 745, y: 4920, scale: 1 },
  { x: 745, y: 5250, scale: 1 },
  { x: 745, y: 5590, scale: 1 },
  { x: 3420, y: 5080, scale: 1 },
  { x: 3420, y: 5320, scale: 1 },
  { x: 4090, y: 5080, scale: 1 },
  { x: 4610, y: 5080, scale: 1 },
  { x: 4970, y: 5080, scale: 1 }
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
  {
    size: 'lg',
    x: -100,
    y: height.value * 0.2,
    direction: 1
  },
  {
    size: 'lg',
    x: -300,
    y: height.value * 0.32,
    direction: 1
  },
  {
    size: 'lg',
    x: -600,
    y: height.value * 0.46,
    direction: 1
  },
  {
    size: 'sm',
    x: -200,
    y: height.value * 0.54,
    direction: 1
  },
  {
    size: 'md',
    x: -50,
    y: height.value * 0.66,
    direction: 1
  },
  {
    size: 'lg',
    x: -250,
    y: height.value * 0.69,
    direction: 1
  },
  {
    size: 'sm',
    x: -50,
    y: height.value * 0.78,
    direction: 1
  },
  {
    size: 'md',
    x: -300,
    y: height.value * 0.9,
    direction: 1
  },
  {
    size: 'sm',
    x: -600,
    y: height.value * 0.96,
    direction: 1
  }
])
</script>

<template>
  <Application ref="app" :resize-to="mainWindow">
    <Loader :resources="resources" :on-resolved="onLoad">
      <template #fallback>
        <Text :x="120" :y="120" :anchor="0.5">Loading...</Text>
      </template>
      <template #default>
        <Container :x="map.position.x * autoScale()" :y="map.position.y * autoScale()" :scale="autoScale()">
          <Sprite :texture="map.alias" :x="0" :y="0" :scale="1" :anchor="0" />
          <!--  <Pigeon v-for="{ x, y, flip } in pegions" :x="x" :y="y" :scale="1" :flip="flip" />
          <StreetLamp v-for="{ x, y } in streetLamp" :x="x" :y="y" :scale="1" />
          <CharacterGeneric v-for="genericCharacter of characterGenericSteps" :steps="genericCharacter"
            :animation="true" />
          <CharacterStationMaster :x="characterStationMaster.x" :y="characterStationMaster.y"
            :scale="characterStationMaster.scale" />
          <Tram :steps="tram.steps" :animation="true" initalOrientation="right" />
          <Cloud v-for="{ size, x, y, direction } in clouds" :width-range="widthRange" :size="size" :x="x" :y="y"
            :direction="direction" /> -->
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
          <input v-model="map.position.scale" type="number" min="0" max="2" step="0.01" />
        </div>
        <div class="flex flex-col gap-2">
          <input v-model="streetLamp[0].x" type="number" min="-10000" max="10000" step="10" />
          <input v-model="streetLamp[0].y" type="number" min="-10000" max="10000" step="10" />
          <input v-model="streetLamp[0].scale" type="number" min="0" max="20" step="0.01" />
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
