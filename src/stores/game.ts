import { computed, onMounted, reactive, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useDocumentVisibility, useEventListener, useFullscreen, useScreenOrientation, useWakeLock, useWindowSize, watchArray } from '@vueuse/core'
import { useSound } from '@vueuse/sound'

import { resources } from '@/utils/asset'
import { SCALE_MODES } from '@/utils/types'

export type Character = 'black' | 'blue' | 'red' | 'violate'

const timeline: {
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
  { screen: 2, popup: 7, scene: 8, character: 4, time: 1.25 }, // changed
  { screen: 2, popup: -1, scene: 9, character: 5, time: 3 },
  { screen: 2, popup: -1, scene: 10, character: 6, time: 6 },
  { screen: 2, popup: -1, scene: 11, character: 7, time: 9 },
  { screen: 2, popup: -1, scene: 12, character: 8, time: 12 },
  { screen: 2, popup: -1, scene: 13, character: 9, time: 14.25 },
  { screen: 2, popup: -1, scene: 14, character: 10, time: 15 },
  { screen: 2, popup: -1, scene: 15, character: 11, time: 16.5 },
  { screen: 2, popup: -1, scene: 16, character: 12 },
  { screen: 3, popup: -1, scene: 16, character: 12 },
  { screen: 3, popup: 8, scene: 16, character: 12 },
  { screen: 3, popup: 9, scene: 16, character: 12 },
  { screen: 3, popup: 10, scene: 16, character: 12 },
  { screen: 4, popup: 11, scene: 17, character: 13 },
  { screen: 4, popup: 11, scene: 18, character: 14 },
  { screen: 4, popup: 11, scene: 19, character: 15 },
  { screen: 4, popup: -1, scene: 20, character: 16 },
  //
  { screen: 5, popup: -1, scene: 20, character: 16 },
  { screen: 5, popup: 12, scene: 20, character: 16 },
  { screen: 5, popup: 13, scene: 20, character: 16 },
  { screen: 5, popup: 14, scene: 20, character: 16 }, // either
  { screen: 5, popup: 15, scene: 20, character: 16 }, // or
  { screen: 5, popup: -1, scene: 21, character: 16 }, // issue when coutdown finished
  { screen: 5, popup: 16, scene: 21, character: 16 },
  //
  { screen: 6, popup: 16, scene: 22, character: 18 },
  { screen: 6, popup: -1, scene: 23, character: 19 },
  { screen: 6, popup: -1, scene: 24, character: 20 },
  { screen: 6, popup: -1, scene: 24, character: 21 },
  { screen: 6, popup: -1, scene: 24, character: 22 },
  { screen: 6, popup: -1, scene: 24, character: 23 },
  { screen: 6, popup: -1, scene: 24, character: 24 },
  { screen: 6, popup: -1, scene: 24, character: 25 },
  { screen: 6, popup: 17, scene: 24, character: 26 },
  { screen: 6, popup: 17, scene: 24, character: 27 },
  { screen: 6, popup: 18, scene: 24, character: 28 },
  { screen: 6, popup: 18, scene: 24, character: 29 },
  { screen: 6, popup: -1, scene: 25, character: 30 },
  // loop start
  { screen: 6, popup: -1, scene: 26, character: 31 },
  { screen: 6, popup: -1, scene: 27, character: 32 },
  { screen: 6, popup: -1, scene: 28, character: 33 },
  { screen: 6, popup: 19, scene: 29, character: 34 },
  { screen: 6, popup: 20, scene: 30, character: 35 },
  { screen: 6, popup: 20, scene: 30, character: 35 },
  { screen: 6, popup: -1, scene: 31, character: 36 },
  { screen: 6, popup: 21, scene: 31, character: 36 },
  //
  { screen: 6, popup: -1, scene: 32, character: 37 },
  { screen: 6, popup: 22, scene: 32, character: 38 },
  { screen: 6, popup: -1, scene: 33, character: 39 },
  { screen: 6, popup: 23, scene: 34, character: 40 },
  // ***
  { screen: 7, popup: -1, scene: 34, character: 41 },
  { screen: 7, popup: -1, scene: 35, character: 42 },
  { screen: 7, popup: 24, scene: 36, character: 43 },
  { screen: 7, popup: 24, scene: 36, character: 44 },
  { screen: 7, popup: 24, scene: 36, character: 44 },
]

