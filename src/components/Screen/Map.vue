<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { Loader, External, onTick } from 'vue3-pixi'
import { storeToRefs } from 'pinia'

import { resources, useGameStore } from '@/stores/game'
import type { Asset, State } from '@/utils/types'
import { SCALE_MODES } from '@/utils/types'
import { useTimeout, useWindowSize } from '@vueuse/core'

import StreetLamp from '@/components/Animation/StreetLamp.vue'
import Pigeon from '@/components/Animation/Pigeon.vue'
import Flag from '@/components/Animation/Flag.vue'
import Wave from '@/components/Animation/Wave.vue'
import MapTram from '@/components/Animation/MapTram.vue'
import MapCloud from '@/components/Animation/MapCloud.vue'
import Fountain from '@/components/Animation/Fountain.vue'
import BaloonStand from '@/components/Animation/BaloonStand.vue'
import CharacterGeneric from '@/components/Animation/Character/CharacterGeneric.vue'
import CharacterStationMaster from '@/components/Animation/Character/CharacterStationMaster.vue'
import CharacterMain from '@/components/Animation/Character/CharacterMain.vue'
import CharacterIcecreamVendor from '@/components/Animation/Character/CharacterIcecreamVendor.vue'

import Scene1 from '@/components/Scene/Scene-1-1.vue'
import Scene2 from '@/components/Scene/Scene-1-2.vue'
import Scene3 from '@/components/Scene/Scene-1-3.vue'
import Scene4 from '@/components/Scene/Scene-1-4.vue'
import Scene5 from '@/components/Scene/Scene-1-5.vue'
import Scene6 from '@/components/Scene/Scene-1-6.vue'
import Scene7 from '@/components/Scene/Scene-1-7.vue'

const props = defineProps<{
  currentScreenIndex: number
  isLoad: boolean
}>()

const emit = defineEmits<{
  (event: 'close', nextSceneIndex: number): void
}>()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const gameStore = useGameStore()
const { currentSceneIndex, currentMapStateIndex, currentMapAnimation, isMobile, rotationStop, motionBlur } = storeToRefs(gameStore)

const zoomFactor = computed(() => screenWidth.value / 1280)
const screen = reactive<Asset>({
  loaded: false,
  alias: 'map',
  states: [
    { x: -380, y: -260, scale: 0.94, alpha: 1, time: 0 },
    { x: -540, y: -250, scale: 1.64, alpha: 1, time: 2 },
    { x: -990, y: -560, scale: 1.96, alpha: 1, time: 5 },
    { x: -795, y: -590, scale: 2.01, alpha: 1, time: 7 },
    { x: -720, y: -405, scale: 1.97, alpha: 1, time: 9 },
    { x: -600, y: -270, scale: 2.01, alpha: 1, time: 10 },
    { x: -600, y: -270, scale: 2.01, alpha: 1, time: 10 },
    { x: -600, y: -270, scale: 2.01, alpha: 1, time: 10 },
  ],
  state: { x: 0, y: 0, scale: 1, alpha: 1, time: 0 },
  animation: 'init',
})

const station = reactive({ bg: { x: 725, y: 265, scale: 0.5 }, fg: { x: 867, y: 259.5, scale: 0.5 } })

const wave = reactive({
  x: 240,
  y: 1525,
  scale: 0.5,
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
  { type: 'pink', x: 460, y: 2770, scale: 0.5 },
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
  { x: 600, y: 2600, scale: 0.5, flip: true },
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
  { x: 370, y: 2800, scale: 0.5 },
])

const baloonStand = reactive({
  x: 755,
  y: 1160,
  scale: 0.5,
})

