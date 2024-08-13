<script lang="ts" setup>
import { External } from 'vue3-pixi'
import { useGameStore } from '@/stores/game'
import SmartPhone from '@/components/Animation/SmartPhone.vue'
import popupSquare from '@/assets/popup/bg-square.png'
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'

const gameStore = useGameStore()
const selectedTopics = ref<string[]>()

function onSelect(topics: string[]) {
  console.log({ topics })
  selectedTopics.value = topics
}

watchDebounced(selectedTopics, onComplete, { debounce: 2000 })

function onComplete() {
  gameStore.nextScene()
}
</script>

<template>
  <External class="absolute top-0 left-0 w-dvw h-dvh">
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative flex items-center gap-10 justify-center translate-x-11">
        <SmartPhone @select="onSelect" />
        <!-- <Modal title="" description="How will you spend your time on the tram? <br/> Pick more than one." class="relative aspect-square" :isAbsolute="false" /> -->
        <div class="flex items-center size-full justify-center relative w-[35vw] aspect-square">
          <img :src="popupSquare" alt="popupSquare" class="absolute left-0 top-0 size-full object-contain" />
          <p class="text-left text-3xl lg:text-[2.5rem] lg:leading-[3rem] whitespace-nowrap z-10">
            How will you<br />
            spend your time<br />
            on the tram? <br /><br />
            Pick more than<br />
            one.
          </p>
        </div>
      </div>
    </div>
  </External>
</template>
