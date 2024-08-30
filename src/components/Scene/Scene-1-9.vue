<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'

const gameStore = useGameStore()
const emit = defineEmits<{
  (event: 'update'): void
}>()

const options = ref([
  { checked: false, describe: 'Being followed by third-parties' },
  { checked: false, describe: 'Having to keep giving away info' },
  { checked: false, describe: 'Can’t save autofill details in<br/> incognito mode' },
  { checked: false, describe: 'Can’t store all my digital<br/> identities in one place' },
])

const isSubmitted = ref(false)

function onClick(index: number) {
  if (isSubmitted.value)
    return
  // DATA-COLLECT
  options.value[index].checked = true
  emit('update')
  setTimeout(() => {
    isSubmitted.value = true
  }, 300)
}
</script>

<template>
  <Modal v-if="!isSubmitted" type="mid" title="">
    <ul class="flex flex-col items-start gap-4">
      <li class="flex items-center gap-4" v-for="({ checked, describe }, index) of options" :key="index"
        @click="onClick(index)">
        <div class="active-btn" :class="checked ? 'checked' : 'unchecked'" />
        <span class="whitespace-nowrap text-left text-2xl text-[26px] lg:text-[2.5rem] lg:leading-[3rem]"
          v-html="describe" />
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
