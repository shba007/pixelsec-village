import { computed, reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useFullscreen, useScreenOrientation, useWindowSize } from '@vueuse/core'
import { resources } from '@/utils/asset'
import { useSound } from '@vueuse/sound'

export type Character = 'black' | 'blue' | 'red' | 'violate'

export const timeline: {
  screen: number
  popup: number
  scene: number
  character: number
  time?: number
}[] = [
    { screen: 0, popup: 0, scene: 0, character: 0, time: 0 }, // welcome
    { screen: 0, popup: 0.5, scene: 1, character: 0, time: 0 }, //
    { screen: 0, popup: 1, scene: 2, character: 0, time: 0 }, // lets start
    { screen: 0, popup: 2, scene: 3, character: 0, time: 0 }, // choose avatar
    { screen: 0, popup: 3, scene: 4, character: 0, time: 0 }, // read t&c
    { screen: 0, popup: 4, scene: 4, character: 0, time: 0 }, // t&c
    { screen: 0, popup: -1, scene: 5, character: 0, time: 0 }, // zoom
    { screen: 1, popup: -1, scene: 5, character: 0, time: 0 }, // in to the station
    { screen: 1, popup: 5, scene: 5, character: 0, time: 0 }, // your age
    { screen: 1, popup: 6, scene: 5, character: 0, time: 0 }, // your used app
    { screen: 2, popup: 7, scene: 5, character: 1, time: 0.25 }, // out of the station in the map
    { screen: 2, popup: 7, scene: 6, character: 2, time: 0.5 }, //
    { screen: 2, popup: 7, scene: 7, character: 3, time: 0.5 }, //
    { screen: 2, popup: -1, scene: 8, character: 4, time: 1.25 }, // changed
    { screen: 2, popup: -1, scene: 9, character: 5, time: 3 },
    { screen: 2, popup: -1, scene: 10, character: 6, time: 6 },
    { screen: 2, popup: -1, scene: 11, character: 7, time: 9 },
    { screen: 2, popup: -1, scene: 12, character: 8, time: 12 },
    { screen: 2, popup: -1, scene: 13, character: 9, time: 14.25 },
    { screen: 2, popup: -1, scene: 14, character: 10, time: 15 },
    { screen: 2, popup: -1, scene: 15, character: 11, time: 16.5 },
    { screen: 2, popup: -1, scene: 16, character: 12 },
    { screen: 3, popup: 8, scene: 16, character: 12 },
    { screen: 3, popup: 9, scene: 16, character: 12 },
    { screen: 3, popup: 10, scene: 16, character: 12 },
    { screen: 4, popup: 11, scene: 17, character: 13 },
    { screen: 4, popup: 11, scene: 18, character: 14 },
    { screen: 4, popup: 11, scene: 19, character: 15 },
    //
    { screen: 5, popup: 12, scene: 19, character: 15 },
    { screen: 5, popup: 13, scene: 19, character: 15 },
    { screen: 5, popup: 14, scene: 19, character: 15 },
    { screen: 5, popup: 15, scene: 19, character: 15 },
    { screen: 5, popup: 15, scene: 20, character: 16 },
    { screen: 5, popup: 16, scene: 20, character: 16 },
    //
    { screen: 6, popup: 16, scene: 21, character: 17 },
    { screen: 6, popup: -1, scene: 22, character: 18 },
    { screen: 6, popup: -1, scene: 23, character: 19 },
    { screen: 6, popup: -1, scene: 23, character: 20 },
    { screen: 6, popup: -1, scene: 23, character: 21 },
    { screen: 6, popup: -1, scene: 23, character: 22 },
    { screen: 6, popup: -1, scene: 23, character: 23 },
    { screen: 6, popup: -1, scene: 23, character: 24 },
    { screen: 6, popup: -1, scene: 23, character: 25 },
    { screen: 6, popup: 17, scene: 23, character: 26 },
    { screen: 6, popup: 18, scene: 23, character: 27 },
    { screen: 6, popup: 18, scene: 23, character: 28 },
    { screen: 6, popup: -1, scene: 24, character: 29 },
    // loop start
    { screen: 6, popup: -1, scene: 25, character: 30 },
    { screen: 6, popup: -1, scene: 26, character: 31 },
    { screen: 6, popup: -1, scene: 27, character: 32 },
    { screen: 6, popup: 19, scene: 28, character: 33 },
    { screen: 6, popup: 20, scene: 29, character: 34 },
    { screen: 6, popup: 20, scene: 29, character: 34 },
    { screen: 6, popup: -1, scene: 30, character: 35 },
    { screen: 6, popup: 21, scene: 30, character: 35 },
    { screen: 6, popup: 22, scene: 30, character: 36 },
    // **
    { screen: 6, popup: -1, scene: 31, character: 37 },
    { screen: 6, popup: 23, scene: 32, character: 38 },
    { screen: 6, popup: 23, scene: 33, character: 39 },
    //
    { screen: 7, popup: -1, scene: 33, character: 39 },
    { screen: 7, popup: -1, scene: 33, character: 39 },
  ]

