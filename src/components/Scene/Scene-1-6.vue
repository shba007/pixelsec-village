<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useIntervalFn, useScroll, useTimeoutFn } from '@vueuse/core'
import { External } from 'vue3-pixi'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'
import AppPopup from '@/components/AppPopup.vue'

defineProps<{
  zoomFactor: number
}>()

const gameStore = useGameStore()
const { gamePause } = storeToRefs(gameStore)

const targetElem = ref<HTMLParagraphElement | null>(null)
const { arrivedState, y } = useScroll(targetElem, { behavior: 'smooth' })
// const { counter, resume, pause } = useInterval(75*4, { immediate: false, controls: true })

const isNext = ref(false)

function onNext() {
  if (isNext.value) return

  isNext.value = true
  gameStore.nextTimeline({ id: 6 })
}

/* watch(counter, (value) => {
  y.value = value * 2000 * 4
}) */

function autoScroll() {
  // resume()
  y.value = targetElem.value?.scrollHeight ?? 0
}

watch(
  () => arrivedState.bottom,
  (value) => {
    if (value) {
      useTimeoutFn(onNext, 3000)
    }
  }
)

const boxPlaceholder = reactive({ x: 0, y: 60, scale: 0.5 })
const boxPlaceholderRef = ref<any>(null)
const boxDiv = reactive({ x: 0, y: 0, width: 0, height: 0, alpha: 0 })

function resize() {
  if (boxPlaceholderRef.value) {
    const localBounds = boxPlaceholderRef.value.getLocalBounds() // Get local bounds of the sprite
    const scaleX = boxPlaceholderRef.value.worldTransform.a // Get global scale on X-axis
    const scaleY = boxPlaceholderRef.value.worldTransform.d // Get global scale on Y-axis

    const width = localBounds.width * scaleX
    const height = localBounds.height * scaleY

    const { x, y } = boxPlaceholderRef.value.getGlobalPosition()
    boxDiv.x = x - width / 2
    boxDiv.y = y - height / 2

    boxDiv.width = width
    boxDiv.height = height
    boxDiv.alpha = 1
  }
}

useIntervalFn(resize, 100)

const titleText = reactive({ x: 0, y: -170, anchor: 0.5, scale: 1, style: { fontFamily: 'LAN', fontSize: 54, align: 'left', lineHeight: 64, stroke: 1, strokeThickness: 1 } })
</script>

<script lang="ts">
export default {
  directives: {
    'prevent-zoom': {
      beforeMount(el) {
        el.addEventListener(
          'touchstart',
          (event: any) => {
            event.preventDefault() // Prevent default touch behavior (zoom, scroll)
          },
          { passive: false }
        ) // Ensure preventDefault works
      },
    },
  },
}
</script>

