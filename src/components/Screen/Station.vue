<script setup lang="ts">
import { computed, reactive, ref, watch, watchEffect } from 'vue'
import { Loader, External, useScreen } from 'vue3-pixi'
import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useGameStore, resources } from '@/stores/game'
import type { Asset, State } from '@/utils/types'
import { SCALE_MODES } from '@/utils/types'
import StationCloud from '@/components/Animation/StationCloud.vue'
import StationTram from '@/components/Animation/StationTram.vue'
import CharacterStationMaster from '@/components/Animation/Character/CharacterStationMaster.vue'
import CharacterGeneric from '@/components/Animation/Character/CharacterGeneric.vue'
import Pigeon from '@/components/Animation/Pigeon.vue'
import Scene1 from '@/components/Scene/Scene-2-1.vue'
import Scene2 from '@/components/Scene/Scene-2-2.vue'

const props = defineProps<{
  isLoad: boolean
}>()

const emit = defineEmits<{
  (event: 'close', nextSceneIndex: number): void
}>()

const gameStore = useGameStore()
const { currentSceneIndex } = storeToRefs(gameStore)

const canvasScreen = useScreen()
const { width: screenWidth, height: screenHeight } = useWindowSize()

const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

const sky = reactive<Asset>({
  loaded: false,
  alias: 'sky',
  states: [{ x: 0, y: -305, scale: 1.4, alpha: 1, time: 0 }],
  state: { x: 0, y: -305, scale: 1.4, alpha: 1, time: 0 },
  animation: 'init',
})

const clouds = ref<
  {
    size: '1' | '2' | '3'
    x: number
    y: number
    direction: number
  }[]
>([
  { size: '2', x: -screenWidth.value / 2 - 200, y: 15 - 350, direction: 1 },
  { size: '1', x: -screenWidth.value / 2 - 150, y: 95 - 350, direction: 1 },
  { size: '3', x: -screenWidth.value / 2 - 100, y: 150 - 350, direction: 1 },
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
  { x: screenWidth.value + 50, y: -10, scale: 1, alpha: 1, time: 0 },
  { x: screenWidth.value + 50, y: -10, scale: 1, alpha: 1, time: 2 },
  { x: 0, y: -10, scale: 1, alpha: 1, time: 8 },
])

watchEffect(() => {
  if (currentSceneIndex.value === 9) {
    emit('close', 2)
    gameStore.nextMapState()
  }
})

function onLoad() {
  characterStationMaster.state = characterStationMaster.states[0]
}

watch(
  () => props.isLoad,
  () => {
    setTimeout(() => gameStore.nextScene(), 2000)
  }
)
</script>

<template>
  <Loader :resources="{ ...resources.general, ...resources.station }" :on-resolved="onLoad">
    <template #fallback>
      <Text :x="120" :y="120" :anchor="0.5">Loading...</Text>
    </template>
    <template #default>
      <Container v-if="isLoad" :x="screenWidth / 2" :y="screenHeight / 2" :scale="1 * zoomFactor">
        <Sprite :texture="sky.alias" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :x="sky.state.x" :y="sky.state.y" :scale="sky.state.scale" :anchor="0.5" />
        <StationCloud v-for="({ size, x, y, direction }, index) in clouds" :key="index" :width-range="screenWidth" :size="size" :x="x" :y="y" :direction="direction" />
        <Sprite :texture="platform.bg" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :x="0" :y="-200" :scale="1" :anchor="0.5" />
        <CharacterGeneric :states="charactersGeneric" :animation="true" place="station" />
        <Sprite :texture="platform.fg" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :x="0" :y="0" :scale="1" :anchor="0.5" />
        <StationTram :x="tram.x" :y="tram.y" :width-range="screenWidth" />
        <Sprite :texture="platform.fg" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :x="0" :y="0" :scale="1" :anchor="0.5" />
        <CharacterStationMaster :state="characterStationMaster.state" place="station" />
        <Pigeon v-for="({ x, y, scale, flip }, index) in pegion" :key="index" :x="x" :y="y" :scale="scale" :flip="flip" />
        <!-- <template v-if="isLoad"> -->
        <Scene1 v-if="currentSceneIndex === 7" />
        <Scene2 v-else-if="currentSceneIndex === 8" />
        <!-- </template> -->
      </Container>
      <!-- <External>
        <div class="flex items-center absolute gap-8 bottom-0 right-0 z-50 w-fit">
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
  </Loader>
</template>
