<script setup lang="ts">
import { External } from 'vue3-pixi'
import { useGameStore } from '@/stores/game'
import rotateIndicator from '@/assets/rotate-indicator.png'
import Modal from '@/components/Modal.vue'

const props = withDefaults(
  defineProps<{
    overlay?: boolean
  }>(),
  {
    overlay: false,
  }
)

const gameStore = useGameStore()

async function handleRotate() {
  await gameStore.toggleGameMode(true)
}
</script>

<template>
  <Modal title="Rotate your<br/> Screen" description="Rotate your Screen<br/> to move forward" :overlay="overlay">
    <button class="flex flex-col items-center justify-center gap-1" container-class="justify-between gap-0 py-4" @click="handleRotate">
      <img :src="rotateIndicator" alt="rotate-indicator" class="size-[48px] animate-pulse object-contain md:size-[80px]" />
      <span class="-translate-y-3 font-inet text-2xl opacity-50 md:text-4xl">Rotate</span>
    </button>
  </Modal>
</template>
