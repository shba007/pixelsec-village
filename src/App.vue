<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { Application, Loader } from 'vue3-pixi'
import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { isMobile } from 'pixi.js'

import { resources } from '@/utils/asset'
import { useGameStore } from '@/stores/game'

import AppSettings from '@/components/AppSettings.vue'
import ScreenMap from '@/components/Screen/Map.vue'
import ScreenStation from '@/components/Screen/Station.vue'
import ScreenPark from '@/components/Screen/Park.vue'
import ScreenBank from '@/components/Screen/Bank.vue'
import ScreenResult from '@/components/Screen/Result.vue'
import SceneExperience from '@/components/Scene/Scene-Experience.vue'
import AppButton from '@/components/AppButton.vue'

const { width: screenWidth, height: screenHeight } = useWindowSize()

const gameStore = useGameStore()
const { currentScreenIndex, gamePause, motionBlur, isSoundLoaded, isStarted, isPressed, reset } = storeToRefs(gameStore)

function onClick() {
  if (!isSoundLoaded.value) return

  isPressed.value = true
}

watch(isPressed, (value) => {
  if (!value) return

  gameStore.playBGMSound('normal')
  setTimeout(() => {
    isStarted.value = true
  }, 300)
})

function onResolve() {
  // gameStore.toggleDebugPause(true)
}

const loadingText = computed(() => ({ x: screenWidth.value / 2, y: screenHeight.value / 2, style: { fontFamily: 'INET', fontSize: 44, lineHeight: 54, fill: 'white' } }))
</script>

<template>
  <main class="relative" :class="{ 'overflow-hidden portrait:h-[130vh]': isMobile.apple.phone && isStarted && (currentScreenIndex === 0 || gamePause) }" @click="onClick">
    <Application :width="screenWidth" :height="screenHeight" :antialias="motionBlur" power-preference="high-performance" class="relative z-10">
      <Loader :resources="{ ...resources.font, ...resources.image }" :on-resolved="onResolve">
        <template #fallback="{ progress }">
          <Text :x="loadingText.x" :y="loadingText.y" :anchor="0.5" :style="loadingText.style"> Loading... {{ Math.floor(progress * 99) }}% </Text>
        </template>
        <template #default>
          <template v-if="!isStarted">
            <Container v-if="isSoundLoaded" :x="loadingText.x" :y="loadingText.y" :scale="0.65">
              <AppButton type="long" text="Start Game" :x="0" :y="0" :scale="1" :is-pressed="isPressed" />
            </Container>
            <Text v-else :x="loadingText.x" :y="loadingText.y" :anchor="0.5" :style="loadingText.style">Loading... 99%</Text>
          </template>
          <template v-else-if="isStarted && reset">
            <ScreenMap v-if="currentScreenIndex <= 6" :is-load="currentScreenIndex === 0 || currentScreenIndex === 2 || currentScreenIndex === 4 || currentScreenIndex === 6" />
            <ScreenStation v-if="currentScreenIndex === 1" />
            <ScreenPark v-else-if="currentScreenIndex === 3" />
            <ScreenBank v-else-if="currentScreenIndex === 5" />
            <ScreenResult v-else-if="currentScreenIndex === 7" />
            <SceneExperience />
          </template>
        </template>
      </Loader>
      <AppSettings />
    </Application>
    <section>
      <img
        v-if="
          isMobile.apple.phone && isStarted && (currentScreenIndex === 0 || gamePause) && (currentScreenIndex === 0 || currentScreenIndex === 2 || currentScreenIndex === 4 || currentScreenIndex === 6)
        "
        src="/images/image-bg.png"
        class="absolute left-0 top-0 landscape:hidden" />
      <div v-if="gameStore.rotatePause" class="absolute left-0 top-0 h-full w-full bg-white/40 landscape:hidden" />
      <!-- DEBUG -->
      <div class="fixed left-0 top-0 z-[99999] flex flex-col gap-2 bg-white p-2">
        <p>v0.4.69</p>
        <p>TimelineIndex: {{ gameStore.timelineIndex }}</p>
        <p>ScreenIndex: {{ gameStore.currentScreenIndex }}</p>
        <p>PopupIndex: {{ gameStore.currentPopupIndex }}</p>
        <p>SceneIndex: {{ gameStore.currentSceneIndex }}</p>
        <p>CharacterIndex: {{ gameStore.currentCharacterIndex }}</p>
      </div>
      <!-- <div class="fixed right-0 top-0 z-[99999] flex flex-col gap-2 bg-white p-2">
      <button @click="gameStore.toggleDebugPause(!debugPause)">debugPause {{ debugPause }}</button>
    </div> -->
    </section>
  </main>
</template>

<style lang="css">
:root {
  @apply bg-transparent;
}
</style>
