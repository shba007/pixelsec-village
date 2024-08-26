<script setup lang="ts">
import { External } from 'vue3-pixi'

import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'

const gameStore = useGameStore()

function onClick(value: boolean) {
  // DATA-COLLECT
  setTimeout(() => {
    gameStore.nextScene()
    gameStore.nextMapState()
  }, 300)
}
</script>

<template>
  <Modal title="" description="" type="short" x="right">
    <p class="text-left text-3xl lg:text-[2.5rem] lg:leading-[3rem]" v-html="'Are you willing to<br/>exchange your data<br/>for rebates or<br/>rewards?'" />
    <div class="flex gap-4">
      <button class="active-btn" @click="onClick(false)">YES</button>
      <button class="active-btn" @click="onClick(true)">NO</button>
    </div>
  </Modal>
</template>

<style lang="css" scoped>
.active-btn {
  @apply flex aspect-[5/3] h-[64px] items-center justify-center bg-[url(@/assets/buttons/short/unpressed.png)] bg-contain bg-bottom bg-no-repeat font-inet text-3xl active:bg-[url(@/assets/buttons/short/pressed.png)] active:text-[#89ab2c] lg:h-[80px] lg:text-[2.5rem] lg:leading-[3rem];
}
</style>
