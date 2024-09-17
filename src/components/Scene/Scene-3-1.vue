<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import { useGameStore } from '@/stores/game'
import AppPopup from '@/components/AppPopup.vue'

defineProps<{
  zoomFactor: number
}>()

const gameStore = useGameStore()

const isSecondScreen = ref(false)

function handleMove() {
  gameStore.nextTimeline({ id: 24 })
  isSecondScreen.value = true
  gameStore.playSFXSound('dialogBox')
}

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

const titleText = reactive({ x: -9, y: -10, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'left', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
const secondTitleText = reactive({ x: -30, y: 0, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'left', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <AppPopup type="slim" x="center" y="top" :zoom-factor="zoomFactor" @next="handleMove">
    <Container>
      <Text v-if="!isSecondScreen" :x="titleText.x" :y="titleText.y" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style">
        It's a hot day and you need to cool off.\nHow about a free ice-cream in exchange \nfor your personal data?
      </Text>
      <Text v-else :x="secondTitleText.x" :y="secondTitleText.y" :anchor="secondTitleText.anchor" :scale="secondTitleText.scale" :style="secondTitleText.style">
        What are you willing to share?\nPick more than one.
      </Text>
    </Container>
  </AppPopup>
</template>
