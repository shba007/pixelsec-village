<script setup lang="ts">
import { External } from 'vue3-pixi'

import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'

const gameStore = useGameStore()

function onClick(value: boolean) {
  gameStore.nextScene(value ? 1 : 2)
  gameStore.nextMapPosition()
}
</script>

<template>
  <External class="absolute top-0 left-0 w-screen h-screen">
    <Modal title="Before we begin" description="let’s go through the T&Cs.">
      <div class="flex gap-8">
        <button class="active-btn" @click="onClick(false)">Skip T&Cs</button>
        <button class="active-btn" @click="onClick(true)">Read T&Cs</button>
      </div>
    </Modal>
  </External>
</template>

<style lang="css" scoped>
.active-btn {
  @apply px-4 py-1.5 bg-[url(@/assets/buttons/long.png)] bg-contain bg-bottom bg-no-repeat active:bg-[url(@/assets/buttons/long-pressed.png)] text-lg;
}
</style>
