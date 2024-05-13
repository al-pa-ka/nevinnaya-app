<template>
    <BaseDefaultForm ref="baseForm">
        <h5 class="uppercase">Укажите условия доставки и возврата</h5>
        <div class="flex w-full flex-row gap-5">
            <div class="flex flex-col items-center justify-center">
                
            </div>
            <span class="flex h-full w-[2px] bg-gray-400"></span>
            <div class="flex flex-col">
                
            </div>
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
