<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { External, onTick } from 'vue3-pixi'
import { computed, reactive } from 'vue'
import { SCALE_MODES } from '@/utils/types'

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  // return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
  return screenHeight.value / 720
})

// Asset
const bank = reactive<any>({
  loaded: false,
  alias: { bg: 'bankSky', fg: 'bankBackground' },
  states: [{ x: 0, y: 0, scale: 1, alpha: 1, time: 0 }],
  state: { x: 0, y: 0, scale: 1, alpha: 1, time: 0 },
  animation: 'init',
})
</script>

<template>
  <Container :x="0" :y="screenHeight / 2" :scale="1 * zoomFactor">
    <Sprite :texture="bank.alias.bg" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :x="bank.state.x" :y="bank.state.y - 150" :scale="bank.state.scale" :anchor-x="0" :anchor-y="0.5" />
    <Sprite :texture="bank.alias.fg" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :x="bank.state.x" :y="bank.state.y" :scale="bank.state.scale" :anchor-x="0" :anchor-y="0.5" />
  </Container>
  <!-- DEBUG -->
  <!-- <External>
        <div class="flex items-center absolute gap-8 bottom-0 left-0 right-0 z-50 w-fit">
            <div class="flex flex-col gap-2">
                <input v-model="bank.state.x" type="number" min="-10000" max="10000" step="10" />
                <input v-model="bank.state.y" type="number" min="-10000" max="10000" step="10" />
                <input v-model="bank.state.scale" type="number" min="0" max="10" step="0.01" />
            </div>
            <div class="flex flex-col gap-2">
                <input v-model="characterIcecreamVendor.state.x" type="number" min="-10000" max="10000" step="10" />
                <input v-model="characterIcecreamVendor.state.y" type="number" min="-10000" max="10000" step="10" />
                <input v-model="characterIcecreamVendor.state.scale" type="number" min="0" max="20" step="0.01" />
            </div>
        </div>
    </External> -->
</template>
