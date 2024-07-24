<script setup lang="ts">
import { reactive } from 'vue'
import { External } from 'vue3-pixi'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

function handleMove() {
  gameStore.nextMapPosition()
}
</script>

<template>
  <External>
    <p class="bg-white absolute top-0 left-0">
      This is second Scene
      <button @click="handleMove">Map Move</button>
    </p>
  </External>
</template>
