<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { External, onTick } from 'vue3-pixi'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game'

import type { Asset } from '@/utils/types'
import { textureOptions } from '@/components/AppSettings.vue'
import SceneResult from '@/components/Scene/Scene-Result.vue'
import CharacterMain from '@/components/Animation/Character/CharacterMain.vue'

const gameStore = useGameStore()
const { characterSkin, currentPopupIndex, currentCharacterIndex, currentSceneIndex: currentGlobalSceneIndex, gamePause } = storeToRefs(gameStore)

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  const aspectRatio = screenWidth.value / screenHeight.value
  return aspectRatio > 1280 / 720 ? screenHeight.value / 720 : screenWidth.value / 1280
})

// Asset
const map = reactive<any>({
  loaded: false,
  alias: { bg: 'resultTownHouseBg', fg: 'resultTownHouseBg' },
  states: [
    { x: 0, y: 80, scale: 1.4, alpha: 1, time: 0 },
    { x: 0, y: 80, scale: 1.4, alpha: 1, time: 2 },
  ],
  state: { x: 0, y: 0, scale: 1.5, alpha: 1, time: 0 },
  animation: 'started',
})

const modal = reactive({ place: 'townhouse' as const, x: -200, y: 0 })

const characterMain = reactive<Asset>({
  loaded: false,
  alias: 'characterMain',
  states: [
    { x: 100, y: 100, scale: 3.155, alpha: 1, time: 0 },
    { x: 350, y: 100, scale: 3.155, alpha: 1, time: 2.5 },
    { x: 200, y: 100, scale: 3.155, alpha: 1, time: 4 },
    { x: 350, y: 100, scale: 3.155, alpha: 1, time: 5.5 },
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
  if (!gamePause.value && map.animation === 'started' && currentSceneIndex.value < map.states.length - 1) {
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
  gameStore.playBGMSound('resultWin')
  gameStore.nextTimeline({ id: 60 })
})
</script>

<template>
  <Container :x="screenWidth / 2" :y="screenHeight / 2" :scale="1 * zoomFactor">
    <Container :x="map.state.x" :y="map.state.y" :scale="map.state.scale">
      <Sprite :texture="map.alias.bg" :texture-options="textureOptions" :anchor="0.5" />
      <CharacterMain :states="characterMain.states" :currentCharacterIndex="currentCharacterIndex - 42" :skin="characterSkin" @update="handleMCUpdate" />
    </Container>
  </Container>
  <Container>
    <SceneResult v-if="currentPopupIndex == 24" :place="modal.place" :zoom-factor="zoomFactor" />
  </Container>
  <!-- DEBUG -->
  <!--  <External>
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
