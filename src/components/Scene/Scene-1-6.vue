<script setup lang="ts">
import { onBeforeUnmount, onUnmounted, ref, watch } from 'vue'
import { External } from 'vue3-pixi'

import { useGameStore } from '@/stores/game'
import Modal from '@/components/Modal.vue'
import { useScroll, useTimeoutFn } from '@vueuse/core'

const gameStore = useGameStore()

const targetElem = ref<HTMLParagraphElement | null>(null)
const { arrivedState, y } = useScroll(targetElem, { behavior: 'instant' })

let interval: any

function handleMove() {
  gameStore.nextScene()
}

function autoScroll() {
  interval = setInterval(() => {
    y.value += 2000
  }, 75);
}

watch(() => arrivedState.bottom, (value) => {
  if (value) {
    clearInterval(interval)
    useTimeoutFn(handleMove, 3000)
  }
})

onBeforeUnmount(() => {
  if (interval)
    clearInterval(interval)
})
</script>

<template>
  <External class="absolute top-0 left-0 w-dvw h-dvh">
    <Modal title="Terms and Conditions <br/> for Affinidi Services" container-class="pt-0 pb-4 gap-0">
      <p ref="targetElem" class="w-full overflow-auto my-2">
      <h1 style="padding-top: 3pt;text-indent: 0pt;text-align: center;">
      </h1>
      <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
      <p class="s1" style="padding-left: 5pt;text-indent: 0pt;text-align: left;">Version 2.2 - May 2024</p>
      <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
      <ol id="l1">
        <li data-list-text="1.">
          <h2 style="padding-left: 23pt;text-indent: -17pt;text-align: left;">Preamble</h2>
          <p style="padding-top: 3pt;text-indent: 0pt;text-align: left;"><br /></p>
          <p style="padding-left: 23pt;text-indent: 0pt;line-height: 120%;text-align: justify;">Affinidi Pte. Ltd.,
            a private limited company, incorporated in Singapore and having its registered office address at 83
            Clemenceau Avenue, Singapore 239920 (“<b>Affinidi</b>” and / or “<b>We</b>” and / or “<b>Us</b>”) is a
            com- pany in the field of information technology. One of our key services is the provision of a data
            vault called Affinidi Vault, allowing end users (“<b>Consumer</b>”) to own, collect and store their data
            and selectively share it with participating website and app operators (“<b>Developer</b>”) in a
            privacy-enabled and consent-driven manner. In order to do so, We enable the Developer to implement a
            login system called Affinidi Login for his/her services, allowing Consumer to log in with his/her data
            stored in the Affinidi Vault. In this way, We allow the Developer to use authentication processes with
            decentralized data storage without having to collect data from Consumer during the login or registration
            process. In this regard, We offer various services and products to the Developer as well as to Consumer,
            each of which is subject to these Terms and Conditions (“<b>Terms &amp; Conditions</b><a href="#bookmark0"
              class="s2">”). Section </a><a href="#bookmark8" class="s2">2 of the Terms &amp;
              Conditions shall apply to services and products we offer to the Developers. Section </a><a
              href="#bookmark13" class="s2">3 of the Terms &amp; Conditions shall apply to services and products we
              offer to the Consumer. While Sections </a><a href="#bookmark14" class="s2">4, </a><a href="#bookmark23"
              class="s2">5, </a><a href="#bookmark24" class="s2">7, </a><a href="#bookmark25" class="s2">8 and </a><a
              href="#bookmark0" class="s2">9 of the Terms &amp; Conditions contains
              partially deviating and / or supplementary provisions to Sections </a><a href="#bookmark8" class="s2">2
              and 3.</a></p>
          <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
        </li>
        <li data-list-text="2.">
          <h2 style="padding-left: 23pt;text-indent: -17pt;text-align: left;"><a name="bookmark0">&zwnj;</a>Affinidi
            Services towards Developer(s)</h2>
          <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
          <ol id="l2">
            <li data-list-text="2.1.">
              <h2 style="padding-left: 44pt;text-indent: -21pt;text-align: left;">Subject Matter and Scope of
                Service</h2>
              <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
              <ol id="l3">
                <li data-list-text="2.1.1.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;"><a
                      href="#bookmark3" class="s2">Subject matter of the Terms &amp; Conditions is the provision of
                      our services and products accord- ing to sections </a><a href="#bookmark10" class="s2">2.2
                      &amp; </a>3.2 respectively and as described in the service descriptions in the appen- dices to
                    the Terms &amp; Conditions and any other products or services offered by us (collectively
                    &quot;<b>Services</b>&quot;).</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.1.2.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">By way of
                    completing the order process regarding our Services and accepting the Terms &amp; Conditions
                    (including its appendices), the Developer applies for the agreement to the Services, which will
                    only be concluded by our acceptance of Developer’s offer (hereinafter: “<b>Agree- ment</b>”). We
                    are free to accept or deny the offer at our own discretion.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.1.3.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;"><a
                      href="#bookmark0" class="s2">We offer our Services according to section </a>2 to Developers,
                    defined as a natural or legal person who, at the time of concluding this Term and Conditions, is
                    acting in the exercise of his/her commercial or professional activity. In case of any amendment
                    to these Terms and Conditions, they shall be required to be agreed in writing between the
                    Parties.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.1.4.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;"><a
                      href="#bookmark1" class="s2" name="bookmark1">Insofar as the Services include the provision of
                      copyrighted or otherwise (e.g. as trade secret) legally protected content (e.g. software,
                      software components, CLIs), We grant the Developer a worldwide, non-exclusive,
                      non-transferable and non-sub licensable right to use the content or have it used in
                      Developer’s interest and under its commission to the extent granted in and for the term of the
                      Agreement (unless explicitly granted differently between Us and the Devel- oper by citing the
                      deviation to this section </a>2.1.4 of the Terms &amp; Conditions). The Developer shall not
                    transfer the content to third parties in particular, he/she shall not sell, lend, rent or
                    publicly reproduce the content or make it accessible. The Developer shall not reverse engi-
                    neer, disassemble, decompile, except to the extent permitted by applicable mandatory law, or use
                    it to train any artificial intelligence model or application.</p>
                </li>
                <li data-list-text="2.1.5.">
                  <p
                    style="padding-top: 3pt;padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">
                    <a name="bookmark2">&zwnj;</a>Insofar as our Services contain open-source software
                    (“<b>OSS</b>”) components, the use of these components is exclusively subject to the
                    corresponding terms and conditions of the respective OSS. No provision of the Terms &amp;
                    Conditions shall affect the rights or obligations of the De- veloper under the corresponding
                    terms and conditions of the OSS. In the event of contradic- tions or conflicting provisions
                    between the license terms of the OSS and the provisions of the Terms &amp; Conditions, the
                    license terms of the OSS shall take precedence.
                  </p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.1.6.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">All
                    appendices to the Terms &amp; Conditions (“<b>Appendices</b>”) are incorporated by reference and
                    made an integral part of the Agreement. In the event of conflicts or ambiguities between any
                    provision of this Terms &amp; Conditions and the Appendices hereto, the terms in this Terms
                    &amp; Conditions shall take precedence and prevail over the terms of the Appendices, unless and
                    to the extent: (a) If it is explicitly stated otherwise in this Terms &amp; Conditions and/or
                    the Appen- dix, or (b) an Appendix explicitly declares a specific provision of this Terms &amp;
                    Conditions as not applicable (citing requirement).</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
            <li data-list-text="2.2.">
              <h2 style="padding-left: 44pt;text-indent: -21pt;text-align: left;"><a name="bookmark3">&zwnj;</a>Services
              </h2>
              <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
              <p style="padding-left: 45pt;text-indent: 0pt;line-height: 122%;text-align: justify;">Our Services do
                not only include one service or product but may include a number of respective services, products
                and deliverables that the Developer has applied for by way of our order process and that has been
                made part of the Agreement upon our acceptance and which may include but not be limited to the
                following:</p>
              <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
              <ol id="l4">
                <li data-list-text="2.2.1.">
                  <p class="s3" style="padding-left: 66pt;text-indent: -25pt;text-align: left;"><a
                      name="bookmark4">&zwnj;</a>Affinidi Login</p>
                  <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
                  <ol id="l5">
                    <li data-list-text="2.2.1.1.">
                      <p style="padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: justify;"><a
                          name="bookmark5">&zwnj;</a>To the extent that Affinidi Login has been made part of the
                        Agreement, We enable the Developer to use an authentication method with decentralized data
                        storage on his/her website or app so that the Developer does not need to collect data
                        directly from Con- sumer while Consumer is logging in or registering on Developer&#39;s
                        website or app. A service description as well as the technical system requirements for using
                        Affinidi Login are set out in <b>Appendix 1.</b></p>
                      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                    </li>
                    <li data-list-text="2.2.1.2.">
                      <p style="padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: justify;"><a
                          href="http://www/" class="s2" target="_blank">In order to be able to use Affinidi Login,
                          the Developer needs to login through Affinidi Vault and register and authenticate by
                          downloading the Affinidi Vault Chrome extension from the Chrome Web Store or accessing the
                          Affinidi Vault @ </a><a href="http://vault.affinidi.com/" class="s2"
                          target="_blank">www.vault.affinidi.com</a></p>
                      <p style="padding-left: 91pt;text-indent: 0pt;line-height: 11pt;text-align: justify;">, which
                        is accessible both via desktop and/or mobile.</p>
                    </li>
                    <li data-list-text="2.2.1.3.">
                      <p
                        style="padding-top: 2pt;padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: justify;">
                        The service description and system requirements for using Affinidi Vault in <b>Appendix 4
                        </b>shall apply accordingly.</p>
                      <p style="text-indent: 0pt;text-align: left;"><br /></p>
                    </li>
                  </ol>
                </li>
                <li data-list-text="2.2.2.">
                  <p class="s3" style="padding-left: 66pt;text-indent: -25pt;text-align: left;">Affinidi Portal</p>
                  <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
                  <p style="padding-left: 66pt;text-indent: 0pt;line-height: 122%;text-align: justify;">To the
                    extent Affinidi Portal has been made part of the Agreement, We grant the Developer access to
                    Affinidi Portal, a web-based portal to access the documentation and other content that We
                    provide for the Developer to implement and use our Services. A service description as well as
                    the technical system requirements for using Affinidi Portal are set out in <b>Appendix 2</b>.
                  </p>
                </li>
                <li data-list-text="2.2.3.">
                  <p class="s3" style="padding-top: 3pt;padding-left: 66pt;text-indent: -25pt;text-align: left;">
                    Affinidi CLI</p>
                  <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
                  <ol id="l6">
                    <li data-list-text="2.2.3.1.">
                      <p style="padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: justify;">To the
                        extent the provision of CLI has been made part of the Agreement, We provide the Developer
                        with a Command Line Interface or a corresponding software package re- spectively
                        (collectively “<b>CLI</b>”). CLI enables the Developer to technically implement our Services
                        or parts thereof on his/her app or service. A service description as well as the technical
                        system requirements for using CLI are set out in <b>Appendix 3.</b></p>
                      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                    </li>
                    <li data-list-text="2.2.3.2.">
                      <p style="padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: justify;">As CLI
                        provided by Us is not necessarily required to be installed in order to implement our
                        Services or parts thereof, the Developer may also use a third party CLI or software
                        component to implement and use Our Services, given that the third party CLI or software
                        component meets the required technical requirements as in particular set out in the Terms
                        &amp; Conditions. If a CLI or third-party software package is used, the terms and conditions
                        of the respective provider shall apply in this regard. We shall not be responsible for and
                        do not warrant that our Services are usable with any particular third party CLI or soft-
                        ware component or software-like tools. We reserve the right to reject or exclude third party
                        CLI providers if this becomes necessary for weighty reasons . Weighty reasons are, for
                        example, a technical incompatibility of the service of the third-party provider with our
                        Services, legal reasons that prevent the connection to our Services or the adap- tation of
                        our Services to technical innovations.</p>
                      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                    </li>
                  </ol>
                </li>
                <li data-list-text="2.2.4.">
                  <p class="s3" style="padding-left: 66pt;text-indent: -25pt;text-align: left;">Reference App</p>
                  <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
                  <p style="padding-left: 66pt;text-indent: 0pt;line-height: 122%;text-align: justify;"><a
                      href="#bookmark4" class="s2">To the extent Affinidi Reference App has been made part of the
                      Agreement, within Affinidi Portal We provide Developers with our Reference App, a demo version
                      of our Services in which the Developer can test our Services and their functionalities in
                      parallel to the live oper- ation of our Services. In order to be able to use Reference App,
                      the Developer needs Affinidi Vault. In this regard, sections </a><a href="#bookmark5"
                      class="s2">2.2.1 and </a>2.2.1.1 applies accordingly. Reference App runs sepa- rately from the
                    live operation of our Services. In particular, this means that Reference App is not connected to
                    Consumer&#39;s Affinidi Vault in the sense that Consumer data is transferred from Affinidi Vault
                    to Reference App. The Developer shall not feed any real data from Consumers into Reference App
                    and would be solely liable to the Consumer in case they are adding such information on the
                    Reference App.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.2.5.">
                  <p class="s3" style="padding-left: 66pt;text-indent: -25pt;text-align: left;">Affinidi Desktop App
                  </p>
                  <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
                  <p style="padding-left: 66pt;text-indent: 0pt;line-height: 122%;text-align: justify;">To the
                    extent Affinidi Desktop App has been made part of the Agreement, the following ap- plies:
                    Affinidi Desktop App is an additional security tool for the use of Affinidi Vault. Affinidi
                    Desktop App enables Consumer to open Affinidi Vault in Consumer’s browser, so that Affinidi
                    Vault can only share Consumer’s data with the Developer if Consumer has previously un- locked
                    Affinidi Vault in his/her browser by entering his/her biometric data. The use of Affinidi
                    Desktop App is not required for the use of Affinidi Vault, it is only an add-on. A service de-
                    scription as well as the technical system requirements for using Affinidi Desktop App are set
                    out in <b>Appendix 5</b>.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.2.6.">
                  <p class="s3" style="padding-left: 66pt;text-indent: -25pt;text-align: left;">Support</p>
                  <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
                  <p style="padding-left: 66pt;text-indent: 0pt;line-height: 122%;text-align: justify;">We offer
                    support services (“<b>Support</b>”) for the implementation and use of our Services to the extent
                    this has been made part of the Agreement. Unless otherwise agreed, our Support is lim- ited to
                    basic support in terms of Q&amp;A lists that we provide in the Affinidi Portal or in case you
                  </p>
                  <p
                    style="padding-top: 3pt;padding-left: 66pt;text-indent: 0pt;line-height: 122%;text-align: justify;">
                    <a href="http://www.affinidi.com/pricing" class="s2" target="_blank">have upgraded your
                      subscription tier then you would be eligible to avail support services as may be applicable to
                      the tier of service you have subscribed to and as specified under </a><span
                      style=" background-color: #F8F8F8;">www.af-</span><a href="http://www.affinidi.com/pricing"
                      style=" color: #00F; font-family:&quot;Times New Roman&quot;, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 10pt;"
                      target="_blank"> </a><span style=" background-color: #F8F8F8;">finidi.com/pricing.</span><span
                      class="s5"> </span><a href="#bookmark15" class="s2">The limitations of warranty and liability
                      in section </a><span class="p">6 remain unaffected.</span>
                  </p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
            <li data-list-text="2.3.">
              <h2 style="padding-left: 44pt;text-indent: -21pt;text-align: left;">Prices and Payment for Affinidi
                Services</h2>
              <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
              <ol id="l7">
                <li data-list-text="2.3.1.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">While the
                    subscription to Our Services is free of charge, when the Developer has subscribed to any tier
                    (like Essential or Community tier or any other tier as may be defined by us later), The
                    Developer has the option to avail additional benefits by upgrading to various other sub-
                    scription tiers offered by Affinidi.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.3.2.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;"><span
                      class="p">The subscription tiers may as well be subject to limitations with respect to Monthly
                      Active Users (“</span><span class="h2">MAUs</span><a href="http://www.affinidi.com/pricing"
                      class="s2" target="_blank">”), Affinidi Credits, Customer Support, etc. as specified in the
                      Developer Portal and/or </a><span
                      style=" background-color: #F8F8F8;">www.affinidi.com/pricing</span><span class="s5">
                    </span><span class="p">(“</span><span class="h2">Pricing Page</span><span class="p">”). When the
                      Developer’s actual usage of the Services reaches the limits or nears the limits as specified
                      under the various subscription tiers in the Developer Portal and/or the Pricing Page, we may
                      notify the Developer accordingly and suggest an upgrade of his subscription tier; at our
                      discretion but taking into account the Devel- oper’s interest we may also block any further
                      actions within the Services that would exceed the defined quota. Affinidi can at their
                      discretion charge overage for exceeding the MAUs or any other limitation as more particularly
                      specified under the Developer Portal and/or the Pric- ing Page. The Developer will not be able
                      to complete any further API call when the number of Credits in that Developer’s account at the
                      moment of request to the API call does not cover the actually defined Credit cost. Further,
                      the Developer may not be able to add users to their services through Affinidi Services, in
                      case they reach their maximum MAU limit. For the pur- pose of this clause,</span></p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                  <ol id="l8">
                    <li data-list-text="2.3.2.1.">
                      <p style="padding-left: 91pt;text-indent: -36pt;line-height: 122%;text-align: justify;">
                        Affinidi Credits (“<b>Credit(s)</b>”) refers to credits provided by Affinidi as a fair play
                        mech- anism to the account of the Developer. Each subscription tier has a predefined number
                        of Credits allocated for API calls made for various reasons. The number of Credits re-
                        quired for each API call will depend on the functionality within the Service and may be
                        revised at any time with notice to the Developer. Further, the performance of an API call in
                        the course of using Our Services may require the Developer to utilize Affinidi Credits made
                        available to such Developer. The number of Credits/MAUs within the Developer’s account will
                        be reset according to his subscribed tier at the beginning of every subscrip- tion cycle
                        during the term of his/her active subscription tier.</p>
                      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                    </li>
                    <li data-list-text="2.3.2.2.">
                      <p style="padding-left: 91pt;text-indent: -36pt;line-height: 122%;text-align: justify;"> MAUs
                        refers to number of unique end-users/Consumers who have successfully logged into any website
                        configured under that project by the Developer at least once in the given month.</p>
                      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                    </li>
                  </ol>
                </li>
                <li data-list-text="2.3.3.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">The
                    Developer may ask for an upgrade, downgrade, initiation, or cancellation of a subscription tier
                    which will become effective upon Our approval with the effect of the following subscrip- tion
                    cycle. Provided however in case of downgrade or cancellation of a paid subscription, the
                    Developer will have to inform Us minimum seven (07) days before the subscription period ends in
                    order for Us to process the cancellation/downgrade in the next subscription cycle. In case the
                    Developer fails to inform us seven (07) days before the subscription period ends, we shall be
                    able to process the cancellation/downgrade only in the cycle after the next cycle.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.3.4.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">We are
                    entitled to adjust the applicable subscription tiers, their conditions and details as well as
                    the Credit cost per API for the future any time during the Term of this Agreement. Such</p>
                  <p
                    style="padding-top: 3pt;padding-left: 66pt;text-indent: 0pt;line-height: 122%;text-align: justify;">
                    adjustments will become binding after We inform the Developer about the upcoming changes with a
                    reasonable notice period of at least fourteen (14) days and the Developer continues or starts
                    using the respective Service without refusing that change at least in text form to Us. In case
                    the Developer refuses to accept the changes, the existing Agreement between Us and the Developer
                    remains unchanged, we are entitled to suspend the Services immediately and to terminate the
                    Agreement in total or partly for good reason with a notice period of one (1) month. In any case
                    we will respect the Developer’s legitimate interest.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.3.5.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">In case
                    you have subscribed to or interested in any of the paid services introduced by Us (“<b>Paid
                      Services</b><a href="http://www.affinidi.com/pricing" class="s2" target="_blank">”) and as
                      specified at </a><a href="http://www.affinidi.com/pricing" class="s4"
                      target="_blank">www.affinidi.com/pricing</a>, you may have to make payment of such price or
                    any revised price updated from time to time according to the rules of these Terms &amp;
                    Conditions. You may choose a mode of payment for Paid Services as offered and specified by Us at
                    the time of the subscription. You agree to pay us the applicable fees and taxes specific to Paid
                    Services as required under applicable laws for the time being in force.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.3.6.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">You may
                    also be redirected for payment purposes to a third-party payment processing site offering
                    payment through various channels such as net banking, debit card and credit card
                    (&quot;<b>Payment Gateway</b>&quot;) and you shall abide by the terms and conditions of such
                    Payment Gate- way.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.3.7.">
                  <p class="s5" style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;"><a
                      href="https://www.affinidi.com/get-in-touch" class="s2" target="_blank">In case of any
                      disputes with respect to any payments made to us under the subscription plans or any other
                      manner for availing the Services, the Developers can contact us through either the contact us
                      section in Affinidi Portal or though the contact us section at </a><span
                      style=" color: #00F; font-family:&quot;Times New Roman&quot;, serif; font-style: normal; font-weight: normal; text-decoration: underline; font-size: 10pt;">https://www.af-</span><a
                      href="https://www.affinidi.com/get-in-touch"
                      style=" color: #00F; font-family:&quot;Times New Roman&quot;, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 10pt;"
                      target="_blank"> </a><span
                      style=" color: #00F; font-family:&quot;Times New Roman&quot;, serif; font-style: normal; font-weight: normal; text-decoration: underline; font-size: 10pt;">finidi.com/get-in-touch</span>
                    <span style=" color: #000;">and we shall respond to the queries without undue delay.</span>
                  </p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
            <li data-list-text="2.4.">
              <h2 style="padding-left: 44pt;text-indent: -21pt;text-align: left;">Term and Termination of the
                Services for Developers</h2>
              <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
              <ol id="l9">
                <li data-list-text="2.4.1.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">The term
                    of the subscription tiers as well as the subscription to any of our services shall be unlimited.
                  </p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.4.2.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;"><a
                      href="#bookmark14" class="s2">Notwithstanding the term and termination of this Agreement
                      (section </a>5), The Developer may send a notice to Us to terminate any of the Services at any
                    time, whether in respect of all or only selected Services or subscription tiers, and We will
                    execute the request of the Developer to terminate the subscriptions within a period of thirty
                    (30) days of receipt of the request.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.4.3.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">We may
                    terminate the Agreement with regard to the Developer’s services fully or in parts at any time
                    during the term of this Agreement with effect to the end of the month of the termina- tion.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.4.4.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">Upon
                    expiry or termination of the Agreement, We will cease to provide Services to Developer. If the
                    Agreement is terminated only with respect to single Services, we will cease to provide such
                    Services. The Developer shall, within a reasonable time, specifically return or destroy all
                    copyrighted or otherwise legally protected content (including CLI or software and software
                    components) in his/her possession, and each party shall return all copies of the other
                    party&#39;s confidential information.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
            <li data-list-text="2.5.">
              <h2 style="padding-left: 45pt;text-indent: -21pt;text-align: left;">Developer’s Obligations</h2>
              <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
              <ol id="l10">
                <li data-list-text="2.5.1.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: left;">The Developer
                    shall be responsible for meeting the system requirements for the implementa- tion and use of the
                    Services described in this Agreement.</p>
                </li>
                <li data-list-text="2.5.2.">
                  <p
                    style="padding-top: 3pt;padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;">
                    The Developer shall remember his/her passphrase and keep it safe. We currently do not provide
                    any mechanisms to reset the passphrase. In this case, the Developer must re-register and re-
                    authenticate.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.5.3.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;">The
                    Developer shall be responsible for providing the facilities including hardware, software and
                    internet connection necessary to properly use the Services as set out in the Agreement and which
                    are within his/her sphere. The Developer shall be responsible that the Services ordered are fit
                    for his/her purpose and he/she has asked for all relevant information. The Developer shall
                    further be responsible for the security of his/her systems in place to use our Services and for
                    protecting them against malicious software and attacks.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.5.4.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;"><a
                      href="#bookmark2" class="s2">Insofar as our Services contain components of software for which
                      separate license conditions apply and are to be observed, We shall draw Developer&#39;s
                      attention to this in an appropriate manner. In this regard, our Services may contain
                      components of open-source software to which respective license terms may apply. The respective
                      open-source license terms shall prevail over the terms of this Agreement. The Developer shall
                      be solely responsible to comply with the open-source license conditions in accordance with
                      section </a>2.1.5 of the Terms &amp; Conditions.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.5.5.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;"><a
                      name="bookmark6">&zwnj;</a>Our Services are not an archive or a backup system. This is why the
                    Developer is responsible for the backup and storage of any data transferred to Us by either the
                    Developer or Consumer using our Services via Developer’s website. We can rely on the assumption
                    that any data We will come in contact with or have influence on by way or in connection to our
                    Services, has been saved for backup purposes by the Developer on a state-of-the-art level.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.5.6.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;">In case,
                    the Consumer or the Developer have opted for cloud back-up &amp; restore option in their
                    respective Affinidi Vault, Affinidi would be storing the backup on their behalf. While creating
                    the back-up, Consumer/Developer would receive an email with the back-up id which would have to
                    be provided while restoring the backup in the vault along with the passphrase set by the
                    Consumer/Developer for their vault. This service is available with limited capability only for
                    the web app and mobile app (android) of Affinidi Vault. The Company may provide further
                    enhancements to the cloud backup in future at their discretion. This could be free or for a
                    price as may be decided by the Company.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
            <li data-list-text="2.6.">
              <h2 style="padding-left: 44pt;text-indent: -21pt;text-align: left;">Data Protection</h2>
              <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
              <p style="padding-left: 45pt;text-indent: 0pt;line-height: 122%;text-align: justify;">We shall not be
                responsible for the personal data pertaining to which the Developer is the data controller. This
                applies in particular to the extent that the Developer processes personal data of the Consumer
                previously provided to him/her by the Consumer in the context of their contractual or
                pre-contractual relationship. The Developer indemnifies us against any claims made against us by the
                Consumer based on Developer‘s unlawful processing of Consumer‘s personal data received from the
                Consumer. Apart from that, We are compliant with applicable laws, in particular the General Data
                Protection Regulation (GDPR), Singaporean Data Protection Regulations and Indian Data Pro- tection
                Regulations.</p>
              <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="2.7.">
              <h2 style="padding-left: 44pt;text-indent: -21pt;text-align: left;">Modification of Services or of the
                Terms &amp; Conditions</h2>
              <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
              <ol id="l11">
                <li data-list-text="2.7.1.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;"><a
                      name="bookmark7">&zwnj;</a>We reserve the right to change our Services (in completely or in
                    part) at any time with effect for the future if this becomes necessary for good reasons, neither
                    Consumer nor the Developer is placed in a significantly worse state by the change and the
                    change is reasonable for the</p>
                  <p
                    style="padding-top: 3pt;padding-left: 66pt;text-indent: 0pt;line-height: 122%;text-align: justify;">
                    Consumer and the Developer. Good reasons include, for example, changes to the services of our
                    own contractual partners and the adaptation of our Services to technical innovations. Rea-
                    sonable reasons include, in particular, changes that do not significantly affect the interests
                    of Consumer or the Developer or do not result in a significant restriction of the scope of use
                    of the Services, e.g., the addition of additional functions or Services.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.7.2.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;"><a
                      href="#bookmark7" class="s2">We will inform the Developer of any changes to the Terms &amp;
                      Conditions and/or the scope of Services that go beyond the cases specified under section 2.7.1
                      e.g. by displaying such information as part of the log-in procedure for the respective
                      Services at least fourteen (14) days in advance. Insofar as changes beyond section </a>2.7.1
                    do not affect essential contractual provisions, Developer‘s consent to the change of the
                    Agreement shall be deemed to have been granted unless the Developer objects to the change in
                    text form within fourteen (14) days after receipt of the change notification and continues to
                    using our Services. .</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.7.3.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;">If the
                    Developer objects, we are entitled to suspend the Developer’s access to the particular Service
                    and we may terminate the Agreement extraordinarily with immediate effect or rea- sonable notice
                    period. In any case we will take into account the reasonable interest of the De- veloper.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.7.4.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;">
                    Furthermore, We reserve the right to make changes to the Terms &amp; Conditions insofar as these
                    are necessary to fill regulatory gaps or serve to implement changes in the law, changes in court
                    rulings or changed market conditions.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
            <li data-list-text="2.8.">
              <h2 style="padding-left: 44pt;text-indent: -21pt;text-align: left;">Confidential information</h2>
              <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
              <p style="padding-left: 44pt;text-indent: 0pt;line-height: 122%;text-align: justify;">Each party will
                hold the other party’s confidential information in confidence and will use the same efforts to
                maintain the confidentiality of the other party’s confidential information as it uses to pro- tect
                its own confidential information of a similar nature, but in any event no less than reasonable
                efforts. Neither party shall disclose such confidential information to third parties nor use the
                other party’s confidential information for any purpose other than the purposes of this Agreement.
                Confi- dential information does not include information that: (a) is already known by the receiving
                party at time of disclosure; (b) becomes, through no act or fault of the receiving party, publicly
                known; (c) is received by the receiving party from a third party without a restriction on disclosure
                or use; or (d) is independently developed by the receiving party without reference to confidential
                information of the disclosing party. A party may disclose confidential information of the other
                party to the extent required to be disclosed by a court or governmental agency pursuant to a
                statute, regulation or valid order; provided that the receiving party first notifies the disclosing
                party and gives the disclosing party the opportunity to seek a protective order or to contest such
                required disclosure.</p>
              <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="2.9.">
              <h2 style="padding-left: 44pt;text-indent: -21pt;text-align: left;">Additional provisions pertaining
                to Services for Developers</h2>
              <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
              <ol id="l12">
                <li data-list-text="2.9.1.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 121%;text-align: justify;">All
                    disputes arising out of or in connection with the Services for Developers and this Agree- ment
                    shall be governed by the laws of the country in which the Developer resides.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.9.2.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;">All
                    disputes arising out of or in connection with the Services for Developers and this Agree- ment
                    shall be finally settled under the Rules of Arbitration of the International Chamber of Commerce
                    (ICC) by one or more arbitrators appointed in accordance with such Rules.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.9.3.">
                  <p style="padding-left: 66pt;text-indent: -32pt;text-align: left;">With regard to the place of
                    jurisdiction, the provisions of the applicable law shall apply.</p>
                </li>
                <li data-list-text="2.9.4.">
                  <p
                    style="padding-top: 3pt;padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;">
                    Any clause, provision, or portion of the Agreement found or ruled invalid, void, illegal or oth-
                    erwise unenforceable under any law or by any court or in any other proceeding, shall be amended
                    to the extent required to render it valid, legal and enforceable, or deleted if no such
                    amendment is feasible, and such amendment or deletion shall not affect the enforceability of the
                    other provisions hereof.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.9.5.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;">The
                    parties agree that the Agreement is the complete and exclusive statement of the agreement
                    between the parties, which supersedes all prior agreements, oral or written, and all other com-
                    munications between the parties relating to the subject matter of this Agreement.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="2.9.6.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;">These
                    Terms &amp; Conditions govern the Developers’ use of or access to our Services in addition to
                    the Privacy Notice of Affinidi.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
          </ol>
        </li>
        <li data-list-text="3.">
          <h2 style="padding-left: 23pt;text-indent: -17pt;text-align: left;"><a name="bookmark8">&zwnj;</a>Affinidi
            Services towards Consumers</h2>
          <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
          <ol id="l13">
            <li data-list-text="3.1.">
              <h2 style="padding-left: 44pt;text-indent: -21pt;text-align: left;">Subject Matter and Scope of
                Service</h2>
              <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
              <ol id="l14">
                <li data-list-text="3.1.1.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;"><a
                      href="#bookmark8" class="s2">Subject matter of this chapter </a>3 is the provision of a data
                    vault to Consumers enabling them to own, collect and store their data and selectively share it
                    with the Developers, and related ser- vices, in each case as set out in the respective Appendix
                    and as described in the service de- scriptions in the Appendices to the Terms &amp; Conditions.
                    The Consumer in this regard is any natural person who enters into the contract for purposes that
                    can predominantly be attributed neither to his or her commercial nor to his or her independent
                    professional activity.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="3.1.2.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;">By way of
                    completing the order process regarding our Services and accepting the Terms &amp; Conditions
                    (including its Appendices), Consumer applies for the agreement to the Services, which will only
                    be concluded our acceptance of the Consumer’s offer (“<b>Agreement</b>”). We are free to accept
                    or deny the offer at our own discretion.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="3.1.3.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;">Any
                    deviating terms of use expressly do not apply, even if reference is made to their validity and
                    We do not expressly object to them. Deviations from these Terms &amp; Conditions require a
                    contractual agreement in text form to be effective.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="3.1.4.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;"><a
                      href="#bookmark9" class="s2" name="bookmark9">Insofar as the Services include the provision of
                      copyrighted or otherwise (e.g. as trade secret) legally protected content (e.g., software,
                      software components), We grant Consumer a world- wide, non-exclusive, non-transferable and
                      non-sublicensable right to use our Services or have it used in Consumer’s interest and under
                      his/her commission to the extent granted in and for the term of the Agreement (unless
                      explicitly granted differently between Us and Consumer by citing the deviation to this section
                    </a>3.1.4 of the Terms &amp; Conditions). The Consumer shall not reverse engineer, disassemble,
                    decompile, or use it to train any artificial intelligence model or application, except to the
                    extent permitted by applicable mandatory law.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="3.1.5.">
                  <p style="padding-left: 66pt;text-indent: -32pt;text-align: left;">The use of our Services shall
                    only be allowed when Consumer is at least 18 years old.</p>
                  <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="3.1.6.">
                  <p style="padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;"> While
                    taking into consideration the reasonable interest of the Consumer we shall be entitled to
                    suspend any Services fully or in part for the Consumer either when an applicable quota to the
                    Service has been reached or we have reason to believe that the Consumer’s use of the Service is
                    not compliant with these Terms &amp; Conditions or negatively effects our provision of Services
                    to other Consumers or Developers. The Consumer may request to reinstate the Ser- vices when and
                    to the extent the reason for suspension does not or not anymore exist.</p>
                </li>
                <li data-list-text="3.1.7.">
                  <p
                    style="padding-top: 3pt;padding-left: 66pt;text-indent: -32pt;line-height: 122%;text-align: justify;">
                    All appendices to the Terms &amp; Conditions (“<b>Appendices</b>”) are incorporated by reference
                    and made an integral part of the Agreement. In the event of conflicts or ambiguities between any
                    provision of this Terms &amp; Conditions and the Appendices hereto, the terms in this Terms
                    &amp; Conditions shall take precedence and prevail over the terms of the Appendices, unless and
                    to the extent: (a) If it is explicitly stated otherwise in this Terms &amp; Conditions and/or
                    the Appen- dix, or (b) an Appendix explicitly declares a specific provision of this Terms &amp;
                    Conditions as not applicable (citing requirement).</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
            <li data-list-text="3.2.">
              <h2 style="padding-left: 44pt;text-indent: -21pt;text-align: left;"><a
                  name="bookmark10">&zwnj;</a>Services for Consumers</h2>
              <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
              <p style="padding-left: 45pt;text-indent: 0pt;line-height: 122%;text-align: justify;">Our Services not
                only include one service or product but may include a number of respective ser- vices, products and
                deliverables that Consumer has applied for by way of our order process and that has been made part
                of the Agreement upon our acceptance and which may include(but not be lim- ited) the following:</p>
              <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
              <ol id="l15">
                <li data-list-text="3.2.1.">
                  <p class="s3" style="padding-left: 66pt;text-indent: -32pt;text-align: left;">Affinidi Vault</p>
                  <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
                  <ol id="l16">
                    <li data-list-text="3.2.1.1.">
                      <p style="padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: justify;"><a
                          href="#bookmark4" class="s2">To the extent Affinidi Vault has been made part of the
                          Agreement, the following applies: Affinidi Vault enables Consumer to discover, collect,
                          store, share, and monetise their data in a fragmented data world. It also enables consumer
                          to log in to websites, applica- tions and other services that have implemented Affinidi
                          Login (as defined in section </a>2.2.1. of the Terms &amp; Conditions) (“<b>Participating
                          Platforms</b>”) using Consumer’s data stored in the Affinidi Vault after one-time
                        registration and authentication, without hav- ing to go through a registration and login
                        process each time, as would otherwise be the case. We may also allow or make available other
                        services for verification either our- selves or through other third-party partners. This
                        gives Consumer a single identity on the basis of which Consumer can be identified and
                        verified by all Participating Platforms. A service description as well as the technical
                        system requirements for using Affinidi Vault are set out in <b>Appendix 4</b>.</p>
                      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                    </li>
                    <li data-list-text="3.2.1.2.">
                      <p class="s5"
                        style="padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: justify;"><a
                          href="http://www.vault.affinidi.com/" class="s2" target="_blank">In order to use Affinidi
                          Vault, Consumer shall either download the Affinidi Vault’s Chrome Extension from the
                          Chrome Web Store and then login to the vault or login into Affinidi Vault directly @
                        </a><span
                          style=" color: #00F; font-family:&quot;Times New Roman&quot;, serif; font-style: normal; font-weight: normal; text-decoration: underline; font-size: 10pt;">www.vault.affinidi.com</span>
                        <span style=" color: #000;">(accessible both via desktop and/or mobile). The Consumer shall
                          then register and authenticate. As part of the registration process, Consumer receives a
                          confirmation e-mail from Us. This e-mail contains a con- firmation link. By clicking on
                          this link, Consumer confirms his/her e-mail address. The purpose of submission of the
                          registration form constitutes Consumer’s declaration of offer to conclude the Agreement on
                          the use of Affinidi Vault. We accept this offer by confirming Consumer’s registration by
                          e-mail or by activating Consumer’s access to Affinidi Vault after Consumer has submitted
                          the registration form.</span>
                      </p>
                      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                    </li>
                    <li data-list-text="3.2.1.3.">
                      <p style="padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: justify;">
                        Affinidi Vault may also be used by way of a mobile client, <b>Affinidi Mobile App </b>as
                        soon as we will make it available to the consumer. The functionalities of the mobile app can
                        include inter alia:</p>
                      <ul id="l17">
                        <li data-list-text="">
                          <p style="padding-left: 140pt;text-indent: -21pt;line-height: 11pt;text-align: left;">Set
                            up a Affinidi Vault and secure it with a passphrase and/or biometrics,</p>
                        </li>
                        <li data-list-text="">
                          <p style="padding-top: 1pt;padding-left: 140pt;text-indent: -21pt;text-align: left;">
                            Access the profile page and fill, modify or delete the profile data,</p>
                        </li>
                        <li data-list-text="">
                          <p style="padding-top: 1pt;padding-left: 140pt;text-indent: -21pt;text-align: left;">
                            Authenticate on a website and share data from his Affinidi Vault.</p>
                          <p
                            style="padding-top: 3pt;padding-left: 91pt;text-indent: 0pt;line-height: 122%;text-align: justify;">
                            We may choose to limit the availability as well as the scope of functionalities of the
                            Affinidi Mobile App at our discretion for testing purposes. The Consumers and the De-
                            velopers who we will make it available to will be informed about the respective limita-
                            tions.</p>
                          <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                        </li>
                      </ul>
                    </li>
                    <li data-list-text="3.2.1.4.">
                      <p style="padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: justify;">
                        Affinidi Vault allows/may allow Consumer to discover, collect, store, share, and mone- tise
                        their data manage his/her data centrally. In this way, Consumer can, for example, add to,
                        correct and change his/her data. The Consumer assures that the data provided by him/her, in
                        particular his/her first and last name, address, date of birth and e-mail ad- dress, are
                        true and correct. The Company is not required to check or authenticate the data included
                        under the vault. Consumer’s data is exclusively for Consumer‘s personal use and shall
                        therefore be kept secret and secure at all times. The Consumer shall inform Us immediately
                        if he/she becomes aware of or suspect any unauthorised use, disclosure and/or any misuse of
                        his/her Affinidi Vault.</p>
                      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                    </li>
                    <li data-list-text="3.2.1.5.">
                      <p style="padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: justify;"><a
                          name="bookmark11">&zwnj;</a>In the event of misuse or suspected misuse, We are entitled to
                        immediately block access to Affinidi Vault with due consideration of Consumer’s interests.
                        The Consumer is liable for all consequences of the use by third parties, if he/she is
                        responsible for the misuse of the data. In particular, Consumer is responsible for the
                        misuse if he/she has made the unauthorised use of the access data possible, even if only
                        negligently. If the reasons for blocking access to Consumer cease to apply, We are obliged
                        to restore access to our Services.</p>
                      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                    </li>
                  </ol>
                </li>
                <li data-list-text="3.2.2.">
                  <p class="s3" style="padding-left: 66pt;text-indent: -32pt;text-align: left;">Affinidi Desktop App
                  </p>
                  <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
                  <ol id="l18">
                    <li data-list-text="3.2.2.1.">
                      <p style="padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: justify;">To the
                        extent Affinidi Desktop App has been made part of the Agreement, the following applies:
                        Affinidi Desktop App is an additional security tool for the use of Affinidi Vault. Affinidi
                        Desktop App enables Consumer to open Affinidi Vault in Consumer’s browser, so that Affinidi
                        Vault can only share Consumer’s data with Participating Platforms if Consumer has previously
                        unlocked Affinidi Vault in his/her browser by entering his/her biometric data. The use of
                        Affinidi Desktop App is not required for the use of Affinidi Vault, it is only an add-on. A
                        Service description as well as the technical system require- ments for using Affinidi
                        Desktop App are set out in <b>Appendix 4.</b></p>
                      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                    </li>
                    <li data-list-text="3.2.2.2.">
                      <p style="padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: justify;"><a
                          href="#bookmark11" class="s2">Section </a>3.2.1.5 of the Terms &amp; Conditions apply
                        accordingly also to the use of Affinidi Desktop App.</p>
                      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
            <li data-list-text="3.3.">
              <h2 style="padding-left: 44pt;text-indent: -21pt;text-align: left;">Prices and Payment</h2>
              <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
              <p style="padding-left: 45pt;text-indent: 0pt;text-align: left;">We provide our Services to Consumers
                free of charge.</p>
              <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="3.4.">
              <h2 style="padding-left: 44pt;text-indent: -21pt;text-align: left;">Term and Termination</h2>
              <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
              <ol id="l19">
                <li data-list-text="3.4.1.">
                  <p style="padding-left: 66pt;text-indent: -25pt;text-align: left;">The term of this Agreement
                    (“<b>Term</b>”) is unlimited.</p>
                  <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="3.4.2.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;"><a
                      href="#bookmark14" class="s2">Notwithstanding the term and termination of this Agreement
                      (section </a>5), the Consumer may send a notice to Us to terminate the Service at any time,
                    whether in respect of all or only selected Services, and We will execute the request of the
                    Consumer to terminate the subscrip- tions within a period of thirty (30) days of receipt of the
                    request.</p>
                </li>
                <li data-list-text="3.4.3.">
                  <p
                    style="padding-top: 3pt;padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">
                    The right of Affinidi to terminate the Services for Consumers for good cause shall remain
                    unaffected. Good cause entitling Us to terminate the Agreement exists in particular if Con-
                    sumer has provided false and/or incomplete data during registration and/or has not updated
                    his/her registration data in the event of a subsequent change and/or has disclosed his/her
                    access data without authorisation and does not cease such infringement within a reasonable
                    period after warning by Us. Considering Affinidi Is not storing any of the communication details
                    of the Consumers and also considering the privacy friendly design structure followed for provi-
                    sion of Services, there is no effective method available to inform the Consumers regarding the
                    closure of the Services in advance. However, Affinidi shall ensure to share communication
                    regarding any other critical information regarding the services on their website Affinidi.com as
                    may be feasible.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="3.4.4.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">Upon
                    expiry or termination of the Agreement, we will cease to provide the Services to Con- sumer.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="3.4.5.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">Without
                    prejudice to the options to terminate the Agreement mentioned above, we may cease to provide our
                    Services in completely or in part at any time and without stating reasons.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
            <li data-list-text="3.5.">
              <h2 style="padding-left: 44pt;text-indent: -21pt;text-align: left;">Consumer`s Obligations</h2>
              <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
              <ol id="l20">
                <li data-list-text="3.5.1.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 121%;text-align: justify;">Consumer
                    shall be responsible for meeting the system requirements for the implementation and use of the
                    Services described in this Agreement.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="3.5.2.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">Consumer
                    shall remember his/her passphrase and keep it safe. We currently do not provide any mechanisms
                    to reset the passphrase. In this case, Consumer must re-register and re-authenti- cate.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
            <li data-list-text="3.6.">
              <h2 style="padding-left: 44pt;text-indent: -21pt;text-align: left;">Data Protection</h2>
              <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
              <p style="padding-left: 45pt;text-indent: 0pt;line-height: 122%;text-align: justify;">We are compliant
                with applicable data privacy laws, in particular the latest regulation in European Union law on Data
                Protection and Data Privacy, General Data Protection Regulation (GDPR), Data Protection Regulations
                of Singapore and Indian Data Protection Regulations. We are not responsible for the processing of
                Consumer&#39;s personal data on the Participating Platforms and by Developers respectively. In this
                regard, Consumer shall contact Developer. For the rest, We refer to our Privacy Notice.</p>
              <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="3.7.">
              <h2 style="padding-left: 44pt;text-indent: -21pt;text-align: left;">Modification of Services or of the
                Terms &amp; Conditions</h2>
              <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
              <ol id="l21">
                <li data-list-text="3.7.1.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;"><a
                      name="bookmark12">&zwnj;</a>We reserve the right to change our Services (completely or in
                    part) at any time with effect for the future if this becomes necessary for good reasons,
                    Consumer is not placed in a significantly worse state by the change and the change is
                    reasonable for Consumer. Good reasons in- clude, for example, changes to the services of our own
                    contractual partners and the adaptation of our Services to technical innovations. Reasonable
                    reasons include, in particular, changes that do not significantly affect the interests of
                    Consumer or do not result in a significant re- striction of the scope of use of the Services,
                    e.g., the addition of additional functions or Ser- vices.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="3.7.2.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 121%;text-align: justify;"><a
                      href="#bookmark12" class="s2">We will inform Consumer within a reasonable period of time of
                      any changes to these Terms &amp; Conditions and/or the scope of services that go beyond the
                      cases specified in section </a>3.7.1 We</p>
                  <p style="padding-top: 3pt;padding-left: 66pt;text-indent: 0pt;line-height: 122%;text-align: left;">
                    undertake to expressly inform Consumer of the respective modifications by sending the mod- ified
                    GTC and the consequences of not objecting to these modifications.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="3.7.3.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">If
                    Consumer objects, either party shall have the right to terminate the Agreement by giving notice
                    with immediate effect.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="3.7.4.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">
                    Furthermore, we reserve the right to make changes to the Terms &amp; Conditions insofar as these
                    are necessary to fill regulatory gaps or serve to implement changes in the law, changes in court
                    rulings or changed market conditions.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
            <li data-list-text="3.8.">
              <h2 style="padding-left: 47pt;text-indent: -24pt;text-align: left;">Additional Provisions with regard
                to Services for Consumers</h2>
              <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
              <ol id="l22">
                <li data-list-text="3.8.1.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">Section 3
                    and any and all rights and obligations arising from or in connection with this part of the
                    Agreement shall be governed by and construed in accordance with the laws of the country in which
                    the Consumer resides.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="3.8.2.">
                  <p style="padding-left: 66pt;text-indent: -25pt;text-align: left;">With regard to the place of
                    jurisdiction, the provisions of the applicable law shall apply.</p>
                  <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="3.8.3.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: justify;">These
                    Terms &amp; Conditions govern your use of or access to our Services in addition to the Privacy
                    Notice of Affinidi.</p>
                  <p style="text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
          </ol>
        </li>
        <li data-list-text="4.">
          <h2 style="padding-left: 23pt;text-indent: -17pt;text-align: left;"><a name="bookmark13">&zwnj;</a>Force
            Majeure</h2>
          <p style="padding-top: 1pt;text-indent: 0pt;text-align: left;"><br /></p>
          <p style="padding-left: 23pt;text-indent: 0pt;line-height: 122%;text-align: justify;">We are not liable
            for any loss, damage or penalty resulting from delays or failures in performance if the delay or failure
            results from events beyond our reasonable control (a “<b>Force Majeure Event</b>”). Force Majeure Events
            shall include, but are not limited to, acts of God, war, hostility, invasion, act of foreign enemies,
            rebellion, revolution, riots, civil war, disturbances, requisitioning or other acts of civil or military
            authority, laws, regulations, acts or orders of any governmental authority, body, agency or official,
            fires, inclement weather, rain or floods (however caused), strikes, lock-outs or other labour disputes,
            epidemics, pandemics, outbreaks, embargoes, breakdown of equipment, plant or machinery (including, but
            not lim- ited to, data centre, telecommunications systems and utility services) or other catastrophe.
          </p>
          <p style="text-indent: 0pt;text-align: left;"><br /></p>
        </li>
        <li data-list-text="5.">
          <h2 style="padding-left: 23pt;text-indent: -17pt;text-align: left;"><a name="bookmark14">&zwnj;</a>Term
            and Termination of the Agreement</h2>
          <p style="padding-top: 1pt;text-indent: 0pt;text-align: left;"><br /></p>
          <ol id="l23">
            <li data-list-text="5.1.">
              <p style="padding-left: 45pt;text-indent: -21pt;line-height: 122%;text-align: justify;">
                Notwithstanding the foregoing, the Developer as well as the Consumer may send a notice to the
                Company to terminate the Agreement at any time, whether in respect of all or only selected Services,
                and the Company shall execute the request of the Developer or Consumer to terminate the Services
                within a period of thirty (30) days of receipt of the request.</p>
              <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="5.2.">
              <p style="padding-left: 45pt;text-indent: -21pt;line-height: 122%;text-align: justify;">The right of
                each party to terminate the Agreement in total or partly for good cause shall remain unaffected.
                Good cause entitling Us to terminate the Agreement exists in particular if the Developer infringes
                our rights of use by using our Services beyond the scope permitted under this Agreement and does not
                cease the infringement within a reasonable period after warning by Us.</p>
              <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="5.3.">
              <p style="padding-left: 45pt;text-indent: -21pt;line-height: 122%;text-align: justify;">Upon expiry or
                termination of the Agreement, We will cease to provide Services to Developer. If the Agreement is
                terminated only with respect to single Services, we will cease to provide such Services. The
                Developer shall, within a reasonable time, specifically return or destroy all copy- righted or
                otherwise legally protected content (including CLI or software and software components) in his/her
                possession, and each party shall return all copies of the other party&#39;s confidential infor-
                mation.</p>
            </li>
          </ol>
        </li>
        <li data-list-text="6.">
          <h2 style="padding-top: 3pt;padding-left: 23pt;text-indent: -17pt;text-align: left;"><a
              name="bookmark15">&zwnj;</a>Warranty and Liability</h2>
          <p style="text-indent: 0pt;text-align: left;"><br /></p>
          <h2 style="padding-left: 5pt;text-indent: 0pt;text-align: left;"><a href="#bookmark16" class="s6">The
              following rules in section </a><a href="#bookmark19" class="s6">6.1 to section </a>6.5.7 shall apply
            to all Consumers and Developers in any global jurisdiction:</h2>
          <p style="text-indent: 0pt;text-align: left;"><br /></p>
          <ol id="l24">
            <li data-list-text="6.1.">
              <p style="padding-left: 45pt;text-indent: -21pt;text-align: justify;"><a name="bookmark16">&zwnj;</a>In
                case there is a reduction or discontinuation of our Services, you
                are not entitled to any warranty rights in this respect, unless We have fraudulently concealed a
                defect.</p>
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="6.2.">
              <p style="padding-left: 45pt;text-indent: -21pt;line-height: 120%;text-align: justify;"><a
                  href="#bookmark16" class="s2" name="bookmark17">Notwithstanding section </a>6.1 We shall not be
                responsible for our Services being fit for a particular purpose unless otherwise explicitly agreed
                upon.</p>
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="6.3.">
              <p style="padding-left: 45pt;text-indent: -21pt;line-height: 120%;text-align: justify;"><a
                  name="bookmark18">&zwnj;</a>We shall not be responsible for any Consumer’s or Developer’s failure
                to comply with the technical requirements that they must meet under the Terms &amp; Conditions in
                order to use our Services and, in particular, to register or login on a respective Website or
                platform.</p>
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="6.4.">
              <p style="padding-left: 45pt;text-indent: -21pt;line-height: 120%;text-align: justify;"><a
                  href="#bookmark16" class="s2">Without prejudice to the provisions of section </a><a href="#bookmark6"
                  class="s2">6.1, We shall not be liable for the loss of Consumer’s or Developer’s
                  data if this loss is due to Consumer’s or Developer&#39;s failure to back up data in ac- cordance
                  with section </a>2.5.5 and thereby ensure that lost data can be restored with reasonable effort.
              </p>
            </li>
            <li data-list-text="6.5.">
              <p style="padding-top: 6pt;padding-left: 45pt;text-indent: -21pt;text-align: justify;">To the maximum
                extent permitted by applicable law of the country of residence of the Consumer or Developer, we make
                no guarantee, representation or warranties of any kind, whether express or implied:</p>
              <ol id="l25">
                <li data-list-text="6.5.1.">
                  <p style="padding-top: 11pt;padding-left: 66pt;text-indent: -25pt;text-align: justify;">regarding
                    the timeliness, reliability, accuracy, completeness, accessibility, merchantability, quality,
                    fitness for a particular purpose, currency, correctness, operation or usefulness of any portion
                    of the Services.</p>
                  <p style="text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="6.5.2.">
                  <p style="padding-left: 66pt;text-indent: -25pt;text-align: left;">regarding the availability or
                    appropriateness of the Services.</p>
                </li>
                <li data-list-text="6.5.3.">
                  <p style="padding-top: 11pt;padding-left: 66pt;text-indent: -25pt;text-align: justify;">that
                    Services will be error-free, continuously available or uninterrupted in operation, un-hack-
                    able, uncompromisable, free of any data breach (inadvertently or intentionally through inter-
                    ference or interception by third parties) or free of bugs, computer viruses, unauthorised soft-
                    ware, or other harmful codes or components not specifically mentioned herein;</p>
                  <p style="text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="6.5.4.">
                  <p style="padding-left: 66pt;text-indent: -25pt;text-align: justify;">that the Services will not
                    be susceptible to any cybersecurity breach or cannot be compromised and/or free of any data
                    breach (inadvertently or intentionally through interference or intercep- tion by third parties);
                  </p>
                </li>
                <li data-list-text="6.5.5.">
                  <p style="padding-top: 11pt;padding-left: 66pt;text-indent: -25pt;text-align: left;">that the
                    Services will contain information that is always timely and accurate;</p>
                  <p style="text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="6.5.6.">
                  <p style="padding-left: 66pt;text-indent: -25pt;text-align: left;">that Services will operate or
                    function properly on your devices or operating systems; or</p>
                </li>
                <li data-list-text="6.5.7.">
                  <p style="padding-top: 11pt;padding-left: 66pt;text-indent: -25pt;text-align: left;"><a
                      name="bookmark19">&zwnj;</a>that Services will not cause any damage to your devices or
                    operating systems.</p>
                  <p style="text-indent: 0pt;text-align: left;"><br /></p>
                  <h2 style="padding-left: 5pt;text-indent: 0pt;text-align: left;"><a href="#bookmark20" class="s6">The
                      following rules in section </a>6.6 shall only be applicable to Consumers and
                    the Developer residing in Germany:</h2>
                  <p style="padding-top: 1pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
            <li data-list-text="6.6.">
              <p style="padding-left: 44pt;text-indent: -21pt;line-height: 122%;text-align: justify;"><a
                  href="#bookmark16" class="s2" name="bookmark20">Notwithstanding anything contained herein, with
                  respect to the Developers/Consumers in Germany, apart from warranties specified under sections
                </a><a href="#bookmark17" class="s2">6.1, </a><a href="#bookmark18" class="s2">6.2 and </a>6.3 We
                are liable without limitation for intent or gross negligence, for injury to life, limb or health, in
                accordance with the provisions of the German Product Liability Act and to the extent of a guarantee
                assumed by Us. In the event of a slightly negligent breach of an obligation that is essential for
                achieving the purpose of the Agreement (cardinal obligation), Our liability is limited to the amount
                of the damage that is foreseeable and typical according to the type of contract in question here.
                Apart from that, any of Our liability to- wards the Developers/Consumers in Germany is excluded.</p>
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
              <h2 style="padding-left: 5pt;text-indent: 0pt;text-align: left;"><a href="#bookmark21" class="s6">The
                  following rules in section </a><a href="#bookmark22" class="s6">6.7 to section </a><a
                  href="#bookmark16" class="s6">6.9 shall only apply (and in deviation of the rules in section
                </a><a href="#bookmark20" class="s6">6.1 to section </a>6.6) to Consumer and the Developer who are
                not subject to the jurisdiction in Germany:</h2>
            </li>
            <li data-list-text="6.7.">
              <p style="padding-top: 3pt;padding-left: 44pt;text-indent: -21pt;text-align: left;"><a
                  name="bookmark21">&zwnj;</a>Your use of the Services is voluntary and at your sole risk. You are
                solely responsible for:</p>
              <p style="padding-top: 1pt;text-indent: 0pt;text-align: left;"><br /></p>
              <ol id="l26">
                <ol id="l27">
                  <ol id="l28">
                    <ol id="l29">
                      <li data-list-text="6.7.1.1.">
                        <p style="padding-left: 91pt;text-indent: -32pt;line-height: 121%;text-align: left;">your
                          use and reliance on the Services and the information available through the Ser- vices;</p>
                        <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                      </li>
                      <li data-list-text="6.7.1.2.">
                        <p style="padding-left: 91pt;text-indent: -32pt;text-align: left;">any liability, loss or
                          damage that you may incur through use of the Services; and</p>
                        <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
                      </li>
                      <li data-list-text="6.7.1.3.">
                        <p style="padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: left;">all
                          decisions or actions resulting from your use of the Services and the contents of the
                          Services.</p>
                      </li>
                    </ol>
                  </ol>
                </ol>
              </ol>
            </li>
            <li data-list-text="6.8.">
              <p style="padding-top: 9pt;padding-left: 45pt;text-indent: -21pt;text-align: justify;">To the maximum
                extent permitted by applicable law, we shall not be liable, in any circumstances or legal theories
                whatsoever, for any damage or loss of any kind, any consequential, incidental, special or indirect
                damages of any character, loss of data, loss of business, loss of profits or goodwill, inter-
                ruption of business, costs, expenses or claims of any nature whatsoever, even if we are aware of the
                risk of such damages:</p>
              <p style="padding-top: 1pt;text-indent: 0pt;text-align: left;"><br /></p>
              <ol id="l30">
                <ol id="l31">
                  <ol id="l32">
                    <ol id="l33">
                      <li data-list-text="6.8.1.1.">
                        <p style="padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: left;">That
                          you may incur as a result of your use, access or reliance on the Services (or any
                          information, data or statement found thereon);</p>
                        <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                      </li>
                      <li data-list-text="6.8.1.2.">
                        <p style="padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: left;">that
                          you may incur as a result of your dealing with a third-party service provider /Con- sumer
                          or any another user through the Services;</p>
                        <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                      </li>
                      <li data-list-text="6.8.1.3.">
                        <p style="padding-left: 91pt;text-indent: -32pt;text-align: left;">resulting from the
                          performance of the Services or any delay or failure thereof;</p>
                        <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
                      </li>
                      <li data-list-text="6.8.1.4.">
                        <p style="padding-left: 91pt;text-indent: -32pt;text-align: left;">arising out of or in
                          connection with any unauthorised access to your account;</p>
                        <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
                      </li>
                      <li data-list-text="6.8.1.5.">
                        <p style="padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: left;">
                          resulting from any delay in operation or transmission, communication failure, Internet
                          access difficulties or malfunction of equipment or software;</p>
                        <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                      </li>
                      <li data-list-text="6.8.1.6.">
                        <p style="padding-left: 91pt;text-indent: -32pt;text-align: left;">the conduct or the views
                          of any person who accesses or uses Services; and/or</p>
                        <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
                      </li>
                      <li data-list-text="6.8.1.7.">
                        <p style="padding-left: 91pt;text-indent: -32pt;line-height: 122%;text-align: left;">arising
                          out of or in connection with any suspension or termination of your access to the Services.
                        </p>
                      </li>
                    </ol>
                  </ol>
                </ol>
              </ol>
              <p style="padding-top: 9pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="6.9.">
              <p style="padding-left: 45pt;text-indent: -21pt;text-align: justify;"><a name="bookmark22">&zwnj;</a>In
                the event that we are found liable to you for any reason, our
                liability to you shall not, for any reason, exceed S$1000 (Singapore Dollars one thousand only).
                This limitation in this Clause applies to all causes of action in the aggregate including, without
                limitation, breach of contract, breach of warranty, negligence, strict liability, misrepresentations
                and other torts. In any jurisdiction in which these limitations of liability are restricted, our
                liability is limited to the greatest extent permitted by law.</p>
              <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
          </ol>
        </li>
        <li data-list-text="7.">
          <h2 style="padding-left: 23pt;text-indent: -17pt;text-align: left;"><a name="bookmark23">&zwnj;</a>Indemnity
            (not applicable to Consumer/Developer in Germany)</h2>
          <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
          <ol id="l34">
            <li data-list-text="7.1.">
              <p style="padding-left: 45pt;text-indent: -21pt;line-height: 122%;text-align: justify;">To the fullest
                extent permitted under law, you agree to indemnify us, our parents, subsidiaries, affil- iates,
                directors, officers, shareholders, employees, agents, sub-contractors and licensors (collectively
                the “<b>Indemnified Persons</b>”) in respect of any and all claims, losses, damages, expenses
                (including legal costs on a full indemnity basis), or liabilities (whether criminal or civil) and
                costs of settlement suffered or incurred by the Indemnified Persons or asserted against them in
                respect of:</p>
              <ol id="l35">
                <li data-list-text="7.1.1.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 11pt;text-align: justify;">Your
                    access, use of, or conduct in connection with the Services;</p>
                </li>
                <li data-list-text="7.1.2.">
                  <p style="padding-top: 3pt;padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: left;">
                    any application that you develop in connection with your access to or use of the Services that
                    infringes any intellectual property right of any person or violates their privacy rights;</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="7.1.3.">
                  <p style="padding-left: 66pt;text-indent: -25pt;text-align: left;">any breach by you of any of the
                    Terms &amp; Conditions;</p>
                  <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="7.1.4.">
                  <p style="padding-left: 66pt;text-indent: -25pt;text-align: left;">your misuse of the Services;
                  </p>
                  <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="7.1.5.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: left;">any content
                    sent or received by you (as a Developer/Consumer or received by the Developer from the
                    Consumers) through the Services.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="7.1.6.">
                  <p style="padding-left: 66pt;text-indent: -25pt;text-align: left;">any dispute between you and a
                    third party or another user of the Services;</p>
                  <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="7.1.7.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: left;">the
                    occurrence of any event due to your act, omission or default which comprises the security or
                    integrity of the Services or its contents; and/or</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="7.1.8.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: left;">your
                    violation of any applicable law or the rights (including but without limitation to intellec-
                    tual property rights and privacy rights) of any other person or entity.</p>
                </li>
              </ol>
            </li>
            <li data-list-text="7.2.">
              <p style="padding-top: 10pt;padding-left: 44pt;text-indent: -21pt;text-align: left;"><a href="#bookmark23"
                  class="s2">This section </a>7 shall not be applicable to the residents of
                Germany.</p>
            </li>
          </ol>
        </li>
        <li data-list-text="8.">
          <h2 style="padding-top: 10pt;padding-left: 23pt;text-indent: -17pt;text-align: left;"><a
              name="bookmark24">&zwnj;</a>Applicable Laws with respect to Developers and Consumers residing outside
            Germany.</h2>
          <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
          <ol id="l36">
            <li data-list-text="8.1.">
              <p style="padding-left: 45pt;text-indent: -21pt;line-height: 122%;text-align: left;">Use of the
                Services are governed by the laws of Singapore, without reference to conflicts of laws rules.</p>
            </li>
            <li data-list-text="8.2.">
              <p style="padding-top: 11pt;padding-left: 45pt;text-indent: -21pt;line-height: 122%;text-align: left;">
                Parties submit to the non-exclusive jurisdiction of the courts of Singapore in relation to all
                disputes and any claim relating to use of the Services or under the Terms &amp; Conditions.</p>
              <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
          </ol>
        </li>
        <li data-list-text="9.">
          <h2 style="padding-left: 23pt;text-indent: -17pt;line-height: 122%;text-align: left;"><a
              name="bookmark25">&zwnj;</a>Representations and Warranties with reference to Developers and Consumers
            residing outside the European Union</h2>
          <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
          <ol id="l37">
            <li data-list-text="9.1.">
              <p style="padding-left: 44pt;text-indent: -21pt;text-align: left;">By accessing and using the
                Services, you represent, undertake and warrant that:</p>
              <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
              <ol id="l38">
                <li data-list-text="9.1.1.">
                  <p style="padding-left: 66pt;text-indent: -25pt;text-align: left;">you have full capacity and
                    authority to (and do) accept and agree to the Terms &amp; Conditions;</p>
                  <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="9.1.2.">
                  <p style="padding-left: 66pt;text-indent: -25pt;text-align: left;">you have not previously been
                    suspended or prohibited from using the Services;</p>
                  <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="9.1.3.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: left;">you will
                    comply with all applicable laws and regulations with respect to your activities on and in
                    connection with the Services; and</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
                <li data-list-text="9.1.4.">
                  <p style="padding-left: 66pt;text-indent: -25pt;line-height: 122%;text-align: left;">you will
                    comply with all applicable security or encryption standards, rules, procedures and guidelines.
                  </p>
                </li>
              </ol>
            </li>
          </ol>
        </li>
        <li data-list-text="10.">
          <p style="padding-top: 3pt;padding-left: 23pt;text-indent: -18pt;line-height: 122%;text-align: justify;">
            You will provide all support, information and assistance necessary for us or our authorised
            representatives to conduct investigations, audits or inspections for the purpose of ensuring proper
            compliance with the Terms &amp; Conditions or our legal or regulatory obligations, without any cost to
            us. <b>Appendices</b></p>
        </li>
      </ol>
      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
      <h2 style="padding-left: 23pt;text-indent: 0pt;line-height: 243%;text-align: left;">Appendix 1 <span
          class="p">Service description and system requirements for Affinidi Login </span>Appendix 2 <span
          class="p">Service description and system requirements for Affinidi Portal </span>Appendix 3 <span
          class="p">Service description and system requirements for Affinidi CLI </span>Appendix 4 <span
          class="p">Service description and system requirements for Affinidi Vault</span></h2>
      <h2 style="padding-left: 23pt;text-indent: 0pt;text-align: left;">Appendix 5 <span class="p">Service
          description and system requirements for Affinidi Mobile App (Beta)</span></h2>
      <p class="s1" style="padding-top: 3pt;text-indent: 0pt;text-align: center;">Appendix 1</p>
      <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
      <p class="s1" style="text-indent: 0pt;text-align: center;">Service Description and System Requirements for
        Affinidi Login</p>
      <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
      <ol id="l39">
        <li data-list-text="1">
          <h2 style="padding-left: 33pt;text-indent: -28pt;text-align: left;">Service Description</h2>
          <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
          <p style="padding-left: 5pt;text-indent: 0pt;line-height: 122%;text-align: justify;"><a
              href="https://openid.net/specs/openid-connect-4-verifiable-presentations-1_0-07.html" class="s2"
              target="_blank">Affinidi Login enables Developers to adopt passwordless authentication flows for their
              applications with de- centralised identity controlled by Consumers. With Affinidi Login, Developers
              are no longer burdened with collecting user information during registration. Instead, the Consumer’s
              first sign-in doubles as their registra- tion, and all the necessary data for onboarding can be
              requested during this streamlined sign- in/signup process. The data obtained through Affinidi Login is
              verifiable, eliminating the need for traditional measures like &#39;for- got password&#39; or
              &#39;validate your email address&#39; or &#39;validate your phone.&#39; For Consumers, Affinidi Login
              gives full control, ensuring that they consent to the information shared in a transparent and
              user-friendly manner. This streamlined approach empowers Developers to create efficient user
              experiences with data integrity, en- hances security and privacy and ensures compatibility with
              industry standards, such as OID4VP (</a><a
              href="https://openid.net/specs/openid-connect-4-verifiable-presentations-1_0-07.html" class="a"
              target="_blank">Open ID </a><span
              style=" color: #00F; font-family:&quot;Times New Roman&quot;, serif; font-style: normal; font-weight: normal; text-decoration: underline; font-size: 10pt;">for</span><a
              href="https://openid.net/specs/openid-connect-4-verifiable-presentations-1_0-07.html"
              style=" color: #00F; font-family:&quot;Times New Roman&quot;, serif; font-style: normal; font-weight: normal; text-decoration: none; font-size: 10pt;"
              target="_blank"> </a><a
              href="https://openid.net/specs/openid-connect-4-verifiable-presentations-1_0-07.html" class="a"
              target="_blank">Verifiable </a><span
              style=" color: #00F; font-family:&quot;Times New Roman&quot;, serif; font-style: normal; font-weight: normal; text-decoration: underline; font-size: 10pt;">Presentations</span>)
            which ensures the verification of user authenticity without the need for direct com- munication with the
            issuer, reducing the risk of tampering and ensuring data integrity.</p>
          <p style="text-indent: 0pt;text-align: left;"><br /></p>
        </li>
        <li data-list-text="2">
          <h2 style="padding-left: 33pt;text-indent: -28pt;text-align: left;">System Requirements</h2>
        </li>
      </ol>
      <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
      <p class="s5" style="padding-left: 5pt;text-indent: 0pt;line-height: 122%;text-align: justify;"><a
          href="https://openid.net/developers/how-connect-works/" class="s2" target="_blank">Affinidi Login can be
          integrated with applications that support OIDC (</a><a href="https://openid.net/developers/how-connect-works/"
          class="a" target="_blank">OpenID </a><span
          style=" color: #00F; font-family:&quot;Times New Roman&quot;, serif; font-style: normal; font-weight: normal; text-decoration: underline; font-size: 10pt;">Connect</span><a
          href="https://oauth.net/2/" class="s2" target="_blank">) standard which is an interoperable authentication
          protocol based on the </a><a href="https://oauth.net/2/" class="a" target="_blank">OAuth </a><span
          style=" color: #00F; font-family:&quot;Times New Roman&quot;, serif; font-style: normal; font-weight: normal; text-decoration: underline; font-size: 10pt;">2.0</span>
        <span style=" color: #000;">framework of specifications (IETF RFC 6749 and 6750). It simplifies the way to
          verify the identity of Consumers in a standardised manner and to obtain Consumer profile information using
          an interoperable API.</span>
      </p>
      <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
      <p style="padding-left: 5pt;text-indent: 0pt;line-height: 122%;text-align: justify;">While Affinidi may
        provide ready to use libraries and SDKs for specific programming languages or frame- works for seamless
        integration with Affinidi Login, it doesn’t limit the usage or integration of Affinidi Login within
        applications that are built with other programming languages, if those applications are compatible with OIDC
        standard. However, both Developers and Consumers will need Affinidi Vault to use Affinidi Login from any
        application it was integrated into, hence certain limitations may apply to those Consumers depending on
        their browsers, device or operating system (see System Requirements for Affinidi Vault). In order to use
        Affinidi Login, also Developers need Affinidi Vault.</p>
      <p class="s1" style="padding-top: 3pt;text-indent: 0pt;text-align: center;">Appendix 2</p>
      <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
      <p class="s1" style="text-indent: 0pt;text-align: center;">Service Description and System Requirements for
        Affinidi Portal</p>
      <p style="padding-top: 3pt;text-indent: 0pt;text-align: left;"><br /></p>
      <ol id="l40">
        <li data-list-text="1">
          <h2 style="padding-left: 33pt;text-indent: -28pt;text-align: left;">Service Description</h2>
          <ol id="l41">
            <li data-list-text="a)">
              <p style="padding-top: 10pt;padding-left: 41pt;text-indent: -18pt;line-height: 122%;text-align: justify;">
                Affinidi Portal is a web application designed to streamline developers&#39; interactions with
                Affinidi Services, offering a user-friendly interface for accessing, configuring, and tracking
                various Affinidi offerings. This portal simplifies the integration process, allowing developers to
                harness the full po- tential of Affinidi Services</p>
              <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="b)">
              <p style="padding-left: 41pt;text-indent: -18pt;line-height: 122%;text-align: justify;">Developers can
                log in to the Affinidi ecosystem using Affinidi Login which requires them to share their verified
                email address from the Affinidi vault. On the first login, a default project will be created for the
                Developer. Under projects, Developers can configure different Affinidi services (Affinidi Login
                etc.). They will be able to seamlessly access the Projects and service configured within the
                projects through the Portal. The Developers will also be able to track the usage of the services and
                manage their accounts from the Portal. The Developers would be able to seek customer support using
                the Developer Portal.</p>
              <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="c)">
              <p style="padding-left: 41pt;text-indent: -18pt;line-height: 122%;text-align: justify;">Affinidi
                Portal empowers Developers with the tools they need to efficiently manage projects, config- ure
                services, access documentation, monitor usage and manage their accounts. With a commitment to
                user-friendly design and robust functionality, Affinidi Portal is the gateway to unlocking the full
                potential of Affinidi Services for Developers.</p>
              <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="d)">
              <p style="padding-left: 41pt;text-indent: -18pt;line-height: 122%;text-align: justify;">To gain access
                to Affinidi Portal, Developers utilize the secure Affinidi Login, which requires them to share their
                email address from their Affinidi Vault. The unique User Decentralized Identifier (<b>DID</b>),
                created during the Affinidi Vault setup, serves as the Developer&#39;s identifier within the portal.
                Prior to accessing the portal, Developers must complete the Affinidi Vault setup.</p>
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
            </li>
          </ol>
        </li>
        <li data-list-text="2">
          <h2 style="padding-left: 33pt;text-indent: -28pt;line-height: 11pt;text-align: left;">System Requirements
            for Affinidi Portal</h2>
        </li>
      </ol>
      <ol id="l42">
        <li data-list-text="a.">
          <p style="padding-left: 51pt;text-indent: -17pt;line-height: 11pt;text-align: left;">Browser:</p>
          <p style="text-indent: 0pt;text-align: left;"><br /></p>
          <ol id="l43">
            <li data-list-text="i.">
              <p style="padding-left: 64pt;text-indent: -14pt;text-align: left;">Microsoft Windows 10 or newer:
                Google Chrome (latest stable version)</p>
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="ii.">
              <p style="padding-left: 63pt;text-indent: -16pt;text-align: left;">MacOS 10.15 or newer: Google Chrome
                (latest stable version)</p>
            </li>
          </ol>
        </li>
        <li data-list-text="b.">
          <p style="padding-top: 11pt;padding-left: 17pt;text-indent: -17pt;text-align: right;">Browser
            Configuration:</p>
          <p style="text-indent: 0pt;text-align: left;"><br /></p>
          <ol id="l44">
            <li data-list-text="i.">
              <p style="padding-left: 14pt;text-indent: -14pt;text-align: right;">JavaScript is enabled</p>
              <p style="text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="ii.">
              <p style="padding-left: 63pt;text-indent: -16pt;text-align: left;">Technically required Cookies are
                enabled</p>
            </li>
          </ol>
        </li>
      </ol>
      <p class="s1" style="padding-top: 3pt;text-indent: 0pt;text-align: center;">Appendix 3</p>
      <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
      <p class="s1" style="text-indent: 0pt;text-align: center;">Service Description and System Requirements for
        Affinidi CLI</p>
      <p style="padding-top: 3pt;text-indent: 0pt;text-align: left;"><br /></p>
      <ol id="l45">
        <li data-list-text="1">
          <h2 style="padding-left: 33pt;text-indent: -28pt;text-align: left;">Service Description</h2>
          <p style="padding-top: 1pt;text-indent: 0pt;text-align: left;"><br /></p>
          <ol id="l46">
            <li data-list-text="a)">
              <p style="padding-left: 41pt;text-indent: -18pt;line-height: 108%;text-align: justify;">Affinidi CLI
                is a tool designed for Developers to seamlessly access, configure, and track Affinidi Services
                through a command-line interface (CLI). Leveraging the Node Package Manager (NPM), Developers can
                easily import Affinidi CLI and kick-start their journey with Affinidi Services. Af- finidi CLI
                empowers Developers to efficiently interact with Affinidi Services through a simple and convenient
                command-line interface. Whether creating Projects, configuring login options, or manag- ing user
                groups, Affinidi CLI streamlines the process for Developers working with Affinidi services.</p>
              <p style="padding-top: 10pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="b)">
              <p style="padding-left: 41pt;text-indent: -18pt;line-height: 108%;text-align: justify;">After
                installation, Developers can use the Affinidi start command to log in to the Affinidi ecosystem. On
                the first login, a default project will be created for the Developer. The Developer is required to
                share their email address from the Affinidi Vault. A User DID is generated during the Affinidi Vault
                creation and serves as the Developer&#39;s identifier. If the Developer has not set up the Affinidi
                Vault, they will be guided through the Affinidi Vault setup process.</p>
              <p style="padding-top: 10pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
          </ol>
        </li>
        <li data-list-text="2">
          <h2 style="padding-left: 19pt;text-indent: -14pt;text-align: left;">System Requirements</h2>
          <p style="padding-top: 3pt;text-indent: 0pt;text-align: left;"><br /></p>
          <ol id="l47">
            <li data-list-text="a)">
              <p style="padding-left: 41pt;text-indent: -17pt;text-align: left;"><a href="https://git-scm.com/">git</a>
              </p>
              <p style="padding-top: 1pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="b)">
              <p class="s5" style="padding-left: 41pt;text-indent: -17pt;text-align: left;"><span
                  style=" color: #00F; font-family:&quot;Times New Roman&quot;, serif; font-style: normal; font-weight: normal; text-decoration: underline; font-size: 10pt;">NodeJS
                  v18</span> <a href="https://github.com/nvm-sh/nvm" class="s2" target="_blank">or higher (it is
                  recommended to use </a><span
                  style=" color: #00F; font-family:&quot;Times New Roman&quot;, serif; font-style: normal; font-weight: normal; text-decoration: underline; font-size: 10pt;">nvm</span><span
                  style=" color: #000;">)</span></p>
              <p style="padding-top: 1pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="c)">
              <p style="padding-left: 41pt;text-indent: -17pt;text-align: left;"><a
                  href="https://www.google.com/intl/en_sg/chrome/" class="s2" target="_blank">A chromium based
                  browser (</a><a href="https://www.google.com/intl/en_sg/chrome/" class="a"
                  target="_blank">Chrome</a><a href="https://brave.com/" class="s2" target="_blank">, </a><a
                  href="https://brave.com/" class="a" target="_blank">Brave</a>, etc.) as your default browser</p>
              <p style="padding-top: 3pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="d)">
              <p style="padding-left: 41pt;text-indent: -17pt;text-align: left;">Affinidi Vault</p>
              <p style="padding-top: 1pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="e)">
              <p style="padding-left: 41pt;text-indent: -17pt;text-align: left;">Valid Email ID in order to receive
                the OTP.</p>
            </li>
          </ol>
        </li>
      </ol>
      <p class="s1" style="padding-top: 3pt;text-indent: 0pt;text-align: center;">Appendix 4</p>
      <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
      <p class="s1" style="text-indent: 0pt;text-align: center;">Service Description and System Requirements for
        Affinidi Vault</p>
      <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
      <ol id="l48">
        <li data-list-text="1">
          <h2 style="padding-left: 33pt;text-indent: -28pt;text-align: justify;">Service Description</h2>
          <ol id="l49">
            <li data-list-text="a)">
              <p style="padding-top: 2pt;padding-left: 41pt;text-indent: -18pt;line-height: 122%;text-align: justify;">
                Affinidi Vault empowers Consumers with a “360-degree view of oneself”, allowing them to own,
                collect, store and share their data in a manner that aligns with their preferences and values. By
                using Affinidi Vault, Consumers can securely manage their personal data, benefit from passwordless
                au- thentication, have the choice of storing their data based on their preferences and share data in
                a pri- vacy-enabled and consent-driven manner.</p>
              <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="b)">
              <p style="padding-left: 41pt;text-indent: -18pt;line-height: 122%;text-align: justify;">Affinidi Vault
                enhances the sign-in and sign-up process. There is no longer a need to collect infor- mation during
                registration. The Consumer’s first sign-in serves as registration, and onboarding data can be
                requested then. All data obtained through is verifiable, eliminating the need for cumbersome
                validation. Regarding Privacy-Enabled Data Sharing, Affinidi Vault leverages decentralised technol-
                ogies, such as verifiable credentials, to enable privacy-enabled data sharing. During the Affinidi
                Vault setup, a unique User Decentralized Identifier (DID) is created that serves as the Consumer’s
                identifier.</p>
              <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
            <li data-list-text="c)">
              <p style="padding-left: 41pt;text-indent: -17pt;text-align: justify;">Within the Affinidi Vault, the
                user will be able to:</p>
              <ol id="l50">
                <li data-list-text="i)">
                  <p class="s5"
                    style="padding-top: 2pt;padding-left: 59pt;text-indent: -18pt;line-height: 122%;text-align: justify;">
                    <a href="http://www.vault.affinidi.com/" class="s2" target="_blank">Set up a vault by either a)
                      going/being redirected to </a><span
                      style=" color: #00F; font-family:&quot;Times New Roman&quot;, serif; font-style: normal; font-weight: normal; text-decoration: underline; font-size: 10pt;">www.vault.affinidi.com</span>
                    <span style=" color: #000;">, through either desktop/mobile web app or b) by downloading the
                      corresponding Chrome Extension from the Chrome Web Store and then logging into the vault ;and
                      in both cases secure Affinidi Vault with a passphrase.</span>
                  </p>
                </li>
                <li data-list-text="ii)">
                  <p style="padding-left: 59pt;text-indent: -18pt;line-height: 122%;text-align: justify;">In case
                    the Developer/Consumer is using the Chrome extension the vault can also be secured with
                    biometrics. (The biometric unlocking method is an effective way to secure the Affinidi Vault and
                    the data stored therein while being convenient and fast for the Consumer, improving their
                    experience and eliminating the need to manually entering their passphrase every time their
                    Affinidi Vault is locked)</p>
                </li>
                <li data-list-text="iii)">
                  <p style="padding-left: 59pt;text-indent: -17pt;line-height: 11pt;text-align: justify;">Access the
                    profile page and fill, modify or delete the profile data</p>
                </li>
                <li data-list-text="iv)">
                  <p
                    style="padding-top: 2pt;padding-left: 59pt;text-indent: -18pt;line-height: 121%;text-align: justify;">
                    While using the Vault through a Chrome Extension, To perform a Liveness Check as a proof of
                    being a living person</p>
                </li>
                <li data-list-text="v)">
                  <p style="padding-left: 59pt;text-indent: -17pt;text-align: justify;">Authenticate on a Website
                    and share the data from his vault</p>
                </li>
                <li data-list-text="vi)">
                  <p style="padding-top: 2pt;padding-left: 59pt;text-indent: -18pt;line-height: 121%;text-align: left;">
                    Depending on the type of device the vault is created, the data is stored in the respective
                    device storage.</p>
                </li>
                <li data-list-text="vii)">
                  <p class="s5" style="padding-left: 59pt;text-indent: -18pt;line-height: 122%;text-align: left;">While
                    using web app - @
                    <a href="http://www.vault.affinidi.com/" target="_blank"
                      style=" color: #00F; font-family:&quot;Times New Roman&quot;, serif; font-style: normal; font-weight: normal; text-decoration: underline; font-size: 10pt;">www.vault.affinidi.com</a>
                    <span style=" color: #000;"> or the mobile app(Android), the user is also provided an option to
                      back up and restore their data from the cloud wherein the user can upload a backup of his
                      vault into the cloud and then restore it with a backup ID and his current pass- phrase.</span>
                  </p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
            <li data-list-text="d)">
              <p style="padding-left: 41pt;text-indent: -17pt;text-align: left;">With regards to the cloud backup:
              </p>
              <ol id="l51">
                <li data-list-text="i)">
                  <p style="padding-top: 2pt;padding-left: 59pt;text-indent: -17pt;text-align: left;">The user can
                    select the option from the settings menu in the vault</p>
                </li>
                <li data-list-text="ii)">
                  <p style="padding-top: 2pt;padding-left: 59pt;text-indent: -18pt;line-height: 121%;text-align: left;">
                    Once the user selects the option to back up their vault on the cloud, the user is required to
                    use their passphrase to initiate the process</p>
                </li>
                <li data-list-text="iii)">
                  <p style="padding-left: 59pt;text-indent: -18pt;line-height: 122%;text-align: left;">Once the
                    process is initiated, the user would receive a “Backup-id” on this email specified in the vault.
                    This would be unique id assigned to the user for restoring vault from cloud back-up</p>
                </li>
                <li data-list-text="iv)">
                  <p style="padding-left: 59pt;text-indent: -18pt;line-height: 122%;text-align: left;">This backup
                    id along with the passphrase would be required to be used for restoring the cloud backup</p>
                </li>
              </ol>
            </li>
            <li data-list-text="e)">
              <p style="padding-top: 3pt;padding-left: 41pt;text-indent: -17pt;text-align: left;">In regards of the
                Liveness Check:</p>
              <ol id="l52">
                <li data-list-text="i)">
                  <p style="padding-top: 2pt;padding-left: 59pt;text-indent: -18pt;line-height: 122%;text-align: left;">
                    The liveness check is a feature designed to ensure that a live person is interacting with the
                    ap- plication, as opposed to an automated process like a bot or a static image.</p>
                </li>
                <li data-list-text="ii)">
                  <p style="padding-left: 59pt;text-indent: -18pt;line-height: 122%;text-align: left;">During the
                    liveness check, the user receives a prompt instructing them to show their face to the camera.
                    The application analyses the data to determine whether the user face is consistent with live
                    behaviour. This may involve assessing movement, changes in facial features, or other dy- namic
                    elements.</p>
                </li>
                <li data-list-text="iii)">
                  <p style="padding-left: 59pt;text-indent: -18pt;line-height: 122%;text-align: left;">When
                    authenticating into a website, the user can be asked to share this information as a proof of
                    humanhood.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
            <li data-list-text="f)">
              <p style="padding-left: 41pt;text-indent: -17pt;text-align: left;">In regards of the Affinidi Desktop
                App:</p>
              <ol id="l53">
                <li data-list-text="i)">
                  <p style="padding-top: 2pt;padding-left: 59pt;text-indent: -18pt;line-height: 122%;text-align: left;">
                    Affinidi Desktop App enables the use of biometrics on Consumer’s desktop equipment in order to
                    unlock the Affinidi Vault. This app is intended to be used only as an add-on for the Affinidi
                    Vault as an additional layer of security. After downloading the Affinidi Desktop App, the Con-
                    sumer will pair it with the Affinidi Vault. The biometric unlocking method is an effective way
                    to secure the Affinidi Vault and the data stored therein while being convenient and fast for the
                    Consumer, improving their experience and eliminating the need to manually entering their
                    passphrase every time their Affinidi Vault is locked.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
            <li data-list-text="g)">
              <p style="padding-left: 41pt;text-indent: -17pt;text-align: left;">Any other new feature that may be
                introduced by us to the users of the vault.</p>
              <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
            </li>
          </ol>
        </li>
        <li data-list-text="2">
          <h2 style="padding-left: 33pt;text-indent: -28pt;text-align: left;">System Requirements</h2>
          <ol id="l54">
            <li data-list-text="a)">
              <p style="padding-top: 2pt;padding-left: 41pt;text-indent: -17pt;text-align: left;">Browser for Chrome
                Extension:</p>
              <ol id="l55">
                <li data-list-text="i)">
                  <p style="padding-top: 2pt;padding-left: 59pt;text-indent: -17pt;text-align: left;">Microsoft
                    Windows 10 or newer: Google Chrome (latest stable version)</p>
                </li>
                <li data-list-text="ii)">
                  <p style="padding-top: 2pt;padding-left: 59pt;text-indent: -17pt;text-align: left;">MacOS 10.15 or
                    newer: Google Chrome (latest stable version)</p>
                  <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
            <li data-list-text="b)">
              <p style="padding-left: 41pt;text-indent: -17pt;text-align: left;">For Desktop App</p>
              <ol id="l56">
                <li data-list-text="i)">
                  <p style="padding-top: 2pt;padding-left: 59pt;text-indent: -18pt;line-height: 122%;text-align: left;">
                    Passcode/Biometrics device protection is enabled- users won’t be able to use or pair Desktop App
                    in case biometrics and account password are not set on the system of the user.</p>
                  <p style="padding-top: 2pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
            <li data-list-text="c)">
              <p style="padding-left: 41pt;text-indent: -17pt;text-align: left;">For Wep App</p>
              <ol id="l57">
                <li data-list-text="i)">
                  <p style="padding-top: 2pt;padding-left: 59pt;text-indent: -17pt;text-align: left;">For the best
                    experience we recommend using Google Chrome browser.</p>
                </li>
                <li data-list-text="ii)">
                  <p style="padding-top: 2pt;padding-left: 59pt;text-indent: -17pt;text-align: left;">Other browsers
                    that can be used:</p>
                  <ol id="l58">
                    <li data-list-text="(1)">
                      <p class="s7" style="padding-top: 2pt;padding-left: 77pt;text-indent: -17pt;text-align: left;">
                        Safari</p>
                    </li>
                    <li data-list-text="(2)">
                      <p class="s7" style="padding-top: 2pt;padding-left: 77pt;text-indent: -17pt;text-align: left;">
                        Firefox</p>
                    </li>
                    <li data-list-text="(3)">
                      <p class="s7" style="padding-top: 2pt;padding-left: 77pt;text-indent: -17pt;text-align: left;">
                        Opera</p>
                    </li>
                    <li data-list-text="(4)">
                      <p class="s7" style="padding-top: 2pt;padding-left: 77pt;text-indent: -17pt;text-align: left;">
                        Edge</p>
                      <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
            <li data-list-text="d)">
              <p style="padding-left: 41pt;text-indent: -17pt;text-align: left;">JavaScript is enabled</p>
            </li>
          </ol>
        </li>
      </ol>
      <p class="s1" style="padding-top: 3pt;text-indent: 0pt;text-align: center;">Appendix 5</p>
      <p style="padding-top: 5pt;text-indent: 0pt;text-align: left;"><br /></p>
      <p class="s1" style="text-indent: 0pt;text-align: center;">Service Description and System Requirements for
        Affinidi Mobile App (Beta)</p>
      <p style="padding-top: 4pt;text-indent: 0pt;text-align: left;"><br /></p>
      <ol id="l59">
        <li data-list-text="1">
          <h2 style="padding-left: 33pt;text-indent: -28pt;text-align: left;">Service Description</h2>
          <p style="padding-top: 3pt;text-indent: 0pt;text-align: left;"><br /></p>
          <ol id="l60">
            <li data-list-text="a)">
              <p style="padding-left: 33pt;text-indent: -17pt;text-align: left;">Affinidi Vault Mobile App is the
                mobile client of the Affinidi Vault.</p>
              <p style="padding-left: 33pt;text-indent: 0pt;text-align: left;">It allows consumers to own, collect,
                store, and share their data in a manner that aligns with their pref- erences and values. By using
                the mobile app, Consumers can securely manage their personal data, benefit from passwordless
                authentication, have the choice of storing their data based on their prefer- ences and share data in
                a privacy-enabled and consent-driven manner.</p>
            </li>
            <li data-list-text="b)">
              <p style="padding-top: 11pt;padding-left: 33pt;text-indent: -17pt;text-align: left;">The mobile app
                allows the user to:</p>
              <ol id="l61">
                <li data-list-text="i.">
                  <p style="padding-left: 86pt;text-indent: -5pt;text-align: left;">Set up a vault and secure it
                    with a passphrase and/or biometrics</p>
                </li>
                <li data-list-text="ii.">
                  <p style="padding-left: 75pt;text-indent: 2pt;text-align: left;">Access the profile page and fill,
                    modify or delete the profile data iii.Authenticate on a website and share data from his vault
                  </p>
                  <p style="padding-top: 1pt;text-indent: 0pt;text-align: left;"><br /></p>
                </li>
              </ol>
            </li>
          </ol>
        </li>
        <li data-list-text="2">
          <h2 style="padding-left: 33pt;text-indent: -28pt;text-align: left;">System Requirements</h2>
        </li>
      </ol>
      <p style="padding-top: 2pt;padding-left: 33pt;text-indent: 0pt;text-align: left;">Android OS Version: V.6.0 or
        higher</p>
      </p>
      <button
        class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full aspect-square px-3 py-0.5 text-2xl bg-white shadow-md"
        @click="autoScroll">↓</button>
    </Modal>
  </External>
</template>
