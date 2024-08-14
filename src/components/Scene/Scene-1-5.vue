<script setup lang="ts">
import { External } from 'vue3-pixi'

import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'

const gameStore = useGameStore()

function onClick(value: boolean) {
  // DATA-COLLECT
  setTimeout(() => {
    gameStore.nextScene(value ? 1 : 2)
    gameStore.nextMapState()
  }, 300)
}
</script>

<template>
  <External class="absolute top-0 left-0 w-dvw h-dvh">
    <Modal title="" description="Before we begin, <br/> let’s go through the T&Cs.">
      <div class="flex gap-8">
        <button class="active-btn" @click="onClick(false)">Skip T&Cs</button>
        <button class="active-btn" @click="onClick(true)">Read T&Cs</button>
      </div>
    </Modal>
  </External>
</template>

<style lang="css" scoped>
.active-btn {
  @apply px-1 py-4 font-inet bg-contain bg-bottom h-[80px] aspect-[8/3] bg-no-repeat bg-[url(@/assets/buttons/long.png)] active:bg-[url(@/assets/buttons/long-pressed.png)] text-center text-3xl lg:text-[2.5rem] lg:leading-[3rem];
}
</style>
