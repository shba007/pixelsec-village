<script setup lang="ts">
import { computed, reactive } from 'vue'
import { External } from 'vue3-pixi'

import { textureOptions } from '@/components/AppSettings.vue'
import { useWindowSize } from '@vueuse/core'

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const modal = reactive({
  image: 'popupScene65',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 3) / 4, scale: 0.35 * zoomFactor.value },
})
</script>

<template>
  <Sprite :texture="modal.image" :texture-options="textureOptions" :x="modal.state.x" :y="modal.state.y"
    :scale="modal.state.scale" :anchor="0.5" />
  <!--   <External>
    <div class="fixed bottom-0 left-16 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="modal.state.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="modal.state.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="modal.state.scale" type="number" min="0" max="10" step="0.01" />
      </div>
    </div>
  </External> -->
</template>
