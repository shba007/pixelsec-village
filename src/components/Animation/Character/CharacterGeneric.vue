<script lang="ts" setup>
import { reactive } from 'vue'
import { onTick } from 'vue3-pixi'

interface Route {
  x: number
  y: number
  time: number
}

type HeadOrientation = 'front' | 'back' | 'left' | 'right'

interface Character {
  imgs: string[]
  isAnimating: boolean
  position: {
    x: number
    y: number
  }
  speed: number
  direction: number
  headOrientation: HeadOrientation
}

const props = defineProps<{
  route: Route[]
}>()

const animations = {
  frontStill: ['@/assets/character/generic/front-still.png'],
  frontWalk: ['@/assets/character/generic/front-still.png', '@/assets/character/generic/front-walk-1.png', '@/assets/character/generic/front-walk-2.png'],
  backWalk: [],
  leftWalk: [],
  rightWalk: []
}

const activeCharacter = reactive<Character>({
  imgs: animations.frontStill,
  isAnimating: false,
  position: { x: 420, y: 150 },
  speed: 0,
  direction: 1,
  headOrientation: 'front'
})

/* setTimeout(() => {
  activeCharacter.speed = 1.3
  activeCharacter.isAnimating = true
  activeCharacter.imgs = animations['right']
}, 2000)
 */
// Move Character
let currentIndex = 0

onTick((delta) => {
  if (!activeCharacter.isAnimating) return

  if (currentIndex < props.route.length - 1) {
    const nextPoint = props.route[currentIndex + 1]
    const dx = nextPoint.x - activeCharacter.position.x
    const dy = nextPoint.y - activeCharacter.position.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (dx > 0) activeCharacter.headOrientation = 'right'
    else if (dx < 0) activeCharacter.headOrientation = 'left'
    else if (dy > 0) activeCharacter.headOrientation = 'front'
    else if (dy < 0) activeCharacter.headOrientation = 'back'

    activeCharacter.imgs = animations[activeCharacter.headOrientation + 'Walk']

    console.log({ headOrientation: activeCharacter.headOrientation })

    if (distance < activeCharacter.speed * delta) {
      // If close enough to the next point, snap to it and move to the next
      activeCharacter.position.x = nextPoint.x
      activeCharacter.position.y = nextPoint.y
      currentIndex++
    } else {
      // Move towards the next point
      const angle = Math.atan2(dy, dx)
      activeCharacter.position.x += Math.cos(angle) * activeCharacter.speed * delta
      activeCharacter.position.y += Math.sin(angle) * activeCharacter.speed * delta
    }

    // console.log(`Current Position: x=${activeCharacter.position.x}, y=${activeCharacter.position.y}`);
  } else {
    // console.log('Reached the end of the route.');
    activeCharacter.isAnimating = false
  }
})

function onChangeAnimation() {
  // console.log("Animation Changed")
}
</script>

<template>
  <Loader :resources="[...Object.values(animations)]">
    <AnimatedSprite
      :playing="activeCharacter.isAnimating"
      :animation-speed="0.1"
      :textures="activeCharacter.imgs"
      :anchor="0.5"
      :scale="0.3"
      :x="activeCharacter.position.x"
      :y="activeCharacter.position.y"
      @loop="onChangeAnimation"
    />
  </Loader>
</template>
