<template>
    <BaseDefaultForm ref="baseForm">
        <div class="flex flex-col">
            <div class="flex flex-col gap-3">
                <h5 class="font-Roboto text-[20px] uppercase">Введите доступные размеры</h5>
                <p class="font-[Roboto-Light] text-[16px]">Вводите размеры через пробел</p>
            </div>
            <span contenteditable="true" class="min-w-9 border-b-2 text-center font-[Roboto] outline-none" @input="proccessInput"></span>
            <div class="flex flex-row gap-2">
                <span v-for="size in sizes" :key="size">{{ size }}</span>
            </div>
        </div>
    </BaseDefaultForm>
</template>

<script lang="ts">
import BaseDefaultForm from "./BaseDefaultForm.vue";
import { defineComponent } from "vue";
export default defineComponent({
    components: { BaseDefaultForm },
    data() {
        return {
            sizes: [] as string[],
        };
    },
    methods: {
        setSelectionToEnd(contenteditableElement: HTMLElement) {
            const range = document.createRange();
            range.selectNodeContents(contenteditableElement);
            range.collapse(false);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
        },
        proccessInput(event: Event) {
            event.preventDefault();
            const input = event.target as HTMLSpanElement;
            console.log(input.textContent?.replace(/(?<=\s)\s+/g, ""));
            input.textContent = input.textContent?.toUpperCase().replace(/(?<=\s)\s+/g, "") || "";
            this.setSelectionToEnd(input);
            this.sizes = input.textContent.trim().split(" ");
        },
        getValue() {
            return this.sizes;
        },
        setErrorMessage(errorMessage: string) {
            (this.$refs.baseForm! as InstanceType<typeof BaseDefaultForm>).setErrorMessage(errorMessage);
        },
    },
});
</script>
