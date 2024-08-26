<script setup lang="ts">
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'

const gameStore = useGameStore()

const options = ref([
  { checked: false, describe: 'Past online shopping' },
  { checked: false, describe: 'Info' },
  { checked: false, describe: 'Bank/Card details' },
  { checked: false, describe: 'Social media profile' },
  { checked: false, describe: 'Personal preferences' },
  { checked: false, describe: 'Personal details' },
])

function onSelect(index: number, checked: boolean) {
  // DATA-COLLECT
  options.value[index].checked = checked
}

watchDebounced(options, onComplete, { debounce: 2000, deep: true })

function onComplete() {
  gameStore.nextScene()
}
</script>

<template>
  <Modal type="short" title="" x="right">
    <ul class="flex flex-col items-start gap-4">
      <li class="flex items-center gap-4" v-for="({ checked, describe }, index) of options" :key="index">
        <button class="active-btn" :class="checked ? 'checked' : 'unchecked'" @click="onSelect(index, !checked)" />
        <span class="whitespace-nowrap text-left text-2xl text-[26px] lg:text-[2rem] lg:leading-[2.25rem]">
          {{ describe }}
        </span>
      </li>
    </ul>
  </Modal>
</template>

<style lang="css" scoped>
.active-btn {
  @apply flex aspect-[7/9] h-[32px] items-center justify-center bg-contain bg-bottom bg-no-repeat lg:h-[64px];
}

.active-btn.checked {
  @apply bg-[url(@/assets/buttons/square/pressed.png)];
}

.active-btn.unchecked {
  @apply bg-[url(@/assets/buttons/square/unpressed.png)];
}
</style>
