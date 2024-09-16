<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useDataStore, type dataResponsibilityChoice } from '@/stores/data'
import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'
import AppCheckbox from '@/components/AppCheckbox.vue'

const props = defineProps<{
  zoomFactor: number
}>()

const dataStore = useDataStore()
const gameStore = useGameStore()
const { currentPopupIndex } = storeToRefs(gameStore)

const modal = computed(() => ({
  image: 'popupBgLandscape',
  state: { x: 0, y: 0, scale: 1.0 * props.zoomFactor },
}))

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
  // DATA-COLLECT
  selectedOption.value = value
  dataStore.setDataResponsibility(value)
  gameStore.playSFXSound('buttonPress', 2)

  setTimeout(() => {
    gameStore.nextTimeline(currentPopupIndex.value === 14 ? { screen: 2, id: 35 } : { screen: 1, id: 36 })
  }, 300)
}

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

const titleText = reactive({ x: 0, y: -150, anchor: 0.5, scale: 0.25, style: { fontFamily: 'LAN', fontSize: 44 * 4, align: 'left', lineHeight: 64 * 4, stroke: 1, strokeThickness: 1 * 4 } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Container>
      <Text v-if="currentPopupIndex === 14" :x="titleText.x - 30" :y="titleText.y" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style"
        >Your data could be compromised. Who\ndo you think should protect your data?</Text
      >
      <Text v-else :x="titleText.x - 30" :y="titleText.y" :anchor="titleText.anchor" :scale="titleText.scale" :style="titleText.style"
        >That was close! Who do you think\nshould protect your data?</Text
      >
      <AppCheckbox v-for="{ type, value, state } of options" :key="type" :text="value" :x="state.x + 40" :y="state.y + 50" :scale="1" :is-checked="selectedOption === type" @click="onClick(type)" />
    </Container>
    <!--  <Sprite v-for="{ type, state } of options" :key="type" :texture="frames[Number(selectedOption === type)]"
      :texture-options="textureOptions" :x="state.x" :y="state.y" :scale="state.scale" cursor="pointer"
      @pointerdown="onClick(type)" /> -->
  </Container>
</template>
