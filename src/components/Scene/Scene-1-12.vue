<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue'
import { External } from 'vue3-pixi'

import { textureOptions } from '@/components/AppSettings.vue'
import { useWindowSize } from '@vueuse/core'
import { useGameStore } from '@/stores/game'

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const gameStore = useGameStore()

const modal = reactive({
  image: 'popupBgSlim',//'popupScene65',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 3) / 4, scale: 0.325 * zoomFactor.value },
})

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

const titleText = reactive({ x: 0, y: 50, anchor: 0.5, scale: 0.25, style: { fontFamily: 'LAN', fontSize: 107 * 4, align: 'center', lineHeight: 125 * 4, stroke: 1, strokeThickness: 1 * 4 } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Container :x="titleText.x" :y="titleText.y">
      <Text :x="0" :y="-200" :scale="titleText.scale" :anchor="titleText.anchor"
        :style="{ ...titleText.style, strokeThickness: titleText.style.strokeThickness * 2 }">IT'S
        TIME TO HEAD HOME</Text>
      <Text :scale="titleText.scale" :anchor="titleText.anchor" :style="titleText.style">Please wait while we put on the
        \nfinishing touches to
        your house.</Text>
    </Container>
  </Container>
  <!-- <External>
    <div class="fixed bottom-0 left-16 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="titleText.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="titleText.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="titleText.style.fontSize" type="number" min="0" max="200" step="5" />
        <input v-model="titleText.style.lineHeight" type="number" min="0" max="200" step="5" />
      </div>
    </div>
  </External> -->
</template>
