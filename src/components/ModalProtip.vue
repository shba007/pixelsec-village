<script setup lang="ts">
import popup from '@/assets/popup/bg-bar.png'

const props = defineProps<{
    title: string
    containerClass?: string
}>()
</script>

<template>
    <div class="fixed size-full z-10">
        <div
            class="flex gap-1 absolute left-1/2 top-1/4 aspect-[263/73] max-h-[80vh] w-3/4 -translate-x-1/2 -translate-y-1/2  md:w-3/5">
            <img :src="popup" alt="popupPortrait" class="absolute left-0 top-0 size-full -z-10" />
            <div class="relative flex flex-col justify-center w-fit aspect-[27/32] items-center my-3 mx-4">
                <h6 class="text-2xl text-[26px] lg:text-[2.5rem] lg:leading-[3rem] text-purple-600">Pro Tip</h6>
                <img src="/images/protip.gif" class="h-[60%]" />
            </div>
            <div class="protip relative mx-auto flex size-full max-w-[820px] flex-col items-center justify-center gap-10 overflow-hidden pr-4"
                :class="containerClass">
                <p v-if="title" class="font-semibold text-left text-2xl text-[26px] lg:text-[2.5rem] lg:leading-[3rem]"
                    v-html="title" />
            </div>
        </div>
    </div>
</template>

<style lang="css">
p.protip>strong {
    @apply text-blue-600 uppercase
}
</style>
