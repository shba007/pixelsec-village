<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Application } from 'vue3-pixi'

import { resources } from '@/stores/game'
import ScreenMap from '@/components/Screen/Map.vue'
import ScreenStation from '@/components/Screen/Station.vue'

type Screen = 'map' | 'station'

const currentScreenIndex = ref(0)
const screens = ['map', 'station'] as Screen[]

const currentScreen = computed<Screen>(() => screens[currentScreenIndex.value])

function updateIndex() {
  currentScreenIndex.value++
}

const mainWindow = window
</script>

<template>
  <Application :resize-to="mainWindow" :antialias="false">
    <ScreenMap :is-load="currentScreen === 'map'" @close="updateIndex" />
    <ScreenStation :is-load="currentScreen === 'station'" @close="updateIndex" />
  </Application>
</template>

<style lang="css">
* {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: crisp-edges;
}
</style>
