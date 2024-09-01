<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { External } from 'vue3-pixi'

import SceneResult from '@/components/Scene/Scene-Result.vue'
import { textureOptions } from '@/components/Settings.vue'

const emit = defineEmits<{
  (event: 'close', nextSceneIndex: number): void
}>()

const { width: screenWidth, height: screenHeight } = useWindowSize()

const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

// Asset
const map = reactive<any>({
  loaded: false,
  alias: { bg: 'resultStrawHutBg', fg: 'resultStrawHutFg' },
  states: [{ x: 0, y: 0, scale: 1, alpha: 1, time: 0 }],
  state: { x: 0, y: 0, scale: 1, alpha: 1, time: 0 },
  animation: 'init',
})
</script>

<template>
  <Container :x="screenWidth / 2" :y="screenHeight / 2" :scale="1 * zoomFactor">
    <Sprite :texture="map.alias.bg" :texture-options="textureOptions" :x="map.state.x" :y="map.state.y" :scale="map.state.scale" :anchor="0.5" />
    <SceneResult />
    <!-- DEBUG -->
    <!--  <External>
      <div class="absolute bottom-0 left-32 z-50 flex w-fit items-center gap-8">
        <div class="flex flex-col gap-2">
          <input v-model="map.state.x" type="number" min="-10000" max="10000" step="10" />
          <input v-model="map.state.y" type="number" min="-10000" max="10000" step="10" />
          <input v-model="map.state.scale" type="number" min="0" max="10" step="0.01" />
        </div>
      </div>
    </External> -->
  </Container>
</template>
