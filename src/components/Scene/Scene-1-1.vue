<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { External } from 'vue3-pixi'
import { useTimeoutFn } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'
import rotateIndicator from '@/assets/rotate-indicator.png'
import { storeToRefs } from 'pinia'

const gameStore = useGameStore()
const { isLandscape } = storeToRefs(gameStore)

async function handleStart() {
  gameStore.nextScene()
  gameStore.nextMapState()
  await gameStore.toggleGameMode(true)
}

onMounted(() => {
  if (isLandscape.value) useTimeoutFn(handleStart, 3000)
})

watch(isLandscape, (value) => {
  console.log('ScreenRotate', value)
  if (value) useTimeoutFn(handleStart, 3000)
})
</script>

<template>
  <External class="absolute top-0 left-0 w-dvw h-dvh">
    <Modal
      title="welcome to dataville"
      :container-class="!isLandscape ? 'justify-between gap-0 py-4' : ''"
      description="Where your online habits and choices will shape the kind of house you live in.<br/>Let’s go!"
    >
      <button v-if="!isLandscape" class="flex flex-col justify-center items-center gap-1 pb-3" @click="handleStart">
        <img :src="rotateIndicator" alt="rotate-indicator" class="size-[48px] md:size-[72px] object-contain" />
        <span class="text-2xl md:text-4xl opacity-50 font-inet -translate-y-3">Full screen</span>
      </button>
    </Modal>
  </External>
</template>
