<script lang="ts" setup>
import { Application, Loader } from 'vue3-pixi'
import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'

import { resources } from '@/utils/asset'
import { useGameStore } from '@/stores/game'

import Settings from '@/components/Settings.vue'
import SceneRotate from '@/components/Scene/Scene-Rotate.vue'
import ScreenMap from '@/components/Screen/Map.vue'
import ScreenStation from '@/components/Screen/Station.vue'
import ScreenPark from '@/components/Screen/Park.vue'
import ScreenBank from '@/components/Screen/Bank.vue'
import ScreenResult from '@/components/Screen/Result.vue'

const { width: screenWidth, height: screenHeight } = useWindowSize()

const gameStore = useGameStore()
const { currentScreenIndex, rotationStop, hardStop } = storeToRefs(gameStore)
</script>

<template>
  <Application>
    <Loader :resources="{ ...resources.font, ...resources.image, ...resources.sound }" :on-resolved="() => { }">
      <template #fallback="{ progress }">
        <Text :x="screenWidth / 2" :y="screenHeight / 2" :anchor="0.5" :style="{ fill: 'white' }" :scale="0.75">
          Loading... {{ Math.round(progress * 100) }}% </Text>
      </template>
      <template #default>
        <ScreenMap
          :is-load="currentScreenIndex === 0 || currentScreenIndex === 2 || currentScreenIndex === 4 || currentScreenIndex === 6" />
        <ScreenStation v-if="currentScreenIndex === 1" />
        <ScreenPark v-else-if="currentScreenIndex === 3" />
        <ScreenBank v-else-if="currentScreenIndex === 5" />
        <ScreenResult v-else-if="currentScreenIndex === 7" />
        <SceneRotate v-if="!hardStop && rotationStop" />
        <Settings />
      </template>
    </Loader>
  </Application>
  <!-- DEBUG -->
  <div class="fixed left-0 top-0 z-[99999] flex flex-col gap-2 bg-white p-2">
    <p>v0.3.3</p>
    <!--   <p>TimelineIndex: {{ gameStore.timelineIndex }}</p>
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
</style>
