<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { External, onTick } from 'vue3-pixi'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game'

import type { Asset } from '@/utils/types'
import { textureOptions } from '@/components/AppSettings.vue'
import CharacterMain from '@/components/Animation/Character/CharacterMain.vue'
import Wolf from '@/components/Animation/Wolf.vue'
import SceneResult from '@/components/Scene/Scene-Result.vue'

const { width: screenWidth, height: screenHeight } = useWindowSize()
const gameStore = useGameStore()
const { characterSkin, currentPopupIndex, currentCharacterIndex, currentSceneIndex: currentGlobalSceneIndex, rotationStop } = storeToRefs(gameStore)

const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

// Asset
const map = reactive<any>({
  loaded: false,
  alias: { bg: 'resultStrawHutBg', fg: 'resultStrawHutFg' },
  states: [
    { x: 0, y: 0, scale: 1, alpha: 1, time: 0 },
    { x: 125, y: 0, scale: 1.25, alpha: 1, time: 2 },
  ],
  state: { x: 0, y: 0, scale: 1, alpha: 1, time: 0 },
  animation: 'started',
})

const palmTrees = reactive({
  alias: 'resultStrawHutFg',
  x: -1030,
  y: -600,
  scale: 1,
})
const wolves = reactive({
  x: 0,
  y: 0,
  scale: 1,
})

const modal = reactive({ place: 'strawhut' as const, x: -420, y: 0 })

const characterMain = reactive<Asset>({
  loaded: false,
  alias: 'characterMain',
  states: [
    { x: -490, y: 100, scale: 3.155, alpha: 1, time: 0 },
    { x: 210, y: 100, scale: 3.155, alpha: 1, time: 2.5 },
    { x: 210, y: 250, scale: 3.155, alpha: 1, time: 4 },
    { x: 210, y: 100, scale: 3.155, alpha: 1, time: 5.5 },
  ],
  state: { x: 0, y: 0, scale: 0, alpha: 0, time: 0 },
  animation: 'started',
})

function handleMCUpdate(stateIndex: number, state: 'init' | 'started' | 'finished') {
  if (state === 'finished') {
    if (stateIndex === 2) {
      setTimeout(() => {
        gameStore.nextTimeline({ screen: -1, id: 63 })
      }, 3000)
    } else {
      gameStore.nextTimeline({ id: 61 })
    }
  }
}

let totalElapsedTime = 0
let progress = 0
const currentSceneIndex = computed(() => currentGlobalSceneIndex.value - 35)

onTick((delta) => {
  if (!rotationStop.value && map.animation === 'started' && currentSceneIndex.value < map.states.length - 1) {
    totalElapsedTime += delta / 100
    const dt = map.states[currentSceneIndex.value + 1].time - map.states[currentSceneIndex.value].time
    const dx = map.states[currentSceneIndex.value + 1].x - map.states[currentSceneIndex.value].x
    const dy = map.states[currentSceneIndex.value + 1].y - map.states[currentSceneIndex.value].y
    const ds = map.states[currentSceneIndex.value + 1].scale - map.states[currentSceneIndex.value].scale

    progress = Math.min(totalElapsedTime / dt, 1)

    map.state.x = map.states[currentSceneIndex.value].x + dx * progress
    map.state.y = map.states[currentSceneIndex.value].y + dy * progress
    map.state.scale = map.states[currentSceneIndex.value].scale + ds * progress
    map.state.time = map.states[currentSceneIndex.value].time + dt * progress
    map.state.alpha = 1

    if (progress == 1) {
      totalElapsedTime = 0
      map.animation = 'finished'
    }
  }
})

onMounted(() => {
  gameStore.playBGMSound('resultLost')
  gameStore.nextTimeline({ id: 60 })
})
</script>

<template>
  <Container :x="screenWidth / 2 + map.state.x" :y="screenHeight / 2 + map.state.y" :scale="map.state.scale * zoomFactor">
    <Sprite :texture="map.alias.bg" :texture-options="textureOptions" :anchor="0.5" />
    <CharacterMain :states="characterMain.states" :currentCharacterIndex="currentCharacterIndex - 42" :skin="characterSkin" @update="handleMCUpdate" />
    <Sprite :texture="palmTrees.alias" :texture-options="textureOptions" :x="palmTrees.x" :y="palmTrees.y" :scale="palmTrees.scale" />
    <Wolf :x="wolves.x" :y="wolves.y" :scale="wolves.scale" :anchor="0.5" :alpha="1" :animation-speed="0.03" type="strawhut" />
  </Container>
  <Container>
    <SceneResult v-if="currentPopupIndex == 24" :place="modal.place" :zoom-factor="zoomFactor" />
  </Container>
  <!-- DEBUG -->
  <!--   <External>
    <div class="absolute bottom-0 left-32 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="map.state.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="map.state.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="map.state.scale" type="number" min="0" max="10" step="0.01" />
        <p>{{ currentSceneIndex }}</p>
      </div>
    </div>
  </External> -->
</template>
