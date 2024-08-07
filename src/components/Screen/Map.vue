<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { Loader, External, onTick, useScreen } from 'vue3-pixi'
import { storeToRefs } from 'pinia'

import { resources, useGameStore } from '@/stores/game'
import type { Asset, AssetState } from '@/utils/types'

import StreetLamp from '@/components/Animation/StreetLamp.vue'
import Pigeon from '@/components/Animation/Pigeon.vue'
import Flag from '@/components/Animation/Flag.vue'
import Wave from '@/components/Animation/Wave.vue'
import MapTram from '@/components/Animation/MapTram.vue'
import MapCloud from '@/components/Animation/MapCloud.vue'
import Fountain from '@/components/Animation/Fountain.vue'
import CharacterGeneric from '@/components/Animation/Character/CharacterGeneric.vue'
import CharacterStationMaster from '@/components/Animation/Character/CharacterStationMaster.vue'
import Scene1 from '@/components/Scene/Scene1.vue'
import Scene2 from '@/components/Scene/Scene2.vue'
import Scene3 from '@/components/Scene/Scene3.vue'
import Scene4 from '@/components/Scene/Scene4.vue'
import Scene5 from '@/components/Scene/Scene5.vue'
import Scene6 from '@/components/Scene/Scene6.vue'
import { useWindowSize } from '@vueuse/core'

