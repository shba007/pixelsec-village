<script setup lang="ts">
import { External } from 'vue3-pixi'

import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'
import { useTimeoutFn } from '@vueuse/core'

const gameStore = useGameStore()

function handleMove() {
  gameStore.nextScene()
  gameStore.nextMapPosition()
}

useTimeoutFn(handleMove, 2000)
</script>

<template>
  <External class="absolute top-0 left-0 w-dvw h-dvh">
    <Modal title="let the adventure begin" description="Excited to find out which house<br/> you will arrive in? Answer the<br/> questions to determine your result." />
  </External>
</template>
