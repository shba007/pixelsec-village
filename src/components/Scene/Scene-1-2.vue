<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import { useTimeoutFn } from '@vueuse/core'

const gameStore = useGameStore()

function handleMove() {
  alert('Timeline Trigger 2')
  gameStore.nextTimeline()
}

useTimeoutFn(handleMove, 2000)
</script>

<template></template>
