<script setup lang="ts">
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
  { type: 'blue', image: characterMainBlueWalkingTexture }
] as const

const gameStore = useGameStore()

function onCharcterSet(type: Character) {
  gameStore.nextScene()
  gameStore.nextMapState()
  gameStore.setActiveCharacter(type)
}
</script>

<template>
  <External class="absolute top-0 left-0 w-dvw h-dvh">
    <Modal title="Select your Avatar" description="Choose your main character energy." containerClass="gap-6">
      <div class="flex gap-8 md:gap-12">
        <button v-for="{ type, image } of characters" :key="image" @click="onCharcterSet(type)">
          <img :src="image" class="w-[48px] lg:w-[96px] hover:scale-125 duration-300" />
        </button>
      </div>
    </Modal>
  </External>
</template>
