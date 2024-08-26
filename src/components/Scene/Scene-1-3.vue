<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'

const gameStore = useGameStore()

function handleMove() {
  gameStore.nextScene()
  gameStore.nextMapState()
}

useTimeoutFn(handleMove, 3000)
</script>

<template>
  <Modal title="let the adventure begin" description="Excited to find out which house<br/> you will arrive in? Answer the<br/> questions to determine your result." />
</template>
