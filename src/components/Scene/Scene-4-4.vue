<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/game'
import { watchDebounced } from '@vueuse/core'
import Modal from '@/components/Modal.vue'

const gameStore = useGameStore()

const options = ref([
  { title: 'Me, myself,<br/> and I', value: 1 },
  { title: 'Government', value: 2 },
  { title: 'Companies', value: 3 },
  { title: 'Not sure', value: 4 },
])
const selectedOptions = ref<number[]>([])

function onSelect(topic: number) {
  // DATA-COLLECT
  console.log({ topic })
  selectedOptions.value.push(topic)
}

watchDebounced(selectedOptions, onComplete, { debounce: 2000, deep: true })

function onComplete() {
  gameStore.nextScene()
}
</script>

<template>
  <Modal type="mid" title="">
    <div class="flex w-full flex-col items-start gap-8">
      <p class="text-left text-2xl lg:px-10 lg:py-6 lg:text-4xl lg:leading-[3rem]">That was close! Who do you think
        should protect your data?</p>
      <ul class="grid w-full grid-cols-2 grid-rows-2 gap-2 px-4">
        <li class="flex items-center gap-4" v-for="({ title, value }, index) of options" :key="index"
          @click="onSelect(value)">
          <div class="active-btn" :class="selectedOptions.includes(value) ? 'checked' : 'unchecked'" />
          <span class="whitespace-nowrap text-left text-2xl text-[26px] lg:text-[2.5rem] lg:leading-[3rem]"
            v-html="title" />
        </li>
      </ul>
    </div>
  </Modal>
</template>

<style lang="css" scoped>
.active-btn {
  @apply flex aspect-[7/9] h-[32px] items-center justify-center bg-contain bg-bottom bg-no-repeat lg:h-[80px];
}

.active-btn.checked {
  @apply bg-[url(@/assets/buttons/square/pressed.png)];
}

.active-btn.unchecked {
  @apply bg-[url(@/assets/buttons/square/unpressed.png)];
}
</style>
