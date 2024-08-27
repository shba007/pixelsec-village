<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch, watchEffect } from 'vue'
import { External, onTick } from 'vue3-pixi'
import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import type { Asset, State } from '@/utils/types'
import { SCALE_MODES } from '@/utils/types'

import StreetLamp from '@/components/Animation/StreetLamp.vue'
import Pigeon from '@/components/Animation/Pigeon.vue'
import Flag from '@/components/Animation/Flag.vue'
import Wave from '@/components/Animation/Wave.vue'
import Cloud from '@/components/Animation/Cloud.vue'
import MapTram from '@/components/Animation/MapTram.vue'
import Fountain from '@/components/Animation/Fountain.vue'
import BaloonStand from '@/components/Animation/BaloonStand.vue'
import AppSign from '@/components/Animation/AppSign.vue'
import Car from '@/components/Animation/Car.vue'
import Boat from '@/components/Animation/Boat.vue'
import Wolf from '@/components/Animation/Wolf.vue'
import CharacterGeneric from '@/components/Animation/Character/CharacterGeneric.vue'
import CharacterStationMaster from '@/components/Animation/Character/CharacterStationMaster.vue'
import CharacterIcecreamVendor from '@/components/Animation/Character/CharacterIcecreamVendor.vue'
import CharacterBaloonVendor from '@/components/Animation/Character/CharacterBaloonVendor.vue'
import CharacterPanic from '@/components/Animation/Character/CharacterPanic.vue'
import CharacterMain from '@/components/Animation/Character/CharacterMain.vue'
import CharacterGuard from '@/components/Animation/Character/CharacterGuard.vue'
import CharacterSus from '@/components/Animation/Character/CharacterSus.vue'
import ModalProtip from '@/components/ModalProtip.vue'

import Scene1 from '@/components/Scene/Scene-1-1.vue'
import Scene2 from '@/components/Scene/Scene-1-2.vue'
import Scene3 from '@/components/Scene/Scene-1-3.vue'
import Scene4 from '@/components/Scene/Scene-1-4.vue'
import Scene5 from '@/components/Scene/Scene-1-5.vue'
import Scene6 from '@/components/Scene/Scene-1-6.vue'
import Scene8 from '@/components/Scene/Scene-1-8.vue'
import Scene9 from '@/components/Scene/Scene-1-9.vue'
import Scene10 from '@/components/Scene/Scene-1-10.vue'
import Scene11 from '@/components/Scene/Scene-1-11.vue'
import SceneResult from '@/components/Scene/Scene-Result.vue'

const props = defineProps<{
  currentScreenIndex: number
  isLoad: boolean
}>()

const emit = defineEmits<{
  (event: 'close', nextSceneIndex: number): void
}>()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const gameStore = useGameStore()
const { currentSceneIndex, currentMapStateIndex, currentScreenAnimation, currentScreenState, rotationStop, motionBlur, characterSkin } = storeToRefs(gameStore)

const zoomFactor = computed(() => screenWidth.value / 1280)
const screen = reactive<Asset>({
  loaded: false,
  alias: 'mapBg',
  states: [
    { x: -380, y: -260, scale: 0.94, alpha: 1, time: 0 },
    { x: -540, y: -250, scale: 1.64, alpha: 1, time: 2 },
    { x: -990, y: -560, scale: 1.96, alpha: 1, time: 5 },
    { x: -795, y: -590, scale: 2.01, alpha: 1, time: 7 },
    { x: -720, y: -405, scale: 1.97, alpha: 1, time: 9 },
    { x: -600, y: -270, scale: 2.01, alpha: 1, time: 10 },
    // Transition
    { x: -610, y: -1170, scale: 2.01, alpha: 1, time: 10 },
    { x: -890, y: -1630, scale: 2.01, alpha: 1, time: 10 },
    { x: -860, y: -1900, scale: 2.01, alpha: 1, time: 10 },
    { x: -90, y: -2550, scale: 2.01, alpha: 1, time: 10 },
    { x: -845, y: -2640, scale: 2.01, alpha: 1, time: 10 },
    { x: -2220, y: -2760, scale: 2.01, alpha: 1, time: 10 },
  ],
  state: { x: 0, y: 0, scale: 1, alpha: 1, time: 0 },
  animation: 'init',
})

