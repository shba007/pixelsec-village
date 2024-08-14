<script lang="ts" setup>
import { Application } from 'vue3-pixi'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import ScreenMap from '@/components/Screen/Map.vue'
import ScreenStation from '@/components/Screen/Station.vue'
import ScreenPark from '@/components/Screen/Park.vue'
import SceneRotate from '@/components/Scene/Scene-Rotate.vue'

const gameStore = useGameStore()
const { currentScreenIndex, rotationStop, hardStop } = storeToRefs(gameStore)

function updateIndex(value: number) {
  currentScreenIndex.value = value
  console.log('updatedIndex', value)
}

const mainWindow = window
</script>

<template>
  <Application :resize-to="mainWindow" :antialias="false">
    <ScreenMap :is-load="currentScreenIndex === 0 || currentScreenIndex === 2" :current-screen-index="currentScreenIndex" @close="updateIndex" />
    <ScreenStation :is-load="currentScreenIndex === 1" @close="updateIndex" />
    <ScreenPark :is-load="currentScreenIndex === 3" @close="updateIndex" />
    <SceneRotate v-if="rotationStop" :overlay="true" />
  </Application>
  <!-- DEBUG -->
  <!-- <button class="fixed right-0 bottom-0 z-[99999] bg-white p-2" @click="gameStore.toggleHardStop(!hardStop)">
    HardStop {{ hardStop }}
  </button> -->
</template>

<style lang="css">
:root {
  @apply bg-transparent;
}
</style>
