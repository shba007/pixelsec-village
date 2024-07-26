<script setup lang="ts">
import { External } from 'vue3-pixi'
import rotateIndicator from '@/assets/rotate-indicator.png'

import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'

const gameStore = useGameStore()

async function handleStart() {
  gameStore.nextScene()
  gameStore.nextMapPosition()
  await gameStore.toggleGameMode(true)
}
</script>

<template>
  <External class="absolute top-0 left-0 w-screen h-screen">
    <Modal
      title="welcome to dataville"
      description="Where your online habits and choices will shape the kind of house you live in.
          Let’s go!"
    >
      <button class="flex items-end gap-2" @click="handleStart">
        <img :src="rotateIndicator" alt="rotate-indicator" />
        <span class="pb-2 pt-4 text-xl">Full screen</span>
      </button>
    </Modal>
  </External>
</template>
