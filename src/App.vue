<script setup lang="ts">
import { reactive, ref } from "vue";
import { Application, External, Loader, onTick, useApplication, useScreen } from "vue3-pixi";
import { resources } from "@/stores/game";
import { useWindowSize } from "@vueuse/core";

interface AssetState {
  x: number;
  y: number;
  scale: number;
  time: number;
}

interface Asset {
  loaded: boolean;
  alias: string;
  inital: AssetState;
  final: AssetState;
  current: AssetState;
  animation: 'init' | 'started' | 'finished';
}

const mainWindow = window

const { width: screenWidth, height: screenHeight } = useWindowSize()
// const app = ref<(type Application)>()
// const screen = useScreen(app)

const map = reactive<Asset>({
  loaded: false,
  alias: 'map',
  inital: { x: -95, y: 0, scale: 0.127, time: 0 },
  final: { x: -270, y: -125, scale: 0.25, time: 3000 },
  current: { x: 0, y: 0, scale: 0, time: 0 },
  animation: 'init'
})

let totalElaspedTime = 0
let progress = 0

onTick((delta) => {
  if (map.animation === 'started') {
    totalElaspedTime += delta * 10
    progress = Math.min(totalElaspedTime / (map.final.time - map.inital.time), 1)
    map.current.x = map.inital.x + (map.final.x - map.inital.x) * progress
    map.current.y = map.inital.y + (map.final.y - map.inital.y) * progress
    map.current.scale = map.inital.scale + (map.final.scale - map.inital.scale) * progress
    map.current.time = map.inital.time + (map.final.time - map.inital.time) * progress

    if (progress == 1)
      map.animation = 'finished'
  }
})

function onLoad() {
  map.current.x = map.inital.x
  map.current.y = map.inital.y
  map.current.scale = map.inital.scale
  map.current.time = map.inital.time
  map.loaded = true
  map.animation = 'started'
}
</script>

<template>
  <Application ref="app" :resize-to="mainWindow">
    <Loader :resources="resources" :on-resolved="onLoad">
      <template #fallback>
        <Text :x="120" :y="120" :anchor="0.5">
          Loading...
        </Text>
      </template>
      <template #default>
        <Container :x="0" :y="0" :scale="1">
          <Sprite :texture="map.alias" :anchor="0" :x="map.current.x" :y="map.current.y" :scale="map.current.scale" />
          <Container v-if="map.animation === 'finished'" :x="screenWidth / 2" :y="screenHeight / 2" :scale="2.2">
            <Sprite texture="popupBG1" :anchor="0.5" />
            <External>
              <div
                class="absolute left-1/2 top-1/2 aspect-[65/106] w-4/5 -translate-x-1/2 -translate-y-1/2 bg-[url('box-bg.png')] bg-cover bg-no-repeat p-1 md:aspect-[106/65]">
                <div class="flex h-full w-full flex-col items-center justify-center gap-10 px-7 py-8">
                  <h1 class="text-center text-2xl font-bold uppercase">welcome to dataville</h1>
                  <p class="text-center text-2xl">Where your online habits and choices will shape the kind of house you
                    live in.
                    Let’s go!</p>
                  <!-- <button v-if="isMobile" class="mt-auto flex items-end gap-2" @click="handleStart">
        <img src="@/assets/rotate-indicator.png" alt="rotate-indicator" />
        <span class="pb-2 pt-4 text-xl">Full screen</span>
      </button> -->
                </div>
              </div>
            </External>
          </Container>
        </Container>
      </template>
    </Loader>
    <!--  <External style="margin-top: 20px; position: absolute; bottom: 0; background: '#fff';" tag="div">
      <input v-model="map.current.x" type="number" min="-10000" max="10000" step="25">
      <input v-model="map.current.y" type="number" min="-10000" max="10000" step="25">
      <input v-model="map.current.scale" type="number" min="0" max="2" step="0.05">
    </External> -->
  </Application>
</template>

<style>
input {
  width: 100%;
}

.uppercase {
  text-transform: uppercase;
}
</style>