const station = reactive({
  bg: { x: 725, y: 265, scale: 1 },
  fg: { x: 725, y: 265, scale: 1 },
})

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

const pigeons = ref([
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

const wolfs = ref([
  // { x: 2480, y: 2270, scale: 0.5, flip: false },
  { x: 2050, y: 2310, scale: 0.5, flip: false },
  { x: 2770, y: 2810, scale: 0.5, flip: true },
  { x: 2510, y: 2950, scale: 0.5, flip: false },
])

const baloonStand = reactive({
  x: 755,
  y: 1160,
  scale: 0.5,
})

const appSign = reactive({
  x: 1087.5,
  y: 1582.5,
  scale: 0.525,
})

const car = reactive({
  x: 770,
  y: 1500,
  scale: 1,
  widthRange: 50,
  direction: -1,
})

const fence = reactive({
  alias: 'mapFence',
  x: 348,
  y: 2820,
  scale: 1,
})

const palmTrees = reactive({
  alias: 'mapPalmTrees',
  x: 1690,
  y: 2610,
  scale: 1,
})

const boats = ref([
  // { x: 510, y: 3000, scale: 1 },
  { x: 630, y: 3000, scale: 1 },
  { x: 750, y: 3000, scale: 1 },
  { x: 870, y: 3000, scale: 1 },
  { x: 990, y: 3000, scale: 1 },
  { x: 1110, y: 3000, scale: 1 },
])

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
  [
    { x: 1060, y: 1520, scale: 0.425, alpha: 1, time: 0 },
    { x: 1220, y: 1520, scale: 0.425, alpha: 1, time: 2.2 },
    { x: 1060, y: 1520, scale: 0.425, alpha: 1, time: 4.4 },
  ],
  [
    { x: 870, y: 2290, scale: 0.425, alpha: 1, time: 0 },
    { x: 1030, y: 2290, scale: 0.425, alpha: 1, time: 2.2 },
    { x: 870, y: 2290, scale: 0.425, alpha: 1, time: 4.4 },
  ],
])

