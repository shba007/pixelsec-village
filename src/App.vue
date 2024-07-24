<script setup lang="ts">
import { reactive, watch } from 'vue'
import { Application, Loader, External, onTick } from 'vue3-pixi'
import { storeToRefs } from 'pinia'
import { useWindowSize } from '@vueuse/core'

import { resources, useGameStore } from '@/stores/game'
import Scene1 from '@/components/Scenes/Scene1.vue'
import Scene2 from '@/components/Scenes/Scene2.vue'

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
  current: AssetState
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
    { x: -550, y: -280, scale: 0.53, time: 12 }
  ],
  current: { x: 0, y: 0, scale: 0, time: 0 },
  animation: 'init'
})

function onLoad() {
  map.current.x = map.steps[0].x
  map.current.y = map.steps[0].y
  map.current.scale = map.steps[0].scale
  map.current.time = map.steps[0].time
  map.loaded = true
  map.animation = 'started'
}

let totalElaspedTime = 0
let progress = 0

onTick((delta) => {
  if (map.animation === 'started') {
    totalElaspedTime += delta / 100
    progress = Math.min(
      totalElaspedTime /
        (map.steps[currentMapPositionIndex.value + 1].time -
          map.steps[currentMapPositionIndex.value].time),
      1
    )
    map.current.x =
      map.steps[currentMapPositionIndex.value].x +
      (map.steps[currentMapPositionIndex.value + 1].x -
        map.steps[currentMapPositionIndex.value].x) *
        progress
    map.current.y =
      map.steps[currentMapPositionIndex.value].y +
      (map.steps[currentMapPositionIndex.value + 1].y -
        map.steps[currentMapPositionIndex.value].y) *
        progress
    map.current.scale =
      map.steps[currentMapPositionIndex.value].scale +
      (map.steps[currentMapPositionIndex.value + 1].scale -
        map.steps[currentMapPositionIndex.value].scale) *
        progress
    map.current.time =
      map.steps[currentMapPositionIndex.value].time +
      (map.steps[currentMapPositionIndex.value + 1].time -
        map.steps[currentMapPositionIndex.value].time) *
        progress

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
</script>

<template>
  <Application ref="app" :resize-to="mainWindow">
    <Loader :resources="resources" :on-resolved="onLoad">
      <template #fallback>
        <Text :x="120" :y="120" :anchor="0.5"> Loading... </Text>
      </template>
      <template #default>
        <Container :x="0" :y="0" :scale="1">
          <Sprite
            :texture="map.alias"
            :anchor="0"
            :x="map.current.x"
            :y="map.current.y"
            :scale="map.current.scale"
          />
          <template v-if="currentScenceIndex === 0">
            <Scene1
              v-if="map.animation === 'finished'"
              :screenWidth="screenWidth"
              :screenHeight="screenHeight"
            />
          </template>
          <template v-else-if="currentScenceIndex === 1">
            <Scene2 />
          </template>
        </Container>
      </template>
    </Loader>
    <!--   <External style="margin-top: 20px; position: absolute; bottom: 0; background: '#fff';" tag="div">
      <input v-model="map.current.x" type="number" min="-10000" max="10000" step="10">
      <input v-model="map.current.y" type="number" min="-10000" max="10000" step="10">
      <input v-model="map.current.scale" type="number" min="0" max="2" step="0.01">
    </External> -->
  </Application>
</template>

<style>
input {
  width: 100%;
}
</style>
