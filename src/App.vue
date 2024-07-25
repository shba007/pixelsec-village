<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Application, Loader, External, onTick } from 'vue3-pixi'
import { storeToRefs } from 'pinia'
import { useWindowSize } from '@vueuse/core'

import { resources, useGameStore } from '@/stores/game'
import CharacterGeneric from '@/components/Animation/Character/CharacterGeneric.vue'
import CharacterStationMaster from '@/components/Animation/Character/CharacterStationMaster.vue'
import Tram from '@/components/Animation/Tram.vue'
import Scene1 from '@/components/Scene/Scene1.vue'
import Scene2 from '@/components/Scene/Scene2.vue'
import Scene3 from '@/components/Scene/Scene3.vue'
import Scene4 from '@/components/Scene/Scene4.vue'

interface AssetState {
  x: number
  y: number
  scale: number
  time: number
}

export interface Asset {
  loaded: boolean
  alias: string
  steps: AssetState[]
  position: AssetState
  animation: 'init' | 'started' | 'finished'
}

const mainWindow = window

const gameStore = useGameStore()
const { currentScenceIndex, currentMapPositionIndex } = storeToRefs(gameStore)

const { width: screenWidth, height: screenHeight } = useWindowSize()

const map = reactive<Asset>({
  loaded: false,
  alias: 'map',
  steps: [
    { x: -95, y: 0, scale: 0.127, time: 0 },
    { x: -270, y: -125, scale: 0.25, time: 3 },
    { x: -1065, y: -595, scale: 0.53, time: 6 },
    { x: -670, y: -620, scale: 0.53, time: 8 },
    { x: -670, y: -430, scale: 0.53, time: 10 },
    { x: -550, y: -280, scale: 0.53, time: 11 }
  ],
  position: { x: 0, y: 0, scale: 0, time: 0 },
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
      console.log({ totalElaspedTime })
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
  x: 1670, y: 1030, scale: 1
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
    { x: 4980, y: 3380, scale: 1, time: 20 },
  ],
  position: { x: 0, y: 0, scale: 0, time: 0 },
  animation: 'init'
})
/* const abcd = reactive({
  x: 0,
  y: 0,
  scale: 1
}) */
</script>

<template>
  <Application ref="app" :resize-to="mainWindow">
    <Loader :resources="resources" :on-resolved="onLoad">
      <template #fallback>
        <Text :x="120" :y="120" :anchor="0.5"> Loading... </Text>
      </template>
      <template #default>
        <Container :x="map.position.x" :y="map.position.y" :scale="map.position.scale">
          <Sprite :texture="map.alias" :x="0" :y="0" :scale="2" />
          <CharacterGeneric v-for="genericCharacter of characterGenericSteps" :steps="genericCharacter"
            :animation="true" />
          <CharacterStationMaster :x="characterStationMaster.x" :y="characterStationMaster.y"
            :scale="characterStationMaster.scale" />
          <Tram :steps="tram.steps" :animation="true" initalOrientation="right" />
          <!-- <CharacterGeneric :steps="genericCharacterSteps" :animation="false" /> -->
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
        </Container>
      </template>
    </Loader>
    <!-- <External>
      <div class="flex items-center absolute gap-8 bottom-0 left-0 right-0 z-50">
        <div class="flex flex-col gap-2 ">
          <input v-model="map.position.x" type="number" min="-10000" max="10000" step="10">
          <input v-model="map.position.y" type="number" min="-10000" max="10000" step="10">
          <input v-model="map.position.scale" type="number" min="0" max="2" step="0.01">
        </div>
        <div class="flex flex-col gap-2">
          <input v-model="abcd.x" type="number" min="-10000" max="10000" step="10">
          <input v-model="abcd.y" type="number" min="-10000" max="10000" step="10">
          <input v-model="abcd.scale" type="number" min="0" max="20" step="0.01">
        </div>
      </div>
    </External> -->
  </Application>
</template>

<style>
input {
  @apply px-2 py-1;
}
</style>
