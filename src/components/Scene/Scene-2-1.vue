<script setup lang="ts">
import { External } from 'vue3-pixi'
import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'

const gameStore = useGameStore()

const ages = ['18-25', '26-35', '36-44', '45-54']

function onClick(value: string) {
  // DATA-COLLECT
  gameStore.nextScene()
}
</script>

<template>
  <External class="absolute top-0 left-0 w-dvw h-dvh">
    <Modal title="" description="">
      <div class="relative flex flex-col items-center justify-center">
        <div class="flex items-center gap-4">
          <img src="/images/character-station-master.gif" class="aspect-square object-contain h-[160px] md:h-[256px]" />
          <p class="text-4xl lg:text-[3rem] lg:leading-[3rem] text-left">Please verify your age for tram ticket purchase</p>
        </div>
        <div class="flex gap-2 md:gap-4">
          <button v-for="age of ages" :key="age" class="active-btn text-2xl px-6 py-1 md:px-8 md:py-2 whitespace-nowrap" @click="onClick(age)">
            {{ age }}
          </button>
        </div>
      </div>
    </Modal>
  </External>
</template>

<style lang="css" scoped>
.active-btn {
  @apply bg-[url(@/assets/buttons/long.png)] bg-contain bg-bottom bg-no-repeat active:bg-[url(@/assets/buttons/long-pressed.png)];
}
</style>
