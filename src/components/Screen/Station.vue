<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Loader, External, useScreen } from 'vue3-pixi'

import { resources } from '@/stores/game'
import type { Asset, AssetState } from '@/utils/types'
import StationCloud from '@/components/Animation/StationCloud.vue'
import StationTram from '@/components/Animation/StationTram.vue'
import CharacterStationMaster from '@/components/Animation/Character/CharacterStationMaster.vue'
import CharacterGeneric from '@/components/Animation/Character/CharacterGeneric.vue'
import Pigeon from '@/components/Animation/Pigeon.vue'
import Modal from '@/components/Modal.vue'
import Scene21 from '../Scene/Scene-2-1.vue'

defineProps<{
  isLoad: boolean
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const canvasScreen = useScreen()

function onLoad() { }

const zoomFactor = computed(() => {
  const aspectRatio = canvasScreen.value.width / canvasScreen.value.height
  return aspectRatio > 1280 / 720 ? canvasScreen.value.height / 720 : canvasScreen.value.width / 1280
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
  { size: '2', x: -canvasScreen.value.width / 2 - 200, y: 15 - 350, direction: 1 },
  { size: '1', x: -canvasScreen.value.width / 2 - 150, y: 95 - 350, direction: 1 },
  { size: '3', x: -canvasScreen.value.width / 2 - 100, y: 150 - 350, direction: 1 }
])

const tram = reactive({ x: -canvasScreen.value.width - 800, y: -25 })

const platform = { bg: 'platformBackground', fg: 'platformForeground' }

const stationMaster = reactive({ x: -210, y: 86 })
const pegion = ref([
  { x: 360, y: 290, scale: 1, flip: false },
  { x: 450, y: 260, scale: 1, flip: true }
])

const charactersGeneric = ref<AssetState[]>([
  { x: canvasScreen.value.width, y: -10, scale: 1, time: 0 },
  { x: canvasScreen.value.width, y: -10, scale: 1, time: 2 },
  { x: 0, y: -10, scale: 1, time: 8 }
])
</script>

<template>
  <Loader :resources="{ ...resources.station }" :on-resolved="onLoad">
    <template #fallback>
      <Text :x="120" :y="120" :anchor="0.5">Loading...</Text>
    </template>
    <template #default>
      <Container v-if="isLoad" :x="canvasScreen.width / 2" :y="canvasScreen.height / 2"
        :scale="screen.position.scale * zoomFactor">
        <Sprite :texture="screen.alias" :texture-options="{ scaleMode: 'nearest' }" :x="sky.x" :y="sky.y" :scale="1.4"
          :anchor="0.5" />
        <StationCloud v-for="({ size, x, y, direction }, index) in clouds" :key="index"
          :width-range="canvasScreen.width" :size="size" :x="x" :y="y" :direction="direction" />
        <Sprite :texture="platform.bg" :texture-options="{ scaleMode: 'nearest' }" :x="0" :y="-200" :scale="1"
          :anchor="0.5" />
        <CharacterGeneric :steps="charactersGeneric" :animation="true" place="station" />
        <Sprite :texture="platform.fg" :texture-options="{ scaleMode: 'nearest' }" :x="0" :y="0" :scale="1"
          :anchor="0.5" />
        <StationTram :x="tram.x" :y="tram.y" :width-range="canvasScreen.width" />
        <Sprite :texture="platform.fg" :texture-options="{ scaleMode: 'nearest' }" :x="0" :y="0" :scale="1"
          :anchor="0.5" />
        <CharacterStationMaster :x="stationMaster.x" :y="stationMaster.y" :scale="1" place="station" />
        <Pigeon v-for="{ x, y, scale, flip }, index in pegion" :key="index" :x="x" :y="y" :scale="scale" :flip="flip" />
        <!-- <template v-if="isLoad"> -->
        <!-- <Scene21 /> -->
        <!-- </template> -->
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
