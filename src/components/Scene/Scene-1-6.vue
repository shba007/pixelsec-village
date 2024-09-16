<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useScroll, useTimeoutFn, useWindowSize, watchArray } from '@vueuse/core'
import { External } from 'vue3-pixi'
import { storeToRefs } from 'pinia'

import { useGameStore } from '@/stores/game'
import { textureOptions } from '@/components/AppSettings.vue'

const gameStore = useGameStore()
const { rotationStop } = storeToRefs(gameStore)

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zoomFactor = computed(() => screenWidth.value / 1280)

const modal = computed(() => ({
  image: 'popupBgLandscape',
  state: { x: (screenWidth.value * 1) / 2, y: (screenHeight.value * 1) / 2, scale: 0.9 * zoomFactor.value },
}))

const targetElem = ref<HTMLParagraphElement | null>(null)
const { arrivedState, y } = useScroll(targetElem, { behavior: 'instant' })

let interval: any

function handleMove() {
  gameStore.nextTimeline({ id: 6 })
}

function autoScroll() {
  interval = setInterval(() => {
    y.value += 2000
  }, 75)
}

watch(
  () => arrivedState.bottom,
  (value) => {
    if (value) {
      clearInterval(interval)
      useTimeoutFn(handleMove, 3000)
    }
  }
)

onMounted(() => {
  gameStore.playSFXSound('dialogBox')
})

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})

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

const { width, height } = useWindowSize()

watchArray([width, height], resize)

onMounted(() => {
  setTimeout(resize, 50)
})

const titleText = reactive({ x: 0, y: -170, anchor: 0.5, scale: 0.25, style: { fontFamily: 'LAN', fontSize: 56 * 4, align: 'left', lineHeight: 64 * 4, stroke: 1, strokeThickness: 1 * 4 } })
</script>

