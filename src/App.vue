<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { Application, Loader } from 'vue3-pixi'
import { isMobile } from 'pixi.js'

import { resources } from '@/utils/asset'
import { useGameStore } from '@/stores/game'

import AppSettings from '@/components/AppSettings.vue'
import AppLoader from '@/components/AppLoader.vue'
import AppButton from '@/components/AppButton.vue'
import ScreenMap from '@/components/Screen/Map.vue'
import ScreenStation from '@/components/Screen/Station.vue'
import ScreenPark from '@/components/Screen/Park.vue'
import ScreenBank from '@/components/Screen/Bank.vue'
import ScreenResult from '@/components/Screen/Result.vue'
import SceneExperience from '@/components/Scene/Scene-Experience.vue'

const gameStore = useGameStore()
const { currentScreenIndex, gamePause, motionBlur, isLandscape, isSoundLoaded, isSoundPlayed, isStarted, isPressed, isReset } = storeToRefs(gameStore)
const { width: screenWidth, height: screenHeight } = useWindowSize()

const loadingText = computed(() => ({
  x: screenWidth.value * 0.5,
  y: screenHeight.value * (isLandscape.value ? 0.65 : 0.57),
  style: { fontFamily: 'INET', fontSize: 44, lineHeight: 54, fill: 'white' },
}))
const progress = ref(0)

function onProgress(value: number) {
  progress.value = value
}

function onResolve() {
  // gameStore.toggleDebugPause(true)
}

function onStart() {
  console.log('onstart Triggered')

  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
  function unlock() {
    const buffer = audioContext.createBuffer(1, 1, 22050)
    const source = audioContext.createBufferSource()
    source.buffer = buffer
    source.connect(audioContext.destination)
    source.start(0)
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume().then(unlock)
  } else {
    unlock()
  }

  if (progress.value == 1 && isSoundLoaded.value && !isPressed.value) {
    gameStore.playBGMSound('normal')
    if (!isSoundPlayed.value) return

    isPressed.value = true
    setTimeout(() => {
      isStarted.value = true
    }, 600)
  }
}
</script>

<template>
  <main class="relative bg-black" :class="{ 'overflow-hidden': isMobile.apple.phone && isStarted && (currentScreenIndex === 0 || gamePause) }" @click="onStart">
    <section>
      <!-- <img v-if="
        isMobile.apple.phone && isStarted && (currentScreenIndex === 0 || gamePause) && (currentScreenIndex === 0 || currentScreenIndex === 2 || currentScreenIndex === 4 || currentScreenIndex === 6)
      " src="/images/image-bg.png" class="absolute left-0 top-0 landscape:hidden" />
      <div v-if="gameStore.rotatePause" class="absolute left-0 top-0 h-full w-full bg-white/40 landscape:hidden" /> -->
      <!-- DEBUG -->
      <div class="fixed left-0 top-0 z-[99999] flex flex-col gap-2 bg-white p-2">
        <p>v0.4.85</p>
        <!--   <p>ScreenIndex: {{ gameStore.currentScreenIndex }}</p>
        <p>PopupIndex: {{ gameStore.currentPopupIndex }}</p>
        <p>SceneIndex: {{ gameStore.currentSceneIndex }}</p>
        <p>CharacterIndex: {{ gameStore.currentCharacterIndex }}</p> -->
      </div>
      <div class="fixed right-0 top-0 z-[99999] flex flex-col gap-2 bg-white p-2">
        <button @click="gameStore.nextTimeline({ id: 666 })">Next Scene</button>
      </div>
    </section>
    <AppLoader v-if="!isStarted" :progress="progress * 100" />
    <Application
      class="relative z-10"
      :width="screenWidth"
      :height="screenHeight * (!isLandscape && isMobile.apple.phone && isStarted && (currentScreenIndex === 0 || gamePause) ? 1.3 : 1)"
      :resolution="2"
      :antialias="motionBlur"
      power-preference="high-performance">
      <Loader :resources="{ ...resources.font, ...resources.image }" :on-progress="onProgress" :on-resolved="onResolve">
        <template #fallback>
          <Text :x="loadingText.x" :y="loadingText.y" :anchor="0.5" :style="loadingText.style"> Loading... {{ Math.floor(progress * 99) }}% </Text>
        </template>
        <template #default>
          <Container v-if="!isReset" :scale="1">
            <template v-if="!isStarted">
              <Text v-if="!isSoundLoaded" :x="loadingText.x" :y="loadingText.y" :anchor="0.5" :style="loadingText.style">Loading... 99%</Text>
              <Container v-else :x="loadingText.x" :y="loadingText.y" :scale="0.65">
                <AppButton type="long" text="Start Game" :x="0" :y="0" :scale="1" :is-pressed="isPressed" />
              </Container>
            </template>
            <template v-else>
              <ScreenMap v-if="currentScreenIndex <= 6" :is-load="currentScreenIndex === 0 || currentScreenIndex === 2 || currentScreenIndex === 4 || currentScreenIndex === 6" />
              <ScreenStation v-if="currentScreenIndex === 1" />
              <ScreenPark v-else-if="currentScreenIndex === 3" />
              <ScreenBank v-else-if="currentScreenIndex === 5" />
              <ScreenResult v-else-if="currentScreenIndex === 7" />
              <SceneExperience />
            </template>
            <AppSettings />
          </Container>
        </template>
      </Loader>
    </Application>
  </main>
</template>
