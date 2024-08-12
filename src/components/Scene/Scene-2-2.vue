<script lang="ts" setup>
import { External } from 'vue3-pixi'
import { useGameStore } from '@/stores/game'
import SmartPhone from '@/components/Animation/SmartPhone.vue'
import popupSquare from '@/assets/popup/bg-square.png'

const gameStore = useGameStore()

function onSelect(topics: string[]) {
  console.log({ topics })
}

function onComplete() {
  gameStore.nextScene()
}
</script>

<template>
  <External class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="relative flex items-center gap-10 justify-center">
      <!-- <video ref="videoElem" :src="smartphone" class="h-screen max-h-[640px]" @click="onClick" /> -->
      <SmartPhone @select="onSelect" />
      <!-- <Modal title="" description="How will you spend your time on the tram? <br/> Pick more than one." class="relative aspect-square" :isAbsolute="false" /> -->
      <div class="flex items-center size-full justify-center relative w-[35vw] aspect-square">
        <img :src="popupSquare" alt="popupSquare" class="absolute left-0 top-0 w-full h-full object-contain" />
        <!-- <div
          class="relative flex size-full flex-col justify-center items-center gap-10 px-7 py-8 max-w-[820px] mx-auto z-10 overflow-hidden"> -->
        <p class="text-left text-2xl whitespace-nowrap z-10">
          How will you<br />
          spend your time<br />
          on the tram? <br /><br />
          Pick more than<br />
          one.
        </p>
        <!-- </div> -->
      </div>
    </div>
  </External>
</template>
