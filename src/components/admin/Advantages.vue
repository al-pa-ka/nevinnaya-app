<template>
    <BaseDefaultForm ref="baseForm">
        <h5 class="uppercase">Укажите достоинства товара</h5>
        <div class="flex w-full flex-col gap-5">
            <span
                ref="input"
                v-on:keypress.enter="appendAdvantage"
                placeholder="Вводите доистонства по одному нажимая Enter для добавления"
                contenteditable="true"
                class="min-w- h-fit w-full flex-1 border-b-2 outline-none"
            ></span>
            <ul class="flex flex-col items-start gap-1">
                <li class="flex w-full flex-row items-center gap-5" v-for="(advantage, index) in values">
                    <span class="flex-1">{{ advantage }}</span>
                    <span @click="values.splice(index, 1)" class="cursor-pointer text-gray-400 underline">Удалить</span>
                </li>
            </ul>
        </div>
    </BaseDefaultForm>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseDefaultForm from "./BaseDefaultForm.vue";
import multiplyValueInputByEnter from "@/composes/MultiplyValuesByEnter";
export default defineComponent({
    setup() {
        const { values, onEnter } = multiplyValueInputByEnter();
        return { values, onEnter };
    },
    components: {
        BaseDefaultForm,
    },
    methods: {
        appendAdvantage(e: Event) {
            e.preventDefault();
            const input = {
                el: this.$refs.input as HTMLSpanElement,
                getValue() {
                    return this.el.textContent?.trim() || "";
                },
            };
            this.onEnter(e, input);
            console.log(this.values);
            input.el.textContent = "";
        },
        getValue() {
            return this.values;
        },

        setErrorMessage(errorMessage: string) {
            (this.$refs.baseForm! as InstanceType<typeof BaseDefaultForm>).setErrorMessage(errorMessage);
        },
    },

    mounted() {
        console.log("mounted&&");
    },
});
</script>

<style scoped>
span[contentEditable="true"]:empty::before {
    content: attr(placeholder);
    color: gray;
}
</style>
