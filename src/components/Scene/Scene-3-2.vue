<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { External } from 'vue3-pixi'
import Modal from "@/components/Modal.vue";

const options = ref([
    { checked: false, describe: 'Past online shopping' },
    { checked: false, describe: 'Info' },
    { checked: false, describe: 'Bank/Card details' },
    { checked: false, describe: 'Social media profile' },
])

function onClick(index: number, checked: boolean) {
    options.value[index].checked = checked
}
</script>

<template>
    <External class="absolute left-0 top-0 h-dvh w-dvw">
        <Modal type="short" title="">
            <ul class="flex flex-col">
                <li class="flex" v-for="{ checked, describe }, index of options">
                    <button class="active-btn" :class="checked ? 'checked' : 'unchecked'"
                        @click="onClick(index, !checked)" />
                    <span class="text-left text-2xl text-[26px] lg:text-[2.5rem] lg:leading-[3rem] whitespace-nowrap">
                        {{ describe }}
                    </span>
                </li>
            </ul>
        </Modal>
    </External>
</template>

<style lang="css" scoped>
.active-btn {
    @apply flex aspect-[8/3] h-[32px] items-center justify-center bg-contain bg-bottom bg-no-repeat lg:h-[80px];
}

.active-btn.checked {
    @apply bg-[url(@/assets/buttons/square-pressed.png)]
}

.active-btn.unchecked {
    @apply bg-[url(@/assets/buttons/square.png)]
}
</style>