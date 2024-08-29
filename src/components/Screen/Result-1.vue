<script setup lang="ts">
import { computed, onBeforeMount, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { External } from 'vue3-pixi'
import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import { SCALE_MODES, type Asset } from '@/utils/types'

const emit = defineEmits<{
    (event: 'close', nextSceneIndex: number): void
}>()

const { width: screenWidth, height: screenHeight } = useWindowSize()

const zoomFactor = computed(() => {
    const aspectRatio = screenWidth.value / screenHeight.value
    return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

// Asset
const park = reactive<any>({
    loaded: false,
    alias: { bg: 'parkBackground', fg: 'parkForeground' },
    states: [{ x: 0, y: 0, scale: 1, alpha: 1, time: 0 }],
    state: { x: 0, y: 0, scale: 1, alpha: 1, time: 0 },
    animation: 'init',
})
</script>

<template>
    <Container :x="screenWidth / 2" :y="screenHeight / 2" :scale="1 * zoomFactor">
        <Sprite :texture="park.alias.bg" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :x="park.state.x"
            :y="park.state.y" :scale="park.state.scale" :anchor="0.5" />
    </Container>
    <!-- DEBUG -->
    <!-- <External>
    <div class="absolute bottom-0 left-0 right-0 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="park.state.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="park.state.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="park.state.scale" type="number" min="0" max="10" step="0.01" />
      </div>
      <div class="flex flex-col gap-2">
        <input v-model="pigeons[0].x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="pigeons[0].y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="pigeons[0].scale" type="number" min="0" max="20" step="0.01" />
      </div>
    </div>
  </External> -->
</template>
