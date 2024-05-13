<template>
    <BaseDefaultForm
        ref="baseForm"
        v-on:next="$emit('next', ($refs.select as InstanceType<typeof BaseSelect>).getValue())"
        v-on:prev="$emit('prev', ($refs.select as InstanceType<typeof BaseSelect>).getValue())"
    >
        <h5 class="mb-0 uppercase">Выберите материал</h5>
        <span class="text-gray-400 font-[14px]">*или введите новый</span>
        <BaseSelect ref="select" :select-options="createdMaterials"></BaseSelect>
    </BaseDefaultForm>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseDefaultForm from "./BaseDefaultForm.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import { DOMAIN } from "@/constants";
export default defineComponent({
    setup() {
        return {
            BaseSelect,
        };
    },
    components: {
        BaseDefaultForm,
        BaseSelect,
    },
    data() {
        return {
            opened: true,
            createdMaterials: [] as string[],
        };
    },
    methods: {
        setErrorMessage(errorMessage: string) {
            (this.$refs.baseForm! as InstanceType<typeof BaseDefaultForm>).setErrorMessage(errorMessage);
        },
        getValue() {
            return (this.$refs.select as InstanceType<typeof BaseSelect>).getValue();
        },
    },

    async mounted() {
        const response = await fetch(`http://${DOMAIN}/goods/get/material/`, { method: "POST" });
        const existingMaterials = (await response.json()) as { pk: number; material: string }[];
        this.createdMaterials = existingMaterials.map((material) => material.material);
    },
});
</script>
