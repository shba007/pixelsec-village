<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Application } from 'vue3-pixi'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import ScreenMap from '@/components/Screen/Map.vue'
import ScreenStation from '@/components/Screen/Station.vue'
import ScreenIcecream from '@/components/Screen/Icecream.vue'
import SceneRotate from '@/components/Scene/Scene-Rotate.vue'

const gameStore = useGameStore()
const { currentScreenIndex, hardStop } = storeToRefs(gameStore)

function updateIndex(value: number) {
  currentScreenIndex.value = value
  console.log('updatedIndex', value)
}

const mainWindow = window
</script>

<template>
  <Application :resize-to="mainWindow" :antialias="false">
    <ScreenMap :is-load="currentScreenIndex === 0 || currentScreenIndex === 2"
      :current-screen-index="currentScreenIndex" @close="updateIndex" />
    <ScreenStation :is-load="currentScreenIndex === 1" @close="updateIndex" />
    <ScreenIcecream :is-load="currentScreenIndex === 3" @close="updateIndex" />
    <SceneRotate v-if="hardStop" :overlay="currentScreenIndex === 0 || currentScreenIndex === 2" />
  </Application>
</template>

<style lang="css">
* {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: crisp-edges;
}

:root {
  @apply bg-transparent
}
</style>
