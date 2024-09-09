<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { External, onTick } from 'vue3-pixi'
import { storeToRefs } from 'pinia'
import { useWindowSize } from '@vueuse/core'
import { textureOptions } from '@/components/AppSettings.vue'
import { useGameStore } from '@/stores/game'

import Cloud from '@/components/Animation/Cloud.vue'
import Door from '@/components/Animation/Door.vue'
import AlarmLight from '@/components/Animation/AlarmLight.vue'
import AlarmBell from '@/components/Animation/AlarmBell.vue'
import CharacterPanic from '@/components/Animation/Character/CharacterPanic.vue'
import CharacterGuard from '@/components/Animation/Character/CharacterGuard.vue'
import Scene1 from '@/components/Scene/Scene-4-1.vue'
import Scene2 from '@/components/Scene/Scene-4-2.vue'
import Scene3 from '@/components/Scene/Scene-4-3.vue'
import ModalProtip from '@/components/ModalProtip.vue'

const gameStore = useGameStore()
const { currentSceneIndex, currentPopupIndex, rotationStop } = storeToRefs(gameStore)

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => {
  return screenHeight.value / 720
})

// Asset
const screen = reactive<any>({
  loaded: false,
  alias: { bg: 'bankSky', fg: 'bankBackground' },
  states: [
    { x: 1000, y: 200, scale: 1, alpha: 1, time: 0 },
    { x: -550, y: 200, scale: 1, alpha: 1, time: 3 },
  ],
  state: { x: 1000, y: 200, scale: 1, alpha: 1, time: 0 },
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

const door = reactive({ x: 1170 - 1975, y: 60, scale: 1 })
const alarmBell = reactive({ x: 550 - 1975, y: -10, scale: 0.95 })
const alarmLight = ref([
  { type: 'left' as const, x: 560 - 1975, y: -90, scale: 1 },
  { type: 'right' as const, x: 1230 - 1975, y: -90, scale: 1 },
])

const speedFactor = 0.7
const charactersPanic = ref([
  {
    type: 'green',
    states: [
      { x: 1030 - 1975, y: 120, scale: 0.75, alpha: 0, time: 0 * speedFactor },
      { x: 950 - 1975, y: 130, scale: 0.75, alpha: 1, time: 0.25 * speedFactor },
      { x: -100 - 1975, y: 150, scale: 0.75, alpha: 1, time: 3 * speedFactor },
      { x: 1030 - 1975, y: 120, scale: 0.75, alpha: 1, time: 5 * speedFactor },
    ],
  },
  {
    type: 'purple',
    states: [
      { x: 1220 - 1975, y: 150, scale: 0.75, alpha: 0, time: 0 * speedFactor },
      { x: 1150 - 1975, y: 170, scale: 0.75, alpha: 1, time: 0.5 * speedFactor },
      { x: 640 - 1975, y: 200, scale: 0.75, alpha: 1, time: 2.5 * speedFactor },
      { x: 1150 - 1975, y: 140, scale: 0.75, alpha: 1, time: 5 * speedFactor },
    ],
  },
])

const characterGuard = reactive({
  x: 3220 - 1975,
  y: 170,
  scale: 1,
  alpha: 0,
  time: 0,
})

let totalElapsedTime = 0
let progress = 0
const currentStateIndex = ref(0)

onTick((delta) => {
  if (!rotationStop.value && screen.animation === 'started') {
    totalElapsedTime += delta / 100
    const dt = screen.states[currentStateIndex.value + 1].time - screen.states[currentStateIndex.value].time
    const dx = screen.states[currentStateIndex.value + 1].x - screen.states[currentStateIndex.value].x
    const dy = screen.states[currentStateIndex.value + 1].y - screen.states[currentStateIndex.value].y
    const ds = screen.states[currentStateIndex.value + 1].scale - screen.states[currentStateIndex.value].scale

    progress = Math.min(totalElapsedTime / dt, 1)
    screen.state.x = screen.states[currentStateIndex.value].x + dx * progress
    screen.state.y = screen.states[currentStateIndex.value].y + dy * progress
    screen.state.scale = screen.states[currentStateIndex.value].scale + ds * progress
    screen.state.time = screen.states[currentStateIndex.value].time + dt * progress

    if (progress == 1) {
      totalElapsedTime = 0
      screen.animation = 'finished'
      // gameStore.nextTimeline({ id: 36 })
    }
  }
})

watch(currentSceneIndex, (value) => {
  if (value === 21) {
    screen.animation = 'started'
    console.log(screen.animation)
  }
})

watch(currentPopupIndex, (value) => {
  if (value === 16) {
    gameStore.stopSFXSound()
    gameStore.playBGMSound('normal')
    setTimeout(() => {
      gameStore.nextTimeline({ id: 37 })
    }, 3000)
  }
})

onMounted(() => {
  gameStore.playBGMSound('panic')
  gameStore.playSFXSound('alarmLight')
  setTimeout(() => {
    gameStore.nextTimeline({ id: 31 })
  }, 2000)
})

const sceneRef = ref<any>(null)
watchEffect(() => {
  if (sceneRef.value) {
    const localBounds = sceneRef.value.getLocalBounds() // Get local bounds of the sprite
    const scaleX = sceneRef.value.worldTransform.a // Get global scale on X-axis

    const width = localBounds.width * scaleX

    console.log({ width })
  }
})
// screenwidth -> 
</script>

<template>
  <Container :x="screenWidth / 2 + (screen.state.x)" :y="screenHeight / 2" :scale="1 * zoomFactor">
    <Container>
      <Sprite :texture="screen.alias.bg" :texture-options="textureOptions" :x="0" :y="-200" :scale="screen.state.scale"
        :anchor="0.5" />
      <Cloud v-for="({ size, x, y, direction }, index) in clouds" :key="index" place="bank" :width-range="screenWidth"
        :size="size" :x="x" :y="y" :scale="1" :direction="direction" />
      <Sprite ref="sceneRef" :texture="screen.alias.fg" :texture-options="textureOptions" :x="0" :y="0"
        :scale="screen.state.scale" :anchor="0.5" />
    </Container>
    <Door :x="door.x" :y="door.y" :scale="door.scale" />
    <template v-if="!rotationStop">
      <CharacterPanic v-for="({ type, states }, index) of charactersPanic" :key="index" :states="states" place="bank"
        :type="type as 'purple' | 'green'" />
    </template>
    <AlarmBell :x="alarmBell.x" :y="alarmBell.y" :scale="alarmBell.scale" place="bank" />
    <AlarmLight v-for="({ type, x, y, scale }, index) of alarmLight" :key="index" :type="type" :x="x" :y="y"
      :scale="scale" />
    <CharacterGuard :state="characterGuard" place="bank" />
  </Container>
  <Container v-if="!rotationStop" :x="screenWidth / 2" :y="screenHeight / 2" :scale="1">
    <Scene1 v-if="currentPopupIndex === 12" />
    <Scene2 v-else-if="currentPopupIndex === 13" />
    <Scene3 v-else-if="currentPopupIndex === 14 || currentPopupIndex === 15" />
  </Container>
  <Container>
    <ModalProtip v-if="currentPopupIndex === 16" title="3" x="left" />
  </Container>
  <!-- DEBUG -->
  <External>
    <div class="absolute bottom-0 right-24 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="screen.state.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="screen.state.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="screen.state.scale" type="number" min="0" max="10" step="0.01" />
        <span class="bg-white">{{ screen.animation }}</span>
      </div>
    </div>
  </External>
</template>
