<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Loader, External, useScreen } from 'vue3-pixi'
import { useWindowSize } from '@vueuse/core'

import { resources } from '@/stores/game'
import type { Asset, AssetState } from '@/utils/types'
import StationCloud from '@/components/Animation/StationCloud.vue'
import StationTram from '@/components/Animation/StationTram.vue'
import CharacterStationMaster from '@/components/Animation/Character/CharacterStationMaster.vue'
import CharacterGeneric from '@/components/Animation/Character/CharacterGeneric.vue'
import Pigeon from '@/components/Animation/Pigeon.vue'
import Scene21 from '@/components/Scene/Scene-2-1.vue'

defineProps<{
  isLoad: boolean
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const canvasScreen = useScreen()
const { width: screenWidth, height: screenHeight } = useWindowSize()

function onLoad() { }

const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

const screen = reactive<Asset>({
  loaded: false,
  alias: 'sky',
  steps: [{ x: 0, y: 0, scale: 1, time: 0 }],
  position: { x: 0, y: 0, scale: 1, time: 0 },
  animation: 'init'
})

const sky = reactive({ x: 0, y: -300 })

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
  { size: '3', x: -screenWidth.value / 2 - 100, y: 150 - 350, direction: 1 }
])

const tram = reactive({ x: -screenWidth.value - 800, y: -25 })

const platform = { bg: 'platformBackground', fg: 'platformForeground' }

const stationMaster = reactive({ x: -210, y: 86 })
const pegion = ref([
  { x: 360, y: 290, scale: 1, flip: false },
  { x: 450, y: 260, scale: 1, flip: true }
])

const charactersGeneric = ref<AssetState[]>([
  { x: screenWidth.value, y: -10, scale: 1, time: 0 },
  { x: screenWidth.value, y: -10, scale: 1, time: 2 },
  { x: 0, y: -10, scale: 1, time: 8 }
])
</script>

<template>
  <Loader :resources="{ ...resources.station }" :on-resolved="onLoad">
    <template #fallback>
      <Text :x="120" :y="120" :anchor="0.5">Loading...</Text>
    </template>
    <template #default>
      <Container v-if="isLoad" :x="screenWidth / 2" :y="screenHeight / 2" :scale="screen.position.scale * zoomFactor">
        <Sprite :texture="screen.alias" :texture-options="{ scaleMode: 'nearest' }" :x="sky.x" :y="sky.y" :scale="1.4"
          :anchor="0.5" />
        <StationCloud v-for="({ size, x, y, direction }, index) in clouds" :key="index" :width-range="screenWidth"
          :size="size" :x="x" :y="y" :direction="direction" />
        <Sprite :texture="platform.bg" :texture-options="{ scaleMode: 'nearest' }" :x="0" :y="-200" :scale="1"
          :anchor="0.5" />
        <CharacterGeneric :steps="charactersGeneric" :animation="true" place="station" />
        <Sprite :texture="platform.fg" :texture-options="{ scaleMode: 'nearest' }" :x="0" :y="0" :scale="1"
          :anchor="0.5" />
        <StationTram :x="tram.x" :y="tram.y" :width-range="screenWidth" />
        <Sprite :texture="platform.fg" :texture-options="{ scaleMode: 'nearest' }" :x="0" :y="0" :scale="1"
          :anchor="0.5" />
        <CharacterStationMaster :x="stationMaster.x" :y="stationMaster.y" :scale="1" place="station" />
        <Pigeon v-for="({ x, y, scale, flip }, index) in pegion" :key="index" :x="x" :y="y" :scale="scale"
          :flip="flip" />
        <template v-if="isLoad">
          <Scene21 v-if="currentScenceIndex === 0" />
        </template>
      </Container>
      <!-- <External>
        <div class="flex items-center absolute gap-8 bottom-0 left-0 right-0 z-50">
          <div class="flex flex-col gap-2">
            <input v-model="screen.position.x" type="number" min="-10000" max="10000" step="10" />
            <input v-model="screen.position.y" type="number" min="-10000" max="10000" step="10" />
            <input v-model="screen.position.scale" type="number" min="0" max="10" step="0.01" />
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