<template>
  <Container :x="modal.state.x" :y="modal.state.y" :scale="modal.state.scale">
    <Sprite :texture="modal.image" :texture-options="textureOptions" :anchor="0.5" :scale="0.5" />
    <Container :x="titleText.x" :y="titleText.y">
      <Text :anchor="titleText.anchor" :style="titleText.style" :scale="titleText.scale">
        TERMS AND CONDITIONS FOR\nAFIINIDI SERVICES
      </Text>
    </Container>
    <Sprite ref="boxPlaceholderRef" texture="popupScene05BG" :texture-options="textureOptions" :anchor="0.5"
      :x="boxPlaceholder.x" :y="boxPlaceholder.y" :scale="boxPlaceholder.scale" />
    <External v-if="!rotationStop" class="fixed"
      :style="{ left: boxDiv.x + 'px', top: boxDiv.y + 'px', width: boxDiv.width + 'px', height: boxDiv.height + 'px', opacity: boxDiv.alpha }">
      <section ref="targetElem" class="policy-section cms-content section-legal">
        <div class="container">
          <article>
            <p>Version 2.2 - May 2024</p>
            <p class="paragraph sbold"><span class="c10">1.</span>Preamble</p>
            <p class="paragraph">
              Affinidi Pte. Ltd., a private limited company, incorporated in Singapore and having its registered office
              address at 83 Clemenceau Avenue, Singapore 239920 (“Affinidi” and / or “We” and
              / or “Us”) is a com-pany in the field of information technology. One of our key services is the provision
              of a data vault called Affinidi Vault, allowing end users (“Consumer”) to own,
              collect and store their data and selectively share it with participating website and app operators
              (“Developer”) in a privacy-enabled and consent-driven manner. In order to do so, We
              enable the Developer to implement a login system called Affinidi Login for his/her services, allowing
              Consumer to log in with his/her data stored in the Affinidi Vault. In this way, We
              allow the Developer to use authentication processes with decentralized data storage without having to
              collect data from Consumer during the login or registration process. In this regard,
              We offer various services and products to the Developer as well as to Consumer, each of which is subject
              to these Terms and Conditions (“Terms &amp; Conditions”). Section 2 of the Terms
              &amp; Conditions shall apply to services and products we offer to the Developers. Section 3 of the Terms
              &amp; Conditions shall apply to services and products we offer to the Consumer.
              While Sections 4, 5, 7, 8 and 9 of the Terms &amp; Conditions contains partially deviating and / or
              supplementary provisions to Sections 2 and 3.
            </p>
            <p class="paragraph sbold"><span class="c10">2.</span> Affinidi Services towards Developer(s)</p>
            <div class="ms-md-5 ms-3">
              <p class="paragraph sbold"><span class="c0">2.1.</span> Subject Matter and Scope of Service</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c56">
                  <span class="c0">2.1.1.</span> Subject matter of the Terms &amp; Conditions is the provision of our
                  services and products accord-ing to sections 2.2 &amp; 3.2 respectively and as
                  described in the service descriptions in the appen-dices to the Terms &amp; Conditions and any other
                  products or services offered by us (collectively "Services").
                </p>
                <p class="paragraph c11">
                  <span class="c0">2.1.2.</span> By way of completing the order process regarding our Services and
                  accepting the Terms &amp; Conditions (including its appendices), the Developer
                  applies for the agreement to the Services, which will only be concluded by our acceptance of
                  Developer’s offer (hereinafter: “Agree-ment”). We are free to accept or deny the offer at
                  our own discretion.
                </p>
                <p class="paragraph c40">
                  <span class="c0">2.1.3.</span> We offer our Services according to section 2 to Developers, defined as
                  a natural or legal person who, at the time of concluding this Term and
                  Conditions, is acting in the exercise of his/her commercial or professional activity. In case of any
                  amendment to these Terms and Conditions, they shall be required to be agreed in
                  writing between the Parties.
                </p>
                <p class="paragraph c78">
                  <span class="c0">2.1.4.</span> So far as the Services include the provision of copyrighted or
                  otherwise (e.g. as trade secret) legally protected content (e.g. software, software
                  components, CLIs), We grant the Developer a worldwide, non-exclusive, non-transferable and non-sub
                  licensable right to use the content or have it used in Developer’s interest and
                  under its commission to the extent granted in and for the term of the Agreement (unless explicitly
                  granted differently between Us and the Devel-oper by citing the deviation to this
                  section 2.1.4 of the Terms &amp; Conditions). The Developer shall not transfer the content to third
                  parties in particular, he/she shall not sell, lend, rent or publicly reproduce the
                  content or make it accessible. The Developer shall not reverse engi-neer, disassemble, decompile,
                  except to the extent permitted by applicable mandatory law, or use it to train any
                  artificial intelligence model or application.
                </p>
                <p class="paragraph c111">
                  <span class="c0">2.1.5.</span> So far as our Services contain open-source software (“OSS”) components,
                  the use of these components is exclusively subject to the corresponding terms
                  and conditions of the respective OSS. No provision of the Terms &amp; Conditions shall affect the
                  rights or obligations of the De-veloper under the corresponding terms and conditions
                  of the OSS. In the event of contradic-tions or conflicting provisions between the license terms of the
                  OSS and the provisions of the Terms &amp; Conditions, the license terms of the
                  OSS shall take precedence.
                </p>
                <p class="paragraph c20">
                  <span class="c0">2.1.6.</span> All appendices to the Terms &amp; Conditions (“Appendices”) are
                  incorporated by reference and made an integral part of the Agreement. In the event of
                  conflicts or ambiguities between any provision of this Terms &amp; Conditions and the Appendices
                  hereto, the terms in this Terms &amp; Conditions shall take precedence and prevail
                  over the terms of the Appendices, unless and to the extent: (a) If it is explicitly stated otherwise
                  in this Terms &amp; Conditions and/or the Appen-dix, or (b) an Appendix
                  explicitly declares a specific provision of this Terms &amp; Conditions as not applicable (citing
                  requirement).
                </p>
              </div>
              <p class="paragraph sbold"><span class="c0">2.2.</span> Services</p>
              <p class="paragraph c6">
                Our Services do not only include one service or product but may include a number of respective services,
                products and deliverables that the Developer has applied for by way of our
                order process and that has been made part of the Agreement upon our acceptance and which may include but
                not be limited to the following:
              </p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c56"><span class="c0">2.2.1.</span> Affinidi Login</p>
                <div class="ms-md-5 ms-4">
                  <p class="paragraph" style="padding-left: 65px">
                    <span class="c0">2.2.1.1.</span> To the extent that Affinidi Login has been made part of the
                    Agreement, We enable the Developer to use an authentication method with decentralized
                    data storage on his/her website or app so that the Developer does not need to collect data directly
                    from Con-sumer while Consumer is logging in or registering on Developer's
                    website or app. A service description as well as the technical system requirements for using
                    Affinidi Login are set out in Appendix 1.
                  </p>
                  <p class="paragraph" style="padding-left: 65px">
                    <span class="c0">2.2.1.2.</span> In order to be able to use Affinidi Login, the Developer needs to
                    login through Affinidi Vault and register and authenticate by downloading the
                    Affinidi Vault Chrome extension from the Chrome Web Store or accessing the Affinidi Vault @
                    www.vault.affinidi.com , which is accessible both via desktop and/or mobile.
                  </p>
                  <p class="paragraph" style="padding-left: 65px">
                    <span class="c0">2.2.1.3.</span> The service description and system requirements for using Affinidi
                    Vault in Appendix 4 shall apply accordingly.
                  </p>
                </div>
                <p class="paragraph c11"><span class="c0">2.2.2.</span> Affinidi Portal</p>
                <p class="paragraph">
                  To the extent Affinidi Portal has been made part of the Agreement, We grant the Developer access to
                  Affinidi Portal, a web-based portal to access the documentation and other content
                  that We provide for the Developer to implement and use our Services. A service description as well as
                  the technical system requirements for using Affinidi Portal are set out in
                  Appendix 2.
                </p>
                <p class="paragraph c40"><span class="c0">2.2.3.</span> Affinidi CLI</p>
                <div class="ms-md-5 ms-4">
                  <p class="paragraph" style="padding-left: 65px">
                    <span class="c0">2.2.3.1.</span> To the extent the provision of CLI has been made part of the
                    Agreement, We provide the Developer with a Command Line Interface or a corresponding
                    software package re-spectively (collectively “CLI”). CLI enables the Developer to technically
                    implement our Services or parts thereof on his/her app or service. A service
                    description as well as the technical system requirements for using CLI are set out in Appendix 3.
                  </p>
                  <p class="paragraph" style="padding-left: 65px">
                    <span class="c0">2.2.3.2.</span> As CLI provided by Us is not necessarily required to be installed
                    in order to implement our Services or parts thereof, the Developer may also use a
                    third party CLI or software component to implement and use Our Services, given that the third party
                    CLI or software component meets the required technical requirements as in
                    particular set out in the Terms &amp; Conditions. If a CLI or third-party software package is used,
                    the terms and conditions of the respective provider shall apply in this regard.
                    We shall not be responsible for and do not warrant that our Services are usable with any particular
                    third party CLI or soft-ware component or software-like tools. We reserve the
                    right to reject or exclude third party CLI providers if this becomes necessary for weighty reasons .
                    Weighty reasons are, for example, a technical incompatibility of the service of
                    the third-party provider with our Services, legal reasons that prevent the connection to our
                    Services or the adap-tation of our Services to technical innovations.
                  </p>
                </div>
                <p class="paragraph c40"><span class="c0">2.2.4.</span> Reference App</p>
                <p class="paragraph">
                  To the extent Affinidi Reference App has been made part of the Agreement, within Affinidi Portal We
                  provide Developers with our Reference App, a demo version of our Services in which
                  the Developer can test our Services and their functionalities in parallel to the live oper-ation of
                  our Services. In order to be able to use Reference App, the Developer needs
                  Affinidi Vault. In this regard, sections 2.2.1 and 2.2.1.1 applies accordingly. Reference App runs
                  sepa-rately from the live operation of our Services. In particular, this means that
                  Reference App is not connected to Consumer's Affinidi Vault in the sense that Consumer data is
                  transferred from Affinidi Vault to Reference App. The Developer shall not feed any real
                  data from Consumers into Reference App and would be solely liable to the Consumer in case they are
                  adding such information on the Reference App.
                </p>
                <p class="paragraph c40"><span class="c0">2.2.5.</span> Affinidi Desktop App</p>
                <p class="paragraph">
                  To the extent Affinidi Desktop App has been made part of the Agreement, the following ap-plies:
                  Affinidi Desktop App is an additional security tool for the use of Affinidi Vault.
                  Affinidi Desktop App enables Consumer to open Affinidi Vault in Consumer’s browser, so that Affinidi
                  Vault can only share Consumer’s data with the Developer if Consumer has
                  previously un-locked Affinidi Vault in his/her browser by entering his/her biometric data. The use of
                  Affinidi Desktop App is not required for the use of Affinidi Vault, it is only
                  an add-on. A service de-scription as well as the technical system requirements for using Affinidi
                  Desktop App are set out in Appendix 5.
                </p>
                <p class="paragraph c40"><span class="c0">2.2.6.</span> Support</p>
                <p class="paragraph">
                  We offer support services (“Support”) for the implementation and use of our Services to the extent
                  this has been made part of the Agreement. Unless otherwise agreed, our Support is
                  lim-ited to basic support in terms of Q&amp;A lists that we provide in the Affinidi Portal or in case
                  you have upgraded your subscription tier then you would be eligible to avail
                  support services as may be applicable to the tier of service you have subscribed to and as specified
                  under www.affinidi.com/pricing. The limitations of warranty and liability in
                  section 6 remain unaffected.
                </p>
              </div>
              <p class="paragraph sbold"><span class="c0">2.3.</span> Prices and Payment for Affinidi Services</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c56">
                  <span class="c0">2.3.1.</span> While the subscription to Our Services is free of charge, when the
                  Developer has subscribed to any tier (like Essential or Community tier or any other
                  tier as may be defined by us later), The Developer has the option to avail additional benefits by
                  upgrading to various other sub-scription tiers offered by Affinidi.
                </p>
                <p class="paragraph c56">
                  <span class="c0">2.3.2.</span> The subscription tiers may as well be subject to limitations with
                  respect to Monthly Active Users (“MAUs”), Affinidi Credits, Customer Support, etc. as
                  specified in the Developer Portal and/or www.affinidi.com/pricing (“Pricing Page”). When the
                  Developer’s actual usage of the Services reaches the limits or nears the limits as
                  specified under the various subscription tiers in the Developer Portal and/or the Pricing Page, we may
                  notify the Developer accordingly and suggest an upgrade of his subscription
                  tier; at our discretion but taking into account the Devel-oper’s interest we may also block any
                  further actions within the Services that would exceed the defined quota. Affinidi can
                  at their discretion charge overage for exceeding the MAUs or any other limitation as more particularly
                  specified under the Developer Portal and/or the Pric-ing Page. The Developer
                  will not be able to complete any further API call when the number of Credits in that Developer’s
                  account at the moment of request to the API call does not cover the actually defined
                  Credit cost. Further, the Developer may not be able to add users to their services through Affinidi
                  Services, in case they reach their maximum MAU limit. For the pur-pose of this
                  clause,
                </p>
                <div class="ms-md-5 ms-4">
                  <p class="paragraph" style="padding-left: 65px">
                    <span class="c0">2.3.2.1.</span> Affinidi Credits (“Credit(s)”) refers to credits provided by
                    Affinidi as a fair play mech-anism to the account of the Developer. Each subscription
                    tier has a predefined number of Credits allocated for API calls made for various reasons. The number
                    of Credits re-quired for each API call will depend on the functionality within
                    the Service and may be revised at any time with notice to the Developer. Further, the performance of
                    an API call in the course of using Our Services may require the Developer to
                    utilize Affinidi Credits made available to such Developer. The number of Credits/MAUs within the
                    Developer’s account will be reset according to his subscribed tier at the beginning
                    of every subscrip-tion cycle during the term of his/her active subscription tier.
                  </p>
                  <p class="paragraph" style="padding-left: 65px">
                    <span class="c0">2.3.2.2.</span> MAUs refers to number of unique end-users/Consumers who have
                    successfully logged into any website configured under that project by the Developer at
                    least once in the given month.
                  </p>
                </div>
                <p class="paragraph c56">
                  <span class="c0">2.3.3.</span> The Developer may ask for an upgrade, downgrade, initiation, or
                  cancellation of a subscription tier which will become effective upon Our approval with
                  the effect of the following subscrip-tion cycle. Provided however in case of downgrade or cancellation
                  of a paid subscription, the Developer will have to inform Us minimum seven (07)
                  days before the subscription period ends in order for Us to process the cancellation/downgrade in the
                  next subscription cycle. In case the Developer fails to inform us seven (07)
                  days before the subscription period ends, we shall be able to process the cancellation/downgrade only
                  in the cycle after the next cycle.
                </p>
                <p class="paragraph c56">
                  <span class="c0">2.3.4.</span> We are entitled to adjust the applicable subscription tiers, their
                  conditions and details as well as the Credit cost per API for the future any time
                  during the Term of this Agreement. Such adjustments will become binding after We inform the Developer
                  about the upcoming changes with a reasonable notice period of at least fourteen
                  (14) days and the Developer continues or starts using the respective Service without refusing that
                  change at least in text form to Us. In case the Developer refuses to accept the
                  changes, the existing Agreement between Us and the Developer remains unchanged, we are entitled to
                  suspend the Services immediately and to terminate the Agreement in total or partly
                  for good reason with a notice period of one (1) month. In any case we will respect the Developer’s
                  legitimate interest.
                </p>
                <p class="paragraph c56">
                  <span class="c0">2.3.5.</span> In case you have subscribed to or interested in any of the paid
                  services introduced by Us (“Paid Services”) and as specified at
                  www.affinidi.com/pricing, you may have to make payment of such price or any revised price updated from
                  time to time according to the rules of these Terms &amp; Conditions. You may
                  choose a mode of payment for Paid Services as offered and specified by Us at the time of the
                  subscription. You agree to pay us the applicable fees and taxes specific to Paid Services
                  as required under applicable laws for the time being in force.
                </p>
                <p class="paragraph c56">
                  <span class="c0">2.3.6.</span> You may also be redirected for payment purposes to a third-party
                  payment processing site offering payment through various channels such as net banking,
                  debit card and credit card ("Payment Gateway") and you shall abide by the terms and conditions of such
                  Payment Gate-way.
                </p>
                <p class="paragraph c56">
                  <span class="c0">2.3.7.</span> In case of any disputes with respect to any payments made to us under
                  the subscription plans or any other manner for availing the Services, the
                  Developers can contact us through either the contact us section in Affinidi Portal or though the
                  contact us section at https://www.af-finidi.com/get-in-touch and we shall respond to
                  the queries without undue delay.
                </p>
              </div>
              <p class="paragraph sbold"><span class="c0">2.4.</span> Term and Termination of the Services for
                Developers</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c102"><span class="c0">2.4.1.</span> The term of the subscription tiers as well as
                  the subscription to any of our services shall be unlimited.</p>
                <p class="paragraph c80">
                  <span class="c0">2.4.2.</span> Notwithstanding the term and termination of this Agreement (section 5),
                  The Developer may send a notice to Us to terminate any of the Services at any
                  time, whether in respect of all or only selected Services or subscription tiers, and We will execute
                  the request of the Developer to terminate the subscriptions within a period of
                  thirty (30) days of receipt of the request.
                </p>
                <p class="paragraph c51">
                  <span class="c0">2.4.3.</span> We may terminate the Agreement with regard to the Developer’s services
                  fully or in parts at any time during the term of this Agreement with effect to
                  the end of the month of the termination.
                </p>
                <p class="paragraph c12">
                  <span class="c0">2.4.4.</span> Upon expiry or termination of the Agreement, We will cease to provide
                  Services to Developer. If the Agreement is terminated only with respect to single
                  Services, we will cease to provide such Services. The Developer shall, within a reasonable time,
                  specifically return or destroy all copyrighted or otherwise legally protected content
                  (including CLI or software and software components) in his/her possession, and each party shall return
                  all copies of the other party's confidential information.
                </p>
              </div>
              <p class="paragraph sbold"><span class="c0">2.5.</span> Developer’s Obligations</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c102">
                  <span class="c0">2.5.1.</span> The Developer shall be responsible for meeting the system requirements
                  for the implementa-tion and use of the Services described in this Agreement.
                </p>
                <p class="paragraph c80">
                  <span class="c0">2.5.2.</span> The Developer shall remember his/her passphrase and keep it safe. We
                  currently do not provide any mechanisms to reset the passphrase. In this case, the
                  Developer must re-register and re-authenticate.
                </p>
                <p class="paragraph c51">
                  <span class="c0">2.5.3.</span> The Developer shall be responsible for providing the facilities
                  including hardware, software and internet connection necessary to properly use the
                  Services as set out in the Agreement and which are within his/her sphere. The Developer shall be
                  responsible that the Services ordered are fit for his/her purpose and he/she has
                  asked for all relevant information. The Developer shall further be responsible for the security of
                  his/her systems in place to use our Services and for protecting them against
                  malicious software and attacks.
                </p>
                <p class="paragraph c12">
                  <span class="c0">2.5.4.</span> So far as our Services contain components of software for which
                  separate license conditions apply and are to be observed, We shall draw Developer's
                  attention to this in an appropriate manner. In this regard, our Services may contain components of
                  open-source software to which respective license terms may apply. The respective
                  open-source license terms shall prevail over the terms of this Agreement. The Developer shall be
                  solely responsible to comply with the open-source license conditions in accordance
                  with section 2.1.5 of the Terms &amp; Conditions.
                </p>
                <p class="paragraph c114">
                  <span class="c0">2.5.5.</span> Our Services are not an archive or a backup system. This is why the
                  Developer is responsible for the backup and storage of any data transferred to Us
                  by either the Developer or Consumer using our Services via Developer’s website. We can rely on the
                  assumption that any data We will come in contact with or have influence on by way
                  or in connection to our Services, has been saved for backup purposes by the Developer on a
                  state-of-the-art level.
                </p>
                <p class="paragraph c12">
                  <span class="c0">2.5.6.</span> In case, the Consumer or the Developer have opted for cloud back-up
                  &amp; restore option in their respective Affinidi Vault, Affinidi would be storing
                  the backup on their behalf. While creating the back-up, Consumer/Developer would receive an email with
                  the back-up id which would have to be provided while restoring the backup in
                  the vault along with the passphrase set by the Consumer/Developer for their vault. This service is
                  available with limited capability only for the web app and mobile app (android) of
                  Affinidi Vault. The Company may provide further enhancements to the cloud backup in future at their
                  discretion. This could be free or for a price as may be decided by the Company.
                </p>
              </div>
              <p class="paragraph sbold"><span class="c0">2.6.</span> Data Protection</p>
              <p class="paragraph c28">
                We shall not be responsible for the personal data pertaining to which the Developer is the data
                controller. This applies in particular to the extent that the Developer processes
                personal data of the Consumer previously provided to him/her by the Consumer in the context of their
                contractual or pre-contractual relationship. The Developer indemnifies us against
                any claims made against us by the Consumer based on Developer‘s unlawful processing of Consumer‘s
                personal data received from the Consumer. Apart from that, We are compliant with
                applicable laws, in particular the General Data Protection Regulation (GDPR), Singaporean Data
                Protection Regulations and Indian Data Pro-tection Regulations.
              </p>
              <p class="paragraph sbold"><span class="c0">2.7.</span>Modification of Services or of the Terms &amp;
                Conditions</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c102">
                  <span class="c0">2.7.1.</span> We reserve the right to change our Services (in completely or in part)
                  at any time with effect for the future if this becomes necessary for good
                  reasons, neither Consumer nor the Developer is placed in a significantly worse position by the change
                  and the change is reasonable for the Consumer and the Developer. Good reasons
                  include, for example, changes to the services of our own contractual partners and the adaptation of
                  our Services to technical innovations. Rea-sonable reasons include, in particular,
                  changes that do not significantly affect the interests of Consumer or the Developer or do not result
                  in a significant restriction of the scope of use of the Services, e.g., the
                  addition of additional functions or Services
                </p>
                <p class="paragraph c80">
                  <span class="c0">2.7.2.</span> We will inform the Developer of any changes to the Terms &amp;
                  Conditions and/or the scope of Services that go beyond the cases specified under section
                  2.7.1 e.g. by displaying such information as part of the log-in procedure for the respective Services
                  at least fourteen (14) days in advance. So far as changes beyond section 2.7.1
                  do not affect essential contractual provisions, Developer‘s consent to the change of the Agreement
                  shall be deemed to have been granted unless the Developer objects to the change in
                  text form within fourteen (14) days after receipt of the change notification and continues to using
                  our Services.
                </p>
                <p class="paragraph c51">
                  <span class="c0">2.7.3.</span> If the Developer objects, we are entitled to suspend the Developer’s
                  access to the particular Service and we may terminate the Agreement
                  extraordinarily with immediate effect or rea-sonable notice period. In any case we will take into
                  account the reasonable interest of the Developer.
                </p>
                <p class="paragraph c12">
                  <span class="c0">2.7.4.</span> Furthermore, We reserve the right to make changes to the Terms &amp;
                  Conditions So far as these are necessary to fill regulatory gaps or serve to
                  implement changes in the law, changes in court rulings or changed market conditions.
                </p>
              </div>
              <p class="paragraph sbold"><span class="c0">2.8.</span> Confidential information</p>
              <p class="paragraph">
                Each party will hold the other party’s confidential information in confidence and will use the same
                efforts to maintain the confidentiality of the other party’s confidential
                information as it uses to pro-tect its own confidential information of a similar nature, but in any
                event no less than reasonable efforts. Neither party shall disclose such
                confidential information to third parties nor use the other party’s confidential information for any
                purpose other than the purposes of this Agreement. Confi-dential information does
                not include information that: (a) is already known by the receiving party at time of disclosure; (b)
                becomes, through no act or fault of the receiving party, publicly known; (c) is
                received by the receiving party from a third party without a restriction on disclosure or use; or (d) is
                independently developed by the receiving party without reference to
                confidential information of the disclosing party. A party may disclose confidential information of the
                other party to the extent required to be disclosed by a court or governmental
                agency pursuant to a statute, regulation or valid order; provided that the receiving party first
                notifies the disclosing party and gives the disclosing party the opportunity to seek a
                protective order or to contest such required disclosure.
              </p>
              <p class="paragraph sbold"><span class="c0">2.9.</span> Additional provisions pertaining to Services for
                Developers</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c102">
                  <span class="c0">2.9.1.</span> All disputes arising out of or in connection with the Services for
                  Developers and this Agree-ment shall be governed by the laws of the country in which
                  the Developer resides.
                </p>
                <p class="paragraph c80">
                  <span class="c0">2.9.2.</span> All disputes arising out of or in connection with the Services for
                  Developers and this Agree-ment shall be finally settled under the Rules of
                  Arbitration of the International Chamber of Commerce (ICC) by one or more arbitrators appointed in
                  accordance with such Rules.
                </p>
                <p class="paragraph c51"><span class="c0">2.9.3.</span> With regard to the place of jurisdiction, the
                  provisions of the applicable law shall apply.</p>
                <p class="paragraph c12">
                  <span class="c0">2.9.4.</span> Any clause, provision, or portion of the Agreement found or ruled
                  invalid, void, illegal or oth-erwise unenforceable under any law or by any court or
                  in any other proceeding, shall be amended to the extent required to render it valid, legal and
                  enforceable, or deleted if no such amendment is feasible, and such amendment or
                  deletion shall not affect the enforceability of the other provisions hereof.
                </p>
                <p class="paragraph c12">
                  <span class="c0">2.9.5.</span> The parties agree that the Agreement is the complete and exclusive
                  statement of the agreement between the parties, which supersedes all prior
                  agreements, oral or written, and all other com-munications between the parties relating to the subject
                  matter of this Agreement.
                </p>
                <p class="paragraph c12">
                  <span class="c0">2.9.6.</span> These Terms &amp; Conditions govern the Developers’ use of or access to
                  our Services in addition to the Privacy Notice of Affinidi.
                </p>
              </div>
            </div>
            <p class="paragraph sbold"><span class="c10">3.</span> Affinidi Services towards Consumers</p>
            <div class="ms-md-5 ms-3">
              <p class="paragraph sbold"><span class="c0">3.1.</span> Subject Matter and Scope of Service</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c65">
                  <span class="c0">3.1.1.</span> Subject matter of this chapter 3 is the provision of a data vault to
                  Consumers enabling them to own, collect and store their data and selectively share
                  it with the Developers, and related ser-vices, in each case as set out in the respective Appendix and
                  as described in the service de-scriptions in the Appendices to the Terms &amp;
                  Conditions. The Consumer in this regard is any natural person who enters into the contract for
                  purposes that can predominantly be attributed neither to his or her commercial nor to
                  his or her independent professional activity.
                </p>
                <p class="paragraph c74">
                  <span class="c0">3.1.2.</span> By way of completing the order process regarding our Services and
                  accepting the Terms &amp; Conditions (including its Appendices), Consumer applies for
                  the agreement to the Services, which will only be concluded our acceptance of the Consumer’s offer
                  (“Agreement”). We are free to accept or deny the offer at our own discretion.
                </p>
                <p class="paragraph c24">
                  <span class="c0">3.1.3.</span> Any deviating terms of use expressly do not apply, even if reference is
                  made to their validity and We do not expressly object to them. Deviations from
                  these Terms &amp; Conditions require a contractual agreement in text form to be effective.
                </p>
                <p class="paragraph c24">
                  <span class="c0">3.1.4.</span> So far as the Services include the provision of copyrighted or
                  otherwise (e.g. as trade secret) legally protected content (e.g., software, software
                  components), We grant Consumer a world-wide, non-exclusive, non-transferable and non-sublicensable
                  right to use our Services or have it used in Consumer’s interest and under his/her
                  commission to the extent granted in and for the term of the Agreement (unless explicitly granted
                  differently between Us and Consumer by citing the deviation to this section 3.1.4 of
                  the Terms &amp; Conditions). The Consumer shall not reverse engineer, disassemble, decompile, or use
                  it to train any artificial intelligence model or application, except to the
                  extent permitted by applicable mandatory law.
                </p>
                <p class="paragraph c7"><span class="c0">3.1.5.</span> The use of our Services shall only be allowed
                  when Consumer is at least 18 years old.</p>
                <p class="paragraph c32">
                  <span class="c0">3.1.6.</span> While taking into consideration the reasonable interest of the Consumer
                  we shall be entitled to suspend any Services fully or in part for the Consumer
                  either when an applicable quota to the Service has been reached or we have reason to believe that the
                  Consumer’s use of the Service is not compliant with these Terms &amp; Conditions
                  or negatively effects our provision of Services to other Consumers or Developers. The Consumer may
                  request to reinstate the Ser-vices when and to the extent the reason for suspension
                  does not or not anymore exist.
                </p>
                <p class="paragraph c74">
                  <span class="c0">3.1.7.</span> All appendices to the Terms &amp; Conditions (“Appendices”) are
                  incorporated by reference and made an integral part of the Agreement. In the event of
                  conflicts or ambiguities between any provision of this Terms &amp; Conditions and the Appendices
                  hereto, the terms in this Terms &amp; Conditions shall take precedence and prevail
                  over the terms of the Appendices, unless and to the extent: (a) If it is explicitly stated otherwise
                  in this Terms &amp; Conditions and/or the Appen-dix, or (b) an Appendix
                  explicitly declares a specific provision of this Terms &amp; Conditions as not applicable (citing
                  requirement).
                </p>
              </div>
              <p class="paragraph sbold"><span class="c0">3.2.</span> Services for Consumers</p>
              <p class="paragraph">
                Our Services not only include one service or product but may include a number of respective ser-vices,
                products and deliverables that Consumer has applied for by way of our order
                process and that has been made part of the Agreement upon our acceptance and which may include(but not
                be lim-ited) the following:
              </p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c65"><span class="c0">3.2.1.</span> Affinidi Vault</p>
                <div class="ms-md-5 ms-4">
                  <p class="paragraph c65" style="padding-left: 65px">
                    <span class="c0">3.2.1.1.</span> To the extent Affinidi Vault has been made part of the Agreement,
                    the following applies: Affinidi Vault enables Consumer to discover, collect,
                    store, share, and monetise their data in a fragmented data world. It also enables consumer to log in
                    to websites, applica-tions and other services that have implemented Affinidi
                    Login (as defined in section 2.2.1. of the Terms &amp; Conditions) (“Participating Platforms”) using
                    Consumer’s data stored in the Affinidi Vault after one-time registration and
                    authentication, without hav-ing to go through a registration and login process each time, as would
                    otherwise be the case. We may also allow or make available other services for
                    verification either our-selves or through other third-party partners. This gives Consumer a single
                    identity on the basis of which Consumer can be identified and verified by all
                    Participating Platforms. A service description as well as the technical system requirements for
                    using Affinidi Vault are set out in Appendix 4.
                  </p>
                  <p class="paragraph c74" style="padding-left: 65px">
                    <span class="c0">3.2.1.2.</span> In order to use Affinidi Vault, Consumer shall either download the
                    Affinidi Vault’s Chrome Extension from the Chrome Web Store and then login to
                    the vault or login into Affinidi Vault directly @ www.vault.affinidi.com (accessible both via
                    desktop and/or mobile). The Consumer shall then register and authenticate. As part of
                    the registration process, Consumer receives a confirmation e-mail from Us. This e-mail contains a
                    con-firmation link. By clicking on this link, Consumer confirms his/her e-mail
                    address. The purpose of submission of the registration form constitutes Consumer’s declaration of
                    offer to conclude the Agreement on the use of Affinidi Vault. We accept this offer
                    by confirming Consumer’s registration by e-mail or by activating Consumer’s access to Affinidi Vault
                    after Consumer has submitted the registration form.
                  </p>
                  <p class="paragraph c24" style="padding-left: 65px">
                    <span class="c0">3.2.1.3.</span> Affinidi Vault may also be used by way of a mobile client, Affinidi
                    Mobile App as soon as we will make it available to the consumer. The
                    functionalities of the mobile app can include inter alia:
                  </p>
                  <ul>
                    <li>Set up a Affinidi Vault and secure it with a passphrase and/or biometrics</li>
                    <li>Access the profile page and fill, modify or delete the profile data</li>
                    <li>Authenticate on a website and share data from his Affinidi Vault</li>
                  </ul>
                  We may choose to limit the availability as well as the scope of functionalities of the Affinidi Mobile
                  App at our discretion for testing purposes. The Consumers and the De-velopers
                  who we will make it available to will be informed about the respective limitations.
                  <p></p>
                  <p class="paragraph c24" style="padding-left: 65px">
                    <span class="c0">3.2.1.4.</span> Affinidi Vault allows/may allow Consumer to discover, collect,
                    store, share, and mone-tise their data manage his/her data centrally. In this way,
                    Consumer can, for example, add to, correct and change his/her data. The Consumer assures that the
                    data provided by him/her, in particular his/her first and last name, address, date
                    of birth and e-mail ad-dress, are true and correct. The Company is not required to check or
                    authenticate the data included under the vault. Consumer’s data is exclusively for
                    Consumer‘s personal use and shall therefore be kept secret and secure at all times. The Consumer
                    shall inform Us immediately if he/she becomes aware of or suspect any unauthorised
                    use, disclosure and/or any misuse of his/her Affinidi Vault.
                  </p>
                  <p class="paragraph c7" style="padding-left: 65px">
                    <span class="c0">3.2.1.5.</span> In the event of misuse or suspected misuse, We are entitled to
                    immediately block access to Affinidi Vault with due consideration of Consumer’s
                    interests. The Consumer is liable for all consequences of the use by third parties, if he/she is
                    responsible for the misuse of the data. In particular, Consumer is responsible for
                    the misuse if he/she has made the unauthorised use of the access data possible, even if only
                    negligently. If the reasons for blocking access to Consumer cease to apply, We are
                    obliged to restore access to our Services.
                  </p>
                </div>
                <p class="paragraph c74"><span class="c0">3.2.2.</span> Affinidi Desktop App</p>
                <div class="ms-md-5 ms-4">
                  <p class="paragraph c65" style="padding-left: 65px">
                    <span class="c0">3.2.2.1.</span> To the extent Affinidi Desktop App has been made part of the
                    Agreement, the following applies: Affinidi Desktop App is an additional security tool
                    for the use of Affinidi Vault. Affinidi Desktop App enables Consumer to open Affinidi Vault in
                    Consumer’s browser, so that Affinidi Vault can only share Consumer’s data with
                    Participating Platforms if Consumer has previously unlocked Affinidi Vault in his/her browser by
                    entering his/her biometric data. The use of Affinidi Desktop App is not required
                    for the use of Affinidi Vault, it is only an add-on. A Service description as well as the technical
                    system require-ments for using Affinidi Desktop App are set out in Appendix 4.
                  </p>
                  <p class="paragraph c65" style="padding-left: 65px">
                    <span class="c0">3.2.2.2.</span> Section 3.2.1.5 of the Terms &amp; Conditions apply accordingly
                    also to the use of Affinidi Desktop App.
                  </p>
                </div>
              </div>
              <p class="paragraph sbold"><span class="c0">3.3.</span> Prices and Payment</p>
              <p class="paragraph">We provide our Services to Consumers free of charge.</p>
              <p class="paragraph sbold"><span class="c0">3.4.</span> Term and Termination</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c65"><span class="c0">3.4.1.</span> The term of this Agreement
                  (“<strong>Term</strong>”) is unlimited.</p>
                <p class="paragraph c74">
                  <span class="c0">3.4.2.</span> Notwithstanding the term and termination of this Agreement (section 5),
                  the Consumer may send a notice to Us to terminate the Service at any time,
                  whether in respect of all or only selected Services, and We will execute the request of the Consumer
                  to terminate the subscrip-tions within a period of thirty (30) days of receipt of
                  the request.
                </p>
                <p class="paragraph c24">
                  <span class="c0">3.4.3.</span> The right of Affinidi to terminate the Services for Consumers for good
                  cause shall remain unaffected. Good cause entitling Us to terminate the
                  Agreement exists in particular if Con-sumer has provided false and/or incomplete data during
                  registration and/or has not updated his/her registration data in the event of a
                  subsequent change and/or has disclosed his/her access data without authorisation and does not cease
                  such infringement within a reasonable period after warning by Us. Considering
                  Affinidi Is not storing any of the communication details of the Consumers and also considering the
                  privacy friendly design structure followed for provi-sion of Services, there is no
                  effective method available to inform the Consumers regarding the closure of the Services in advance.
                  However, Affinidi shall ensure to share communication regarding any other
                  critical information regarding the services on their website Affinidi.com as may be feasible.
                </p>
                <p class="paragraph c24"><span class="c0">3.4.4.</span> Upon expiry or termination of the Agreement, we
                  will cease to provide the Services to Consumer.</p>
                <p class="paragraph c7">
                  <span class="c0">3.4.5.</span> Without prejudice to the options to terminate the Agreement mentioned
                  above, we may cease to provide our Services in completely or in part at any time
                  and without stating reasons.
                </p>
              </div>
              <p class="paragraph sbold"><span class="c0">3.5.</span> Consumer`s Obligations</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c65">
                  <span class="c0">3.5.1.</span> Consumer shall be responsible for meeting the system requirements for
                  the implementation and use of the Services described in this Agreement.
                </p>
                <p class="paragraph c74">
                  <span class="c0">3.5.2.</span> Consumer shall remember his/her passphrase and keep it safe. We
                  currently do not provide any mechanisms to reset the passphrase. In this case, Consumer
                  must re-register and re-authenticate.
                </p>
              </div>
              <p class="paragraph sbold"><span class="c0">3.6.</span> Data Protection</p>
              <p class="paragraph">
                We are compliant with applicable data privacy laws, in particular the latest regulation in European
                Union law on Data Protection and Data Privacy, General Data Protection Regulation
                (GDPR), Data Protection Regulations of Singapore and Indian Data Protection Regulations. We are not
                responsible for the processing of Consumer's personal data on the Participating
                Platforms and by Developers respectively. In this regard, Consumer shall contact Developer. For the
                rest, We refer to our Privacy Notice
              </p>
              <p class="paragraph sbold"><span class="c0">3.7.</span> Modification of Services or of the Terms &amp;
                Conditions</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c65">
                  <span class="c0">3.7.1.</span> We reserve the right to change our Services (completely or in part) at
                  any time with effect for the future if this becomes necessary for good reasons,
                  Consumer is not placed in a significantly worse position by the change and the change is reasonable
                  for Consumer. Good reasons in-clude, for example, changes to the services of our
                  own contractual partners and the adaptation of our Services to technical innovations. Reasonable
                  reasons include, in particular, changes that do not significantly affect the
                  interests of Consumer or do not result in a significant re-striction of the scope of use of the
                  Services, e.g., the addition of additional functions or Services.
                </p>
                <p class="paragraph c74">
                  <span class="c0">3.7.2.</span> We will inform Consumer within a reasonable period of time of any
                  changes to these Terms &amp; Conditions and/or the scope of services that go beyond
                  the cases specified in section 3.7.1 We undertake to expressly inform Consumer of the respective
                  modifications by sending the mod-ified GTC and the consequences of not objecting to
                  these modifications.
                </p>
                <p class="paragraph c24"><span class="c0">3.7.3.</span> If Consumer objects, either party shall have the
                  right to terminate the Agreement by giving notice with immediate effect.</p>
                <p class="paragraph c24">
                  <span class="c0">3.7.4.</span> Furthermore, we reserve the right to make changes to the Terms &amp;
                  Conditions So far as these are necessary to fill regulatory gaps or serve to
                  implement changes in the law, changes in court rulings or changed market conditions.
                </p>
              </div>
              <p class="paragraph sbold"><span class="c0">3.8.</span> Additional Provisions with regard to Services for
                Consumers</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c65">
                  <span class="c0">3.8.1.</span> Section 3 and any and all rights and obligations arising from or in
                  connection with this part of the Agreement shall be governed by and construed in
                  accordance with the laws of the country in which the Consumer resides.
                </p>
                <p class="paragraph c74"><span class="c0">3.8.2.</span> With regard to the place of jurisdiction, the
                  provisions of the applicable law shall apply.</p>
                <p class="paragraph c24"><span class="c0">3.8.3.</span> These Terms &amp; Conditions govern your use of
                  or access to our Services in addition to the Privacy Notice of Affinidi.</p>
              </div>
            </div>
            <p class="paragraph sbold"><span class="c10">4.</span> Force Majeure</p>
            <p class="paragraph">
              We are not liable for any loss, damage or penalty resulting from delays or failures in performance if the
              delay or failure results from events beyond our reasonable control (a “Force
              Majeure Event”). Force Majeure Events shall include, but are not limited to, acts of God, war, hostility,
              invasion, act of foreign enemies, rebellion, revolution, riots, civil war,
              disturbances, requisitioning or other acts of civil or military authority, laws, regulations, acts or
              orders of any governmental authority, body, agency or official, fires, inclement
              weather, rain or floods (however caused), strikes, lock-outs or other labour disputes, epidemics,
              pandemics, outbreaks, embargoes, breakdown of equipment, plant or machinery (including,
              but not lim-ited to, data centre, telecommunications systems and utility services) or other catastrophe.
            </p>
            <p class="paragraph sbold"><span class="c10">5.</span> Term and Termination of the Agreement</p>
            <div class="ms-md-5 ms-3">
              <p class="paragraph c23">
                <span class="c0">5.1.</span> Notwithstanding the foregoing, the Developer as well as the Consumer may
                send a notice to the Company to terminate the Agreement at any time, whether in
                respect of all or only selected Services, and the Company shall execute the request of the Developer or
                Consumer to terminate the Services within a period of thirty (30) days of
                receipt of the request.
              </p>
              <p class="paragraph c93">
                <span class="c0">5.2.</span> The right of each party to terminate the Agreement in total or partly for
                good cause shall remain unaffected. Good cause entitling Us to terminate the
                Agreement exists in particular if the Developer infringes our rights of use by using our Services beyond
                the scope permitted under this Agreement and does not cease the infringement
                within a reasonable period after warning by Us.
              </p>
              <p class="paragraph c46">
                <span class="c0">5.3.</span> Upon expiry or termination of the Agreement, We will cease to provide
                Services to Developer. If the Agreement is terminated only with respect to single
                Services, we will cease to provide such Services. The Developer shall, within a reasonable time,
                specifically return or destroy all copy-righted or otherwise legally protected content
                (including CLI or software and software components) in his/her possession, and each party shall return
                all copies of the other party's confidential information.
              </p>
            </div>
            <p class="paragraph c26 sbold"><span class="c10">6.</span> Warranty and Liability</p>
            <p class="paragraph sbold">The following rules in section 6.1 to section 6.5.7 shall apply to all Consumers
              and Developers in any global jurisdiction:</p>
            <div class="ms-md-5 ms-3">
              <p class="paragraph c91">
                <span class="c0">6.1.</span> In case there is a reduction or discontinuation of our Services, you are
                not entitled to any warranty rights in this respect, unless We have fraudulently
                concealed a defect.
              </p>
              <p class="paragraph c48">
                <span class="c0">6.2.</span> Notwithstanding section 6.1 We shall not be responsible for our Services
                being fit for a particular purpose unless otherwise explicitly agreed upon.
              </p>
              <p class="paragraph c115">
                <span class="c0">6.3.</span> We shall not be responsible for any Consumer’s or Developer’s failure to
                comply with the technical requirements that they must meet under the Terms &amp;
                Conditions in order to use our Services and, in particular, to register or login on a respective Website
                or platform.
              </p>
              <p class="paragraph c75">
                <span class="c0">6.4.</span> Without prejudice to the provisions of section 6.1, We shall not be liable
                for the loss of Consumer’s or Developer’s data if this loss is due to Consumer’s
                or Developer's failure to back up data in ac-cordance with section 2.5.5 and thereby ensure that lost
                data can be restored with reasonable effort.
              </p>
              <p class="paragraph c106">
                <span class="c0">6.5.</span> To the maximum extent permitted by applicable law of the country of
                residence of the Consumer or Developer, we make no guarantee, representation or
                warranties of any kind, whether express or implied:
              </p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c97">
                  <span class="c0">6.5.1.</span> regarding the timeliness, reliability, accuracy, completeness,
                  accessibility, merchantability, quality, fitness for a particular purpose, currency,
                  correctness, operation or usefulness of any portion of the Services.
                </p>
                <p class="paragraph c67"><span class="c0">6.5.2.</span> regarding the availability or appropriateness of
                  the Services.</p>
                <p class="paragraph c33">
                  <span class="c0">6.5.3.</span> that Services will be error-free, continuously available or
                  uninterrupted in operation, un-hack-able, uncompromisable, free of any data breach
                  (inadvertently or intentionally through inter-ference or interception by third parties) or free of
                  bugs, computer viruses, unauthorised soft-ware, or other harmful codes or
                  components not specifically mentioned herein.
                </p>
                <p class="paragraph c59">
                  <span class="c0">6.5.4.</span> that the Services will not be susceptible to any cybersecurity breach
                  or cannot be compromised and/or free of any data breach (inadvertently or
                  intentionally through interference or interception by third parties);
                </p>
                <p class="paragraph c2"><span class="c0">6.5.5.</span> that the Services will contain information that
                  is always timely and accurate;</p>
                <p class="paragraph c2"><span class="c0">6.5.6.</span> that Services will operate or function properly
                  on your devices or operating systems; or;</p>
                <p class="paragraph c2"><span class="c0">6.5.7.</span> that Services will not cause any damage to your
                  devices or operating systems.</p>
              </div>
            </div>
            <p class="paragraph sbold">The following rules in section 6.6 shall only be applicable to Consumers and the
              Developer residing in Germany:</p>
            <div class="ms-md-5 ms-3">
              <p class="paragraph c106">
                <span class="c0">6.6.</span> Notwithstanding anything contained herein, with respect to the
                Developers/Consumers in Germany, apart from warranties specified under sections 6.1, 6.2 and
                6.3 We are liable without limitation for intent or gross negligence, for injury to life, limb or health,
                in accordance with the provisions of the German Product Liability Act and to
                the extent of a guarantee assumed by Us. In the event of a slightly negligent breach of an obligation
                that is essential for achieving the purpose of the Agreement (cardinal
                obligation), Our liability is limited to the amount of the damage that is foreseeable and typical
                according to the type of contract in question here. Apart from that, any of Our
                liability to-wards the Developers/Consumers in Germany is excluded.
              </p>
            </div>
            <p class="paragraph sbold">
              The following rules in section 6.7 to section 6.9 shall only apply (and in deviation of the rules in
              section 6.1 to section 6.6) to Consumer and the Developer who are not subject to the
              jurisdiction in Germany:
            </p>
            <div class="ms-md-5 ms-3">
              <p class="paragraph c106"><span class="c0">6.7.</span> Your use of the Services is voluntary and at your
                sole risk. You are solely responsible for:</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c97"><span class="c0">6.7.1.</span> your use and reliance on the Services and the
                  information available through the Services;</p>
                <p class="paragraph c67"><span class="c0">6.7.2.</span> any liability, loss or damage that you may incur
                  through use of the Services; and</p>
                <p class="paragraph c33"><span class="c0">6.7.3.</span> all decisions or actions resulting from your use
                  of the Services and the contents of the Services.</p>
              </div>
              <p class="paragraph c106">
                <span class="c0">6.8.</span> To the maximum extent permitted by applicable law, we shall not be liable,
                in any circumstances or legal theories whatsoever, for any damage or loss of any
                kind, any consequential, incidental, special or indirect damages of any character, loss of data, loss of
                business, loss of profits or goodwill, inter-ruption of business, costs,
                expenses or claims of any nature whatsoever, even if we are aware of the risk of such damages:
              </p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c97">
                  <span class="c0">6.8.1.</span> That you may incur as a result of your use, access or reliance on the
                  Services (or any information, data or statement found thereon):
                </p>
                <p class="paragraph c67">
                  <span class="c0">6.8.2.</span> that you may incur as a result of your dealing with a third-party
                  service provider /Con-sumer or any another user through the Services:
                </p>
                <p class="paragraph c33"><span class="c0">6.8.3.</span> resulting from the performance of the Services
                  or any delay or failure thereof:</p>
                <p class="paragraph c97"><span class="c0">6.8.4.</span> arising out of or in connection with any
                  unauthorised access to your account:</p>
                <p class="paragraph c67">
                  <span class="c0">6.8.5.</span> resulting from any delay in operation or transmission, communication
                  failure, Internet access difficulties or malfunction of equipment or software:
                </p>
                <p class="paragraph c33"><span class="c0">6.8.6.</span> the conduct or the views of any person who
                  accesses or uses Services; and/or:</p>
                <p class="paragraph c33"><span class="c0">6.8.7.</span> arising out of or in connection with any
                  suspension or termination of your access to the Services.</p>
              </div>
              <p class="paragraph c106">
                <span class="c0">6.9.</span> In the event that we are found liable to you for any reason, our liability
                to you shall not, for any reason, exceed S$1000 (Singapore Dollars one thousand
                only). This limitation in this Clause applies to all causes of action in the aggregate including,
                without limitation, breach of contract, breach of warranty, negligence, strict
                liability, misrepresentations and other torts. In any jurisdiction in which these limitations of
                liability are restricted, our liability is limited to the greatest extent permitted by
                law.
              </p>
            </div>
            <p class="paragraph c100 sbold"><span class="c10">7.</span> Indemnity (not applicable to Consumer/Developer
              in Germany)</p>
            <div class="ms-md-5 ms-3">
              <p class="paragraph c99">
                <span class="c0">7.1.</span> To the fullest extent permitted under law, you agree to indemnify us, our
                parents, subsidiaries, affil-iates, directors, officers, shareholders, employees,
                agents, sub-contractors and licensors (collectively the “Indemnified Persons”) in respect of any and all
                claims, losses, damages, expenses (including legal costs on a full indemnity
                basis), or liabilities (whether criminal or civil) and costs of settlement suffered or incurred by the
                Indemnified Persons or asserted against them in respect of:
              </p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c97"><span class="c0">7.1.1.</span> Your access, use of, or conduct in connection
                  with the Services;</p>
                <p class="paragraph c67">
                  <span class="c0">7.1.2.</span> any application that you develop in connection with your access to or
                  use of the Services that infringes any intellectual property right of any person
                  or violates their privacy rights;
                </p>
                <p class="paragraph c33"><span class="c0">7.1.3.</span> any breach by you of any of the Terms &amp;
                  Conditions;</p>
                <p class="paragraph c59"><span class="c0">7.1.4.</span> your misuse of the Services;</p>
                <p class="paragraph c2">
                  <span class="c0">7.1.5.</span> any content sent or received by you (as a Developer/Consumer or
                  received by the Developer from the Consumers) through the Services;
                </p>
                <p class="paragraph c33"><span class="c0">7.1.6.</span> any dispute between you and a third party or
                  another user of the Services;</p>
                <p class="paragraph c59">
                  <span class="c0">7.1.7.</span> the occurrence of any event due to your act, omission or default which
                  comprises the security or integrity of the Services or its contents; and/or;
                </p>
                <p class="paragraph c2">
                  <span class="c0">7.1.8.</span> your violation of any applicable law or the rights (including but
                  without limitation to intellec-tual property rights and privacy rights) of any other
                  person or entity.
                </p>
              </div>
              <p class="paragraph c17"><span class="c0">7.2.</span> This section 7 shall not be applicable to the
                residents of Germany.</p>
            </div>
            <p class="paragraph sbold"><span class="c0">8.</span> Applicable Laws with respect to Developers and
              Consumers residing outside Germany</p>
            <div class="ms-md-5 ms-3">
              <p class="paragraph c17"><span class="c0">8.1.</span> Use of the Services are governed by the laws of
                Singapore, without reference to conflicts of laws rules.</p>
              <p class="paragraph c52">
                <span class="c0">8.2.</span> Parties submit to the non-exclusive jurisdiction of the courts of Singapore
                in relation to all disputes and any claim relating to use of the Services or
                under the Terms &amp; Conditions.
              </p>
            </div>
            <p class="paragraph sbold"><span class="c0">9.</span> Representations and Warranties with reference to
              Developers and Consumers residing outside the European Union</p>
            <div class="ms-md-5 ms-3">
              <p class="paragraph c17"><span class="c0">9.1.</span> By accessing and using the Services, you represent,
                undertake and warrant that:</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph c97"><span class="c0">9.1.1.</span> you have full capacity and authority to (and do)
                  accept and agree to the Terms &amp; Conditions;</p>
                <p class="paragraph c67"><span class="c0">9.1.2.</span> you have not previously been suspended or
                  prohibited from using the Services;</p>
                <p class="paragraph c33">
                  <span class="c0">9.1.3.</span> you will comply with all applicable laws and regulations with respect
                  to your activities on and in connection with the Services; and
                </p>
                <p class="paragraph c59"><span class="c0">9.1.4.</span> you will comply with all applicable security or
                  encryption standards, rules, procedures and guidelines.</p>
              </div>
            </div>
            <p class="paragraph">
              <span class="c0">10.</span> You will provide all support, information and assistance necessary for us or
              our authorised representatives to conduct investigations, audits or inspections
              for the purpose of ensuring proper compliance with the Terms &amp; Conditions or our legal or regulatory
              obligations, without any cost to us. <strong>Appendices</strong>
            </p>
            <p class="paragraph"><strong>Appendix 1:</strong> Service description and system requirements for Affinidi
              Login</p>
            <p class="paragraph"><strong>Appendix 2:</strong> Service description and system requirements for Affinidi
              Portal</p>
            <p class="paragraph"><strong>Appendix 3:</strong> Service description and system requirements for Affinidi
              CLI</p>
            <p class="paragraph"><strong>Appendix 4:</strong> Service description and system requirements for Affinidi
              Vault</p>
            <p class="paragraph"><strong>Appendix 5:</strong> Service description and system requirements for Affinidi
              Mobile App (Beta)</p>
            <br />
            <br />
            <br />
            <p class="text-center"><strong>Appendix 1</strong></p>
            <p class="text-center"><strong>Service Description and System Requirements for Affinidi Login</strong></p>
            <p class="paragraph sbold"><span class="c0">1.</span> Service Description</p>
            <p>
              Affinidi Login enables Developers to adopt passwordless authentication flows for their applications with
              de-centralised identity controlled by Consumers. With Affinidi Login, Developers
              are no longer burdened with collecting user information during registration. Instead, the Consumer’s first
              sign-in doubles as their registra-tion, and all the necessary data for
              onboarding can be requested during this streamlined sign- in/signup process. The data obtained through
              Affinidi Login is verifiable, eliminating the need for traditional measures like
              'for-got password' or 'validate your email address' or 'validate your phone.' For Consumers, Affinidi
              Login gives full control, ensuring that they consent to the information shared in a
              transparent and user-friendly manner. This streamlined approach empowers Developers to create efficient
              user experiences with data integrity, en-hances security and privacy and ensures
              compatibility with industry standards, such as OID4VP (Open ID for Verifiable Presentations) which ensures
              the verification of user authenticity without the need for direct
              com-munication with the issuer, reducing the risk of tampering and ensuring data integrity.
            </p>
            <p class="paragraph sbold"><span class="c0">2.</span> System Requirements</p>
            <p>
              Affinidi Login can be integrated with applications that support OIDC (OpenID Connect) standard which is an
              interoperable authentication protocol based on the OAuth 2.0 framework of
              specifications (IETF RFC 6749 and 6750). It simplifies the way to verify the identity of Consumers in a
              standardised manner and to obtain Consumer profile information using an
              interoperable API.
            </p>
            <p>
              While Affinidi may provide ready to use libraries and SDKs for specific programming languages or
              frame-works for seamless integration with Affinidi Login, it doesn’t limit the usage or
              integration of Affinidi Login within applications that are built with other programming languages, if
              those applications are compatible with OIDC standard. However, both Developers and
              Consumers will need Affinidi Vault to use Affinidi Login from any application it was integrated into,
              hence certain limitations may apply to those Consumers depending on their browsers,
              device or operating system (see System Requirements for Affinidi Vault). In order to use Affinidi Login,
              also Developers need Affinidi Vault.
            </p>
            <br />
            <br />
            <br />
            <p class="text-center"><strong>Appendix 2</strong></p>
            <p class="text-center"><strong>Service Description and System Requirements for Affinidi Portal</strong></p>
            <p class="paragraph sbold"><span class="c0">1.</span> Service Description</p>
            <div class="ms-md-5 ms-3">
              <p class="paragraph">
                <span class="c0">a)</span> Affinidi Portal is a web application designed to streamline developers'
                interactions with Affinidi Services, offering a user-friendly interface for
                accessing, configuring, and tracking various Affinidi offerings. This portal simplifies the integration
                process, allowing developers to harness the full po-tential of Affinidi Services
              </p>
              <p class="paragraph">
                <span class="c0">b)</span> Developers can log in to the Affinidi ecosystem using Affinidi Login which
                requires them to share their verified email address from the Affinidi vault. On
                the first login, a default project will be created for the Developer. Under projects, Developers can
                configure different Affinidi services (Affinidi Login etc.). They will be able to
                seamlessly access the Projects and service configured within the projects through the Portal. The
                Developers will also be able to track the usage of the services and manage their
                accounts from the Portal. The Developers would be able to seek customer support using the Developer
                Portal.
              </p>
              <p class="paragraph">
                <span class="c0">c)</span> Affinidi Portal empowers Developers with the tools they need to efficiently
                manage projects, config-ure services, access documentation, monitor usage and
                manage their accounts. With a commitment to user-friendly design and robust functionality, Affinidi
                Portal is the gateway to unlocking the full potential of Affinidi Services for
                Developers
              </p>
              <p class="paragraph">
                <span class="c0">d)</span> To gain access to Affinidi Portal, Developers utilize the secure Affinidi
                Login, which requires them to share their email address from their Affinidi Vault.
                The unique User Decentralized Identifier (DID), created during the Affinidi Vault setup, serves as the
                Developer's identifier within the portal. Prior to accessing the portal,
                Developers must complete the Affinidi Vault setup
              </p>
            </div>
            <p class="paragraph sbold"><span class="c0">2.</span> System Requirements for Affinidi Portal</p>
            <div class="ms-md-5 ms-3">
              <p class="paragraph"><span class="c0">a)</span>Browser:</p>
              <div class="ms-md-5 ms-3">
                <p class="paragraph"><span class="c0">i.</span> Microsoft Windows 10 or newer: Google Chrome (latest
                  stable version)</p>
                <p class="paragraph"><span class="c0">ii.</span> MacOS 10.15 or newer: Google Chrome (latest stable
                  version)</p>
              </div>
              <p class="paragraph"><span class="c0">b)</span>Browser Configuration:</p>
              <div class="ms-md-5 ms-3">
                <p class="paragraph"><span class="c0">i.</span> JavaScript is enabled</p>
                <p class="paragraph"><span class="c0">ii.</span> Technically required Cookies are enabled</p>
              </div>
            </div>
            <br />
            <br />
            <br />
            <p class="text-center"><strong>Appendix 3</strong></p>
            <p class="text-center"><strong>Service Description and System Requirements for Affinidi CLI</strong></p>
            <p class="paragraph sbold"><span class="c0">1.</span> Service Description</p>
            <div class="ms-md-5 ms-3">
              <p class="paragraph">
                <span class="c0">a)</span> Affinidi CLI is a tool designed for Developers to seamlessly access,
                configure, and track Affinidi Services through a command-line interface (CLI).
                Leveraging the Node Package Manager (NPM), Developers can easily import Affinidi CLI and kick-start
                their journey with Affinidi Services. Af-finidi CLI empowers Developers to
                efficiently interact with Affinidi Services through a simple and convenient command-line interface.
                Whether creating Projects, configuring login options, or manag-ing user groups,
                Affinidi CLI streamlines the process for Developers working with Affinidi services.
              </p>
              <p class="paragraph">
                <span class="c0">b)</span> After installation, Developers can use the Affinidi start command to log in
                to the Affinidi ecosystem. On the first login, a default project will be created
                for the Developer. The Developer is required to share their email address from the Affinidi Vault. A
                User DID is generated during the Affinidi Vault creation and serves as the
                Developer's identifier. If the Developer has not set up the Affinidi Vault, they will be guided through
                the Affinidi Vault setup process.
              </p>
            </div>
            <p class="paragraph sbold"><span class="c0">2.</span> System Requirements</p>
            <div class="ms-md-5 ms-3">
              <p class="paragraph"><span class="c0">a)</span>git</p>
              <p class="paragraph"><span class="c0">b)</span>NodeJS v18 or higher (it is recommended to use nvm)</p>
              <p class="paragraph"><span class="c0">c)</span>A chromium based browser (Chrome, Brave, etc.) as your
                default browser</p>
              <p class="paragraph"><span class="c0">d)</span>Affinidi Vault</p>
              <p class="paragraph"><span class="c0">e)</span>Valid Email ID in order to receive the OTP</p>
            </div>
            <br />
            <br />
            <br />
            <p class="text-center"><strong>Appendix 4</strong></p>
            <p class="text-center"><strong>Service Description and System Requirements for Affinidi Vault</strong></p>
            <p class="paragraph sbold"><span class="c0">1.</span> Service Description</p>
            <div class="ms-md-5 ms-3">
              <p class="paragraph">
                <span class="c0">a)</span> Affinidi Vault empowers Consumers with a “360-degree view of oneself”,
                allowing them to own, collect, store and share their data in a manner that aligns with
                their preferences and values. By using Affinidi Vault, Consumers can securely manage their personal
                data, benefit from passwordless au-thentication, have the choice of storing their
                data based on their preferences and share data in a pri-vacy-enabled and consent-driven manner.
              </p>
              <p class="paragraph">
                <span class="c0">b)</span> Affinidi Vault enhances the sign-in and sign-up process. There is no longer a
                need to collect infor-mation during registration. The Consumer’s first sign-in
                serves as registration, and onboarding data can be requested then. All data obtained through is
                verifiable, eliminating the need for cumbersome validation. Regarding Privacy-Enabled
                Data Sharing, Affinidi Vault leverages decentralised technol-ogies, such as verifiable credentials, to
                enable privacy-enabled data sharing. During the Affinidi Vault setup, a unique
                User Decentralized Identifier (DID) is created that serves as the Consumer’s identifier.
              </p>
              <p class="paragraph"><span class="c0">c)</span> Within the Affinidi Vault, the user will be able to:</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph">
                  <span class="c0">i.</span> Set up a vault by either a) going/being redirected to
                  www.vault.affinidi.com , through either desktop/mobile web app or b) by downloading the corresponding
                  Chrome Extension from the Chrome Web Store and then logging into the vault ;and in both cases secure
                  Affinidi Vault with a passphrase.
                </p>
                <p class="paragraph">
                  <span class="c0">ii.</span> In case the Developer/Consumer is using the Chrome extension the vault can
                  also be secured with biometrics. (The biometric unlocking method is an
                  effective way to secure the Affinidi Vault and the data stored therein while being convenient and fast
                  for the Consumer, improving their experience and eliminating the need to
                  manually entering their passphrase every time their Affinidi Vault is locked).
                </p>
                <p class="paragraph"><span class="c0">iii.</span> Access the profile page and fill, modify or delete the
                  profile data</p>
                <p class="paragraph"><span class="c0">iv.</span> While using the Vault through a Chrome Extension, To
                  perform a Liveness Check as a proof of being a living person</p>
                <p class="paragraph"><span class="c0">v.</span> Authenticate on a Website and share the data from his
                  vault</p>
                <p class="paragraph"><span class="c0">vi.</span> Depending on the type of device the vault is created,
                  the data is stored in the respective device storage</p>
                <p class="paragraph">
                  <span class="c0">vii.</span> While using web app - @ www.vault.affinidi.com or the mobile
                  app(Android), the user is also provided an option to back up and restore their data from the
                  cloud wherein the user can upload a backup of his vault into the cloud and then restore it with a
                  backup ID and his current pass-phrase
                </p>
              </div>
              <p class="paragraph"><span class="c0">d)</span> With regards to the cloud backup:</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph"><span class="c0">i.</span> The user can select the option from the settings menu in
                  the vault</p>
                <p class="paragraph">
                  <span class="c0">ii.</span> Once the user selects the option to back up their vault on the cloud, the
                  user is required to use their passphrase to initiate the process
                </p>
                <p class="paragraph">
                  <span class="c0">iii.</span> Once the process is initiated, the user would receive a “Backup-id” on
                  this email specified in the vault. This would be unique id assigned to the user
                  for restoring vault from cloud back-up
                </p>
                <p class="paragraph"><span class="c0">iv.</span> This backup id along with the passphrase would be
                  required to be used for restoring the cloud backup</p>
              </div>
              <p class="paragraph"><span class="c0">e)</span> In regards of the Liveness Check:</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph">
                  <span class="c0">i.</span> The liveness check is a feature designed to ensure that a live person is
                  interacting with the ap-plication, as opposed to an automated process like a bot
                  or a static image
                </p>
                <p class="paragraph">
                  <span class="c0">ii.</span> During the liveness check, the user receives a prompt instructing them to
                  show their face to the camera. The application analyses the data to determine
                  whether the user face is consistent with live behaviour. This may involve assessing movement, changes
                  in facial features, or other dy-namic elements
                </p>
                <p class="paragraph"><span class="c0">iii.</span> When authenticating into a website, the user can be
                  asked to share this information as a proof of humanhood</p>
              </div>
              <p class="paragraph"><span class="c0">f)</span> In regards of the Affinidi Desktop App:</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph">
                  <span class="c0">i.</span> Affinidi Desktop App enables the use of biometrics on Consumer’s desktop
                  equipment in order to unlock the Affinidi Vault. This app is intended to be used
                  only as an add-on for the Affinidi Vault as an additional layer of security. After downloading the
                  Affinidi Desktop App, the Con-sumer will pair it with the Affinidi Vault. The
                  biometric unlocking method is an effective way to secure the Affinidi Vault and the data stored
                  therein while being convenient and fast for the Consumer, improving their experience
                  and eliminating the need to manually entering their passphrase every time their Affinidi Vault is
                  locked
                </p>
              </div>
              <p class="paragraph"><span class="c0">g)</span> Any other new feature that may be introduced by us to the
                users of the vault</p>
            </div>
            <p class="paragraph sbold"><span class="c0">2.</span> System Requirements</p>
            <div class="ms-md-5 ms-3">
              <p class="paragraph"><span class="c0">a)</span> Browser for Chrome Extension:</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph"><span class="c0">i.</span> Microsoft Windows 10 or newer: Google Chrome (latest
                  stable version)</p>
                <p class="paragraph"><span class="c0">ii.</span> MacOS 10.15 or newer: Google Chrome (latest stable
                  version)</p>
              </div>
              <p class="paragraph"><span class="c0">b)</span> For Desktop App</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph">
                  <span class="c0">i.</span> Passcode/Biometrics device protection is enabled- users won’t be able to
                  use or pair Desktop App in case biometrics and account password are not set on the
                  system of the user.
                </p>
              </div>
              <p class="paragraph"><span class="c0">c)</span> For Wep App</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph"><span class="c0">i.</span> For the best experience we recommend using Google Chrome
                  browser</p>
                <p class="paragraph"><span class="c0">ii.</span> Other browsers that can be used:</p>
                <div class="ms-md-5 ms-4">
                  <p class="paragraph"><span class="c0">(1)</span> Safari</p>
                  <p class="paragraph"><span class="c0">(2)</span> Firefox</p>
                  <p class="paragraph"><span class="c0">(3)</span> Opera</p>
                  <p class="paragraph"><span class="c0">(4)</span> Edge</p>
                </div>
              </div>
              <p class="paragraph"><span class="c0">d)</span> JavaScript is enabled</p>
            </div>
            <br />
            <br />
            <br />
            <p class="text-center"><strong>Appendix 5</strong></p>
            <p class="text-center"><strong>Service Description and System Requirements for Affinidi Mobile App
                (Beta)</strong></p>
            <p class="paragraph sbold"><span class="c0">1.</span> Service Description</p>
            <div class="ms-md-5 ms-3">
              <p class="paragraph">
                <span class="c0">a)</span> Affinidi Vault Mobile App is the mobile client of the Affinidi Vault. It
                allows consumers to own, collect, store, and share their data in a manner that
                aligns with their pref-erences and values. By using the mobile app, Consumers can securely manage their
                personal data, benefit from passwordless authentication, have the choice of
                storing their data based on their prefer-ences and share data in a privacy-enabled and consent-driven
                manner
              </p>
              <p class="paragraph"><span class="c0">b)</span> The mobile app allows the user to:</p>
              <div class="ms-md-5 ms-4">
                <p class="paragraph"><span class="c0">i.</span> Set up a vault and secure it with a passphrase and/or
                  biometrics</p>
                <p class="paragraph"><span class="c0">ii.</span> Access the profile page and fill, modify or delete the
                  profile data</p>
                <p class="paragraph"><span class="c0">iii.</span> Authenticate on a website and share data from his
                  vault</p>
              </div>
            </div>
            <p class="paragraph sbold"><span class="c0">2.</span> System Requirements</p>
            <p class="paragraph">Android OS Version: V.6.0 or higher</p>
          </article>
        </div>
      </section>
      <button
        class="absolute bottom-4 left-1/2 aspect-square -translate-x-1/2 rounded-full bg-slate-100 px-3 py-0.5 text-2xl shadow-md"
        @click="autoScroll">↓</button>
    </External>
  </Container>
</template>

<style scoped>
@import '@/assets/css/policy.css';

.policy-section {
  height: 100%;
  overflow-y: scroll;
  background-color: #eeeeeeb2;
}
</style>
