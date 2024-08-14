<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { Loader, External } from 'vue3-pixi'
import type { Asset } from '@/utils/types'
import { SCALE_MODES } from '@/utils/types'
import { resources } from '@/stores/game'

defineProps<{
  isLoad: boolean
}>()

const emit = defineEmits<{
  (event: 'close', nextSceneIndex: number): void
}>()

const { width: screenWidth, height: screenHeight } = useWindowSize()

const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

const abc = reactive<Asset>({
  loaded: false,
  alias: 'park',
  states: [{ x: 0, y: 0, scale: 1, alpha: 1, time: 0 }],
  state: { x: 0, y: 0, scale: 1, alpha: 1, time: 0 },
  animation: 'init'
})

const park = { bg: 'parkBackground', fg: 'parkForeground' }

function onLoad() {}
</script>

<template>
  <Loader :resources="{ ...resources.general, ...resources.park }" :on-resolved="onLoad">
    <template #fallback>
      <Text :x="120" :y="120" :anchor="0.5">Loading...</Text>
    </template>
    <template #default>
      <Container v-if="isLoad" :x="screenWidth / 2" :y="screenHeight / 2" :scale="1 * zoomFactor">
        <Sprite :texture="park.bg" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :x="abc.state.x" :y="abc.state.y" :scale="abc.state.scale" :anchor="0.5" />
        <Sprite :texture="park.fg" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :x="abc.state.x" :y="abc.state.y" :scale="abc.state.scale" :anchor="0.5" />
      </Container>
      <!-- 
      <External>
        <div class="flex items-center absolute gap-8 bottom-0 left-0 right-0 z-50">
          <div class="flex flex-col gap-2">
            <input v-model="abc.state.x" type="number" min="-10000" max="10000" step="10" />
            <input v-model="abc.state.y" type="number" min="-10000" max="10000" step="10" />
            <input v-model="abc.state.scale" type="number" min="0" max="10" step="0.01" />
          </div>
           <div class="flex flex-col gap-2">
            <input v-model="station.fg.x" type="number" min="-10000" max="10000" step="10" />
            <input v-model="station.fg.y" type="number" min="-10000" max="10000" step="10" />
            <input v-model="station.fg.scale" type="number" min="0" max="20" step="0.01" />
          </div> 
        </div>
      </External>
      -->
    </template>
  </Loader>
</template>
