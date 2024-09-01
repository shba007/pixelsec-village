<script setup lang="ts">
import { reactive } from 'vue'
import { External } from 'vue3-pixi'
import { textureOptions } from '@/components/Settings.vue'
import { useTimeoutFn } from '@vueuse/core'

const modal = reactive({
  image: 'popupCutSceneResult1',
  state: { x: -420, y: 1, scale: 1 },
})

useTimeoutFn(() => {
  modal.image = 'popupCutSceneResult2'
}, 4000)
</script>

<template>
  <Sprite :texture="modal.image" :texture-options="textureOptions" :x="modal.state.x" :y="modal.state.y"
    :scale="modal.state.scale" :anchor="0.5" />
  <!-- <input type="email" placeholder="ENTER EMAIL FOR A FULL REPORT"
    class="w-full max-w-[320px] border-2 px-4 py-2 placeholder:text-blue-500" /> -->
  <!--  <External>
    <div class="fixed bottom-0 left-16 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="modal.state.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="modal.state.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="modal.state.scale" type="number" min="0" max="10" step="0.01" />
      </div>
    </div>
  </External> -->
</template>
