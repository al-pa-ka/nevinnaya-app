<template>
    <div class="flex w-full flex-row items-center gap-20 overflow-hidden">
        <div class="flex-shrink-0 cursor-pointer" v-on:click="$emit('prev', ($refs.input as HTMLSpanElement)?.textContent?.trim())">
            <img v-if="hasPrev" class="rotate-180" :src="arrowNext" alt="" />
        </div>

        <div class="flex w-full max-w-full flex-1 flex-shrink-0 flex-col items-center gap-4 overflow-visible bg-white p-10 font-[Roboto]">
            <slot>
                <h5 class="uppercase">{{ name }}</h5>
                <span
                    ref="input"
                    class="min-w-[200px] max-w-full text-wrap break-words break-all border-b-2 text-center outline-none"
                    contenteditable="true"
                    >{{ initialValue }}</span
                >
            </slot>
            <span ref="errorMessage" class="font-[Roboto] text-[15px] text-red-500" v-if="errorMessage">{{ errorMessage }}</span>
        </div>

        <div class="flex-shrink-0 cursor-pointer" v-on:click="$emit('next', ($refs.input as HTMLSpanElement)?.textContent?.trim())">
            <img v-if="hasNext" class="" :src="arrowNext" alt="" />
        </div>
    </div>
</template>

<script lang="ts">
import arrowNext from "@/assets/images/arrow-next.svg";
import { defineComponent, type PropType } from "vue";
export default defineComponent({
    props: {
        name: Object as PropType<string>,
        hasNext: Object as PropType<boolean>,
        hasPrev: Object as PropType<boolean>,
        initialValue: Object as PropType<string>,
    },
    setup() {
        return {
            arrowNext,
        };
    },
    data() {
        return {
            errorMessage: "",
        };
    },
    methods: {
        setErrorMessage(errorMessage: string) {
            this.errorMessage = errorMessage;
        },
        getValue(): string {
            return (this.$refs.input! as HTMLSpanElement).textContent!;
        },
    },
});
</script>