const charactersGeneric = ref<State[][]>([
  [
    { x: 1270, y: 550, scale: 0.425, alpha: 1, time: 0 },
    { x: 1606, y: 550, scale: 0.425, alpha: 1, time: 5 },
    { x: 1270, y: 550, scale: 0.425, alpha: 1, time: 10 },
  ],
  [
    { x: 1250, y: 685, scale: 0.425, alpha: 1, time: 0 },
    { x: 1250, y: 630, scale: 0.425, alpha: 1, time: 2 },
    { x: 1250, y: 685, scale: 0.425, alpha: 1, time: 4 },
  ],
  [
    { x: 820, y: 687, scale: 0.425, alpha: 1, time: 0 },
    { x: 820, y: 768, scale: 0.425, alpha: 1, time: 3 },
    { x: 820, y: 687, scale: 0.425, alpha: 1, time: 6 },
  ],
  [
    { x: 1480, y: 820, scale: 0.425, alpha: 1, time: 0 },
    { x: 1480, y: 936, scale: 0.425, alpha: 1, time: 2 },
    { x: 1480, y: 820, scale: 0.425, alpha: 1, time: 4 },
  ],
  [
    { x: 960, y: 1050, scale: 0.425, alpha: 1, time: 0 },
    { x: 960, y: 1100, scale: 0.425, alpha: 1, time: 1.5 },
    { x: 960, y: 1050, scale: 0.425, alpha: 1, time: 3 },
  ],
  [
    { x: 630, y: 1280, scale: 0.425, alpha: 1, time: 0 },
    { x: 740, y: 1280, scale: 0.425, alpha: 1, time: 1.5 },
    { x: 630, y: 1280, scale: 0.425, alpha: 1, time: 3 },
  ],
])

const characterStationMaster = reactive({
  states: [
    { x: 840, y: 515, scale: 0.48, alpha: 1, time: 0 },
    { x: 790, y: 512, scale: 0.48, alpha: 1, time: 1 },
  ],
  state: { x: 0, y: 0, scale: 1, alpha: 1, time: 0 },
})

const characterIcecreamVendor = reactive({
  states: [{ x: 835, y: 1235, scale: 0.55, alpha: 1, time: 0 }],
  state: { x: 0, y: 0, scale: 0.55, alpha: 1, time: 0 },
})

const characterMain = reactive<Asset>({
  loaded: false,
  alias: 'characterMain',
  states: [
    { x: 840, y: 514, scale: 1.5, alpha: 0, time: 0 },
    { x: 840, y: 515, scale: 1.5, alpha: 1, time: 0.25 },
    { x: 850, y: 515, scale: 1.5, alpha: 1, time: 0.5 },
    { x: 880, y: 515, scale: 1.5, alpha: 0, time: 1.25 }, // entering the tram
    { x: 896, y: 561, scale: 1.5, alpha: 0, time: 3 },
    { x: 1180, y: 561, scale: 1.5, alpha: 0, time: 6 }, //
    { x: 1180, y: 1008, scale: 1.5, alpha: 0, time: 9 }, //
    { x: 1670, y: 1008, scale: 1.5, alpha: 0, time: 12 }, //
    { x: 1670, y: 1280, scale: 1.5, alpha: 0, time: 14.25 }, // leaving the tram
    { x: 1620, y: 1280, scale: 1.5, alpha: 1, time: 15 }, // leaving the tram
    { x: 1020, y: 1280, scale: 1.5, alpha: 1, time: 20 },
    { x: 1020, y: 1237, scale: 1.75, alpha: 1, time: 21 },
    { x: 885, y: 1237, scale: 1.75, alpha: 1, time: 22.9 },
    { x: 885, y: 1238, scale: 1.75, alpha: 1, time: 23 },
  ],
  state: { x: 0, y: 0, scale: 0, alpha: 0, time: 0 },
  animation: 'init',
})

const tram = reactive<Asset>({
  loaded: false,
  alias: 'tram',
  states: [
    { x: 902, y: 515, scale: 0.5, alpha: 0, time: 0 },
    { x: 902, y: 520, scale: 0.5, alpha: 1, time: 0.5 },
    { x: 902, y: 520, scale: 0.5, alpha: 1, time: 1.5 }, // entering the tram
    { x: 902, y: 561, scale: 0.5, alpha: 1, time: 3.5 }, //
    { x: 1178, y: 561, scale: 0.5, alpha: 1, time: 6 }, //
    { x: 1178, y: 1008, scale: 0.5, alpha: 1, time: 9 }, //
    { x: 1670, y: 1008, scale: 0.5, alpha: 1, time: 12 }, //
    { x: 1670, y: 1280, scale: 0.5, alpha: 1, time: 14.5 }, // leaving the tram
    { x: 1670, y: 1280, scale: 0.5, alpha: 1, time: 15 },
    { x: 1670, y: 2040, scale: 0.5, alpha: 1, time: 23 },
    { x: 2490, y: 2040, scale: 0.5, alpha: 1, time: 32 },
    { x: 2490, y: 1708, scale: 0.5, alpha: 1, time: 36 },
    { x: 2490, y: 1695, scale: 0.5, alpha: 0, time: 36.5 },
  ],
  state: { x: 0, y: 0, scale: 0, alpha: 0, time: 0 },
  animation: 'init',
})