const charactersPanic = ref([
  {
    type: 'green',
    states: [
      { x: 1040, y: 1752.5, scale: 0.425, alpha: 0, time: 0 },
      { x: 1030, y: 1752.5, scale: 0.425, alpha: 1, time: 0.25 },
      { x: 980, y: 1752.5, scale: 0.425, alpha: 1, time: 1.5 },
      { x: 1030, y: 1752.5, scale: 0.425, alpha: 1, time: 2.75 },
      { x: 1040, y: 1752.5, scale: 0.425, alpha: 0, time: 4 },
    ],
  },
  {
    type: 'purple',
    states: [
      { x: 1090, y: 1752.5, scale: 0.425, alpha: 0, time: 0 },
      { x: 1100, y: 1752.5, scale: 0.425, alpha: 1, time: 0.25 },
      { x: 1130, y: 1752.5, scale: 0.425, alpha: 1, time: 1.5 },
      { x: 1100, y: 1752.5, scale: 0.425, alpha: 1, time: 2.75 },
      { x: 1090, y: 1752.5, scale: 0.425, alpha: 0, time: 3.5 },
      { x: 1090, y: 1752.5, scale: 0.425, alpha: 0, time: 4 },
    ],
  },
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

const characterGuard = reactive({
  states: [{ x: 1470, y: 1740, scale: 0.5, alpha: 1, time: 0 }],
  state: { x: 1470, y: 1740, scale: 0.5, alpha: 1, time: 0 },
})

const characterBaloonVendor = reactive({
  states: [{ x: 1230, y: 2750, scale: 0.5, alpha: 1, time: 0 }],
  state: { x: 1230, y: 2750, scale: 0.5, alpha: 1, time: 0 },
})
const speedFactor = 0.25

const characterMain = reactive<Asset>({
  loaded: false,
  alias: 'characterMain',
  states: [
    { x: 840, y: 514, scale: 1.5, alpha: 0, time: 0 },
    { x: 840, y: 515, scale: 1.5, alpha: 1, time: 0.25 },
    { x: 850, y: 515, scale: 1.5, alpha: 1, time: 0.5 },
    { x: 900, y: 515, scale: 1.5, alpha: 0, time: 1.25 }, // entering the tram
    { x: 900, y: 561, scale: 1.5, alpha: 0, time: 3 },
    { x: 1180, y: 561, scale: 1.5, alpha: 0, time: 6 }, //
    { x: 1180, y: 1008, scale: 1.5, alpha: 0, time: 9 }, //
    { x: 1670, y: 1008, scale: 1.5, alpha: 0, time: 12 }, //
    { x: 1670, y: 1190, scale: 1.5, alpha: 0, time: 14.25 }, // leaving the tram
    { x: 1620, y: 1190, scale: 1.5, alpha: 1, time: 15 }, // leaving the tram
    { x: 1620, y: 1280, scale: 1.5, alpha: 1, time: 16.5 }, // leaving the tram
    { x: 1020, y: 1280, scale: 1.5, alpha: 1, time: 20 },
    { x: 1020, y: 1237, scale: 1.75, alpha: 1, time: 20 + 1.72 * speedFactor },
    // at park 13
    { x: 885, y: 1237, scale: 1.75, alpha: 1, time: 20 + 7.12 * speedFactor },
    { x: 885, y: 1238, scale: 1.75, alpha: 1, time: 20 + 7.16 * speedFactor },
    { x: 930, y: 1238, scale: 1.5, alpha: 1, time: 20 + 8.96 * speedFactor },
    { x: 930, y: 1780, scale: 1.5, alpha: 1, time: 20 + 30.64 * speedFactor },
    // at bank 18
    { x: 1410, y: 1780, scale: 1.5, alpha: 1, time: 20 + 49.84 * speedFactor },
    { x: 1410, y: 2020, scale: 1.5, alpha: 1, time: 20 + 59.44 * speedFactor },
    // at park 20
    { x: 1315, y: 2085, scale: 1.5, alpha: 1, time: 20 + 64.06 * speedFactor },
    { x: 1220, y: 2150, scale: 1.5, alpha: 1, time: 20 + 68.65 * speedFactor },
    { x: 1100, y: 2150, scale: 1.5, alpha: 1, time: 20 + 73.45 * speedFactor },
    { x: 1020, y: 2090, scale: 1.5, alpha: 1, time: 20 + 77.45 * speedFactor },
    { x: 1020, y: 1960, scale: 1.5, alpha: 1, time: 20 + 82.65 * speedFactor },
    { x: 1110, y: 1910, scale: 1.5, alpha: 1, time: 20 + 86.77 * speedFactor },
    { x: 1230, y: 1910, scale: 1.5, alpha: 1, time: 20 + 91.57 * speedFactor },
    { x: 1290, y: 2030, scale: 1.5, alpha: 1, time: 20 + 96.93 * speedFactor },
    // loop starts 28
    { x: 1250, y: 2150, scale: 1.5, alpha: 1, time: 20 + 101.99 * speedFactor },
    { x: 1030, y: 2150, scale: 1.5, alpha: 1, time: 20 + 110.79 * speedFactor },
    { x: 1250, y: 2150, scale: 1.5, alpha: 1, time: 20 + 119.59 * speedFactor },
    // loop ends 31
    { x: 1405, y: 2070, scale: 1.5, alpha: 1, time: 20 + 126.57 * speedFactor },
    { x: 1405, y: 2310, scale: 1.5, alpha: 1, time: 20 + 136.17 * speedFactor },
    { x: 1170, y: 2310, scale: 1.5, alpha: 1, time: 20 + 145.57 * speedFactor },
    { x: 1170, y: 2550, scale: 1.5, alpha: 1, time: 20 + 155.17 * speedFactor },
    { x: 410, y: 2550, scale: 1.5, alpha: 1, time: 20 + 185.57 * speedFactor },
    // stop for the ballon 36
    { x: 410, y: 2790, scale: 1.5, alpha: 1, time: 20 + 195.13 * speedFactor },
    { x: 1165, y: 2790, scale: 1.5, alpha: 1, time: 20 + 225.33 * speedFactor },
    { x: 1670, y: 2790, scale: 1.5, alpha: 1, time: 20 + 245.57 * speedFactor },
    { x: 1670, y: 2590, scale: 1.5, alpha: 1, time: 20 + 253.57 * speedFactor },
    { x: 2300, y: 2590, scale: 1.5, alpha: 1, time: 20 + 278.77 * speedFactor },
    { x: 2300, y: 2960, scale: 1.5, alpha: 1, time: 20 + 293.57 * speedFactor },
    // loop starts 42
    { x: 2680, y: 2960, scale: 1.5, alpha: 1, time: 20 + 308.77 * speedFactor },
    { x: 2680, y: 3000, scale: 1.5, alpha: 1, time: 20 + 310.37 * speedFactor },
    { x: 2680, y: 2960, scale: 1.5, alpha: 1, time: 20 + 311.97 * speedFactor },
    { x: 2680, y: 3000, scale: 1.5, alpha: 1, time: 20 + 313.57 * speedFactor },
  ],
  state: { x: 0, y: 0, scale: 0, alpha: 0, time: 0, index: 0 },
  animation: 'init',
})

const characterSus = reactive<Asset>({
  loaded: false,
  alias: 'characterSus',
  states: [
    { x: 1250 - 20, y: 1990 + 20, scale: 0.45, alpha: 1, time: 0 },
    { x: 1320 - 20, y: 2080 + 20, scale: 0.45, alpha: 1, time: 0.75 },
    // in the pond
    { x: 1220 - 20, y: 2150 + 20, scale: 0.45, alpha: 1, time: 2.75 - 3.35 * speedFactor },
    { x: 1100 - 20, y: 2150 + 20, scale: 0.45, alpha: 1, time: 2.75 + 1.45 * speedFactor },
    { x: 1020 - 20, y: 2090 + 20, scale: 0.45, alpha: 1, time: 2.75 + 5.45 * speedFactor },
    { x: 1020 - 20, y: 1960 + 20, scale: 0.45, alpha: 1, time: 2.75 + 10.65 * speedFactor },
    { x: 1110 - 20, y: 1910 + 20, scale: 0.45, alpha: 1, time: 2.75 + 14.77 * speedFactor },
    { x: 1230 - 20, y: 1910 + 20, scale: 0.45, alpha: 1, time: 2.75 + 19.57 * speedFactor },
    { x: 1290 - 20, y: 2030 + 20, scale: 0.45, alpha: 1, time: 2.75 + 24.93 * speedFactor },
    // loop starts
    { x: 1250 - 20, y: 2150 + 20, scale: 0.45, alpha: 1, time: 2.75 + 29.99 * speedFactor },
    { x: 1030 - 20, y: 2150 + 20, scale: 0.45, alpha: 1, time: 2.75 + 38.79 * speedFactor },
    { x: 1250 - 20, y: 2150 + 20, scale: 0.45, alpha: 1, time: 2.75 + 47.59 * speedFactor },
    //
    { x: 1320 - 20, y: 2080 + 20, scale: 0.45, alpha: 1, time: 2.75 + 47.59 * speedFactor + 1 },
    { x: 1250 - 20, y: 1990 + 20, scale: 0.45, alpha: 1, time: 2.75 + 47.59 * speedFactor + 2 },
  ],
  state: { x: 1230, y: 2010, scale: 0.45, alpha: 1, time: 1 },
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
    { x: 1670, y: 1190, scale: 0.5, alpha: 1, time: 14.5 }, // leaving the tram
    { x: 1670, y: 1190, scale: 0.5, alpha: 1, time: 15 },
    { x: 1670, y: 2040, scale: 0.5, alpha: 1, time: 23 },
    { x: 2490, y: 2040, scale: 0.5, alpha: 1, time: 32 },
    { x: 2490, y: 1708, scale: 0.5, alpha: 1, time: 36 },
    { x: 2490, y: 1695, scale: 0.5, alpha: 0, time: 36.5 },
  ],
  state: { x: 0, y: 0, scale: 0, alpha: 0, time: 0 },
  animation: 'init',
})

const mapHeight = ref(3844)
const mapWidth = ref(3124)
const clouds = ref<
  {
    size: 'lg' | 'md' | 'sm'
    x: number
    y: number
    direction: number
  }[]
>([
  { size: 'lg', x: -100, y: 0.2, direction: 1 },
  { size: 'lg', x: -300, y: 0.32, direction: 1 },
  { size: 'lg', x: -600, y: 0.46, direction: 1 },
  { size: 'sm', x: -200, y: 0.54, direction: 1 },
  { size: 'md', x: -50, y: 0.66, direction: 1 },
  { size: 'lg', x: -250, y: 0.69, direction: 1 },
  { size: 'sm', x: -50, y: 0.78, direction: 1 },
  { size: 'md', x: -300, y: 0.9, direction: 1 },
  { size: 'sm', x: -600, y: 0.96, direction: 1 },
])

watch(currentScreenAnimation, (value) => {
  gameStore.toggleMotionBlur(value === 'started')
})

function onLoad() {
  screen.state.x = screen.states[0].x
  screen.state.y = screen.states[0].y
  screen.state.scale = screen.states[0].scale
  screen.state.time = screen.states[0].time
  screen.loaded = true
  currentScreenAnimation.value = 'started'
  characterStationMaster.state = characterStationMaster.states[0]
  characterIcecreamVendor.state = characterIcecreamVendor.states[0]
  characterMain.state.index = 0
  // characterMain.state.index = 48
  // characterMain.animation = 'started'
}

onBeforeMount(onLoad)

function lockCharacterToMapCenter(x: number, y: number) {
  const offset = { x: 320, y: screenHeight.value / 2 / (zoomFactor.value * screen.state.scale) }
  screen.state.x = -x + offset.x
  screen.state.y = -y + offset.y
  screen.state.scale = 2.01
  gameStore.updateScreen(screen.state)
  // currentScreenAnimation.value = 'started'
}

let totalElapsedTime = 0
let progress = 0

onTick((delta) => {
  if (!rotationStop.value && currentScreenAnimation.value === 'started' && currentMapStateIndex.value < screen.states.length - 1) {
    totalElapsedTime += delta / 100
    const dt = screen.states[currentMapStateIndex.value + 1].time - screen.states[currentMapStateIndex.value].time
    const dx = screen.states[currentMapStateIndex.value + 1].x - screen.states[currentMapStateIndex.value].x
    const dy = screen.states[currentMapStateIndex.value + 1].y - screen.states[currentMapStateIndex.value].y
    const ds = screen.states[currentMapStateIndex.value + 1].scale - screen.states[currentMapStateIndex.value].scale

    progress = Math.min(totalElapsedTime / dt, 1)
    gameStore.updateScreen({
      x: screen.states[currentMapStateIndex.value].x + dx * progress,
      y: screen.states[currentMapStateIndex.value].y + dy * progress,
      scale: screen.states[currentMapStateIndex.value].scale + ds * progress,
      time: screen.states[currentMapStateIndex.value].time + dt * progress,
      alpha: 1
    })

    if (progress == 1) {
      totalElapsedTime = 0
      currentScreenAnimation.value = 'finished'
    }
  }
})


watchEffect(() => {
  if (props.currentScreenIndex === 2 && currentScreenAnimation.value === 'finished') {
    tram.animation = 'started'
    characterMain.animation = 'started'
    characterStationMaster.state = characterStationMaster.states[1]
  } else if (props.currentScreenIndex === 4 && currentScreenAnimation.value === 'finished') {
    characterMain.animation = 'started'
  } else if (props.currentScreenIndex === 6 && currentScreenAnimation.value === 'finished') {
    characterMain.animation = 'started'
  }
})

watchEffect(() => {
  if (currentSceneIndex.value === 6 && currentScreenAnimation.value === 'finished') {
    emit('close', 1)
  } else if (currentSceneIndex.value === 10 && currentScreenAnimation.value === 'finished') {
    characterMain.animation = 'finished'
    emit('close', 3)
  } else if (currentSceneIndex.value === 14) {
    characterMain.animation = 'finished'
    emit('close', 5)
  } else if (currentSceneIndex.value === 23) {
    characterMain.animation = 'started'
    characterSus.animation = 'started'
  } else if (currentSceneIndex.value === 25) {
    characterMain.animation = 'started'
  } else if (currentSceneIndex.value === 27) {
    characterMain.animation = 'started'
  }
})

const mcStateIndex = ref(0)
function handleMCState(stateIndex: number) {
  mcStateIndex.value = stateIndex
  // in 25 character state

  if (stateIndex === 13) {
    characterMain.animation = 'finished'
    gameStore.nextScene()
  } else if (stateIndex === 16) {
    characterMain.animation = 'finished'
    gameStore.nextScene()
  } else if (stateIndex === 19) {
    characterSus.animation = 'started'
  } else if (stateIndex === 27) {
    // Show Popup
    // MC in Loop
    characterMain.animation = 'finished'
    characterSus.animation = 'finished'
    gameStore.nextScene()
  } else if (stateIndex === 35) {
    // Show Popup
    characterMain.animation = 'finished'
    gameStore.nextScene()
  } else if (stateIndex === 36) {
    // Show Popup
    characterMain.animation = 'finished'
    gameStore.nextScene()
  } else if (stateIndex === 38) {
    console.log("*****Triggered Show Popup*****")
    gameStore.nextScene()
  } else if (stateIndex === 41) {
    gameStore.nextScene()
  }
}

function handleMCAnimation(state: string) {
  // if (state === 'finished') {
  // screen.state.x = screen.states[currentMapStateIndex.value].x
  // screen.state.y = screen.states[currentMapStateIndex.value].y
  // screen.state.scale = screen.states[currentMapStateIndex.value].scale
  // screen.state.time = screen.states[currentMapStateIndex.value].time
  // currentScreenAnimation.value = 'finished'
  // }
}
</script>

<template>
  <Container :renderable="isLoad">
    <Container :x="currentScreenState.x * currentScreenState.scale * zoomFactor"
      :y="currentScreenState.y * currentScreenState.scale * zoomFactor" :scale="currentScreenState.scale * zoomFactor">
      <Sprite texture="mapBg" :texture-options="{ scaleMode: motionBlur ? SCALE_MODES.LINEAR : SCALE_MODES.NEAREST }"
        :x="0" :y="0" :scale="1" :anchor="0" />
      <Wolf v-for="({ x, y, scale, flip }, index) of wolfs" :key="index" :x="x" :y="y" :scale="scale" :flip="flip" />
      <Sprite texture="mapFg" :texture-options="{ scaleMode: motionBlur ? SCALE_MODES.LINEAR : SCALE_MODES.NEAREST }"
        :x="0" :y="0" :scale="1" :anchor="0" />
      <Sprite texture="mapStationBg"
        :texture-options="{ scaleMode: motionBlur ? SCALE_MODES.LINEAR : SCALE_MODES.NEAREST }" :x="station.bg.x"
        :y="station.bg.y" :scale="station.bg.scale" :anchor="0" />
      <Fountain :x="fountain.x" :y="fountain.y" :scale="fountain.scale" />
      <Pigeon v-for="({ x, y, scale, flip }, index) in pigeons" :key="index" :x="x" :y="y" :scale="scale"
        :flip="flip" />
      <Flag v-for="({ type, x, y, scale }, index) in flags" :key="index" :type="type" :x="x" :y="y" :scale="scale" />
      <MapTram :states="tram.states" :animation="!rotationStop && tram.animation === 'started'"
        :motion-blur="motionBlur" initialOrientation="right" />
      <Sprite texture="mapStationFg"
        :texture-options="{ scaleMode: motionBlur ? SCALE_MODES.LINEAR : SCALE_MODES.NEAREST }" :x="station.fg.x"
        :y="station.fg.y" :scale="station.fg.scale" :anchor="0" />
      <!-- <Wave :x="wave.x" :y="wave.y" :scale="wave.scale" /> -->
      <!-- @vue-ignore -->
      <StreetLamp v-for="({ x, y, scale }, index) in streetLamp" :key="index" :x="x" :y="y" :scale="scale" />
      <CharacterGeneric v-for="(states, index) of charactersGeneric" :key="index" :states="states" :animation="true"
        place="map" />
      <CharacterStationMaster place="map" :state="characterStationMaster.state" />
      <CharacterPanic v-for="({ type, states }, index) of charactersPanic" :key="index" :states="states"
        :type="type as 'purple' | 'green'" place="map" />
      <CharacterIcecreamVendor place="map" :state="characterIcecreamVendor.state" />
      <CharacterGuard place="map" :state="characterGuard.state" />
      <CharacterBaloonVendor :state="characterBaloonVendor.state" />
      <BaloonStand :x="baloonStand.x" :y="baloonStand.y" :scale="baloonStand.scale" />
      <AppSign :x="appSign.x" :y="appSign.y" :scale="appSign.scale" />
      <Car :x="car.x" :y="car.y" :scale="car.scale" :width-range="car.widthRange" :direction="car.direction" />
      <Boat v-for="({ x, y, scale }, index) of boats" :key="index" :x="x" :y="y" :scale="scale" />
    </Container>
    <Container v-if="!rotationStop">
      <Scene1 v-if="currentSceneIndex === 0 && currentScreenAnimation === 'finished'" />
      <Scene2 v-else-if="currentSceneIndex === 1 && currentScreenAnimation === 'finished'" />
      <Scene3 v-else-if="currentSceneIndex === 2 && currentScreenAnimation === 'finished'" />
      <Scene4 v-else-if="currentSceneIndex === 3 && currentScreenAnimation === 'finished'" />
      <Scene5 v-else-if="currentSceneIndex === 4 && currentScreenAnimation === 'finished'" />
      <Scene6 v-else-if="currentSceneIndex === 5 && currentScreenAnimation === 'finished'" />
      <!-- <Scene7 v-else-if="currentSceneIndex === 9 && currentScreenAnimation === 'finished'" /> -->
      <Scene8 v-else-if="currentSceneIndex === 21 && currentScreenAnimation === 'finished'" />
      <Scene9 v-else-if="currentSceneIndex === 22 && currentScreenAnimation === 'finished'" />
      <Scene10 v-else-if="currentSceneIndex === 24 && currentScreenAnimation === 'finished'" />
      <Scene11 v-else-if="currentSceneIndex === 26 && currentScreenAnimation === 'finished'" />
      <!-- <Scene11 v-else-if="currentSceneIndex === 28 && currentScreenAnimation === 'finished'" /> -->
      <SceneResult v-else-if="currentSceneIndex === 29 && currentScreenAnimation === 'finished'" />
    </Container>
    <Container v-if="!rotationStop">
      <ModalProtip v-if="mcStateIndex === 1 || mcStateIndex === 2 || mcStateIndex === 3" title="1" y="top" />
      <ModalProtip v-else-if="mcStateIndex === 14" title="2" y="top" />
      <ModalProtip v-else-if="mcStateIndex === 33" title="4" y="top" />
      <ModalProtip v-else-if="mcStateIndex === 37" title="5" x="left" />
    </Container>
    <Container :x="screen.state.x * screen.state.scale * zoomFactor"
      :y="screen.state.y * screen.state.scale * zoomFactor" :scale="screen.state.scale * zoomFactor">
      <CharacterMain :states="characterMain.states" :animation="rotationStop ? 'finished' : characterMain.animation"
        :skin="characterSkin" :currentCharacterStateIndex="characterMain.state.index" @move="lockCharacterToMapCenter"
        @updateStateIndex="handleMCState" @updateAnimation="handleMCAnimation" />
      <CharacterSus :states="characterSus.states" :animation="rotationStop ? 'finished' : characterSus.animation" />
      <Sprite :texture="fence.alias" :x="fence.x" :y="fence.y" :scale="fence.scale" />
      <Sprite :texture="palmTrees.alias" :x="palmTrees.x" :y="palmTrees.y" :scale="palmTrees.scale" />
      <!-- @vue-ignore -->
      <!--  <Cloud v-for="({ size, x, y, direction }, index) in clouds" :key="index" place="map" :size="size" :x="x"
        :y="mapHeight * screen.state.scale * y" :scale="0.5" :direction="direction" :width-range="mapWidth" /> -->
    </Container>
    <!-- DEBUG -->
    <External>
      <div class="fixed left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 bg-red-500" />
      <div class="fixed bottom-0 left-0 z-50 flex w-fit items-center gap-8">
        <div class="flex flex-col gap-2">
          <input v-model="currentScreenState.x" type="number" min="-10000" max="10000" step="10" />
          <input v-model="currentScreenState.y" type="number" min="-10000" max="10000" step="10" />
          <input v-model="currentScreenState.scale" type="number" min="0" max="10" step="0.01" />
          <input v-model="currentScreenState.time" type="number" min="0" max="10" step="0.01" />
          <input v-model="currentMapStateIndex" type="number" min="0" max="20" step="1" />
        </div>
        <!--  <div class="flex flex-col gap-2">
          <input v-model="charactersGeneric[0][0].x" type="number" min="-10000" max="10000" step="10" />
          <input v-model="charactersGeneric[0][0].y" type="number" min="-10000" max="10000" step="10" />
          <input v-model="wolfs[0].scale" type="number" min="0" max="5" step="0.1" />
          <input v-model="characterSus.state.alpha" type="number" min="0" max="1" step="0.1" />
          <input v-model="characterSus.state.time" type="number" min="0" max="100" step="0.1" />
        </div> -->
      </div>
    </External>
  </Container>
</template>
