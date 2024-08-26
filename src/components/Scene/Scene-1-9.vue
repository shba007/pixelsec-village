<script setup lang="ts">
import { ref } from 'vue'
import { watchDebounced } from '@vueuse/core'
import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'

const gameStore = useGameStore()

const options = ref([
  { checked: false, describe: 'Being followed by third-parties' },
  { checked: false, describe: 'Having to keep giving away info' },
  { checked: false, describe: 'Can’t save autofill details in<br/> incognito mode' },
  { checked: false, describe: 'Can’t store all my digital<br/> identities in one place' },
])

function onSelect(index: number, checked: boolean) {
  // DATA-COLLECT
  options.value[index].checked = checked
}

watchDebounced(options, onComplete, { debounce: 2000, deep: true })

function onComplete() {
  gameStore.nextScene()
  gameStore.nextMapState()
}
</script>

<template>
  <Modal type="mid" title="">
    <ul class="flex flex-col items-start gap-4">
      <li class="flex items-center gap-4" v-for="({ checked, describe }, index) of options" :key="index" @click="onSelect(index, !checked)">
        <div class="active-btn" :class="checked ? 'checked' : 'unchecked'" />
        <span class="whitespace-nowrap text-left text-2xl text-[26px] lg:text-[2.5rem] lg:leading-[3rem]" v-html="describe" />
      </li>
    </ul>
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
