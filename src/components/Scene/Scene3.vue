<script setup lang="ts">
import { reactive } from 'vue'
import { External } from 'vue3-pixi'

import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'
import characterMainBlackFrontWalk1Texture from '@/assets/character/main/black/front-walk-1.png'
import characterMainViolateFrontWalk1Texture from '@/assets/character/main/violate/front-walk-1.png'
import characterMainRedFrontWalk1Texture from '@/assets/character/main/red/front-walk-1.png'
import characterMainBlueFrontWalk1Texture from '@/assets/character/main/blue/front-walk-1.png'

const gameStore = useGameStore()

function handleMove() {
  gameStore.nextMapPosition()
}
</script>

<template>
  <External class="absolute top-0 left-0 w-screen h-screen">
    <p class="bg-white absolute top-0 left-0">
      This is second Scene
      <button @click="handleMove">Map Move</button>
    </p>
    <Modal title="Select your Avatar" description="Choose your main character energy.">
      <div class="flex gap-8">
        <img :src="characterMainBlackFrontWalk1Texture" :width="48" />
        <img :src="characterMainViolateFrontWalk1Texture" :width="48" />
        <img :src="characterMainRedFrontWalk1Texture" :width="48" />
        <img :src="characterMainBlueFrontWalk1Texture" :width="48" />
      </div>
    </Modal>
  </External>
</template>
