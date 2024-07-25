<script setup lang="ts">
import { reactive } from 'vue'
import { External } from 'vue3-pixi'

import { useGameStore, type Character } from '@/stores/game'
import Modal from '@/components/Modal.vue'
import characterMainBlackWalkingTexture from '@/assets/character/main/black/walking.gif'
import characterMainViolateWalkingTexture from '@/assets/character/main/violate/walking.gif'
import characterMainRedWalkingTexture from '@/assets/character/main/red/walking.gif'
import characterMainBlueWalkingTexture from '@/assets/character/main/blue/walking.gif'

const characters = [
  { type: 'black', image: characterMainBlackWalkingTexture },
  { type: 'violate', image: characterMainViolateWalkingTexture },
  { type: 'red', image: characterMainRedWalkingTexture },
  { type: 'blue', image: characterMainBlueWalkingTexture },
] as const

const gameStore = useGameStore()

function onClick(value: boolean) {
  gameStore.nextScene()
  gameStore.nextMapPosition()
}
</script>

<template>
  <External class="absolute top-0 left-0 w-screen h-screen">
    <Modal title="Before we begin" description="let’s go through the T&Cs.">
      <div class="flex gap-8">
        <button class="active-btn" @click="onClick(false)">Skip T&Cs</button>
        <button class="active-btn" @click="onClick(true)">Read T&Cs</button>
      </div>
    </Modal>
  </External>
</template>

<style lang="css" scoped>
.active-btn {
  @apply px-4 py-1.5 bg-[url(@/assets/buttons/long-pressed.png)] bg-contain bg-bottom bg-no-repeat active:bg-[url(@/assets/buttons/long.png)] text-lg;
}
</style>
