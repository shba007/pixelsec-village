<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Application } from 'vue3-pixi'

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
    <ScreenMap v-if="currentScreen === 'map'" @close="updateIndex" />
    <ScreenStation v-else-if="currentScreen === 'station'" @close="updateIndex" />
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
