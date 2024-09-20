<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useWindowSize } from '@vueuse/core';

// Import images
import characterAll from '@/assets/image/loader/character-all.png';
import characterLast from '@/assets/image/loader/character-last.png';

// Get screen size
const { width: screenWidth } = useWindowSize();

// Positions for the images
const positionAll = ref(screenWidth.value); // Start off-screen right
const positionLast = ref(screenWidth.value + 200); // Start just off-screen

// Animation speed
const scrollSpeed = 5;

// Function to handle the scrolling animation
function updatePosition() {
  positionAll.value -= scrollSpeed;
  positionLast.value -= scrollSpeed;

  // Reset position when the image goes off screen
  if (positionAll.value <= -200) {
    positionAll.value = screenWidth.value;
  }
  if (positionLast.value <= -200) {
    positionLast.value = screenWidth.value + 200; // Reset for the second image
  }
}

// Create a ticker instance for the animation loop
const ticker = setInterval(updatePosition, 1000 / 60); // ~60 FPS

onMounted(() => {
  // Start the animation
});

onUnmounted(() => {
  clearInterval(ticker); // Stop the animation
});
</script>

<template>
  <div :style="{overflow: 'hidden', position:'absolute',  width: '100%',  zIndex: '99',  display: 'flex',  alignItems: 'center', height: '100%', justifyContent: 'center' }">
    <img
      :style="{position:'relative', left: positionAll + 'px', top: '0', width: '70%' }"
      :src="characterAll"
      alt="Character All"
    />    
    <img
      :style="{position:'relative', left: positionLast + 'px', top: '0', width: '5.6%'}"
      :src="characterLast"
      alt="Character Last"
    />

  </div>
</template>

<style scoped>
/* Optional styling if needed */
</style>
