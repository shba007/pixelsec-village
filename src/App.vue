<script lang="ts" setup>
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
import { ref } from 'vue'
import { computed } from 'vue'

const { width: screenWidth, height: screenHeight } = useWindowSize()

const gameStore = useGameStore()
const { currentScreenIndex, rotationStop, hardStop, motionBlur, isMobile } = storeToRefs(gameStore)

function onResolve() {
  // gameStore.toggleHardStop(true)
}

const mainWindow = window

const isStarted = ref(false)

function onStart() {
  isStarted.value = true
  gameStore.playBGMSound('normal')
}

const images = computed(() =>
  isMobile.value ? resources.imageSm : resources.image
)
</script>

<template>
  <Application :resize-to="mainWindow" :antialias="false">
    <Loader :resources="{ ...resources.font, ...images, ...resources.sound }" :on-resolved="onResolve">
      <template #fallback="{ progress }">
        <Text :x="screenWidth / 2" :y="screenHeight / 2" :anchor="0.5" :scale="0.75"
          :style="{ fill: 'white', fontFamily: 'INET' }"> Loading... {{ Math.floor(progress * 100) }}% </Text>
      </template>
      <template #default>
        <template v-if="!isStarted">
          <Text :x="screenWidth / 2" :y="screenHeight / 2" :anchor="0.5" :scale="0.75"
            :style="{ fill: 'white', fontFamily: 'INET' }" cursor="pointer" @pointerdown="onStart">
            Start Game
          </Text>
        </template>
        <template v-else>
          <ScreenMap v-if="currentScreenIndex <= 6"
            :is-load="currentScreenIndex === 0 || currentScreenIndex === 2 || currentScreenIndex === 4 || currentScreenIndex === 6" />
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
    <p>v0.3.29</p>
    <!--     <p>TimelineIndex: {{ gameStore.timelineIndex }}</p>
    <p>ScreenIndex: {{ gameStore.currentScreenIndex }}</p>
    <p>PopupIndex: {{ gameStore.currentPopupIndex }}</p>
    <p>SceneIndex: {{ gameStore.currentSceneIndex }}</p>
    <p>CharacterIndex: {{ gameStore.currentCharacterIndex }}</p> -->
  </div>
  <div class="fixed right-0 top-0 z-[99999] flex flex-col gap-2 bg-white p-2">
    <button @click="gameStore.toggleHardStop(!hardStop)">HardStop {{ hardStop }}</button>
  </div>
</template>

<style lang="css">
:root {
  @apply bg-transparent;
}

canvas {
  image-rendering: optimizeSpeed;
  /* Older versions of FF          */
  image-rendering: -moz-crisp-edges;
  /* FF 6.0+                       */
  image-rendering: -webkit-optimize-contrast;
  /* Safari                        */
  image-rendering: -o-crisp-edges;
  /* OS X & Windows Opera (12.02+) */
  image-rendering: pixelated;
  /* Awesome future-browsers       */
  -ms-interpolation-mode: nearest-neighbor;
  /* IE                            */
}
</style>
