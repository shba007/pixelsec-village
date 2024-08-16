<script setup lang="ts">
import { External } from 'vue3-pixi'
import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'

const gameStore = useGameStore()

const ages = ['18-25', '26-35', '36-44', '45-54']

function onClick(value: string) {
  // DATA-COLLECT
  setTimeout(() => {
    gameStore.nextScene()
  }, 300)
}
</script>

<template>
  <External class="absolute left-0 top-0 h-dvh w-dvw">
    <Modal title="" description="">
      <div class="relative flex flex-col items-center justify-center">
        <div class="flex items-center">
          <img src="/images/character-station-master.gif" class="aspect-square h-[180px] object-contain lg:h-[256px]" />
          <p class="text-left text-3xl lg:text-[3rem] lg:leading-[3rem]">Please verify your age for tram ticket purchase</p>
        </div>
        <div class="flex gap-2 lg:gap-4">
          <button
            v-for="age of ages"
            :key="age"
            class="flex aspect-[5/3] h-[64px] items-center justify-center whitespace-nowrap bg-[url(@/assets/buttons/short.png)] bg-contain bg-bottom bg-no-repeat px-4 font-inet text-3xl active:bg-[url(@/assets/buttons/short-pressed.png)] active:text-[#89ab2c] lg:h-[80px] lg:text-[2.5rem] lg:leading-[3rem]"
            @click="onClick(age)">
            {{ age }}
          </button>
        </div>
      </div>
    </Modal>
  </External>
</template>
