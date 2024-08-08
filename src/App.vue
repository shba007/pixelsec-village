<script lang="ts" setup>
import { ref } from 'vue'
import { Application } from 'vue3-pixi'

import ScreenMap from '@/components/Screen/Map.vue'
import ScreenStation from '@/components/Screen/Station.vue'

const currentScreenIndex = ref(0)

function updateIndex(value: number) {
  currentScreenIndex.value = value
}

const mainWindow = window
</script>

<template>
  <Application :resize-to="mainWindow" :antialias="false">
    <ScreenMap :is-load="currentScreenIndex === 0 || currentScreenIndex === 2" @close="updateIndex(1)" />
    <ScreenStation :is-load="currentScreenIndex === 1" @close="updateIndex(2)" />
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
