<script setup lang="ts">
import { ref } from 'vue'
import Modal from '@/components/Modal.vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

const options = ref([
  { title: 'Yes', value: true },
  { title: 'No', value: false },
])
const selectedOption = ref<boolean | null>(null)

function onClick(value: boolean) {
  // DATA-COLLECT
  selectedOption.value = value

  setTimeout(() => {
    gameStore.nextScene()
  }, 300)
}
</script>

<template>
  <Modal type="mid" title="" description="Would you like to collect all your data from one place for convenience?">
    <div class="flex w-full justify-end px-16">
      <ul class="flex flex-col gap-2">
        <li class="flex" v-for="({ title, value }, index) of options" :key="index">
          <button class="active-btn" :class="selectedOption === value ? 'checked' : 'unchecked'" @click="onClick(value)" />
          <span class="whitespace-nowrap text-left text-2xl text-[26px] lg:text-[2.5rem] lg:leading-[3rem]">
            {{ title }}
          </span>
        </li>
      </ul>
    </div>
  </Modal>
</template>

<style lang="css" scoped>
.active-btn {
  @apply flex aspect-[8/3] h-[32px] items-center justify-center bg-contain bg-bottom bg-no-repeat lg:h-[80px];
}

.active-btn.checked {
  @apply bg-[url(@/assets/buttons/square-pressed.png)];
}

.active-btn.unchecked {
  @apply bg-[url(@/assets/buttons/square.png)];
}
</style>
