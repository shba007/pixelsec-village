<script setup lang="ts">
import { useTimeoutFn } from '@vueuse/core'
import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'

const gameStore = useGameStore()

function handleMove() {
  gameStore.nextScene()
  gameStore.nextMapState()
}

useTimeoutFn(handleMove, 10000)
</script>

<template>
  <Modal type="long" title=""
    description="It’s a hot day and you need to cool off. How about a free ice-cream in exchange for your personal data? What are you willing to share?"
    y="top" container-class="text-left" />
</template>
