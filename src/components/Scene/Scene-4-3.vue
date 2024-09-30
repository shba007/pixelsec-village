<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useDataStore, type dataResponsibilityChoice } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import AppCheckbox from '@/components/AppCheckbox.vue'
import AppPopup from '@/components/AppPopup.vue'

defineProps<{
  zoomFactor: number
}>()

const dataStore = useDataStore()
const gameStore = useGameStore()
const { currentPopupIndex } = storeToRefs(gameStore)

const options = ref<
  {
    type: dataResponsibilityChoice
    value: string
    state: {
      x: number
      y: number
    }
  }[]
>([
  { type: 'me-myself-i', value: 'Me, myself,\nand I', state: { x: -375, y: -40 } },
  { type: 'government', value: 'Government', state: { x: 0, y: -40 } },
  { type: 'companies', value: 'Companies', state: { x: -375, y: 110 } },
  { type: 'not-sure', value: 'Not sure', state: { x: 0, y: 110 } },
])

const selectedOption = ref<dataResponsibilityChoice>()

function onClick(value: dataResponsibilityChoice) {
  if (selectedOption.value !== undefined) return

  // DATA-COLLECT
  selectedOption.value = value
  dataStore.setDataResponsibility(value)
  gameStore.playSFXSound('buttonPress', 2)
  onNext()
}

function onNext() {
  setTimeout(() => gameStore.nextTimeline(currentPopupIndex.value === 14 ? { screen: 2, id: 35 } : { screen: 1, id: 36 }), 300)
}

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

const titleText = reactive({ x: 0, y: -150, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 44, align: 'left', lineHeight: 54, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <AppPopup type="landscape" x="center" y="center" :zoom-factor="zoomFactor" :show-button="false">
    <Container>
      <Text v-if="currentPopupIndex === 14" :x="-30" :y="titleText.y" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style">
        Your data could be compromised. Who\ndo you think should protect your data?
      </Text>
      <Text v-else :x="-70" :y="titleText.y" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style"> That was close! Who do you think\nshould protect your data? </Text>
      <AppCheckbox v-for="{ type, value, state } of options" :key="type" :text="value" :x="state.x + 40" :y="state.y + 50" :scale="1" :is-checked="selectedOption === type" @click="onClick(type)" />
    </Container>
  </AppPopup>
</template>
