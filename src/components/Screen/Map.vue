<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch } from 'vue'
import { External, onTick } from 'vue3-pixi'
import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { BlurFilter } from 'pixi.js'

import { useGameStore } from '@/stores/game'
import type { Asset, State } from '@/utils/types'

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
import Scene12 from '@/components/Scene/Scene-1-12.vue'

defineProps<{
  isLoad: boolean
}>()

const emit = defineEmits<{
  (event: 'close', nextSceneIndex: number): void
}>()

const gameStore = useGameStore()
const { currentScreenIndex, currentPopupIndex, currentSceneIndex, currentCharacterIndex, rotationStop, characterSkin, textureOptions } = storeToRefs(gameStore)

const { width: screenWidth } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const speedFactor = 0.25
const screen = reactive<Asset>({
  loaded: false,
  alias: 'mapBg',
  states: [
    { x: -380, y: -260, scale: 0.94, alpha: 1, time: 0 },
    { x: -540, y: -250, scale: 1.64, alpha: 1, time: 2 }, // Welcome to Dataville
    { x: -990, y: -560, scale: 1.96, alpha: 1, time: 5 },
    { x: -795, y: -590, scale: 2.01, alpha: 1, time: 7 }, // let the adventure begin
    { x: -720, y: -405, scale: 1.97, alpha: 1, time: 9 }, // choose your avater
    { x: -600, y: -270, scale: 2.01, alpha: 1, time: 10 }, // read t&c
    { x: -650, y: -350, scale: 2.53, alpha: 1, time: 11 }, // zoomin transition
    { x: -600, y: -270, scale: 2.01, alpha: 1, time: 12.25 }, // zoomin transition
    { x: -580, y: -413.8683596236825 + 50, scale: 2.01, alpha: 1, time: 14.25 },
    { x: -860, y: -413.8683596236825 + 50, scale: 2.01, alpha: 1, time: 17 },
    { x: -860, y: -860.8683596236825, scale: 2.01, alpha: 1, time: 20 },
    { x: -1350, y: -860.8683596236825, scale: 2.01, alpha: 1, time: 23 },
    { x: -1350, y: -1042.8683596236826, scale: 2.01, alpha: 1, time: 25.25 },
    { x: -1300, y: -1042.8683596236826, scale: 2.01, alpha: 1, time: 26 },
    { x: -1300, y: -1132.8683596236826, scale: 2.01, alpha: 1, time: 27.5 },
    { x: -700, y: -1132.8683596236826, scale: 2.01, alpha: 1, time: 31 },
    { x: -700, y: -1089.8683596236826, scale: 2.01, alpha: 1, time: 31.43 },
    // at park 17
    { x: -565, y: -1089.8683596236826, scale: 2.01, alpha: 1, time: 32.78 },
    { x: -565, y: -1090.8683596236826, scale: 2.01, alpha: 1, time: 32.79 },
    { x: -610, y: -1090.8683596236826 + 50, scale: 2.01, alpha: 1, time: 33.24 - 0.1 },
    { x: -610, y: -1632.8683596236826 + 50, scale: 2.01, alpha: 1, time: 38.66 - 0.1 },

    { x: -730, y: -1632.8683596236826 + 50, scale: 2.01, alpha: 1, time: 39.86 },

    // at bank 21
    { x: -1090, y: -1632.8683596236826, scale: 2.01, alpha: 1, time: 43.46 },
    { x: -1090, y: -1872.8683596236826, scale: 2.01, alpha: 1, time: 45.86 },
    // at pond 23
    { x: -995, y: -1937.8683596236826, scale: 2.01, alpha: 1, time: 47.015 },
    { x: -890, y: -1890 + 15, scale: 1.92, alpha: 1, time: 54.0175 },
    // loop ends 25
    { x: -1085, y: -1922.8683596236826, scale: 2.01, alpha: 1, time: 55.7625 },
    { x: -1085, y: -2162.8683596236824, scale: 2.01, alpha: 1, time: 58.1625 },
    { x: -850, y: -2162.8683596236824, scale: 2.01, time: 60.5125, alpha: 1 },
    { x: -850, y: -2340, scale: 2.01, time: 62.9125, alpha: 1 },
    { x: -90, y: -2340, scale: 2.01, time: 70.5125, alpha: 1 },
    { x: -90, y: -2520, scale: 1.64, time: 71.5125, alpha: 1 },
    // stop for the ballon 31
    { x: -930, y: -2555, scale: 1.64, time: 79.0625, alpha: 1 },
    { x: -1000, y: -2555, scale: 1.64, time: 84.1225, alpha: 1 },
    { x: -1570, y: -2480, scale: 1.64, time: 86.1225, alpha: 1 },
    { x: -1210, y: -2210, scale: 0.76, time: 87.7475, alpha: 1 },
  ],
  state: { x: 0, y: 0, scale: 1, alpha: 1, time: 0 },
  animation: 'init',
})

