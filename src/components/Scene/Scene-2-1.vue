<script setup lang="ts">
import { External } from 'vue3-pixi'
import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'
import stationMasterImage from '@/assets/character/station-master/station.gif'

const gameStore = useGameStore()

const ages = ['18-25', '26-35', '36-44', '45-54']

function onClick(value: string) {
  gameStore.nextScene()
}
</script>

<template>
  <External class="absolute top-0 left-0 w-dvw h-dvh">
    <Modal title="" description="">
      <div class="relative flex flex-col items-center justify-center">
        <div class="flex items-center gap-4">
          <img :src="stationMasterImage" class="aspect-square object-contain" :height="134" />
          <p class="text-3xl text-left">Please verify your age for tram ticket purchase</p>
        </div>
        <div class="flex gap-4">
          <button v-for="age of ages" class="active-btn text-3xl px-8 py-2 whitespace-nowrap" @click="onClick(age)">
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
