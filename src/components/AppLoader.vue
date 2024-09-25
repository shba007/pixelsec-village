<script setup lang="ts">
import { ref } from 'vue'
import { useElementSize, useIntervalFn, useWindowSize, watchDebounced } from '@vueuse/core'

defineProps<{
  progress: number
}>()

const emit = defineEmits<{
  loaded: []
}>()

const { width: screenWidth } = useWindowSize()

const characterAllElem = ref<HTMLImageElement>()
const characterLastElem = ref<HTMLImageElement>()

const { width: characterAllElemWidth } = useElementSize(characterAllElem)
const { width: characterLastElemWidth } = useElementSize(characterLastElem)

const positionAll = ref(screenWidth.value / 2)
const positionLast = ref(screenWidth.value / 2 + characterAllElemWidth.value)

const scrollSpeed = 15
let delta = 0

useIntervalFn(() => {
  delta += scrollSpeed * 0.3
  positionAll.value = Math.max(screenWidth.value / 2 - delta, -characterAllElemWidth.value * 1.01)
  positionLast.value = Math.max(screenWidth.value / 2 + characterAllElemWidth.value * 1.03 - delta, (screenWidth.value - characterLastElemWidth.value) / 2)
}, 1000 / 60)

watchDebounced(
  positionLast,
  () => {
    emit('loaded')
  },
  { debounce: 300 }
)
</script>

<template>
  <div class="absolute z-50 flex h-1/2 w-full items-center overflow-hidden">
    <img
      ref="characterAllElem"
      class="absolute bottom-0 h-[20vh] max-w-max ease-linear landscape:h-[40vh]"
      :style="{ left: positionAll + 'px' }"
      src="/images/loader/character-all.png"
      alt="Character All" />
    <img
      ref="characterLastElem"
      class="absolute bottom-0 h-[20vh] max-w-max ease-linear landscape:h-[40vh]"
      :style="{ left: positionLast + 'px' }"
      src="/images/loader/character-last.png"
      alt="Character Last" />
  </div>
</template>