function updateScreen(data: { x: number; y: number; scale: number; alpha: number; time: number }) {
  screen.state.x = data.x
  screen.state.y = data.y
  screen.state.scale = data.scale
  screen.state.alpha = data.alpha
  screen.state.time = data.time
}

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
  { type: 'station' as const, x: 705, y: 380, scale: 0.5 },
  { type: 'station' as const, x: 1105, y: 380, scale: 0.5 },
  { type: 'station' as const, x: 705, y: 440, scale: 0.5 },
  { type: 'station' as const, x: 1105, y: 440, scale: 0.5 },
  { type: 'station' as const, x: 705, y: 495, scale: 0.5 },
  { type: 'station' as const, x: 1105, y: 495, scale: 0.5 },
  { type: 'pink' as const, x: 1225, y: 670, scale: 0.5 },
  { type: 'pink' as const, x: 1225, y: 720, scale: 0.5 },
  { type: 'pink' as const, x: 1225, y: 780, scale: 0.5 },
  { type: 'school-blue' as const, x: 789, y: 2155, scale: 0.5 },
  { type: 'school-red' as const, x: 819, y: 2155, scale: 0.5 },
  { type: 'pink' as const, x: 460, y: 2600, scale: 0.5 },
  { type: 'pink' as const, x: 460, y: 2660, scale: 0.5 },
  { type: 'pink' as const, x: 460, y: 2710, scale: 0.5 },
  { type: 'pink' as const, x: 460, y: 2770, scale: 0.5 },
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

/* const wolfs = ref([
  { x: 2050, y: 2310, scale: 0.5, flip: false },
  { x: 2770, y: 2810, scale: 0.5, flip: true },
  { x: 2510, y: 2950, scale: 0.5, flip: false },
]) */

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

