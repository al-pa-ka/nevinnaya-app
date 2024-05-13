<template>
    <BaseDefaultForm ref="baseForm">
        <h5 class="uppercase">Выберите категорию или создайте новую</h5>
        <div class="flex w-full flex-row gap-5">
            <div
                class="flex-1"
                :class="{ 'hover:bg-blue-50': categoryType == CategoryType.NEW, 'bg-slate-100': categoryType == CategoryType.EXISTING }"
                v-on:click="categoryType = CategoryType.EXISTING"
            >
                <BaseSelect ref="select" :select-options="chooseCategories" :editable="false"></BaseSelect>
            </div>

            <div class="h-full min-h-16 w-[2px] flex-shrink-0 flex-grow-0 bg-gray-400"></div>

            <div
                class="flex flex-1 flex-col gap-5"
                :class="{ 'hover:bg-blue-50': categoryType == CategoryType.EXISTING, 'bg-slate-100': categoryType == CategoryType.NEW }"
                v-on:click="categoryType = CategoryType.NEW"
            >
                <span
                    placeholder="Название категории"
                    ref="neutralName"
                    contenteditable="true"
                    class="min-w- h-fit w-full flex-1 border-b-2 outline-none"
                ></span>
                <div class="flex flex-row justify-between">
                    <label><input v-model="newCategory.gender" type="radio" name="gender" id="" value="MALE" /><span>MALE</span></label>
                    <label><input v-model="newCategory.gender" type="radio" name="gender" id="" value="FEMALE" /><span>FEMALE</span></label>
                    <label><input v-model="newCategory.gender" checked type="radio" name="gender" value="UNISEX" id="" /><span>UNISEX</span></label>
                </div>
                <span
                    placeholder="Название для мужчин"
                    contenteditable="true"
                    class="min-w- h-fit min-h-[26px] w-full flex-1 border-b-2 outline-none"
                    ref="nameForMen"
                ></span>
                <span
                    placeholder="Название для женщин"
                    contenteditable="true"
                    class="min-w- h-fit min-h-[26px] w-full flex-1 border-b-2 outline-none"
                    ref="nameForWomen"
                ></span>
            </div>
        </div>
    </BaseDefaultForm>
</template>

<script lang="ts">
enum CategoryType {
    NEW,
    EXISTING,
}

import { defineComponent } from "vue";
import BaseDefaultForm from "./BaseDefaultForm.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import { DOMAIN } from "@/constants";
import type { Category, UnisexCategory } from "@/goods/Good";
export default defineComponent({
    emits: ["prev", "next"],
    setup() {
        return {
            BaseSelect,
            CategoryType,
        };
    },
    components: {
        BaseDefaultForm,
        BaseSelect,
    },
    data() {
        return {
            categoryType: CategoryType.NEW,
            createdCategories: [] as (Category | UnisexCategory)[],
            newCategory: {
                name: "",
                nameForMen: "",
                nameForWomen: "",
                gender: "",
            },
        };
    },
    async mounted() {
        const response = await fetch(`http://${DOMAIN}/goods/get/category/`, {
            method: "POST",
        });
        const existingCategories = (await response.json()) as {
            name: string;
            gender: "MALE" | "FEMALE" | "UNISEX";
            name_for_men?: string;
            name_for_women?: string;
        }[];
        this.createdCategories = existingCategories.map((category) => {
            return {
                name: category.name,
                gender: category.gender,
                nameForName: category.name_for_men,
                nameForWomen: category.name_for_women,
            } as Category;
        });
        console.log(this.createdCategories);
    },
    methods: {
        setErrorMessage(errorMessage: string) {
            (this.$refs.baseForm! as InstanceType<typeof BaseDefaultForm>).setErrorMessage(errorMessage);
        },
        getValue(): UnisexCategory | Category {
            if (this.categoryType == this.CategoryType.NEW) {
                this.newCategory.name = (this.$refs.neutralName as HTMLSpanElement).textContent || "";
                if (this.newCategory.gender !== "UNISEX") {
                    this.newCategory.nameForMen = "";
                    this.newCategory.nameForWomen = "";
                    return this.newCategory as Category;
                } else {
                    this.newCategory.nameForMen = (this.$refs.nameForMen as HTMLSpanElement).textContent || "";
                    this.newCategory.nameForWomen = (this.$refs.nameForWomen as HTMLSpanElement).textContent || "";
                    return this.newCategory as UnisexCategory;
                }
            } else {
                const categoryInput = this.$refs.select as InstanceType<typeof BaseSelect>;
                const categoryName = categoryInput.getValue();
                const value = this.createdCategories.find((category) => category.name == categoryName) as UnisexCategory | Category;
                if (value.gender == "UNISEX") {
                    value.nameForMen = value.nameForMen || value.name;
                    value.nameForWomen = value.nameForWomen || value.name;
                }
                return value;
            }
        },
    },
    watch: {
        newCategory: {
            deep: true,
            handler: function (prevValue, newValue) {
                const nameForMen = this.$refs.nameForMen as HTMLSpanElement;
                const nameForWomen = this.$refs.nameForWomen as HTMLSpanElement;
                if (newValue["gender"] != "UNISEX") {
                    nameForMen.contentEditable = "false";
                    nameForMen.textContent = "";
                    nameForWomen.textContent = "";
                    nameForWomen.contentEditable = "false";
                } else {
                    nameForMen.contentEditable = "true";
                    nameForWomen.contentEditable = "true";
                }
            },
        },
    },
    computed: {
        chooseCategories() {
            return this.createdCategories.map((category) => category.name);
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
