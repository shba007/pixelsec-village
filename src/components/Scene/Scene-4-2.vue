<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'
import { useInterval } from '@vueuse/core'
import { computed } from 'vue'

const gameStore = useGameStore()

// useTimeoutFn(handleMove, 2000)
const counter = useInterval(10)
const timer = computed(() => {
  const number = Math.max(8 * 100 - counter.value, 0)

  let minutes = Math.floor(number / 10000)
  let seconds = Math.floor((number % 10000) / 100)
  let milliseconds = number % 100

  // Pad with leading zeros if necessary
  let formattedMinutes = minutes.toString().padStart(2, '0')
  let formattedSeconds = seconds.toString().padStart(2, '0')
  let formattedMilliseconds = milliseconds.toString().padStart(2, '0')

  if (number === 1) {
    setTimeout(() => {
      alert('Timeline Trigger 42')
      gameStore.nextTimeline()
    }, 50)
    return
  }

  // Return the formatted timer string
  const digits = formattedSeconds.split('')
  return `${formattedMinutes} : ${digits[0]}<span class="timer-digit">${digits[1]}</span> : ${formattedMilliseconds}`
})

function onClick() {
  alert('Timeline Trigger 15')
  gameStore.nextTimeline(2)
}
</script>

<template>
  <Modal type="mid" title="">
    <div class="flex w-full flex-col items-center gap-2 text-xl">
      <p class="">Countdown timer:</p>
      <!-- <span class="text-4xl">00: 08 : 99</span> -->
      <span class="font-uni text-4xl" v-html="timer" />
      <div class="grid w-fit grid-cols-5 grid-rows-2 gap-y-2">
        <button class="active-btn short unchecked col-span-2 col-start-1 row-start-1" @click="onClick">Do
          nothing</button>
        <button class="active-btn long unchecked col-span-3 col-start-3 row-start-1" @click="onClick">
          Take action only<br />
          when prompted
        </button>
        <button class="active-btn long unchecked col-span-3 col-start-1 row-start-2" @click="onClick">
          Alert the authority,<br />
          change login details
        </button>
        <button class="active-btn short unchecked col-span-2 col-start-4 row-start-2" @click="onClick">Delete <br />the
          app</button>
      </div>
    </div>
  </Modal>
</template>

<style lang="css" scoped>
.active-btn {
  @apply flex h-[80px] items-center justify-center bg-contain bg-bottom bg-no-repeat active:text-[#89ab2c];
}

.active-btn.short {
  @apply aspect-[5/3] bg-[url(@/assets/buttons/short/unpressed.png)] active:bg-[url(@/assets/buttons/short/pressed.png)];
}

.active-btn.long {
  @apply aspect-[8/3] bg-[url(@/assets/buttons/long/unpressed.png)] active:bg-[url(@/assets/buttons/long/pressed.png)];
}

:deep(.timer-digit) {
  @apply text-red-500;
}
</style>
