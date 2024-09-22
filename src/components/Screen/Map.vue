<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch } from 'vue'
import { External, onTick } from 'vue3-pixi'
import { useIntervalFn, useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import type { Asset, State } from '@/utils/types'

import StreetLamp from '@/components/Animation/StreetLamp.vue'
import Pigeon from '@/components/Animation/Pigeon.vue'
import Flag from '@/components/Animation/Flag.vue'
import MapTram from '@/components/Animation/MapTram.vue'
import Fountain from '@/components/Animation/Fountain.vue'
import BaloonStand from '@/components/Animation/BaloonStand.vue'
import AppSign from '@/components/Animation/AppSign.vue'
import Car from '@/components/Animation/Car.vue'
import Boat from '@/components/Animation/Boat.vue'
import Door from '@/components/Animation/Door.vue'
import Wolf from '@/components/Animation/Wolf.vue'
import CharacterGeneric from '@/components/Animation/Character/CharacterGeneric.vue'
import CharacterStationMaster from '@/components/Animation/Character/CharacterStationMaster.vue'
import CharacterIcecreamVendor from '@/components/Animation/Character/CharacterIcecreamVendor.vue'
import CharacterBaloonVendor from '@/components/Animation/Character/CharacterBaloonVendor.vue'
import CharacterPanic from '@/components/Animation/Character/CharacterPanic.vue'
import CharacterMain from '@/components/Animation/Character/CharacterMain.vue'
import CharacterGuard from '@/components/Animation/Character/CharacterGuard.vue'
import CharacterSus from '@/components/Animation/Character/CharacterSus.vue'
import AppProtip from '@/components/AppProtip.vue'

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

const gameStore = useGameStore()
const { currentScreenIndex, currentPopupIndex, currentSceneIndex, currentCharacterIndex, gamePause, characterSkin, textureOptions, isLandscape } = storeToRefs(gameStore)

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

const globalSpeedFactor = 0.5
const screen = reactive<Asset>({
  loaded: false,
  alias: 'mapBg',
  states: [
    { x: -540, y: -250, scale: 1.64, alpha: 1, time: 0 * globalSpeedFactor },
    { x: -540, y: -250, scale: 1.64, alpha: 1, time: 1 * globalSpeedFactor }, // Welcome to Dataville
    { x: -990, y: -560, scale: 1.96, alpha: 1, time: 5 * globalSpeedFactor },
    { x: -790, y: -630, scale: 2.02, alpha: 1, time: 6.55 * globalSpeedFactor }, // let the adventure begin
    { x: -715, y: -430, scale: 2.02, alpha: 1, time: 8.12 * globalSpeedFactor }, // choose your avater
    { x: -600, y: -280, scale: 2.02, alpha: 1, time: 9.5 * globalSpeedFactor }, // read t&c
    { x: -600, y: -280, scale: 2.68, alpha: 1, time: 11 * globalSpeedFactor }, // zoomin transition
    { x: -600, y: -280, scale: 2.02, alpha: 1, time: (12.25 - 0.55) * globalSpeedFactor }, // zoomin transition
    //
    { x: -580, y: -413.8683596236825 + 50, scale: 2.02, alpha: 1, time: (14.25 - 1) * globalSpeedFactor },
    { x: -860, y: -413.8683596236825 + 50, scale: 2.02, alpha: 1, time: (17 - 1) * globalSpeedFactor },
    { x: -860, y: -860.8683596236825, scale: 2.02, alpha: 1, time: (20 - 1.1) * globalSpeedFactor },
    { x: -1350, y: -860.8683596236825, scale: 2.02, alpha: 1, time: (23 - 1.2) * globalSpeedFactor },
    { x: -1350, y: -1042.8683596236826, scale: 2.02, alpha: 1, time: (25.25 - 1.25) * globalSpeedFactor },
    //
    { x: -1300, y: -1042.8683596236826, scale: 2.02, alpha: 1, time: (26 - 1.3) * globalSpeedFactor },
    { x: -1300, y: -1132.8683596236826, scale: 2.02, alpha: 1, time: (27.5 - 1.35) * globalSpeedFactor },
    /*  //* */
    { x: -700, y: -1132.8683596236826, scale: 2.02, alpha: 1, time: (31 - 1.4 + 2) * globalSpeedFactor },
    { x: -700, y: -1089.8683596236826, scale: 2.02, alpha: 1, time: (31.43 - 1.45 + 2) * globalSpeedFactor },
    // at park 17
    { x: -565, y: -1089.8683596236826, scale: 2.02, alpha: 1, time: (32.78 - 1.5 + 2) * globalSpeedFactor },
    { x: -565, y: -1090.8683596236826, scale: 2.02, alpha: 1, time: (32.79 + 2) * globalSpeedFactor },
    { x: -610, y: -1090.8683596236826 + 50, scale: 2.02, alpha: 1, time: (33.24 - 0.1 + 2) * globalSpeedFactor },
    { x: -610, y: -1632.8683596236826 + 50, scale: 2.02, alpha: 1, time: (38.66 - 0.1 + 2) * globalSpeedFactor },
    { x: -730, y: -1632.8683596236826 + 50, scale: 2.02, alpha: 1, time: (39.86 + 2) * globalSpeedFactor },
    // at bank 21
    { x: -1090, y: -1632.8683596236826, scale: 2.02, alpha: 1, time: (43.46 + 2) * globalSpeedFactor },
    { x: -1090, y: -1872.8683596236826, scale: 2.02, alpha: 1, time: (45.86 + 2) * globalSpeedFactor },
    // at pond 23
    { x: -995, y: -1937.8683596236826, scale: 2.02, alpha: 1, time: (47.015 + 2) * globalSpeedFactor },
    { x: -850, y: -1935, scale: 2.09, alpha: 1, time: (54.0175 + 2) * globalSpeedFactor },
    // loop ends 25
    { x: -1085, y: -1922.8683596236826, scale: 2.02, alpha: 1, time: (55.7625 + 2) * globalSpeedFactor },
    { x: -1085, y: -2162.8683596236824, scale: 2.02, alpha: 1, time: (58.1625 + 2) * globalSpeedFactor },
    { x: -850, y: -2162.8683596236824, scale: 2.02, alpha: 1, time: (60.5125 + 2) * globalSpeedFactor },
    { x: -850, y: -2340, scale: 2.01, alpha: 1, time: (62.9125 + 2) * globalSpeedFactor },
    { x: -160, y: -2340, scale: 2.01, alpha: 1, time: (70.5125 + 2) * globalSpeedFactor },
    { x: -160, y: -2555, scale: 1.95, alpha: 1, time: (71.5125 + 2) * globalSpeedFactor },
    // stop for the ballon 31
    { x: -1050, y: -2600, scale: 2.2, alpha: 1, time: (79.0625 + 2) * globalSpeedFactor },
    { x: -1050, y: -2600, scale: 2.2, alpha: 1, time: (84.1225 + 2) * globalSpeedFactor },
    { x: -1640, y: -2500, scale: 2.2, alpha: 1, time: (86.1225 + 2) * globalSpeedFactor },
    { x: -1680, y: -2540, scale: 0.8, alpha: 1, time: (87.7475 + 2) * globalSpeedFactor },
  ],
  state: { x: 0, y: 0, scale: 0, alpha: 1, time: 0 },
  animation: 'init',
})

const characterMain = reactive<Asset>({
  loaded: false,
  alias: 'characterMain',
  states: [
    { x: 840, y: 514, scale: 1.5, alpha: 0, time: 0 * globalSpeedFactor },
    { x: 840, y: 515, scale: 1.5, alpha: 1, time: 0.25 * globalSpeedFactor },
    { x: 850, y: 515, scale: 1.5, alpha: 1, time: 0.5 * globalSpeedFactor },
    { x: 900, y: 515, scale: 1.5, alpha: 0, time: 1.25 * globalSpeedFactor }, // entering the tram
    { x: 900, y: 561, scale: 1.5, alpha: 0, time: 3 * globalSpeedFactor },
    { x: 1180, y: 561, scale: 1.5, alpha: 0, time: 6 * globalSpeedFactor }, //
    { x: 1180, y: 1008, scale: 1.5, alpha: 0, time: 9 * globalSpeedFactor }, //
    { x: 1665, y: 1008, scale: 1.5, alpha: 0, time: 12 * globalSpeedFactor }, //
    { x: 1665, y: 1190, scale: 1.5, alpha: 0, time: 14.25 * globalSpeedFactor }, // leaving the tram
    { x: 1620, y: 1190, scale: 1.5, alpha: 1, time: 15 * globalSpeedFactor }, // leaving the tram
    { x: 1620, y: 1280, scale: 1.5, alpha: 1, time: 16.5 * globalSpeedFactor }, // leaving the tram
    /*  */
    { x: 1020, y: 1280, scale: 1.5, alpha: 1, time: (20 + 2) * globalSpeedFactor },
    { x: 1020, y: 1237, scale: 1.75, alpha: 1, time: (20.43 + 2) * globalSpeedFactor },
    // at park 13
    { x: 885, y: 1237, scale: 1.75, alpha: 1, time: (21.78 + 2) * globalSpeedFactor },
    { x: 885, y: 1238, scale: 1.75, alpha: 1, time: (21.79 + 2) * globalSpeedFactor },
    { x: 930, y: 1238, scale: 1.5, alpha: 1, time: (22.24 + 2) * globalSpeedFactor },
    { x: 930, y: 1780, scale: 1.5, alpha: 1, time: (27.66 + 2) * globalSpeedFactor },

    { x: 1050, y: 1780, scale: 1.5, alpha: 1, time: (28.86 + 2) * globalSpeedFactor },
    // at bank 17
    { x: 1410, y: 1780, scale: 1.5, alpha: 1, time: (32.46 + 2) * globalSpeedFactor },
    { x: 1410, y: 2020, scale: 1.5, alpha: 1, time: (34.86 + 2) * globalSpeedFactor },
    // at pond 19
    { x: 1315, y: 2085, scale: 1.5, alpha: 1, time: (36.015 + 2) * globalSpeedFactor },
    { x: 1220, y: 2150, scale: 1.5, alpha: 1, time: (37.1625 + 2) * globalSpeedFactor },
    { x: 1100, y: 2150, scale: 1.5, alpha: 1, time: (38.3625 + 2) * globalSpeedFactor },
    { x: 1020, y: 2090, scale: 1.5, alpha: 1, time: (39.3625 + 2) * globalSpeedFactor },
    { x: 1020, y: 1960, scale: 1.5, alpha: 1, time: (40.6625 + 2) * globalSpeedFactor },
    { x: 1110, y: 1910, scale: 1.5, alpha: 1, time: (41.6925 + 2) * globalSpeedFactor },
    { x: 1230, y: 1910, scale: 1.5, alpha: 1, time: (42.8925 + 2) * globalSpeedFactor },
    { x: 1290, y: 2030, scale: 1.5, alpha: 1, time: (44.2325 + 2) * globalSpeedFactor },
    // loop starts 27
    { x: 1220, y: 2150 + 50, scale: 1.5, alpha: 1, time: (45.4975 + 2) * globalSpeedFactor },
    { x: 1020, y: 2150 + 50, scale: 1.5, alpha: 1, time: (47.6975 + 2) * globalSpeedFactor },
    { x: 1220, y: 2150 + 50, scale: 1.5, alpha: 1, time: (49.8975 + 2) * globalSpeedFactor },
    // loop ends 30
    { x: 1405, y: 2070, scale: 1.5, alpha: 1, time: (51.6425 + 2) * globalSpeedFactor },
    { x: 1405, y: 2310, scale: 1.5, alpha: 1, time: (54.0425 + 2) * globalSpeedFactor },
    { x: 1170, y: 2310, scale: 1.5, alpha: 1, time: (56.3925 + 2) * globalSpeedFactor },
    { x: 1170, y: 2535, scale: 1.5, alpha: 1, time: (58.7925 + 2) * globalSpeedFactor },
    { x: 410, y: 2535, scale: 1.5, alpha: 1, time: (66.3925 + 2) * globalSpeedFactor },
    { x: 410, y: 2777, scale: 1.85, alpha: 1, time: (68.7825 + 2) * globalSpeedFactor },
    // stop for the ballon 36
    { x: 1120, y: 2777, scale: 1.85, alpha: 1, time: (76.3325 + 2) * globalSpeedFactor },
    { x: 1291.25, y: 2777, scale: 1.85, alpha: 1, time: (77.5975 + 2) * globalSpeedFactor },
    { x: 1670, y: 2777, scale: 1.85, alpha: 1, time: (81.3925 + 2) * globalSpeedFactor },
    { x: 1670, y: 2590 - 20, scale: 1.5, alpha: 1, time: (83.3925 + 2) * globalSpeedFactor }, ///** sequence break */
    { x: 1985, y: 2590 - 20, scale: 1.5, alpha: 1, time: (86.5425 + 2) * globalSpeedFactor },
  ],
  state: { x: 0, y: 0, scale: 0, alpha: 0, time: 0 },
  animation: 'init',
})

const susSpeedFactor = 0.25
const characterSus = reactive<Asset>({
  loaded: false,
  alias: 'characterSus',
  states: [
    { x: 1250 - 20, y: 1990 + 20, scale: 0.45, alpha: 1, time: 0 * globalSpeedFactor },
    { x: 1320 - 20, y: 2080 + 20, scale: 0.45, alpha: 1, time: 0.75 * globalSpeedFactor },
    // in the pond
    { x: 1220 - 20, y: 2150 + 20, scale: 0.45, alpha: 1, time: (2.75 - 3.35 * susSpeedFactor) * globalSpeedFactor },
    { x: 1100 - 20, y: 2150 + 20, scale: 0.45, alpha: 1, time: (2.75 + 1.45 * susSpeedFactor) * globalSpeedFactor },
    { x: 1020 - 20, y: 2090 + 20, scale: 0.45, alpha: 1, time: (2.75 + 5.45 * susSpeedFactor) * globalSpeedFactor },
    { x: 1020 - 20, y: 1960 + 20, scale: 0.45, alpha: 1, time: (2.75 + 10.65 * susSpeedFactor) * globalSpeedFactor },
    { x: 1110 - 20, y: 1910 + 20, scale: 0.45, alpha: 1, time: (2.75 + 14.77 * susSpeedFactor) * globalSpeedFactor },
    { x: 1230 - 20, y: 1910 + 20, scale: 0.45, alpha: 1, time: (2.75 + 19.57 * susSpeedFactor) * globalSpeedFactor },
    { x: 1290 - 20, y: 2030 + 20, scale: 0.45, alpha: 1, time: (2.75 + 24.93 * susSpeedFactor) * globalSpeedFactor },
    // loop starts
    { x: 1220 - 20, y: 2150 + 20 + 50, scale: 0.45, alpha: 1, time: (2.75 + 29.99 * susSpeedFactor) * globalSpeedFactor },
    { x: 1020 - 20, y: 2150 + 20 + 50, scale: 0.45, alpha: 1, time: (2.75 + 38.79 * susSpeedFactor) * globalSpeedFactor },
    { x: 1220 - 20, y: 2150 + 20 + 50, scale: 0.45, alpha: 1, time: (2.75 + 47.59 * susSpeedFactor) * globalSpeedFactor },
    //
    { x: 1320 - 20, y: 2080 + 20, scale: 0.45, alpha: 1, time: (2.75 + 47.59 * susSpeedFactor + 1) * globalSpeedFactor },
    { x: 1250 - 20, y: 1990 + 20, scale: 0.45, alpha: 1, time: (2.75 + 47.59 * susSpeedFactor + 2) * globalSpeedFactor },
  ],
  state: { x: 1230, y: 2010, scale: 0.45, alpha: 1, time: 1 },
  animation: 'init',
})

const tram = reactive<Asset>({
  loaded: false,
  alias: 'tram',
  states: [
    { x: 902, y: 515, scale: 0.5, alpha: 0, time: 0 * globalSpeedFactor },
    { x: 902, y: 520, scale: 0.5, alpha: 1, time: 0.5 * globalSpeedFactor },
    { x: 902, y: 520, scale: 0.5, alpha: 1, time: 1.5 * globalSpeedFactor }, // entering the tram
    { x: 902, y: 561, scale: 0.5, alpha: 1, time: 3.5 * globalSpeedFactor }, //
    { x: 1178, y: 561, scale: 0.5, alpha: 1, time: 6 * globalSpeedFactor }, //
    { x: 1178, y: 1008, scale: 0.5, alpha: 1, time: 9 * globalSpeedFactor }, //
    { x: 1670, y: 1008, scale: 0.5, alpha: 1, time: 12 * globalSpeedFactor }, //
    { x: 1670, y: 1190, scale: 0.5, alpha: 1, time: (14.5 - 1) * globalSpeedFactor }, // leaving the tram
    { x: 1670, y: 1190, scale: 0.5, alpha: 1, time: 15 * globalSpeedFactor },
    { x: 1670, y: 2040, scale: 0.5, alpha: 1, time: 23 * globalSpeedFactor },
    { x: 2490, y: 2040, scale: 0.5, alpha: 1, time: 32 * globalSpeedFactor },
    { x: 2490, y: 1708, scale: 0.5, alpha: 1, time: 36 * globalSpeedFactor },
    { x: 2490, y: 1695, scale: 0.5, alpha: 0, time: 36.5 * globalSpeedFactor },
  ],
  state: { x: 0, y: 0, scale: 0, alpha: 0, time: 0 },
  animation: 'init',
})

const station = reactive({
  bg: { x: 725, y: 265, scale: 1 },
  fg: { x: 725, y: 265, scale: 1 },
})

/* const wave = reactive({
  x: 240,
  y: 1525,
  scale: 0.5,
})
 */
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
      { x: 1110, y: 1752.5, scale: 0.425, alpha: 1, time: 0.2 * panicSpeedFactor },
      { x: 1030, y: 1752.5 + 5, scale: 0.425, alpha: 1, time: (0.25 + 0.7) * panicSpeedFactor },
      { x: 840, y: 1782.5 - 5, scale: 0.425, alpha: 1, time: (2.75 + 0.7) * panicSpeedFactor },
      { x: 1030, y: 1752.5 + 10, scale: 0.425, alpha: 1, time: (3.5 + 0.7) * panicSpeedFactor },
      { x: 1120, y: 1752.5, scale: 0.425, alpha: 0, time: (4 + 0.7) * panicSpeedFactor },
    ],
  },
  {
    type: 'purple',
    states: [
      { x: 1140, y: 1752.5, scale: 0.425, alpha: 0, time: 0 * panicSpeedFactor },
      { x: 1080, y: 1752.5 + 5, scale: 0.425, alpha: 1, time: (0.25 + 0.8) * panicSpeedFactor },
      { x: 820, y: 1792.5 - 5, scale: 0.425, alpha: 1, time: (2.75 + 1.2) * panicSpeedFactor },
      { x: 1080, y: 1752.5 + 5, scale: 0.425, alpha: 1, time: (3.5 + 1.2) * panicSpeedFactor },
      { x: 1140, y: 1752.5, scale: 0.425, alpha: 0, time: (4 + 0.4) * panicSpeedFactor },
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
  states: [{ x: 1180, y: 2750, scale: 0.5, alpha: 1, time: 0 }],
  state: { x: 1180, y: 2750, scale: 0.5, alpha: 1, time: 0 },
})

