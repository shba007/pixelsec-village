<script setup lang="ts">
import { External } from 'vue3-pixi'

import { useGameStore, type Character } from '@/stores/game'
import Modal from '@/components/Modal.vue'

const characters = [
  { type: 'black', image: '/images/character-main-black-walking.gif' },
  { type: 'violate', image: '/images/character-main-violate-walking.gif' },
  { type: 'red', image: '/images/character-main-red-walking.gif' },
  { type: 'blue', image: '/images/character-main-blue-walking.gif' },
] as const

const gameStore = useGameStore()

function onCharcterSet(type: Character) {
  gameStore.nextScene()
  gameStore.nextMapState()
  gameStore.setCharacterSkin(type)
}
</script>

<template>
  <!-- description is word breaking -->
  <Modal title="Select your Avatar" description="Choose your main character energy." containerClass="gap-6">
    <div class="flex gap-8 md:gap-12">
      <button v-for="{ type, image } of characters" :key="image" @click="onCharcterSet(type)">
        <img :src="image" class="w-[48px] duration-300 hover:scale-125 lg:w-[80px]" />
      </button>
    </div>
  </Modal>
</template>
