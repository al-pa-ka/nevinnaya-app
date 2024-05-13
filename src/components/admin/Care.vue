<template>
    <BaseDefaultForm ref="baseForm">
        <h5 class="uppercase">Уход за тканью</h5>
        <div class="flex w-full flex-col gap-5">
            <BaseSelect
                ref="input"
                v-on:keypress.enter="appendCare"
                placeholder="Вводите пункты по одному нажимая Enter для добавления или выбирайте из выпадающего списка"
                v-on:select-input="appendCare"
                :selectOptions="existingCares"
            ></BaseSelect>
            <ul class="flex flex-col items-start gap-1">
                <li class="flex w-full flex-row items-center gap-5" v-for="(care, index) in values" :key="care">
                    <span class="flex-1">{{ care }}</span>
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
    data() {
        return {
            existingCares: [] as string[],
        };
    },
    components: {
        BaseDefaultForm,
        BaseSelect,
    },
    async mounted() {
        const response = await fetch(`http://${DOMAIN}/goods/get/care/`, { method: "POST" });
        const cares = (await response.json()) as { pk: number; care: string }[];
        this.existingCares = cares.map((care) => care.care);
    },
    methods: {
        appendCare(e: Event) {
            const input = this.$refs.input as InstanceType<typeof BaseSelect>;
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
