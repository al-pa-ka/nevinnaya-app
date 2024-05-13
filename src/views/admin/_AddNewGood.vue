<template>
    <keep-alive>
        <component
            :is="states[currentState].name"
            v-bind="states[currentState].options"
            ref="currentComponent"
            v-on="states[currentState].handlers"
        />
    </keep-alive>
</template>

<script lang="ts">
const EDIT = 0,
    PREVIEW = 1;

import { defineComponent } from "vue";
import GoodInfoInput from "./GoodInfoInput.vue";
import TheGoodPreview from "@/components/admin/TheGoodPreview.vue";
import type { Category } from "@/data-types/Category";
import type { Good, PhotoCreation, GoodCreation } from "@/goods/Good";
export default defineComponent({
    setup() {
        return { EDIT, PREVIEW };
    },
    data() {
        return {
            currentState: 0,
            states: [
                {
                    name: "GoodInfoInput",
                    options: {},
                    handlers: { toPreview: this.toPreview },
                },
                {
                    name: "TheGoodPreview",
                    options: {
                        goodData: null as null | GoodCreation,
                    },
                    handlers: { toEdit: this.toEdit },
                },
            ],
        };
    },
    components: {
        GoodInfoInput,
        TheGoodPreview,
    },
    methods: {
        toPreview(goodData: GoodCreation) {
            this.states[PREVIEW].options.goodData = goodData;
            this.currentState = PREVIEW;
        },
        toEdit() {
            this.currentState = EDIT;
        },
        async createGood() {},
    },
});
</script>