const { width: screenWidth, height: screenHeight } = useWindowSize()
export const useGameStore = defineStore('game', () => {
  const isLandscape = computed(() => screenWidth.value > screenHeight.value)
  const isMobile = computed(() => !(Math.min(screenWidth.value, screenHeight.value) > 640))

  const timelineIndex = ref(0)
  const isStarted = ref(false)
  const isPressed = ref(false)

  const currentScreenIndex = computed(() => timeline[timelineIndex.value]?.screen)
  const currentPopupIndex = computed(() => timeline[timelineIndex.value]?.popup)
  const currentSceneIndex = computed(() => timeline[timelineIndex.value]?.scene)
  const currentCharacterIndex = computed(() => timeline[timelineIndex.value]?.character)
  const characterSkin = ref<Character>()

  const $motionBlur = ref(false)
  const motionBlur = computed(() => $motionBlur.value)

  const $debugPause = ref(false)
  const inactivePause = ref(false)
  const debugPause = computed(() => $debugPause.value)
  const rotatePause = computed(() => currentSceneIndex.value > 0 && !isLandscape.value)
  const gamePause = computed(() => debugPause.value || inactivePause.value || rotatePause.value)

  watchArray([inactivePause, debugPause, rotatePause], () => {
    console.table([
      ['inactivePause', inactivePause.value],
      ['debugPause', debugPause.value],
      ['rotatePause', rotatePause.value],
      ['gamePause', gamePause.value],
    ])
  })

  onMounted(() => {
    console.table([
      ['inactivePause', inactivePause.value],
      ['debugPause', debugPause.value],
      ['rotatePause', rotatePause.value],
      ['gamePause', gamePause.value],
    ])
  })

  const textureOptions = computed(() => ({
    normal: { scaleMode: 0 },
    blur: { scaleMode: motionBlur.value ? SCALE_MODES.LINEAR : SCALE_MODES.NEAREST },
  }))

  const { enter: enterFullscreen, exit: exitFullscreen } = useFullscreen()
  const { lockOrientation, unlockOrientation } = useScreenOrientation()
  const { request, release } = useWakeLock()

  function toggleDebugPause(value: boolean) {
    $debugPause.value = value
  }

  function toggleMotionBlur(value: boolean) {
    $motionBlur.value = value
  }

  async function toggleGameMode(value: boolean) {
    try {
      if (value && isMobile.value) {
        await enterFullscreen()
        await lockOrientation('landscape')
        request('screen')
      } else {
        await exitFullscreen()
        unlockOrientation()
        release()
      }
    } catch {
      // console.log(error)
    }
  }

  function setCharacterSkin(value: Character) {
    characterSkin.value = value
  }

  function nextTimeline(data?: { screen?: number; id: number; absolute?: boolean }) {
    const { screen = 1, absolute = false } = data ?? { screen: 1, id: -1, absolute: false }

    if (!absolute) {
      if (timelineIndex.value + screen > timeline.length - 1) {
        console.warn('Timeline out of scope', timelineIndex.value + screen)
      }

      timelineIndex.value += screen
    } else {
      timelineIndex.value = screen
    }
  }

  const visibility = useDocumentVisibility()

  function handleVisibilityChange(current: string, previous: string) {
    if (!(current === 'visible' && previous === 'hidden')) {
      inactivePause.value = true
    }
  }

  watch(visibility, (current, previous) => {
    handleVisibilityChange(current, previous)
  })

  useEventListener(document, 'focus', () => {
    handleVisibilityChange('visible', 'hidden')
  })

  useEventListener(document, 'blur', () => {
    handleVisibilityChange('visible', 'hidden')
  })

  function resume() {
    inactivePause.value = false
  }

  watch(gamePause, (value) => {
    if (value) {
      // console.log('Sound Disabled')
      soundBgm.value.mute(true)
      soundSfx1.value.mute(true)
      soundSfx2.value.mute(true)
      soundSfx3.value.mute(true)
    } else {
      // console.log('Sound Enabled')
      soundBgm.value.mute(false)
      soundSfx1.value.mute(false)
      soundSfx2.value.mute(false)
      soundSfx3.value.mute(false)
    }
  })

  function reset() {
    stopBGM('resultWin')
    stopBGM('resultLost')
    stopBGM('normal')

    setTimeout(() => {
      // nextTimeline({ screen: 0, id: 999, absolute: true })
      isStarted.value = false
      isPressed.value = false
    }, 800)
  }

  const soundStatus = reactive({ bgm: 'init', sfx: 'init' })
  const isSoundLoaded = computed(() => soundStatus.bgm !== 'init' && soundStatus.sfx !== 'init')
  const isSoundPlayed = computed(() => isPlayingBgm.value || isPlayingSfx1.value || isPlayingSfx2.value || isPlayingSfx3.value)

  const activeSoundList = reactive<{
    bgm: {
      1: string | null
    }
    sfx: {
      1: string | null
      2: string | null
      3: string | null
    }
  }>({
    bgm: { 1: null },
    sfx: { 1: null, 2: null, 3: null },
  })

  type BGMSounds = 'normal' | 'panic' | 'countdown' | 'susGuy' | 'resultWin' | 'resultLost'
  const bgmSpriteMap = {
    normal: [90030, 160180 - 100, true],
    panic: [28290, 60740 - 100, true],
    countdown: [0, 6270 - 100, true],
    susGuy: [413090, 98100 - 100, true],
    resultWin: [251210, 160880 - 100, true],
    resultLost: [7270, 20020 - 100, true],
  }
  const playbackRateBgm = ref(1)
  const soundEnabledBgm = ref(true)
  const bgmSettings = {
    interrupt: true,
    sprite: bgmSpriteMap,
    autoplay: true,
    volume: 0.4,
  }
  const {
    play: playBgm,
    stop: stopBgm,
    isPlaying: isPlayingBgm,
    sound: soundBgm,
  } = useSound(resources.sound.bgmSprite, {
    playBackRate: playbackRateBgm,
    soundEnabled: soundEnabledBgm,
    ...bgmSettings,
    onload: () => {
      // console.log('Bgm Loaded')
      soundBgm.value.mute(false)
      setTimeout(() => {
        soundStatus.bgm = 'loaded'
      }, 600)
    },
    onend: () => {
      activeSoundList.bgm[1] = null
    },
  })

  type SFXSounds = 'buttonPress' | 'buttonPressDesign' | 'tram' | 'protip' | 'panic' | 'alarmBell' | 'alarmLight' | 'countdown' | 'dialogBox'
  const sfxSpriteMap = {
    buttonPress: [10280 + 500, 1770],
    buttonPressDesign: [13050, 180 + 500],
    dialogBox: [32070, 50 + 500],
    protip: [0, 2170], //
    tram: [29200, 1870],
    panic: [3170, 1110],
    alarmBell: [23040 + 100, 5160 - 1000, true],
    alarmLight: [14230 + 250, 7810 - 1000, true],
    countdown: [5280, 4000 - 1000, true],
  }
  const playbackRateSfx = ref(1)
  const soundEnabledSfx = ref(true)
  const sfxSettings = {
    interrupt: true,
    sprite: sfxSpriteMap,
    autoplay: true,
    volume: 1,
  }

  const {
    play: playSfx1,
    stop: stopSfx1,
    isPlaying: isPlayingSfx1,
    sound: soundSfx1,
  } = useSound(resources.sound.sfxSprite, {
    playbackRate: playbackRateSfx,
    soundEnabled: soundEnabledSfx,
    ...sfxSettings,
    onload: () => {
      // console.log('Sfx1 Loaded')
      soundSfx1.value.mute(false)
      setTimeout(() => {
        soundStatus.sfx = 'loaded'
      }, 600)
    },
    onend: () => {
      activeSoundList.sfx[1] = null
    },
  })
  const {
    play: playSfx2,
    stop: stopSfx2,
    isPlaying: isPlayingSfx2,
    sound: soundSfx2,
  } = useSound(resources.sound.sfxSprite, {
    playbackRate: playbackRateSfx,
    soundEnabled: soundEnabledSfx,
    ...sfxSettings,
    onload: () => {
      // console.log('Sfx2 Loaded')
      soundSfx2.value.mute(false)
      setTimeout(() => {
        soundStatus.sfx = 'loaded'
      }, 600)
    },
    onend: () => {
      activeSoundList.sfx[2] = null
    },
  })
  const {
    play: playSfx3,
    stop: stopSfx3,
    isPlaying: isPlayingSfx3,
    sound: soundSfx3,
  } = useSound(resources.sound.sfxSprite, {
    playbackRate: playbackRateSfx,
    soundEnabled: soundEnabledSfx,
    ...sfxSettings,
    onload: () => {
      // console.log('Sfx3 Loaded')
      soundSfx3.value.mute(false)
      setTimeout(() => {
        soundStatus.sfx = 'loaded'
      }, 600)
    },
    onend: () => {
      activeSoundList.sfx[3] = null
    },
  })

  function playSFX(id: SFXSounds, instanceId = 1) {
    if (visibility.value === 'hidden') return

    if (instanceId == 1) {
      playSfx1({ id })
      activeSoundList.sfx[1] = id
    } else if (instanceId == 2) {
      playSfx2({ id })
      activeSoundList.sfx[2] = id
    } else {
      playSfx3({ id })
      activeSoundList.sfx[3] = id
    }
  }

  function stopSFX(instanceId?: number) {
    if (instanceId === undefined) {
      stopSfx1()
      stopSfx2()
      stopSfx3()
    } else if (instanceId == 1) stopSfx1()
    else if (instanceId == 2) stopSfx2()
    else if (instanceId == 3) stopSfx3()
  }

  function playBGM(id: BGMSounds) {
    if (activeSoundList.bgm[1] === null) {
      playBgm({ id })
    } else {
      playBgm({ id })
    }
    activeSoundList.bgm[1] = id
  }

  function stopBGM(id: BGMSounds) {
    stopBgm({ id })
    activeSoundList.bgm[1] = null
  }

  return {
    timelineIndex,
    isStarted,
    isPressed,
    isLandscape,
    isMobile,
    isSoundLoaded,
    isSoundPlayed,
    motionBlur,
    debugPause,
    rotatePause,
    inactivePause,
    gamePause,
    textureOptions,
    currentScreenIndex,
    currentPopupIndex,
    currentSceneIndex,
    currentCharacterIndex,
    characterSkin,
    resume,
    reset,
    toggleDebugPause,
    toggleMotionBlur,
    toggleGameMode,
    setCharacterSkin,
    nextTimeline,
    playSFXSound: playSFX,
    stopSFXSound: stopSFX,
    playBGMSound: playBGM,
    stopBGMSound: stopBGM,
  }
})
