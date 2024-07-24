<script setup lang="ts">
import { reactive } from 'vue'
import { External } from 'vue3-pixi'

import { useGameStore } from '@/stores/game'

const props = defineProps<{
  screenWidth: number
  screenHeight: number
}>()

const gameStore = useGameStore()

function handleStart() {
  gameStore.nextScene()
  gameStore.nextMapPosition()
}
</script>

<template>
  <Container :x="screenWidth / 2" :y="screenHeight / 2" :scale="2.2">
    <Sprite texture="popupBG1" :anchor="0.5" />
    <External>
      <div
        class="absolute left-1/2 top-1/2 aspect-[65/106] w-4/5 -translate-x-1/2 -translate-y-1/2 bg-[url('box-bg.png')] bg-cover bg-no-repeat p-1 md:aspect-[106/65]"
      >
        <div class="flex h-full w-full flex-col items-center justify-center gap-10 px-7 py-8">
          <h1 class="text-center text-2xl font-bold uppercase">welcome to dataville</h1>
          <p class="text-center text-2xl">
            Where your online habits and choices will shape the kind of house you live in. Let’s go!
          </p>
          <button class="flex items-end gap-2" @click="handleStart">
            <img src="@/assets/rotate-indicator.png" alt="rotate-indicator" />
            <span class="pb-2 pt-4 text-xl">Full screen</span>
          </button>
        </div>
      </div>
    </External>
  </Container>
</template>
