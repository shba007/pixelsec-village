<script lang="ts" setup>
import { External } from 'vue3-pixi'
import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'
import smartphone from '@/assets/station/smartphone.gif'
import { usePointer } from '@vueuse/core'
import { ref } from 'vue'

const gameStore = useGameStore()
const imgElem = ref<HTMLImageElement>()
const pointer = usePointer({ target: imgElem.value })

function onClick() {
  // console.log(pointer.x.value)
  gameStore.nextScene()
}
</script>

<template>
  <External class="absolute top-0 left-0 w-dvw h-dvh">
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
      <img ref="imgElem" :src="smartphone" class="h-screen max-h-[640px]" @click="onClick" />
      <Modal title="" description="How will you spend your time on the tram? <br/> Pick more than one." class="relative aspect-square" :isAbsolute="false" />
    </div>
  </External>
</template>
