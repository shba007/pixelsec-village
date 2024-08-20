<script setup lang="ts">
import { External } from 'vue3-pixi'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import ModalProtip from '@/components/ModalProtip.vue'

const gameStore = useGameStore()

async function handleStart() {
  gameStore.nextScene()
}
</script>

<template>
  <ModalProtip title="You can <strong>Discover</strong> your fragmented data across the digital realm with Affinidi." />
</template>