const door = reactive({ x: 1137, y: 1716, scale: 1 })
const wolf = reactive({ x: 2479, y: 2387, scale: 1 })

useIntervalFn(() => {
  screen.states[0].y = isLandscape.value ? -250 : -1000
  screen.states[1].y = isLandscape.value ? -250 : -1000
  if (currentSceneIndex.value === 0 || gamePause.value) updateScreen(screen.states[0])
}, 50)

function updateScreen(data: { x: number; y: number; scale: number; alpha: number; time: number }) {
  screen.state.x = data.x
  screen.state.y = data.y
  screen.state.scale = data.scale
  screen.state.alpha = data.alpha
  screen.state.time = data.time
}

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

watch(
  () => screen.animation,
  (value) => {
    gameStore.toggleMotionBlur(value === 'started')
  }
)

const lastScene = ref<
  | {
      x: number
      y: number
      scale: number
      alpha: number
      time: number
      animation: 'init' | 'started' | 'finished'
    }
  | undefined
>(undefined)

watch(gamePause, (value) => {
  if (value) {
    lastScene.value = { x: screen.state.x, y: screen.state.y, scale: screen.state.scale, alpha: screen.state.alpha, time: screen.state.time, animation: screen.animation }

    screen.animation = 'init'
    updateScreen(screen.states[0])
  } else {
    if (lastScene.value) {
      screen.animation = lastScene.value.animation
      updateScreen(lastScene.value)
    }
  }
})

