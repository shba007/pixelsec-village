<script setup lang="ts">
import { reactive } from 'vue'

const tram = reactive({ img: '', x: 0, y: 0, scale: 1 })
</script>

<template>
  <Sprite :texture="tram.img" :texture-options="{ scaleMode: 'nearest' }" :x="tram.x" :y="tram.y" :scale="tram.scale" />
</template>
