<script setup lang="ts">
import { External } from 'vue3-pixi'
import rotateIndicator from '@/assets/rotate-indicator.png'

import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'
import { storeToRefs } from 'pinia'
import { breakpointsTailwind, useBreakpoints, useTimeoutFn } from '@vueuse/core'
import { computed, onMounted } from 'vue'

const gameStore = useGameStore()
const { isIphone } = storeToRefs(gameStore)

async function handleStart() {
  gameStore.nextScene()
  gameStore.nextMapPosition()
  await gameStore.toggleGameMode(true)
}

const breakpoints = useBreakpoints(breakpointsTailwind)
const isDesktop = computed(() => breakpoints.isGreaterOrEqual('md'))

onMounted(() => {
  if (isDesktop.value) useTimeoutFn(handleStart, 2000)
})
</script>

<template>
  <External class="absolute top-0 left-0 w-dvw h-dvh">
    <Modal title="welcome to <br/> dataville" description="Where your online<br/> habits and choices<br/> will shape the kind<br/> of house you live in.<br/>Let’s go!">
      <button v-if="!isDesktop" class="flex items-end gap-2" @click="handleStart">
        <img :src="rotateIndicator" alt="rotate-indicator" />
        <!-- <span class="pb-2 pt-4 text-xl">{{ isIphone ? 'Full screen' : 'Rotate' }}</span> -->
        <span class="pb-2 pt-4 text-xl">Full screen</span>
      </button>
    </Modal>
  </External>
</template>
