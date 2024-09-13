<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue'
import { Application, Loader } from 'vue3-pixi'
import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { resources } from '@/utils/asset'
import { useGameStore } from '@/stores/game'

import AppSettings from '@/components/AppSettings.vue'
import ScreenMap from '@/components/Screen/Map.vue'
import ScreenStation from '@/components/Screen/Station.vue'
import ScreenPark from '@/components/Screen/Park.vue'
import ScreenBank from '@/components/Screen/Bank.vue'
import ScreenResult from '@/components/Screen/Result.vue'
import SceneExperience from '@/components/Scene/Scene-Experience.vue'

const { width: screenWidth, height: screenHeight } = useWindowSize()

const gameStore = useGameStore()
const { currentScreenIndex, rotationStop, hardStop, isMobile } = storeToRefs(gameStore)

async function preloadSound(path: string) {
  try {
    const response = await fetch(path)
    const soundData = await response.blob()
    new Audio(URL.createObjectURL(soundData))

    return true
  } catch (error) {
    console.error('Error loading sound:', error)
    return false
  }
}

onBeforeMount(async () => {
  await preloadSound('/sound/bgm-sprite.mp3')
  await preloadSound('/sound/sfx-sprite.mp3')
  isLoaded.value = true
})

function onResolve() {
  // gameStore.toggleHardStop(true)
}

const mainWindow = computed(() => window)

const isLoaded = ref(false)
const isStarted = ref(false)

function onStart() {
  if (!isLoaded.value) return
  setTimeout(() => {
    gameStore.playBGMSound('normal')
    setTimeout(() => {
      isStarted.value = true
    }, 200)
  }, 50)
}

const images = computed(() => (isMobile.value ? resources.image : resources.image))
const loadingText = computed(() => ({ x: screenWidth.value / 2, y: screenHeight.value / 2, style: { fill: 'white', fontFamily: 'INET', fontSize: 28 } }))
</script>

<template>
  <Application :resize-to="mainWindow" :antialias="false">
    <Loader :resources="{ ...resources.sound, ...resources.font, ...images }" :on-resolved="onResolve">
      <template #fallback="{ progress }">
        <Text :x="loadingText.x" :y="loadingText.y" :anchor="0.5" :style="loadingText.style"> Loading... {{ Math.floor(progress * 100) }}% </Text>
      </template>
      <template #default>
        <template v-if="!isStarted">
          <Text :x="loadingText.x" :y="loadingText.y" :anchor="0.5" :style="loadingText.style" cursor="pointer" @pointerdown="onStart">
            {{ isLoaded ? 'Start Game' : 'Loading... 100%' }}
          </Text>
        </template>
        <template v-else>
          <ScreenMap v-if="currentScreenIndex <= 6" :is-load="currentScreenIndex === 0 || currentScreenIndex === 2 || currentScreenIndex === 4 || currentScreenIndex === 6" />
          <ScreenStation v-if="currentScreenIndex === 1" />
          <ScreenPark v-else-if="currentScreenIndex === 3" />
          <ScreenBank v-else-if="currentScreenIndex === 5" />
          <ScreenResult v-else-if="currentScreenIndex === 7" />
          <SceneExperience v-if="!hardStop && rotationStop" />
          <AppSettings />
        </template>
      </template>
    </Loader>
  </Application>
  <!-- DEBUG -->
  <div class="fixed left-0 top-0 z-[99999] flex flex-col gap-2 bg-white p-2">
    <p>v0.4.7</p>
    <p>TimelineIndex: {{ gameStore.timelineIndex }}</p>
    <p>ScreenIndex: {{ gameStore.currentScreenIndex }}</p>
    <p>PopupIndex: {{ gameStore.currentPopupIndex }}</p>
    <p>SceneIndex: {{ gameStore.currentSceneIndex }}</p>
    <p>CharacterIndex: {{ gameStore.currentCharacterIndex }}</p>
  </div>
  <!-- <div class="fixed right-0 top-0 z-[99999] flex flex-col gap-2 bg-white p-2">
    <button @click="gameStore.toggleHardStop(!hardStop)">HardStop {{ hardStop }}</button>
  </div> -->
</template>

<style lang="css">
:root {
  @apply bg-transparent;
}
</style>
