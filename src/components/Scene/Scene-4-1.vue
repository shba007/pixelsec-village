<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'
import { useTimeoutFn } from '@vueuse/core'

const gameStore = useGameStore()

function handleMove() {
  gameStore.nextScene()
}

useTimeoutFn(handleMove, 3000)
</script>

<template>
  <Modal type="long" title="" y="bottom">
    <div class="flex items-center">
      <img src="/images/alarm-bell.gif" class="h-full" />
      <p class="pl-4 pr-32 text-left text-2xl text-[26px] lg:text-[2.5rem] lg:leading-[3rem]" v-html="'Your go-to app has a data breach. You have 8 seconds to decide what to do.'" />
    </div>
  </Modal>
</template>
