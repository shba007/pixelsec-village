<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { External, onTick } from 'vue3-pixi'
import { useWindowSize } from '@vueuse/core'
import { SCALE_MODES } from '@/utils/types'

import Cloud from '@/components/Animation/Cloud.vue'
import CharacterPanic from '@/components/Animation/Character/CharacterPanic.vue'

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

const clouds = ref<
  {
    size: 'lg' | 'md' | 'sm'
    x: number
    y: number
    direction: number
  }[]
>([
  { size: 'md', x: -screenWidth.value / 2 - 200, y: 15 - 350, direction: 1 },
  { size: 'lg', x: -screenWidth.value / 2 - 150, y: 95 - 350, direction: 1 },
  { size: 'sm', x: -screenWidth.value / 2 - 100, y: 150 - 350, direction: 1 },
])

const charactersPanic = ref([
  {
    type: 'green',
    states: [
      { x: 910, y: 200, scale: 2, alpha: 0, time: 0 },
      { x: 900, y: 200, scale: 2, alpha: 1, time: 0.5 },
      { x: -100, y: 200, scale: 2, alpha: 1, time: 3 },
      { x: 910, y: 200, scale: 2, alpha: 1, time: 6 },
    ],
  },
  {
    type: 'purple',
    states: [
      { x: 1220, y: 200, scale: 2, alpha: 0, time: 0 },
      { x: 1230, y: 200, scale: 2, alpha: 1, time: 0.5 },
      { x: 1800, y: 200, scale: 2, alpha: 1, time: 2 },
      { x: 1220, y: 200, scale: 2, alpha: 1, time: 4 },
    ],
  },
])
</script>

<template>
  <Container :x="0" :y="screenHeight / 2" :scale="1 * zoomFactor">
    <Sprite :texture="bank.alias.bg" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :x="bank.state.x"
      :y="bank.state.y - 200" :scale="bank.state.scale" :anchor-x="0" :anchor-y="0.5" />
    <Cloud v-for="({ size, x, y, direction }, index) in clouds" :key="index" place="bank" :width-range="screenWidth"
      :size="size" :x="x" :y="y" :scale="1" :direction="direction" />
    <Sprite :texture="bank.alias.fg" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :x="bank.state.x"
      :y="bank.state.y" :scale="bank.state.scale" :anchor-x="0" :anchor-y="0.5" />
    <CharacterPanic v-for="({ type, states }, index) of charactersPanic" :key="index" :states="states" place="bank"
      :type="(type as 'purple' | 'green')" />
  </Container>
  <!-- DEBUG -->
  <External>
    <div class="absolute bottom-0 left-0 right-0 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="bank.state.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="bank.state.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="bank.state.scale" type="number" min="0" max="10" step="0.01" />
      </div>
      <div class="flex flex-col gap-2">
        <input v-model="charactersPanic[0].states[0].x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="charactersPanic[0].states[0].y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="charactersPanic[0].states[0].scale" type="number" min="0" max="20" step="0.01" />
      </div>
    </div>
  </External>
</template>
