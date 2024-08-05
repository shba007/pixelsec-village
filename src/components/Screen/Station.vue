<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Loader, External, useScreen } from 'vue3-pixi'
import { useWindowSize } from '@vueuse/core'

import { resources, useGameStore } from '@/stores/game'
import type { Asset, AssetState } from '@/utils/types'
import StationCloud from '@/components/Animation/StationCloud.vue'

const props = defineProps<{
  isLoad: boolean,
}>()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const gameStore = useGameStore()

const { width: widthRange, height: screenHeight } = useWindowSize()

const zoomFactor = computed(() => screenHeight.value / 720)
const screen = reactive<Asset>({
  loaded: false,
  alias: 'sky',
  steps: [{ x: 0, y: 0, scale: 1, time: 0 }],
  position: { x: 0, y: 0, scale: 1, time: 0 },
  animation: 'init'
})

const clouds = ref<
  {
    size: '1' | '2' | '3'
    x: number
    y: number
    direction: number
  }[]
>([
  { size: '2', x: -200, y: 15, direction: 1 },
  { size: '1', x: -150, y: 45, direction: 1 },
  { size: '3', x: -100, y: 80, direction: 1 }
])

const tram = reactive({
  steps: [],
  position: { x: 0, y: 0, scale: 0, time: 0 }
})

const platform = { bg: 'platformBackground', fg: 'platformForeground' }

const canvasScreen = useScreen()

function onLoad() { }
</script>

<template>
  <Loader :resources="resources.station" :on-resolved="onLoad">
    <template #fallback>
      <Text :x="120" :y="120" :anchor="0.5">Loading...</Text>
    </template>
    <template #default>
      <Container v-if="isLoad" :x="(canvasScreen.width / 2)" :y="0" :scale="screen.position.scale * zoomFactor">
        <Sprite :texture="screen.alias" :texture-options="{ scaleMode: 'nearest' }" :x="0" :y="0" :scale="1.5"
          :anchor-x="0.5" />
        <StationCloud v-for="({ size, x, y, direction }, index) in clouds" :key="index" :width-range="widthRange"
          :size="size" :x="x" :y="y" :direction="direction" />
        <Sprite :texture="platform.bg" :texture-options="{ scaleMode: 'nearest' }" :x="0" :y="0" :scale="1"
          :anchor-x="0.5" />
        <Sprite :texture="platform.fg" :texture-options="{ scaleMode: 'nearest' }" :x="0" :y="0" :scale="1"
          :anchor-x="0.5" />
      </Container>
    </template>
  </Loader>
  <!--  <External>
    <div class="flex items-center absolute gap-8 bottom-0 left-0 right-0 z-50">
      <div class="flex flex-col gap-2">
        <input v-model="screen.position.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="screen.position.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="screen.position.scale" type="number" min="0" max="10" step="0.01" />
      </div>
      <div class="flex flex-col gap-2">
        <input v-model="clouds[2].x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="clouds[2].y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="clouds[2].size" type="number" min="0" max="20" step="0.01" />
      </div>
    </div>
  </External> -->
</template>

<style>
input {
  @apply px-2 py-1;
}
</style>
