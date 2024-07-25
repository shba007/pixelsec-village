<script setup lang="ts">
import { reactive } from 'vue'
import { External } from 'vue3-pixi'

import { useGameStore, type Character } from '@/stores/game'
import Modal from '@/components/Modal.vue'
import characterMainBlackWalkingTexture from '@/assets/character/main/black/walking.gif'
import characterMainViolateWalkingTexture from '@/assets/character/main/violate/walking.gif'
import characterMainRedWalkingTexture from '@/assets/character/main/red/walking.gif'
import characterMainBlueWalkingTexture from '@/assets/character/main/blue/walking.gif'

const characters = [
  { type: 'black', image: characterMainBlackWalkingTexture },
  { type: 'violate', image: characterMainViolateWalkingTexture },
  { type: 'red', image: characterMainRedWalkingTexture },
  { type: 'blue', image: characterMainBlueWalkingTexture },
] as const

const gameStore = useGameStore()

function onCharcterSet(type: Character) {
  gameStore.nextScene()
  gameStore.nextMapPosition()
  gameStore.setActiveCharacter(type)
}

const TC = `3.2. Services for Consumers Our Services not only include one service or product but may include a number of respective services, products and deliverables that Consumer has applied for by way of our order process and that has been made part of the Agreement upon our acceptance and which may include(but not be limited) the following: 3.2.1. Affinidi Vault 3.2.1.1. To the extent Affinidi Vault has been made part of the Agreement, the following applies: Affinidi Vault enables Consumer to discover, collect, store, share, and monetise their data in a fragmented data world. It also enables consumer to log in to websites, applications and other services that have implemented Affinidi Login (as defined in section 2.2.1. of the Terms & Conditions) (“Participating Platforms”) using Consumer’s data stored in the Affinidi Vault after one-time registration and authentication, without having to go through a registration and login process each time, as would otherwise be the case. We may also allow or make available other services for verification either ourselves or through other third-party partners. This gives Consumer a single identity on the basis of which Consumer can be identified and verified by all Participating Platforms. A service description as well as the technical system requirements for using Affinidi Vault are set out in Appendix 4.`
</script>

<template>
  <External class="absolute top-0 left-0 w-screen h-screen">
    <Modal title="Terms & Conditions" :description="TC">
    </Modal>
  </External>
</template>