let totalElapsedTime = 0
let progress = 0

onTick((delta) => {
  if (!gamePause.value && screen.animation === 'started' && currentSceneIndex.value < screen.states.length - 1) {
    totalElapsedTime += delta / 100
    const dt = screen.states[currentSceneIndex.value + 1].time - screen.states[currentSceneIndex.value].time
    const dx = screen.states[currentSceneIndex.value + 1].x - screen.states[currentSceneIndex.value].x
    const dy = screen.states[currentSceneIndex.value + 1].y - screen.states[currentSceneIndex.value].y
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

// Move to station cut scene
watch(
  () => screen.animation,
  () => {
    if (currentSceneIndex.value === 5 && currentPopupIndex.value === -1 && screen.animation === 'finished') {
      gameStore.nextTimeline({ id: 7 })
    }
  }
)

watch(currentScreenIndex, (value) => {
  if (value === 2) {
    // gameStore.nextTimeline({ id: 11 })
    tram.animation = 'started'
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

function transformX(x: number) {
  return x - 320
}

function transformY(y: number) {
  return y - 140
}
</script>

<template>
  <Container :renderable="isLoad" :x="screenWidth * 0.5" :y="screenHeight * 0.5" :scale="screen.state.scale * zoomFactor">
    <Container :x="transformX(screen.state.x)" :y="transformY(screen.state.y)">
      <Sprite texture="mapBg" :texture-options="textureOptions.blur" :x="0" :y="0" :scale="1" :anchor="0" />
      <Sprite texture="mapFg" :texture-options="textureOptions.blur" :x="0" :y="0" :scale="1" :anchor="0" />
      <Sprite texture="mapStationBg" :texture-options="textureOptions.blur" :x="station.bg.x" :y="station.bg.y" :scale="station.bg.scale" :anchor="0" />
      <Fountain :x="fountain.x" :y="fountain.y" :scale="fountain.scale" place="map" />
      <Pigeon v-for="({ x, y, scale, flip }, index) in pigeons" :key="index" :x="x" :y="y" :scale="scale" :flip="flip" />
      <Flag v-for="({ type, x, y, scale }, index) in flags" :key="index" :type="type" :x="x" :y="y" :scale="scale" />
      <StreetLamp v-for="({ x, y, scale }, index) in streetLamp" :key="index" :x="x" :y="y" :scale="scale" />
      <Sprite :texture="fence.alias" :texture-options="textureOptions.blur" :x="fence.x" :y="fence.y" :scale="fence.scale" />
      <Sprite :texture="palmTrees.alias" :texture-options="textureOptions.blur" :x="palmTrees.x" :y="palmTrees.y" :scale="palmTrees.scale" />
      <Wolf :x="wolf.x" :y="wolf.y" :scale="wolf.scale" :alpha="1" type="map" />
      <CharacterGeneric v-for="(states, index) of charactersGeneric" :key="index" :states="states" :animation="true" place="map" />
      <Door :x="door.x" :y="door.y" :scale="door.scale" :playing="currentCharacterIndex === 16" place="map" />
      <template v-if="currentCharacterIndex === 16">
        <CharacterPanic v-for="({ type, states }, index) of charactersPanic" :key="index" :states="states" :play-sound="type === 'purple'" :type="type as 'purple' | 'green'" place="map" />
      </template>
      <CharacterIcecreamVendor place="map" :state="characterIcecreamVendor.state" />
      <CharacterGuard place="map" :state="characterGuard.state" />
      <CharacterBaloonVendor :state="characterBaloonVendor.state" />
      <BaloonStand :x="baloonStand.x" :y="baloonStand.y" :scale="baloonStand.scale" place="map" />
      <AppSign :x="appSign.x" :y="appSign.y" :scale="appSign.scale" />
      <Car :x="car.x" :y="car.y" :scale="car.scale" :width-range="car.widthRange" :direction="car.direction as -1 | 1" />
      <Boat v-for="({ x, y, scale }, index) of boats" :key="index" :x="x" :y="y" :scale="scale" />
    </Container>
  </Container>
  <Container :renderable="isLoad && !gamePause">
    <AppProtip v-if="currentPopupIndex === 11" title="2" :zoom-factor="zoomFactor" />
    <Scene8 v-else-if="respondedSceneIndex < 17 && (currentPopupIndex === 17 || currentPopupIndex === 18) && screen.animation === 'finished'" :zoom-factor="zoomFactor" @next="handleResponse(17)" />
    <Scene9 v-else-if="(currentPopupIndex === 17 || currentPopupIndex === 18) && screen.animation === 'finished'" :zoom-factor="zoomFactor" @next="handleResponse(18)" />
    <AppProtip v-else-if="currentPopupIndex === 19" title="4" :zoom-factor="zoomFactor" />
    <Scene10 v-else-if="currentPopupIndex === 20 && screen.animation === 'finished'" :zoom-factor="zoomFactor" />
    <Scene11 v-else-if="currentPopupIndex === 21 && screen.animation === 'finished'" :zoom-factor="zoomFactor" />
    <AppProtip v-else-if="currentPopupIndex === 22" title="5" :zoom-factor="zoomFactor" />
    <Scene12 v-else-if="currentPopupIndex === 23" :zoom-factor="zoomFactor" />
  </Container>
  <Container :renderable="isLoad" :x="screenWidth * 0.5" :y="screenHeight * 0.5" :scale="screen.state.scale * zoomFactor">
    <Container :renderable="isLoad" :x="transformX(screen.state.x)" :y="transformY(screen.state.y)">
      <CharacterMain :states="characterMain.states" :currentCharacterIndex="currentCharacterIndex" :skin="characterSkin" @update="handleMCUpdate" />
      <CharacterSus :states="characterSus.states" />
      <MapTram :states="tram.states" :animation="gamePause ? 'finished' : tram.animation" initialOrientation="right" />
      <Sprite texture="mapStationFg" :texture-options="textureOptions.blur" :x="station.fg.x" :y="station.fg.y" :scale="station.fg.scale" :anchor="0" />
      <CharacterStationMaster place="map" :state="characterStationMaster.state" />
    </Container>
  </Container>
  <Container :renderable="isLoad && !gamePause">
    <Scene1 v-if="currentPopupIndex === 0 && screen.animation === 'finished'" :zoom-factor="zoomFactor" />
    <Scene2 v-else-if="currentPopupIndex === 0.5 && screen.animation === 'finished'" />
    <Scene3 v-else-if="currentPopupIndex === 1 && screen.animation === 'finished'" :zoom-factor="zoomFactor" />
    <Scene4 v-else-if="currentPopupIndex === 2 && screen.animation === 'finished'" :zoom-factor="zoomFactor" />
    <Scene5 v-else-if="currentPopupIndex === 3 && screen.animation === 'finished'" :zoom-factor="zoomFactor" />
    <Scene6 v-else-if="currentPopupIndex === 4 && screen.animation === 'finished'" :zoom-factor="zoomFactor" />
    <AppProtip v-else-if="currentPopupIndex === 7" title="1" :zoom-factor="zoomFactor" />
  </Container>
  <!-- DEBUG -->
  <!-- <External>
    <div class="fixed left-1/2 top-1/2 z-50 size-1 -translate-x-1/2 -translate-y-1/2 bg-red-500" />
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
