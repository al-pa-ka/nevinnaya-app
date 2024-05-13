<template>
    <div
        ref="container"
        class="relative flex h-fit min-w-max select-none flex-row items-center gap-[10px] font-[Roboto]"
    >
        <span
            class="z-10 pl-[20px] pt-[10px] text-[20px] font-semibold uppercase"
            :class="{
                'text-white': opened,
            }"
            >{{ title }}</span
        >
        <svg
            width="12"
            height="6"
            viewBox="0 0 12 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="z-10 mt-2 h-fit origin-center cursor-pointer transition-transform"
            :class="{
                'rotate-180': opened,
                'text-white': opened,
            }"
            v-on:click="opened = !opened"
        >
            <path
                d="M1 1L5.65448 4.51671C6.02826 4.79913 6.548 4.7842 6.90496 4.48079L11 1"
                stroke="currentColor"
            />
        </svg>

        <ul
            ref="dropdownList"
            v-show="opened"
            class="absolute top-0 z-0 flex min-w-max select-none flex-col items-start bg-black p-[20px] pt-[50px] text-white"
        >
            <li v-for="(value, idx) in values" :key="idx" class="flex flex-row gap-[15px]">
                <input
                    ref="inputChekbox"
                    v-on:input="emitValue()"
                    v-if="!isRadio"
                    type="checkbox"
                    :name="title"
                    :value="value"
                />
                <input
                    ref="inputRadio"
                    v-on:input="emitValue()"
                    v-else
                    type="radio"
                    :name="title"
                    :value="value"
                />
                <span class="text-[14px] uppercase">{{ value }}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
    data() {
        return {
            opened: true,
        };
    },

    emits: ["valueChanged"],
    methods: {
        emitValue() {
            console.log("emit");
            if (this.isRadio) {
                const checkedButton = (this.$refs.inputRadio as Array<HTMLInputElement>).find(
                    (input) => {
                        return input.checked;
                    }
                );
                console.log(checkedButton?.value);
                this.$emit("valueChanged", checkedButton?.value);
            } else {
                const checkedButtons = (this.$refs.inputChekbox as Array<HTMLInputElement>).filter(
                    (input) => {
                        return input.checked;
                    }
                );
                const values = checkedButtons.map((input) => {
                    return input.value;
                });
                console.log(values);
                this.$emit("valueChanged", values);
            }
        },
    },
    mounted() {
        this.$nextTick(function () {
            const dropdownList = this.$refs.dropdownList as HTMLUListElement;
            const container = this.$refs.container as HTMLDivElement;
            console.log(dropdownList.scrollWidth);
            dropdownList.clientWidth > container.clientWidth
                ? (container.style.width = dropdownList.clientWidth + "px")
                : (dropdownList.style.width = container.clientWidth + 20 + "px");
            this.opened = false;
        });
    },
    props: {
        title: Object as PropType<string>,
        values: Object as PropType<string[]>,
        isRadio: {
            type: Object as PropType<boolean>,
            default: false,
        },
    },
});
</script>
