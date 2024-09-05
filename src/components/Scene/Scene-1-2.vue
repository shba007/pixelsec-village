<script setup lang="ts">
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

gameStore.nextTimeline({ id: 2 })
</script>

<template></template>
