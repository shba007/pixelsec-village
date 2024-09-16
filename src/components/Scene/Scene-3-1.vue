<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useTimeoutFn, useWindowSize } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'

const props = defineProps<{
  zoomFactor: number
}>()

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()

const isSecondScreen = ref(false)
const modal = computed(() => ({
  image: 'popupBgSlim',
  state: { x: 0, y: -(screenHeight.value * 1) / 4, scale: 1.0 * props.zoomFactor },
}))

function handleMove() {
  gameStore.nextTimeline({ id: 24 })
}

const { start } = useTimeoutFn(handleMove, 4000, { immediate: false })

useTimeoutFn(() => {
  isSecondScreen.value = true
  gameStore.playSFXSound('dialogBox')
  start()
}, 8000)

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

const titleText = reactive({ x: -9, y: -10, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'left', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
const secondTitleText = reactive({ x: -30, y: 0, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'left', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Container>
      <Text v-if="!isSecondScreen" :x="titleText.x" :y="titleText.y" :anchor="titleText.anchor" :scale="titleText.scale"
        :style="titleText.style">
        It's a hot day and you need to cool off.\nHow about a free ice-cream in exchange \nfor your personal data?
      </Text>
      <Text v-else :x="secondTitleText.x" :y="secondTitleText.y" :anchor="secondTitleText.anchor"
        :scale="secondTitleText.scale" :style="secondTitleText.style">
        What are you willing to share?\nPick more than one.
      </Text>
    </Container>
  </Container>
  <!--   <External>
    <div class="fixed bottom-0 left-0 z-50 flex w-fit items-center gap-8">
      <div class="flex flex-col gap-2">
        <input v-model="secondTitleText.x" type="number" min="-10000" max="10000" step="10" />
        <input v-model="secondTitleText.y" type="number" min="-10000" max="10000" step="10" />
        <input v-model="secondTitleText.style.fontSize" type="number" min="0" max="120" step="4" />
        <input v-model="secondTitleText.style.lineHeight" type="number" min="0" max="120" step="4" />
      </div>
      <div class="fixed right-0 bottom-0 z-[99999] flex flex-col gap-2 bg-white p-2">
        <button @click="toggle = !toggle">Toggle {{ toggle }}</button>
      </div>
    </div>
  </External> -->
</template>
