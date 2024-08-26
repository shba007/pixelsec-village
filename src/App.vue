<script lang="ts" setup>
import { Application, Loader } from 'vue3-pixi'
import { storeToRefs } from 'pinia'
import { useWindowSize } from '@vueuse/core'

import { resources, useGameStore } from '@/stores/game'
import ScreenMap from '@/components/Screen/Map.vue'
import ScreenStation from '@/components/Screen/Station.vue'
import ScreenPark from '@/components/Screen/Park.vue'
import ScreenBank from '@/components/Screen/Bank.vue'
import SceneRotate from '@/components/Scene/Scene-Rotate.vue'

const { width: screenWidth, height: screenHeight } = useWindowSize()

const gameStore = useGameStore()
const { currentScreenIndex, rotationStop, hardStop } = storeToRefs(gameStore)

function updateIndex(value: number) {
  currentScreenIndex.value = value
}

const mainWindow = window
</script>

<template>
  <Application :resize-to="mainWindow" :antialias="false">
    <Loader :resources="resources" :on-resolved="() => {}">
      <template #fallback="{ progress }">
        <Text :x="screenWidth / 2" :y="screenHeight / 2" :anchor="0.5" :style="{ fill: 'white' }" :scale="0.75"> Loading... {{ Math.round(progress * 100) }}% </Text>
      </template>
      <template #default>
        <ScreenMap
          :is-load="currentScreenIndex === 0 || currentScreenIndex === 2 || currentScreenIndex === 4 || currentScreenIndex === 6"
          :current-screen-index="currentScreenIndex"
          @close="updateIndex" />
        <ScreenStation v-if="currentScreenIndex === 1" @close="updateIndex" />
        <ScreenPark v-if="currentScreenIndex === 3" @close="updateIndex" />
        <ScreenBank v-if="currentScreenIndex === 5" @close="updateIndex" />
        <SceneRotate v-if="!hardStop && rotationStop" :overlay="true" />
      </template>
    </Loader>
  </Application>
  <!-- DEBUG -->
 <!--  <div class="fixed right-0 top-0 z-[99999] flex flex-col gap-2 bg-white p-2">
    <p>v0.2.5</p>
    <button @click="gameStore.toggleHardStop(!hardStop)">HardStop {{ hardStop }}</button>
  </div> -->
</template>

<style lang="css">
:root {
  @apply bg-transparent;
}
</style>
