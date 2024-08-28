<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { useTimeoutFn } from '@vueuse/core'

const gameStore = useGameStore()

function handleMove() {
  gameStore.nextScene()
}

useTimeoutFn(handleMove, 2000)
</script>

<template></template>
