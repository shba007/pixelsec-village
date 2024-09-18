<script setup lang="ts">
import { onMounted, computed, reactive } from 'vue'
import { useWindowSize } from '@vueuse/core'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'
import ProtipIcon from '@/components/Animation/ProtipIcon.vue'

const props = withDefaults(
  defineProps<{
    title: string
    x?: 'left' | 'center' | 'right' | 'default'
    y?: 'top' | 'center' | 'bottom' | 'default'
    zoomFactor: number
  }>(),
  {
    x: 'center',
    y: 'center',
  }
)

const gameStore = useGameStore()

const { width: screenWidth, height: screenHeight } = useWindowSize()

const modal = computed(() => {
  let texture = ''
  switch (props.title) {
    case '1':
      texture = 'popupBgSlim'
      break
    case '2':
      texture = 'popupBgSlim'
      break
    case '3':
      texture = 'popupBgSquare'
      break
    case '4':
      texture = 'popupBgSlim'
      break
    case '5':
      texture = 'popupBgSquare'
      break
  }

  let xFactor = 2 / 4,
    yFactor = 2 / 4
  switch (props.x) {
    case 'left':
      xFactor = 1 / 4
      break
    case 'center':
      xFactor = 2 / 4
      break
    case 'right':
      xFactor = 3 / 4
      break
  }
  switch (props.y) {
    case 'top':
      yFactor = 1 / 4
      break
    case 'center':
      yFactor = 2 / 4
      break
    case 'bottom':
      yFactor = 3 / 4
      break
  }

  return {
    texture,
    state: { x: screenWidth.value * xFactor, y: screenHeight.value * yFactor },
    xFactor: xFactor * 100 + '%',
    yFactor: yFactor * 100 + '%',
  }
})

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
  setTimeout(() => gameStore.playSFXSound('protip'), 800)
})

const title1Text = reactive({ x: -225, y: -100, anchor: 0, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'left', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
const title2Text = reactive({ x: -225, y: -100, anchor: 0, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'left', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
const title3Text = reactive({ x: -225, y: -100, anchor: 0, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'left', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
const title4Text = reactive({ x: -225, y: -100, anchor: 0, scale: 1, style: { fontFamily: 'LAN', fontSize: 44, align: 'left', lineHeight: 54, stroke: 1, strokeThickness: 1 } })
const title5Text = reactive({ x: -225, y: -100, anchor: 0, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'left', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="zoomFactor">
    <template v-if="title === '1'">
      <Sprite :texture="modal.texture" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
      <ProtipIcon :x="-375" :y="-50" :scale="1" />
      <Container :x="title1Text.x" :y="title1Text.y">
        <Text :x="-230" :y="120" :anchor="title1Text.anchor" :scale="title1Text.scale" :style="{ ...title1Text.style, fill: '#9C38FB', stroke: '#9C38FB' }">PRO TIP:</Text>
        <Text :anchor="title1Text.anchor" :scale="title1Text.scale" :style="title1Text.style"
          >You can &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; your\nfragmented data across the\ndigital realm with Affinidi.</Text
        >
        <Text :x="180" :y="0" :anchor="title1Text.anchor" :scale="title1Text.scale" :style="{ ...title1Text.style, fill: '#3464FD', stroke: '#3464FD' }">DISCOVER</Text>
      </Container>
    </template>
    <template v-else-if="title === '2'">
      <Sprite :texture="modal.texture" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
      <ProtipIcon :x="-375" :y="-50" :scale="1" />
      <Container :x="title2Text.x" :y="title2Text.y">
        <Text :x="-230" :y="120" :anchor="title2Text.anchor" :scale="title2Text.scale" :style="{ ...title2Text.style, fill: '#9C38FB', stroke: '#9C38FB' }">PRO TIP:</Text>
        <Text :y="-30" :anchor="title2Text.anchor" :scale="title2Text.scale" :style="title2Text.style"
          >You can &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; all your\n personal info from your digital\nfootprint for a 360-degree unified\nview
          of your digital self.
        </Text>
        <Text :x="182" :y="-30" :anchor="title2Text.anchor" :scale="title2Text.scale" :style="{ ...title2Text.style, fill: '#3464FD', stroke: '#3464FD' }">COLLECT</Text>
      </Container>
    </template>
    <template v-else-if="title === '3'">
      <Sprite :texture="modal.texture" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
      <ProtipIcon :x="50" :y="-180" :scale="1.1" />
      <Container :x="title3Text.x" :y="title3Text.y">
        <Text :x="0" :y="-100" :anchor="title3Text.anchor" :scale="title3Text.scale" :style="{ ...title3Text.style, fontSize: 54, lineHeight: 64, fill: '#9C38FB', stroke: '#9C38FB' }">PRO TIP:</Text>
        <Text :y="0" :anchor="title3Text.anchor" :scale="title3Text.scale" :style="title3Text.style">You can &nbsp;\nyour data securely in\nAffinidi Vault and be\nin control.</Text>
        <Text :x="180" :y="0" :anchor="title3Text.anchor" :scale="title3Text.scale" :style="{ ...title3Text.style, fill: '#3464FD', stroke: '#3464FD' }">STORE</Text>
      </Container>
    </template>
    <template v-else-if="title === '4'">
      <Sprite :texture="modal.texture" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
      <ProtipIcon :x="-375" :y="-50" :scale="1" />
      <Container :x="title4Text.x" :y="title4Text.y">
        <Text :x="-230" :y="120" :anchor="title4Text.anchor" :scale="title4Text.scale" :style="{ ...title4Text.style, fontSize: 54, lineHeight: 64, fill: '#9C38FB', stroke: '#9C38FB' }"
          >PRO TIP:</Text
        >
        <Text :y="-15" :anchor="title4Text.anchor" :scale="title4Text.scale" :style="title4Text.style"
          >You can choose how and who you\nwant to &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; what data with\nanytime. It's easy to give consent\nwith Affinidi.</Text
        >
        <Text :x="142" :y="40" :anchor="title4Text.anchor" :scale="title4Text.scale" :style="{ ...title4Text.style, fill: '#3464FD', stroke: '#3464FD' }">SHARE</Text>
      </Container>
    </template>
    <template v-else-if="title === '5'">
      <Sprite :texture="'popupBgSquare'" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
      <ProtipIcon :x="50" :y="-180" :scale="1.1" />
      <Container :x="title5Text.x" :y="title5Text.y">
        <Text :x="0" :y="-100" :anchor="title5Text.anchor" :scale="title5Text.scale" :style="{ ...title5Text.style, fontSize: 54, lineHeight: 64, fill: '#9C38FB', stroke: '#9C38FB' }">PRO TIP:</Text>
        <Text :y="0" :anchor="title5Text.anchor" :scale="title5Text.scale" :style="title5Text.style"> In the near future,\nyou can &nbsp;\nyour data by\nexchanging\nthem for value. </Text>
        <Text :x="176" :y="64" :anchor="title5Text.anchor" :scale="title4Text.scale" :style="{ ...title5Text.style, fill: '#3464FD', stroke: '#3464FD' }">MONETISE</Text>
      </Container>
    </template>
  </Container>
</template>
