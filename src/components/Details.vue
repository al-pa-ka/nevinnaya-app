<template>
    <div class="m-0 flex h-fit select-none flex-row items-center justify-between">
        <p class="text-[26px] uppercase text-gray-600">
            {{ title }}
        </p>
        <p
            v-if="hidden"
            v-on:click="hidden = false"
            class="cursor-pointer text-[46px] uppercase text-gray-600"
        >
            +
        </p>
        <p
            v-if="!hidden"
            v-on:click="hidden = true"
            class="cursor-pointer text-[46px] uppercase text-gray-600"
        >
            -
        </p>
    </div>

    <div class="m-0 h-[2px] w-full bg-gray-400"></div>
    <slot v-if="!hidden"></slot>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        title: String,
    },
    data() {
        return {
            hidden: true,
        };
    },
});
</script>
