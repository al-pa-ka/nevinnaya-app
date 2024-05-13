<template>
    <BaseDefaultForm ref="baseForm">
        <h5 class="uppercase">Укажите цвета</h5>
        <div class="flex w-full flex-col gap-5">
            <BaseSelect
                ref="input"
                v-on:keypress.enter="appendAdvantage"
                placeholder="Вводите цвета по одному нажимая Enter для добавления или выбирайте из выпадающего списка"
                v-on:select-input="appendAdvantage"
                :selectOptions="existingColors"
            ></BaseSelect>
            <ul class="flex w-full flex-col items-start gap-1">
                <li v-for="(color, index) in values" :key="color" class="flex w-full flex-row items-center gap-5">
                    <span class="flex-1">{{ color }}</span>
                    <span @click="values.splice(index, 1)" class="cursor-pointer text-gray-400 underline">Удалить</span>
                </li>
            </ul>
        </div>
    </BaseDefaultForm>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseDefaultForm from "./BaseDefaultForm.vue";
import BaseSelect from "../BaseSelect.vue";
import multiplyInputValueByEnter, { type HasValue } from "@/composes/MultiplyValuesByEnter";
import { DOMAIN } from "@/constants";
export default defineComponent({
    setup() {
        const { values, onEnter } = multiplyInputValueByEnter();
        return { values, onEnter };
    },
    components: {
        BaseDefaultForm,
        BaseSelect,
    },
    data() {
        return {
            existingColors: [] as string[],
        };
    },
    async mounted() {
        const response = await fetch(`http://${DOMAIN}/goods/get/color/`, { method: "POST" });
        const colors = (await response.json()) as { pk: number; color: string }[];
        this.existingColors = colors.map((color) => color.color);
    },
    methods: {
        appendAdvantage(e: Event) {
            const input = this.$refs.input as InstanceType<typeof BaseSelect>;
            //@ts-ignore
            event.target.textContent = event.target.textContent.toUpperCase();
            this.onEnter(e, input);
            input.clear();
        },
        getValue() {
            return this.values;
        },
        setErrorMessage(errorMessage: string) {
            (this.$refs.baseForm! as InstanceType<typeof BaseDefaultForm>).setErrorMessage(errorMessage);
        },
    },
});
</script>

<style scoped>
span[contentEditable="true"]:empty::before {
    content: attr(placeholder);
    color: gray;
}
</style>