const props = defineProps<{
  isLoad: boolean
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const gameStore = useGameStore()
const { currentScenceIndex, currentMapPositionIndex, isMobile } = storeToRefs(gameStore)

const zoomFactor = computed(() => screenWidth.value / 1280)
const screen = reactive<Asset>({
  loaded: false,
  alias: 'map',
  steps: [
    { x: -360, y: -260, scale: 0.94, time: 0 },
    { x: -540, y: -270, scale: 1.64, time: 3 },
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
  screen.position.x = screen.steps[0].x
  screen.position.y = screen.steps[0].y
  screen.position.scale = screen.steps[0].scale
  screen.position.time = screen.steps[0].time
  screen.loaded = true
  screen.animation = 'started'
}

let totalElaspedTime = 0
let progress = 0

onTick((delta) => {
  if (screen.animation === 'started') {
    totalElaspedTime += delta / 100
    const dt = screen.steps[currentMapPositionIndex.value + 1].time - screen.steps[currentMapPositionIndex.value].time
    const dx = screen.steps[currentMapPositionIndex.value + 1].x - screen.steps[currentMapPositionIndex.value].x
    const dy = screen.steps[currentMapPositionIndex.value + 1].y - screen.steps[currentMapPositionIndex.value].y
    const ds = screen.steps[currentMapPositionIndex.value + 1].scale - screen.steps[currentMapPositionIndex.value].scale

    progress = Math.min(totalElaspedTime / dt, 1)
    screen.position.x = screen.steps[currentMapPositionIndex.value].x + dx * progress
    screen.position.y = screen.steps[currentMapPositionIndex.value].y + dy * progress
    screen.position.scale = screen.steps[currentMapPositionIndex.value].scale + ds * progress
    screen.position.time = screen.steps[currentMapPositionIndex.value].time + dt * progress

    if (progress == 1) {
      screen.animation = 'finished'
      // console.log({ totalElaspedTime })
      totalElaspedTime = 0
    }
  }
})

watch(currentMapPositionIndex, () => {
  if (screen.animation === 'finished') screen.animation = 'started'
})

const wave = reactive({
  x: 240,
  y: 1525,
  scale: 0.5
})

const flags = ref([
  { type: 'station', x: 705, y: 380, scale: 0.5 },
  { type: 'station', x: 1105, y: 380, scale: 0.5 },
  { type: 'station', x: 705, y: 440, scale: 0.5 },
  { type: 'station', x: 1105, y: 440, scale: 0.5 },
  { type: 'station', x: 705, y: 495, scale: 0.5 },
  { type: 'station', x: 1105, y: 495, scale: 0.5 },
  { type: 'pink', x: 1225, y: 670, scale: 0.5 },
  { type: 'pink', x: 1225, y: 720, scale: 0.5 },
  { type: 'pink', x: 1225, y: 780, scale: 0.5 },
  { type: 'school-blue', x: 789, y: 2155, scale: 0.5 },
  { type: 'school-red', x: 819, y: 2155, scale: 0.5 },
  { type: 'pink', x: 460, y: 2600, scale: 0.5 },
  { type: 'pink', x: 460, y: 2660, scale: 0.5 },
  { type: 'pink', x: 460, y: 2710, scale: 0.5 },
  { type: 'pink', x: 460, y: 2770, scale: 0.5 }
])

const fountain = reactive({ x: 920, y: 830, scale: 0.5 })

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
  { x: 1710, y: 2540, scale: 0.5 },
  { x: 2050, y: 2540, scale: 0.5 },
  { x: 2310, y: 2540, scale: 0.5 },
  { x: 2485, y: 2540, scale: 0.5 },
  { x: 370, y: 2650, scale: 0.5 },
  { x: 1710, y: 2660, scale: 0.5 },
  { x: 370, y: 2800, scale: 0.5 }
])

const charactersGeneric = ref<AssetState[][]>([
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

watchEffect(() => {
  if (currentScenceIndex.value === 6 && screen.animation === 'finished') emit('close')
})
</script>

<template>
  <Loader :resources="{ ...resources.general, ...resources.map }" :on-resolved="onLoad">
    <template #fallback>
      <Text :x="120" :y="120" :anchor="0.5">Loading...</Text>
    </template>
    <template #default>
      <Container v-if="isLoad" :x="screen.position.x * screen.position.scale * zoomFactor"
        :y="screen.position.y * screen.position.scale * zoomFactor" :scale="screen.position.scale * zoomFactor">
        <Sprite :texture="screen.alias" :texture-options="{ scaleMode: 'nearest' }" :x="0" :y="0"
          :scale="isMobile ? 1 : 1" :anchor="0" />
        <Wave :x="wave.x" :y="wave.y" :scale="wave.scale" />
        <!-- @vue-ignore -->
        <Flag v-for="({ type, x, y, scale }, index) in flags" :key="index" :type="type" :x="x" :y="y" :scale="scale" />
        <Fountain :x="fountain.x" :y="fountain.y" :scale="fountain.scale" />
        <Pigeon v-for="({ x, y, scale, flip }, index) in pegions" :key="index" :x="x" :y="y" :scale="scale"
          :flip="flip" />
        <StreetLamp v-for="({ x, y, scale }, index) in streetLamp" :key="index" :x="x" :y="y" :scale="scale" />
        <CharacterGeneric v-for="(genericCharacter, index) of charactersGeneric" :key="index" :steps="genericCharacter"
          :animation="true" place="map" />
        <CharacterStationMaster :x="characterStationMaster.x" :y="characterStationMaster.y"
          :scale="characterStationMaster.scale" place="map" />
        <!-- @vue-ignore -->
        <MapTram :steps="tram.steps" :animation="true" initalOrientation="right" />
        <MapCloud v-for="({ size, x, y, direction }, index) in clouds" :key="index" :width-range="widthRange"
          :size="size" :x="x" :y="y" :direction="direction" />
        <!-- <template v-if="isLoad"> -->
        <Scene1 v-if="currentScenceIndex === 0 && screen.animation === 'finished'" />
        <Scene2 v-else-if="currentScenceIndex === 1 && screen.animation === 'finished'" />
        <Scene3 v-else-if="currentScenceIndex === 2 && screen.animation === 'finished'" />
        <Scene4 v-else-if="currentScenceIndex === 3 && screen.animation === 'finished'" />
        <Scene5 v-else-if="currentScenceIndex === 4 && screen.animation === 'finished'" />
        <Scene6 v-else-if="currentScenceIndex === 5 && screen.animation === 'finished'" />
        <!-- </template> -->
      </Container>
      <External>
        <!--   <div class="flex items-center absolute gap-8 bottom-0 left-0 right-0 z-50">
          <div class="flex flex-col gap-2">
            <input v-model="screen.position.x" type="number" min="-10000" max="10000" step="10" />
            <input v-model="screen.position.y" type="number" min="-10000" max="10000" step="10" />
            <input v-model="screen.position.scale" type="number" min="0" max="10" step="0.01" />
          </div>
          <div class="flex flex-col gap-2">
            <input v-model="fountain.x" type="number" min="-10000" max="10000" step="10" />
            <input v-model="fountain.y" type="number" min="-10000" max="10000" step="10" />
            <input v-model="fountain.scale" type="number" min="0" max="20" step="0.01" />
          </div>
        </div> -->
      </External>
    </template>
  </Loader>
</template>
