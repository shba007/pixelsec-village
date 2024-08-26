<script lang="ts" setup>
import { ref } from 'vue'
import { External } from 'vue3-pixi'
import { watchDebounced } from '@vueuse/core'
import { useGameStore } from '@/stores/game'
import SmartPhone from '@/components/Animation/SmartPhone.vue'

const gameStore = useGameStore()
const selectedTopics = ref<string[]>()

function onSelect(topics: string[]) {
  // DATA-COLLECT
  console.log({ topics })
  selectedTopics.value = topics
}

watchDebounced(selectedTopics, onComplete, { debounce: 2000 })

function onComplete() {
  gameStore.nextScene()
  gameStore.nextMapState()
}
</script>

<template>
  <External class="absolute left-0 top-0 -z-0 h-dvh w-dvw">
    <div
      class="absolute left-1/2 top-1/2 flex max-h-[80vh] w-3/4 -translate-x-1/2 -translate-y-1/2 items-center justify-center md:w-3/5">
      <div class="relative flex items-center justify-center gap-8 md:translate-x-10">
        <!-- SMARTPHONE -->
        <SmartPhone @select="onSelect" />
        <!-- SMARTPHONE -->
        <div class="popup-bg relative flex aspect-[143/130] h-full items-center justify-center overflow-hidden">
          <p
            class="flex h-fit flex-col justify-between gap-4 px-8 py-4 text-left text-3xl lg:px-16 lg:py-6 lg:text-5xl lg:leading-[3rem]">
            <span>How will you spend your time on the tram?</span>
            <span>Pick more than one.</span>
          </p>
        </div>
      </div>
    </div>
  </External>
</template>

<style scoped>
.popup-bg {
  @apply bg-[url('@/assets/popup/bg-square.png')] bg-cover bg-center bg-no-repeat;
}
</style>
