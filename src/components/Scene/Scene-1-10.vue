<script setup lang="ts">
import { External } from 'vue3-pixi'

import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'

const gameStore = useGameStore()

function onClick(value: boolean) {
  // DATA-COLLECT
  setTimeout(() => {
    gameStore.nextTimeline({ id: -9 })
  }, 300)
}
</script>

<template>
  <Modal title="" description="" type="short" x="right">
    <p class="text-left text-[26px] lg:text-[2rem] lg:leading-[3rem]"
      v-html="'Would you store your<br/>multiple online profiles<br/>and data securely in a<br/>single vault?'" />
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
