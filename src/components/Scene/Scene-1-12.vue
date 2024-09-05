<script setup lang="ts">
import { reactive } from 'vue'
import { External } from 'vue3-pixi'

import { textureOptions } from '@/components/AppSettings.vue'

const modal = reactive({
  image: 'popupScene65',
  state: { x: 1930, y: 2720, scale: 0.46 / 2 },
})
</script>

<template>
  <Sprite :texture="modal.image" :texture-options="textureOptions" :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale" :anchor="0.5" />
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