const mapHeight = ref(3844 * 2)
const mapWidth = ref(3124 * 2)
const clouds = ref<
  {
    size: 'lg' | 'md' | 'sm'
    x: number
    y: number
    direction: number
  }[]
>([
  { size: 'lg', x: -100, y: mapHeight.value * 0.2, direction: 1 },
  { size: 'lg', x: -300, y: mapHeight.value * 0.32, direction: 1 },
  { size: 'lg', x: -600, y: mapHeight.value * 0.46, direction: 1 },
  { size: 'sm', x: -200, y: mapHeight.value * 0.54, direction: 1 },
  { size: 'md', x: -50, y: mapHeight.value * 0.66, direction: 1 },
  { size: 'lg', x: -250, y: mapHeight.value * 0.69, direction: 1 },
  { size: 'sm', x: -50, y: mapHeight.value * 0.78, direction: 1 },
  { size: 'md', x: -300, y: mapHeight.value * 0.9, direction: 1 },
  { size: 'sm', x: -600, y: mapHeight.value * 0.96, direction: 1 },
])

watchEffect(() => {
  if (currentSceneIndex.value === 6 && currentMapAnimation.value === 'finished') emit('close', 1)
})

function lockCharaterToMapCenter(x: number, y: number) {
  screen.state.x = -1.005 * x + 324.49
  screen.state.y = -1.005 * y + screenHeight.value / 2 - 308 / 4
  currentMapAnimation.value = 'started'
}

function onCharacterStop() {
  emit('close', 3)
}

function onLoad() {
  screen.state.x = screen.states[0].x
  screen.state.y = screen.states[0].y
  screen.state.scale = screen.states[0].scale
  screen.state.time = screen.states[0].time
  screen.loaded = true
  currentMapAnimation.value = 'started'
  characterStationMaster.state = characterStationMaster.states[0]
  characterIcecreamVendor.state = characterIcecreamVendor.states[0]
}

onMounted(onLoad)

let totalElaspedTime = 0
let progress = 0

onTick((delta) => {
  if (!rotationStop.value && currentMapAnimation.value === 'started') {
    totalElaspedTime += delta / 100
    const dt = screen.states[currentMapStateIndex.value + 1].time - screen.states[currentMapStateIndex.value].time
    const dx = screen.states[currentMapStateIndex.value + 1].x - screen.states[currentMapStateIndex.value].x
    const dy = screen.states[currentMapStateIndex.value + 1].y - screen.states[currentMapStateIndex.value].y
    const ds = screen.states[currentMapStateIndex.value + 1].scale - screen.states[currentMapStateIndex.value].scale

    progress = Math.min(totalElaspedTime / dt, 1)
    screen.state.x = screen.states[currentMapStateIndex.value].x + dx * progress
    screen.state.y = screen.states[currentMapStateIndex.value].y + dy * progress
    screen.state.scale = screen.states[currentMapStateIndex.value].scale + ds * progress
    screen.state.time = screen.states[currentMapStateIndex.value].time + dt * progress

    if (progress == 1) {
      totalElaspedTime = 0
      currentMapAnimation.value = 'finished'

      if (props.currentScreenIndex === 2 && currentMapAnimation.value === 'finished') {
        tram.animation = 'started'
        characterMain.animation = 'started'
        characterStationMaster.state = characterStationMaster.states[1]
      }

      console.log(
        'currentSceneIndex',
        currentSceneIndex.value,
        'currentMapStateIndex',
        currentMapStateIndex.value,
        'currentScreenIndex',
        props.currentScreenIndex,
        'currentMapAnimation',
        currentMapAnimation.value
      )
    }
  }
})

watch(currentMapAnimation, (value) => {
  gameStore.toggleMotionBlur(value === 'started')
})
</script>