const { width: screenWidth, height: screenHeight } = useWindowSize()

export const useGameStore = defineStore('game', () => {
  const isLandscape = computed(() => screenWidth.value > screenHeight.value)
  const isMobile = computed(() => !(Math.min(screenWidth.value, screenHeight.value) > 640))

  const timelineIndex = ref(0)

  const currentScreenIndex = computed(() => timeline[timelineIndex.value].screen)
  const currentPopupIndex = computed(() => timeline[timelineIndex.value].popup)
  const currentSceneIndex = computed(() => timeline[timelineIndex.value].scene)
  const currentCharacterIndex = computed(() => timeline[timelineIndex.value].character)
  const characterSkin = ref<Character>()

  const $motionBlur = ref(false)
  const motionBlur = computed(() => $motionBlur.value)

  const $hardStop = ref(false)
  const hardStop = computed(() => $hardStop.value)

  const rotationStop = computed(() => $hardStop.value || (currentSceneIndex.value > 0 && !isLandscape.value))

  const { isSupported: isFullscreenSupported, enter: enterFullscreen, exit: exitFullscreen } = useFullscreen()
  const { isSupported: isOrientationSupported, lockOrientation, unlockOrientation } = useScreenOrientation()

  function toggleHardStop(value: boolean) {
    $hardStop.value = value
  }

  function toggleMotionBlur(value: boolean) {
    $motionBlur.value = value
  }

  async function toggleGameMode(value: boolean) {
    try {
      if (value) {
        await enterFullscreen()
        await lockOrientation('landscape')
      } else {
        await exitFullscreen()
        unlockOrientation()
      }
    } catch (error) {
      // console.log(error)
    }
  }

  function setCharacterSkin(value: Character) {
    characterSkin.value = value
  }

  function nextTimeline(data?: { screen?: number; id: number }) {
    const { screen = 1, id } = data ?? { screen: 1, id: -1 }
    // alert(`Timeline Trigger ${id}`)

    timelineIndex.value += screen
    console.log({ id: id })
    // console.timeEnd()
    // console.time()
  }

  const { play: playBgm, stop: stopBgm } = useSound(resources.sound.bgmDefault, { volume: 0.5, loop: true })

  type Sounds = 'buttonPress' | 'buttonPressDesign' | 'protip' | 'alarmBell' | 'alarmLight'
  const spriteMap = {
    buttonPress: [0, 1344],
    buttonPressDesign: [1544, 672],
    protip: [2250, 2592],
    alarmBell: [4960, 4230, true],
    alarmLight: [9320, 7350, true],
  }
  const sfxSettings = reactive({
    volume: 0.5,
    interrupt: true,
    sprite: spriteMap,
  })
  const { play: playSfx, stop: stopSfx } = useSound(resources.sound.sfxSprite, sfxSettings)

  function playSound(type: Sounds, newInstance = false) {
    sfxSettings.interrupt = !newInstance
    playSfx({ id: type })
  }

  function gameStart() {
    console.log('Game init')
    playBgm()
  }

  return {
    isLandscape,
    isMobile,
    rotationStop,
    motionBlur,
    hardStop,
    timelineIndex,
    currentScreenIndex,
    currentPopupIndex,
    currentSceneIndex,
    currentCharacterIndex,
    characterSkin,
    toggleHardStop,
    toggleMotionBlur,
    toggleGameMode,
    setCharacterSkin,
    nextTimeline,
    gameStart,
    playSound,
  }
})
