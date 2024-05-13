<template>
    <div class="flex h-screen w-screen items-center justify-center overflow-hidden bg-gray-400 p-20">
        <div class="min-w-[65px] flex-shrink-0 cursor-pointer" v-on:click="prev">
            <img v-show="hasPrev" class="rotate-180" :src="arrowNext" alt="" />
        </div>
        <keep-alive>
            <component :is="states[currentState][0]" v-bind="states[currentState][1]" ref="currentComponent"></component>
        </keep-alive>
        <div class="min-w-[65px] flex-shrink-0 cursor-pointer">
            <img v-show="hasNext" class="" :src="arrowNext" v-on:click="next" alt="" />
            <img v-show="isLast" :src="checkmark" alt="" v-on:click="toPreview()" />
        </div>
    </div>
</template>

<script lang="ts">
enum InputParts {
    NAME,
    PRICE,
    MATERIAL,
    DESCRIPTION,
    CATEGORY,
    ADVANTAGES,
    COLORS,
    CARE,
    PHOTOS,
    SIZES,
}

import arrowNext from "@/assets/images/arrow-next.svg";
import { defineComponent } from "vue";
import BaseDefaultForm from "@/components/admin/BaseDefaultForm.vue";
import ChooseMaterial from "@/components/admin/ChooseMaterial.vue";
import ChooseCategory from "@/components/admin/ChooseCategory.vue";
import Advantages from "@/components/admin/Advantages.vue";
import Colors from "@/components/admin/Colors.vue";
import Care from "@/components/admin/Care.vue";
import Photos from "@/components/admin/Photos.vue";
import Sizes from "@/components/admin/Sizes.vue";
import type { Rule } from "@/validation/Rule.ts";
import { NotBlank, IntegerOnly, CategoryValidate } from "@/validation/Rules";
import RuleSet from "@/validation/RuleSet";
import type { Category } from "@/data-types/Category";
import TheGoodViewContent from "@/components/TheGoodViewContent.vue";
import checkmark from "@/assets/images/ready.svg";

type InputStepComponent = {
    setErrorMessage: (errorMessage: string) => void;
    getValue: () => unknown;
};

export default defineComponent({
    emits: ["toPreview"],
    components: {
        BaseDefaultForm,
        ChooseMaterial,
        ChooseCategory,
        Advantages,
        Colors,
        Care,
        Photos,
        Sizes,
        TheGoodViewContent,
    },
    data() {
        const goodData = {
            name: "",
            price: "",
            material: "",
            description: "",
            category: {} as Category | "",
            advantages: [] as string[],
            colors: [] as string[],
            cares: [] as string[],
            photos: [] as number[],
            sizes: [] as string[],
        };
        const rulesets = [] as [RuleSet<any>, keyof typeof goodData][];
        return {
            currentState: InputParts.NAME,
            goodData,
            rulesets,
            states: [
                ["BaseDefaultForm", { name: "Введите название товара", key: "goodName" }, { rules: [new NotBlank()] }],
                ["BaseDefaultForm", { name: "Введите цену", key: "price" }, { rules: [new NotBlank(), new IntegerOnly()] }],
                ["ChooseMaterial", { name: "Материал", key: "material" }, { rules: [new NotBlank()] }],
                ["BaseDefaultForm", { name: "Описание товара", key: "description" }, { rules: [new NotBlank()] }],
                ["ChooseCategory", { name: "ChooseCategory", key: "category" }, { rules: [new NotBlank(), new CategoryValidate()] }],
                ["Advantages", { name: "Advantages", key: "features" }, { rules: [new NotBlank()] }],
                ["Colors", { key: "colors" }, { rules: [new NotBlank()] }],
                ["Care", { key: "fabricCares" }, { rules: [new NotBlank()] }],
                ["Photos", { key: "photos" }, { rules: [new NotBlank()] }],
                ["Sizes", { key: "sizes" }, { rules: [new NotBlank()] }],
            ] as [string, object, { rules: Rule<unknown>[] }][],
        };
    },
    setup() {
        return { InputParts, arrowNext, checkmark };
    },
    watch: {
        currentState(newValue, prev) {
            console.log(newValue);
        },
    },
    methods: {
        toPreview() {
            if (this.validate()) {
                const key = (this.states[this.currentState][1] as { key: string }).key as keyof typeof this.goodData;
                // @ts-ignore
                this.goodData[key] = this.$refs.currentComponent!.getValue();
                this.$emit("toPreview", this.goodData);
            }
        },
        validate() {
            const component = this.$refs.currentComponent as InputStepComponent;
            const ruleSet = new RuleSet((e) => component.setErrorMessage(e.errorMessage));
            this.states[this.currentState][2].rules.forEach((rule) => ruleSet.addRule(rule));
            const resultOfValidation = ruleSet.validate(component.getValue());
            if (resultOfValidation) component.setErrorMessage("");

            return resultOfValidation;
        },
        next() {
            if (this.validate()) {
                const key = (this.states[this.currentState][1] as { key: string }).key as keyof typeof this.goodData;
                // @ts-ignore
                this.goodData[key] = this.$refs.currentComponent!.getValue();
                this.currentState++;
            }
        },
        prev() {
            this.currentState--;
        },
    },
    mounted() {},
    computed: {
        isLast() {
            return this.currentState == this.states.length - 1;
        },
        hasPrev() {
            return this.currentState > 0;
        },
        hasNext() {
            return this.currentState < this.states.length - 1;
        },
    },
});
</script>
