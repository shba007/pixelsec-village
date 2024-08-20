<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { Loader, External } from 'vue3-pixi'
import { resources } from '@/stores/game'
import { SCALE_MODES, type Asset } from '@/utils/types'

import CharacterIcecreamVendor from '@/components/Animation/Character/CharacterIcecreamVendor.vue'
import Scene1 from '@/components/Scene/Scene-3-1.vue'
import Scene2 from '@/components/Scene/Scene-3-2.vue'
import Scene3 from '@/components/Scene/Scene-3-3.vue'

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

// Asset
const park = reactive<any>({
  loaded: false,
  alias: { bg: 'parkBackground', fg: 'parkForeground' },
  states: [{ x: 0, y: 0, scale: 1, alpha: 1, time: 0 }],
  state: { x: 0, y: 0, scale: 1, alpha: 1, time: 0 },
  animation: 'init',
})

const characterIcecreamVendor = reactive({
  states: [{ x: -90, y: 170, scale: 1, alpha: 1, time: 0 }],
  state: { x: -90, y: 170, scale: 1, alpha: 1, time: 0 },
})

function onLoad() {}

onMounted(onLoad)
</script>

<template>
  <!--   <Loader :resources="{ ...resources.general, ...resources.park }" :on-resolved="onLoad">
    <template #fallback="{ progress }">
      <Text :x="screenWidth / 2" :y="screenHeight / 2" :anchor="0.5" :style="{ fill: 'white' }" :scale="0.5">
        Loading... {{ Math.round(progress * 100) }}%
      </Text>
    </template>
<template #default> -->
  <Container :x="screenWidth / 2" :y="screenHeight / 2" :scale="1 * zoomFactor">
    <Sprite :texture="park.alias.bg" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :x="park.state.x" :y="park.state.y" :scale="park.state.scale" :anchor="0.5" />
    <Sprite :texture="park.alias.fg" :texture-options="{ scaleMode: SCALE_MODES.NEAREST }" :x="park.state.x" :y="park.state.y" :scale="park.state.scale" :anchor="0.5" />
    <CharacterIcecreamVendor place="park" :state="characterIcecreamVendor.state" />
    <Scene1 v-if="false" class="text-left" />
    <Scene2 v-else-if="false" class="text-left" />
    <Scene3 v-else-if="true" class="text-left" />
  </Container>
  <!--  <External>
        <div class="flex items-center absolute gap-8 bottom-0 left-0 right-0 z-50 w-fit">
          <div class="flex flex-col gap-2">
            <input v-model="abc.state.x" type="number" min="-10000" max="10000" step="10" />
            <input v-model="abc.state.y" type="number" min="-10000" max="10000" step="10" />
            <input v-model="abc.state.scale" type="number" min="0" max="10" step="0.01" />
          </div>
          <div class="flex flex-col gap-2">
            <input v-model="characterIcecreamVendor.state.x" type="number" min="-10000" max="10000" step="10" />
            <input v-model="characterIcecreamVendor.state.y" type="number" min="-10000" max="10000" step="10" />
            <input v-model="characterIcecreamVendor.state.scale" type="number" min="0" max="20" step="0.01" />
          </div>
        </div>
      </External> -->
  <!-- </template> -->
  <!-- </Loader> -->
</template>
