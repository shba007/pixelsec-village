<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { useTimeoutFn } from '@vueuse/core'

const gameStore = useGameStore()

function handleMove() {
  gameStore.nextTimeline({ id: 2 })
}

useTimeoutFn(handleMove, 2000)
</script>

<template></template>
