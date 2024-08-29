<script setup lang="ts">
import { External } from 'vue3-pixi'

import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'

const gameStore = useGameStore()

function onClick(value: boolean) {
  // DATA-COLLECT
  setTimeout(() => {
    gameStore.nextTimeline({ screen: value ? 1 : 2, id: 5 })
  }, 300)
}
</script>

<template>
  <Modal title="" description="">
    <p class="text-center text-3xl lg:text-[2.5rem] lg:leading-[3rem]"
      v-html="'Before we begin, <br/> let’s go through the T&Cs.'" />
    <div class="flex gap-8">
      <button class="active-btn" @click="onClick(false)">Skip T&Cs</button>
      <button class="active-btn" @click="onClick(true)">Read T&Cs</button>
    </div>
  </Modal>
</template>

<style lang="css" scoped>
.active-btn {
  @apply flex aspect-[8/3] h-[64px] items-center justify-center bg-[url(@/assets/buttons/long/unpressed.png)] bg-contain bg-bottom bg-no-repeat font-inet text-3xl active:bg-[url(@/assets/buttons/long/pressed.png)] active:text-[#89ab2c] lg:h-[80px] lg:text-[2.5rem] lg:leading-[3rem];
}
</style>