<template>
  <AppPopup type="landscape" x="center" y="center" :zoom-factor="zoomFactor" :show-button="false">
    <Container :x="titleText.x" :y="titleText.y">
      <Text :anchor="titleText.anchor" :style="titleText.style" :scale="titleText.scale">TERMS AND CONDITIONS FOR\nALGOSTRACT SERVICES</Text>
    </Container>
    <Sprite ref="boxPlaceholderRef" texture="popupScene05BG" :texture-options="textureOptions" :anchor="0.5" :x="boxPlaceholder.x" :y="boxPlaceholder.y" :scale="boxPlaceholder.scale" />
    <External
      v-if="!gamePause"
      v-prevent-zoom
      class="fixed z-10 touch-pan-down"
      :style="{ left: boxDiv.x + 'px', top: boxDiv.y + 'px', width: boxDiv.width + 'px', height: boxDiv.height + 'px', opacity: boxDiv.alpha }">
      <section ref="targetElem" class="policy-section cms-content section-legal">
        <div class="container">
          <article>
            <p>Version 1.0: September 2023</p>
            <p class="paragraph sbold"><span>1.</span>General</p>
            <div class="ms-md-5 ms-4">
              <p class="paragraph">
                <span>1.1.</span> <a href="index.html" class="link">www.algostract.com</a> is a website operated by Algostract registered under the laws of the Republic of
                Singapore. Together with its related entities from time to time, Affinity ID Network Pte. Ltd. shall be referred to as “Algostract”, “our”, “us” and “we” in this Terms of Use.
              </p>
              <p class="paragraph">
                <span>1.2.</span>
                By accessing this website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any
                applicable local laws. If you do not agree to these terms, you must not use our website.
              </p>
              <p class="paragraph">
                <span>1.3.</span>
                These terms of use refer to our Cookie Policy and the Privacy Notice, which also apply to your use of our website. The links to the same are available on our website.
              </p>
              <p class="paragraph">
                <span>1.4.</span>
                We do not guarantee that our website, or any content on it, will always be available or be uninterrupted. We may suspend or withdraw or restrict the availability of all or any part of
                our website for business and operational reasons.
              </p>
              <p class="paragraph">
                <span>1.5.</span>
                You are responsible for ensuring that all persons who access our website through your internet connection are aware of these terms of use and other applicable terms and conditions, and
                that they comply with them.
              </p>
            </div>
            <p class="paragraph sbold"><span>2.</span>Content</p>
            <div class="ms-md-5 ms-4">
              <p class="paragraph">
                <span>2.1.</span>
                We are the owner or the licensee of all intellectual property rights in our website, and of the material published on it. These works are protected by intellectual property laws. All
                such rights are reserved.
              </p>
              <p class="paragraph">
                <span>2.2.</span>
                Except as expressly provided in these Terms of Use, no part of our website may be copied, uploaded, posted, publicly displayed, published, encoded, translated, or distributed in any
                way to any other computer, server, website or other medium for publication or distribution or for any commercial enterprise.
              </p>
              <p class="paragraph">
                <span>2.3.</span>
                You must not use any part of the content on our website for commercial purposes without obtaining a license to do so from us or our licensors. Our status (and that of any identified
                contributors) as the authors of content on our website must always be acknowledged.
              </p>
              <p class="paragraph">
                <span>2.4.</span>
                If you print off, copy or download any part of our website in breach of these terms of use, your right to use our website will cease immediately and you must, at our option, return or
                destroy any copies of the materials you have made.
              </p>
            </div>
            <p class="paragraph sbold"><span>3.</span>Disclaimer</p>
            <div class="ms-md-5 ms-4">
              <p class="paragraph">
                <span>3.1.</span>
                The content on our website is provided for general information only. The content appearing on our website could include editorial, factual, typographical, technical, or formatting
                errors.
              </p>
              <p class="paragraph">
                <span>3.2.</span>
                We make reasonable efforts to update the information on our website, and may make changes to the website at any time without notice.
              </p>
              <p class="paragraph">
                <span>3.3.</span>
                We make no representations, warranties or guarantees, express or implied, that the content on our website is accurate, complete or up to date, satisfies any conditions of
                merchantability, non-infringement, or fitness for a particular purpose.
              </p>
              <p class="paragraph">
                <span>3.4.</span>
                In no event shall Algostract be liable for any damages arising out of the use or inability to use the content on our website.
              </p>
            </div>

            <p class="paragraph sbold"><span>4.</span>Links</p>
            <div class="ms-md-5 ms-4">
              <p class="paragraph">
                <span>4.1.</span>
                Where our website contains links to other sites and resources provided by third parties, these links are provided for your information only. Such links should not be interpreted as
                approval by us of those linked websites or information you may obtain from them.
              </p>
              <p class="paragraph">
                <span>4.2.</span>
                We have no control over the contents of those sites or resources.
              </p>
              <p class="paragraph">
                <span>4.3.</span>
                We do not warrant nor represent any matter concerning the accuracy, completeness, or reliability of the use of the materials on any third-party website or otherwise relating to such
                materials or on any sites linked to this website.
              </p>
            </div>

            <p class="paragraph sbold"><span>5.</span>Personal Data</p>
            <div class="ms-md-5 ms-4">
              <p class="paragraph"><span>5.1.</span> We will only use your personal information as set out in our <a href="/privacy-policy" class="link">Privacy Notice.</a></p>
            </div>

            <p class="paragraph sbold"><span>6.</span>General</p>
            <div class="ms-md-5 ms-4">
              <p class="paragraph">
                <span>6.1.</span>
                Algostract may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of
                service. Every time you wish to use our website, please check these terms to ensure you understand the terms that apply at that time. These terms were most recently updated on 16
                October 2020.
              </p>
              <p class="paragraph">
                <span>6.2.</span>
                We do not guarantee that our website will be secure or free from bugs or viruses.
              </p>
              <p class="paragraph">
                <span>6.3.</span>
                You are responsible for configuring your information technology, computer programs, servers, and platform to access our website. You should use your own virus protection software.
              </p>
              <p class="paragraph">
                <span>6.4.</span>
                You must not misuse our website by knowingly introducing viruses, trojans, worms, or other material that is malicious or harmful. You must not attempt to gain unauthorised access to
                our website, the server on which our website is stored, or any server, computer or database connected to our site. You must not attack our website via a denial-of-service attack or a
                distributed denial-of service attack.
              </p>
              <p class="paragraph">
                <span>6.5.</span>
                You may link to our home page, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it.
              </p>
              <p class="paragraph">
                <span>6.6.</span>
                You must not establish a link in such a way as to suggest any form of association, approval or endorsement on our part where none exists.
              </p>
              <p class="paragraph">
                <span>6.7.</span>
                We reserve the right to withdraw linking permission without notice.
              </p>
            </div>

            <p class="paragraph sbold"><span>7.</span>Governing Law</p>
            <p class="paragraph">
              These Terms of Use, the Privacy Notice, and the Cookies Policy, are governed by and construed in accordance with the laws of the Republic of Singapore, and you irrevocably submit to the
              exclusive jurisdiction of the courts in Singapore.
            </p>
          </article>
        </div>
      </section>
      <button class="absolute bottom-4 left-1/2 aspect-square -translate-x-1/2 touch-none rounded-full bg-slate-100 px-3 py-0.5 text-2xl shadow-md" @click="autoScroll">↓</button>
    </External>
  </AppPopup>
</template>

<style scoped>
@import '@/assets/css/policy.css';

.policy-section {
  height: 100%;
  overflow-y: scroll;
  background-color: #eeeeeeb2;
}

button,
.policy-section {
  touch-action: manipulation;
}
</style>