const panicSpeedFactor = 0.5
const charactersPanic = ref([
  {
    type: 'green',
    states: [
      { x: 1040, y: 1752.5, scale: 0.425, alpha: 0, time: 0 * panicSpeedFactor },
      { x: 1030, y: 1752.5 + 5, scale: 0.425, alpha: 1, time: 0.25 * panicSpeedFactor },
      { x: 950, y: 1752.5 - 5, scale: 0.425, alpha: 1, time: 2.75 * panicSpeedFactor },
      { x: 1030, y: 1752.5 + 10, scale: 0.425, alpha: 1, time: 3.5 * panicSpeedFactor },
      { x: 1040, y: 1752.5, scale: 0.425, alpha: 0, time: 4 * panicSpeedFactor },
    ],
  },
  {
    type: 'purple',
    states: [
      { x: 1090, y: 1752.5, scale: 0.425, alpha: 0, time: 0 * panicSpeedFactor },
      { x: 1080, y: 1752.5 + 5, scale: 0.425, alpha: 1, time: 0.25 * panicSpeedFactor },
      { x: 900, y: 1752.5 - 5, scale: 0.425, alpha: 1, time: 2.75 * panicSpeedFactor },
      { x: 1080, y: 1752.5 + 5, scale: 0.425, alpha: 1, time: 3.5 * panicSpeedFactor },
      { x: 1090, y: 1752.5, scale: 0.425, alpha: 0, time: 4 * panicSpeedFactor },
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
    { x: 1665, y: 1008, scale: 1.5, alpha: 0, time: 12 }, //
    { x: 1665, y: 1190, scale: 1.5, alpha: 0, time: 14.25 }, // leaving the tram
    { x: 1620, y: 1190, scale: 1.5, alpha: 1, time: 15 }, // leaving the tram
    { x: 1620, y: 1280, scale: 1.5, alpha: 1, time: 16.5 }, // leaving the tram
    { x: 1020, y: 1280, scale: 1.5, alpha: 1, time: 20 },
    { x: 1020, y: 1237, scale: 1.75, alpha: 1, time: 20.43 },
    // at park 13
    { x: 885, y: 1237, scale: 1.75, alpha: 1, time: 21.78 },
    { x: 885, y: 1238, scale: 1.75, alpha: 1, time: 21.79 },
    { x: 930, y: 1238, scale: 1.5, alpha: 1, time: 22.24 },
    { x: 930, y: 1780, scale: 1.5, alpha: 1, time: 27.66 },

    { x: 1050, y: 1780, scale: 1.5, alpha: 1, time: 28.86 },
    // at bank 17
    { x: 1410, y: 1780, scale: 1.5, alpha: 1, time: 32.46 },
    { x: 1410, y: 2020, scale: 1.5, alpha: 1, time: 34.86 },
    // at pond 19
    { x: 1315, y: 2085, scale: 1.5, alpha: 1, time: 36.015 },
    { x: 1220, y: 2150, scale: 1.5, alpha: 1, time: 37.1625 },
    { x: 1100, y: 2150, scale: 1.5, alpha: 1, time: 38.3625 },
    { x: 1020, y: 2090, scale: 1.5, alpha: 1, time: 39.3625 },
    { x: 1020, y: 1960, scale: 1.5, alpha: 1, time: 40.6625 },
    { x: 1110, y: 1910, scale: 1.5, alpha: 1, time: 41.6925 },
    { x: 1230, y: 1910, scale: 1.5, alpha: 1, time: 42.8925 },
    { x: 1290, y: 2030, scale: 1.5, alpha: 1, time: 44.2325 },
    // loop starts 27
    { x: 1250, y: 2150, scale: 1.5, alpha: 1, time: 45.4975 },
    { x: 1030, y: 2150, scale: 1.5, alpha: 1, time: 47.6975 },
    { x: 1250, y: 2150, scale: 1.5, alpha: 1, time: 49.8975 },
    // loop ends 30
    { x: 1405, y: 2070, scale: 1.5, alpha: 1, time: 51.6425 },
    { x: 1405, y: 2310, scale: 1.5, alpha: 1, time: 54.0425 },
    { x: 1170, y: 2310, scale: 1.5, alpha: 1, time: 56.3925 },
    { x: 1170, y: 2535, scale: 1.5, alpha: 1, time: 58.7925 },
    { x: 410, y: 2535, scale: 1.5, alpha: 1, time: 66.3925 },
    { x: 410, y: 2777, scale: 1.85, alpha: 1, time: 68.7825 },
    // stop for the ballon 36
    { x: 1165, y: 2777, scale: 1.85, alpha: 1, time: 76.3325 },
    { x: 1291.25, y: 2777, scale: 1.85, alpha: 1, time: 77.5975 },
    { x: 1670, y: 2777, scale: 1.85, alpha: 1, time: 81.3925 },
    { x: 1670, y: 2590, scale: 1.5, alpha: 1, time: 83.3925 }, ///** sequence break */
    { x: 1985, y: 2590, scale: 1.5, alpha: 1, time: 86.5425 },
  ],
  state: { x: 0, y: 0, scale: 0, alpha: 0, time: 0 },
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
    { x: 1670, y: 1190, scale: 0.5, alpha: 1, time: 14.5 - 1 }, // leaving the tram
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

watch(
  () => screen.animation,
  (value) => {
    gameStore.toggleMotionBlur(value === 'started')
  }
)

function onLoad() {
  updateScreen(screen.states[0])
  screen.loaded = true
  screen.animation = 'started'
  characterStationMaster.state = characterStationMaster.states[0]
  characterIcecreamVendor.state = characterIcecreamVendor.states[0]
}

onBeforeMount(onLoad)

watch(currentSceneIndex, () => {
  screen.animation = 'started'
})

let totalElapsedTime = 0
let progress = 0

onTick((delta) => {
  if (!rotationStop.value && screen.animation === 'started' && currentSceneIndex.value < screen.states.length - 1) {
    totalElapsedTime += delta / 100
    const dt = screen.states[currentSceneIndex.value + 1].time - screen.states[currentSceneIndex.value].time
    const dx = (screen.states[currentSceneIndex.value + 1].x - screen.states[currentSceneIndex.value].x)
    const dy = (screen.states[currentSceneIndex.value + 1].y - screen.states[currentSceneIndex.value].y)
    const ds = screen.states[currentSceneIndex.value + 1].scale - screen.states[currentSceneIndex.value].scale

    progress = Math.min(totalElapsedTime / dt, 1)
    updateScreen({
      x: screen.states[currentSceneIndex.value].x + dx * progress,
      y: screen.states[currentSceneIndex.value].y + dy * progress,
      scale: screen.states[currentSceneIndex.value].scale + ds * progress,
      time: screen.states[currentSceneIndex.value].time + dt * progress,
      alpha: 1,
    })

    if (progress == 1) {
      totalElapsedTime = 0
      screen.animation = 'finished'
    }
  }
})

watch(
  () => screen.animation,
  () => {
    if (currentSceneIndex.value === 5 && screen.animation === 'finished') {
      gameStore.nextTimeline({ id: 7 })
    }
  }
)

watch(currentScreenIndex, (value) => {
  if (value === 2) {
    tram.animation = 'started'
    gameStore.nextTimeline({ id: 11 })
    characterStationMaster.state = characterStationMaster.states[1]
  }
})

function handleMCUpdate(stateIndex: number, state: 'init' | 'started' | 'finished') {
  if (state === 'finished' && stateIndex < 41) {
    if (stateIndex === 29 && respondedSceneIndex.value !== 18) {
      gameStore.nextTimeline({ screen: -1, id: 46 })
    } else {
      gameStore.nextTimeline()
    }

    if (stateIndex === 30) {
      gameStore.playBGMSound('normal')
    }
  }
}

const respondedSceneIndex = ref(0)
function handleResponse(value: number) {
  respondedSceneIndex.value = value
}
</script>

<template>
  <Container :renderable="isLoad" :x="screen.state.x * screen.state.scale * zoomFactor"
    :y="screen.state.y * screen.state.scale * zoomFactor" :scale="screen.state.scale * zoomFactor">
    <Sprite texture="mapBg" :texture-options="textureOptions.blur" :x="0" :y="0" :scale="1" :anchor="0" :z-index="3" />
    <Sprite texture="mapFg" :texture-options="textureOptions.blur" :x="0" :y="0" :scale="1" :anchor="0" :z-index="1" />
    <Sprite texture="mapStationBg" :texture-options="textureOptions.blur" :x="station.bg.x" :y="station.bg.y"
      :scale="station.bg.scale" :anchor="0" :z-index="2" />
    <Fountain :x="fountain.x" :y="fountain.y" :scale="fountain.scale" />
    <Pigeon v-for="({ x, y, scale, flip }, index) in pigeons" :key="index" :x="x" :y="y" :scale="scale" :flip="flip" />
    <Flag v-for="({ type, x, y, scale }, index) in flags" :key="index" :type="type" :x="x" :y="y" :scale="scale" />
    <MapTram :states="tram.states" :animation="rotationStop ? 'finished' : tram.animation" initialOrientation="right" />
    <Sprite texture="mapStationFg" :texture-options="textureOptions.blur" :x="station.fg.x" :y="station.fg.y"
      :scale="station.fg.scale" :anchor="0" :z-index="0" />
    <!-- @vue-ignore -->
    <StreetLamp v-for="({ x, y, scale }, index) in streetLamp" :key="index" :x="x" :y="y" :scale="scale" />
    <Sprite :texture="fence.alias" :texture-options="textureOptions.blur" :x="fence.x" :y="fence.y"
      :scale="fence.scale" />
    <Sprite :texture="palmTrees.alias" :texture-options="textureOptions.blur" :x="palmTrees.x" :y="palmTrees.y"
      :scale="palmTrees.scale" />
    <CharacterGeneric v-for="(states, index) of charactersGeneric" :key="index" :states="states" :animation="true"
      place="map" />
    <CharacterStationMaster place="map" :state="characterStationMaster.state" />
    <template v-if="currentCharacterIndex >= 16">
      <CharacterPanic v-for="({ type, states }, index) of charactersPanic" :key="index" :states="states"
        :type="type as 'purple' | 'green'" place="map" />
    </template>
    <CharacterIcecreamVendor place="map" :state="characterIcecreamVendor.state" />
    <CharacterGuard place="map" :state="characterGuard.state" />
    <CharacterBaloonVendor :state="characterBaloonVendor.state" />
    <BaloonStand :x="baloonStand.x" :y="baloonStand.y" :scale="baloonStand.scale" />
    <AppSign :x="appSign.x" :y="appSign.y" :scale="appSign.scale" />
    <Car :x="car.x" :y="car.y" :scale="car.scale" :width-range="car.widthRange" :direction="car.direction as -1 | 1" />
    <Boat v-for="({ x, y, scale }, index) of boats" :key="index" :x="x" :y="y" :scale="scale" />
  </Container>
  <Container :renderable="isLoad && !rotationStop">
    <Scene1 v-if="currentPopupIndex === 0 && screen.animation === 'finished'" />
    <Scene2 v-else-if="currentPopupIndex === 0.5 && screen.animation === 'finished'" />
    <Scene3 v-else-if="currentPopupIndex === 1 && screen.animation === 'finished'" />
    <Scene4 v-else-if="currentPopupIndex === 2 && screen.animation === 'finished'" />
    <Scene5 v-else-if="currentPopupIndex === 3 && screen.animation === 'finished'" />
    <Scene6 v-else-if="currentPopupIndex === 4 && screen.animation === 'finished'" />
    <ModalProtip v-if="currentPopupIndex === 7" title="1" y="top" />
    <ModalProtip v-else-if="currentPopupIndex === 11" title="2" y="top" />
    <!-- <Scene7 v-else-if="currentPopupIndex === 9 && screen.animation === 'finished'" /> -->
    <Scene8 v-else-if="currentPopupIndex === 17 && screen.animation === 'finished'" />
    <Scene9 v-else-if="currentPopupIndex === 18 && screen.animation === 'finished'" @update="handleResponse(18)" />
    <ModalProtip v-else-if="currentPopupIndex === 19" title="4" y="top" />
    <Scene10 v-else-if="currentPopupIndex === 20 && screen.animation === 'finished'" />
    <Scene11 v-else-if="currentPopupIndex === 21 && screen.animation === 'finished'" />
    <ModalProtip v-else-if="currentPopupIndex === 22" title="5" x="left" />
  </Container>
  <Container :renderable="isLoad" :x="screen.state.x * screen.state.scale * zoomFactor"
    :y="screen.state.y * screen.state.scale * zoomFactor" :scale="screen.state.scale * zoomFactor">
    <CharacterMain :states="characterMain.states" :currentCharacterIndex="currentCharacterIndex" :skin="characterSkin"
      @update="handleMCUpdate" />
    <CharacterSus :states="characterSus.states" />
    <Scene12 v-if="currentPopupIndex === 23" />
    <!-- @vue-ignore -->
    <!--  <Cloud v-for="({ size, x, y, direction }, index) in clouds" :key="index" place="map" :size="size" :x="x"
        :y="mapHeight *  screen.state.scale * y" :scale="0.5" :direction="direction" :width-range="mapWidth" /> -->
  </Container>
  <!-- DEBUG -->
  <!--   <External>
    <div class="fixed left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 bg-red-500" />
    <div class="fixed bottom-0 left-0 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="screen.state.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="screen.state.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="screen.state.scale" type="number" min="0" max="10" step="0.01" />
        <input v-model="screen.state.time" type="number" min="0" max="10" step="0.01" />
        <span class="bg-white">{{ screen.animation }}</span>
        <span class="bg-white">{{ currentSceneIndex }}</span>
      </div>
    </div>
  </External> -->
</template>