<template>
  <Container :x="screen.state.x * screen.state.scale * zoomFactor" :y="screen.state.y * screen.state.scale * zoomFactor" :scale="screen.state.scale * zoomFactor">
    <Sprite :texture="screen.alias" :texture-options="{ scaleMode: motionBlur ? SCALE_MODES.LINEAR : SCALE_MODES.NEAREST }" :x="0" :y="0" :scale="isMobile ? 1 : 1" :anchor="0" />
    <Sprite texture="stationBg" :texture-options="{ scaleMode: motionBlur ? SCALE_MODES.LINEAR : SCALE_MODES.NEAREST }" :x="station.bg.x" :y="station.bg.y" :scale="station.bg.scale" :anchor="0" />
    <Wave :x="wave.x" :y="wave.y" :scale="wave.scale" />
    <!-- @vue-ignore -->
    <Flag v-for="({ type, x, y, scale }, index) in flags" :key="index" :type="type" :x="x" :y="y" :scale="scale" />
    <Fountain :x="fountain.x" :y="fountain.y" :scale="fountain.scale" />
    <Pigeon v-for="({ x, y, scale, flip }, index) in pegions" :key="index" :x="x" :y="y" :scale="scale" :flip="flip" />
    <StreetLamp v-for="({ x, y, scale }, index) in streetLamp" :key="index" :x="x" :y="y" :scale="scale" />
    <CharacterGeneric v-for="(genericCharacter, index) of charactersGeneric" :key="index" :states="genericCharacter" :animation="true" place="map" />
    <CharacterStationMaster place="map" :state="characterStationMaster.state" />
    <CharacterMain
      :states="characterMain.states"
      :animation="!rotationStop && characterMain.animation === 'started'"
      initalOrientation="front"
      @move="lockCharaterToMapCenter"
      @playing="onCharacterStop" />
    <CharacterIcecreamVendor place="map" :state="characterIcecreamVendor.state" />
    <MapTram :states="tram.states" :animation="!rotationStop && tram.animation === 'started'" :motion-blur="motionBlur" initalOrientation="right" />
    <Sprite texture="stationFg" :texture-options="{ scaleMode: motionBlur ? SCALE_MODES.LINEAR : SCALE_MODES.NEAREST }" :x="station.fg.x" :y="station.fg.y" :scale="station.fg.scale" :anchor="0" />
    <!-- @vue-ignore -->
    <MapCloud v-for="({ size, x, y, direction }, index) in clouds" :key="index" :width-range="mapWidth" :size="size" :x="x" :y="y" :direction="direction" />
    <BaloonStand :x="baloonStand.x" :y="baloonStand.y" :scale="baloonStand.scale" />
    <!-- <template v-if="isLoad"> -->
    <Scene1 v-if="currentSceneIndex === 0 && currentMapAnimation === 'finished'" />
    <Scene2 v-else-if="currentSceneIndex === 1 && currentMapAnimation === 'finished'" />
    <Scene3 v-else-if="currentSceneIndex === 2 && currentMapAnimation === 'finished'" />
    <Scene4 v-else-if="currentSceneIndex === 3 && currentMapAnimation === 'finished'" />
    <Scene5 v-else-if="currentSceneIndex === 4 && currentMapAnimation === 'finished'" />
    <Scene6 v-else-if="currentSceneIndex === 5 && currentMapAnimation === 'finished'" />
    <Scene7 v-else-if="currentSceneIndex === 9" />
    <!-- </template> -->
  </Container>
  <!-- DEBUG -->
  <!-- <External>
        <div class="absolute bottom-0 left-0 right-0 z-50 flex w-fit items-center gap-8">
          <div class="flex flex-col gap-2">
            <input v-model="screen.state.x" type="number" min="-10000" max="10000" step="10" />
            <input v-model="screen.state.y" type="number" min="-10000" max="10000" step="10" />
            <input v-model="screen.state.scale" type="number" min="0" max="10" step="0.01" />
          </div>
          <div class="flex flex-col gap-2">
            <input v-model="baloonStand.x" type="number" min="-10000" max="10000" step="10" />
            <input v-model="baloonStand.y" type="number" min="-10000" max="10000" step="10" />
            <input v-model="baloonStand.scale" type="number" min="0" max="20" step="0.01" />
          </div>
        </div>
      </External> -->
  <!-- </template> -->
  <!-- </Loader> -->
</template>
