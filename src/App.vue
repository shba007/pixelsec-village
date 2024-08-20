<script lang="ts" setup>
import { Application, Loader } from 'vue3-pixi'
import { storeToRefs } from 'pinia'

import { resources, useGameStore } from '@/stores/game'
import ScreenMap from '@/components/Screen/Map.vue'
import ScreenStation from '@/components/Screen/Station.vue'
import ScreenPark from '@/components/Screen/Park.vue'
import SceneRotate from '@/components/Scene/Scene-Rotate.vue'
import { useWindowSize } from '@vueuse/core'

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
    <Loader :resources="{ ...resources.general, ...resources.map, ...resources.station, ...resources.park }" :on-resolved="() => {}">
      <template #fallback="{ progress }">
        <Text :x="screenWidth / 2" :y="screenHeight / 2" :anchor="0.5" :style="{ fill: 'white' }" :scale="0.5"> Loading... {{ Math.round(progress * 100) }}% </Text>
      </template>
      <template #default>
        <ScreenMap :is-load="currentScreenIndex === 0 || currentScreenIndex === 2" :current-screen-index="currentScreenIndex" @close="updateIndex" />
        <ScreenStation :is-load="currentScreenIndex === 1" @close="updateIndex" />
        <ScreenPark :is-load="currentScreenIndex === 3" @close="updateIndex" />
        <SceneRotate v-if="!hardStop && rotationStop" :overlay="true" />
      </template>
    </Loader>
  </Application>
  <!-- DEBUG -->
  <button class="fixed right-0 top-0 z-[99999] bg-white p-2" @click="gameStore.toggleHardStop(!hardStop)">HardStop {{ hardStop }}</button>
</template>

<style lang="css">
:root {
  @apply bg-transparent;
}
</style>
