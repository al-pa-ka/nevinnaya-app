<template>
    <CreatePhotoPopup ref="createPhotoPopup" />
    <main class="flex flex-col">
        <div class="m-[20px] flex flex-col gap-4">
            <div>
                <h5 class="uppercase">Наименование товара</h5>
                <input class="admin-input" v-model="good_name" type="text" />
            </div>

            <div>
                <h5 class="uppercase">Цена</h5>
                <input class="admin-input" v-model="price" type="text" />
            </div>

            <div>
                <h5 class="uppercase">Материал</h5>
                <input class="admin-input" v-model="material" type="text" />
                <select class="admin-input w-full" v-model="material" name="" id="">
                    <option v-for="material in createdMaterials" :value="material">
                        {{ material }}
                    </option>
                </select>
            </div>
            <div class="w-full max-w-[100%]">
                <h5 class="uppercase">Описание товара</h5>
                <textarea
                    class="admin-input w-full border-[2px] border-black"
                    v-model="description"
                ></textarea>
            </div>

            <div class="flex flex-col">
                <h5 class="uppercase">Категория</h5>
                <p class="mb-2 text-[14px] text-gray-400">
                    * выберите или добавьте категорию в которой будет находиться товар
                </p>
                <div class="flex flex-row gap-4">
                    <div class="w-full">
                        <input
                            class="admin-input"
                            v-model="categoryBuffer['name']"
                            type="text"
                            name=""
                            id=""
                        />
                        <select v-model="categoryBuffer" class="admin-input">
                            <option
                                v-for="category in createdCategories"
                                :value="Object.assign({}, category)"
                            >
                                <span>{{ Object.assign({}, category).name + " " }}</span>
                                <span>{{ "(" + Object.assign({}, category).gender + ")" }}</span>
                            </option>
                        </select>
                    </div>
                    <label class="flex items-center"
                        ><span>male</span
                        ><input
                            type="radio"
                            value="MALE"
                            v-model="categoryBuffer['gender']"
                            name="category"
                    /></label>
                    <label class="flex items-center"
                        ><span>female</span
                        ><input
                            type="radio"
                            value="FEMALE"
                            v-model="categoryBuffer['gender']"
                            name="category"
                    /></label>
                    <label class="flex items-center"
                        ><span>unisex</span
                        ><input
                            type="radio"
                            value="UNISEX"
                            v-model="categoryBuffer['gender']"
                            name="category"
                    /></label>
                </div>
            </div>
        </div>

        <div class="flex w-full flex-col items-center">
            <h5>Фотографии</h5>
            <div class="m-4 flex flex-row flex-wrap items-center gap-2">
                <div v-for="photo in photos" class="relative w-fit max-w-64">
                    <img class="w-full object-cover" :src="photo.photo" alt="" />
                    <div class="absolute top-[50%] z-0 flex flex-row gap-[20px]"></div>
                </div>
                <button
                    v-on:click="openPhotosPopup()"
                    class="rounded-xl bg-green-500 p-[10px] text-white"
                >
                    Добавить
                </button>
            </div>
        </div>

        <div class="m-[20px] flex flex-col">
            <h5 class="uppercase">достоинства</h5>
            <div class="flex w-full flex-row">
                <div class="mr-[10px] w-full">
                    <input class="admin-input" v-model="featureBuffer" type="text" name="" id="" />
                </div>
                <button
                    v-on:click="
                        features.includes(featureBuffer) ? '' : features.push(featureBuffer)
                    "
                    class="rounded-xl bg-green-500 p-[10px] text-white"
                >
                    Добавить
                </button>
            </div>
            <span v-for="feature in features">{{ feature }}</span>
        </div>

        <div class="m-[20px] flex flex-col">
            <h5 class="uppercase">цвета</h5>
            <div class="flex w-full flex-row">
                <div class="mr-[10px] w-full">
                    <input class="admin-input" v-model="colorBuffer" type="text" name="" id="" />
                    <select v-model="colorBuffer" class="admin-input w-full" name="" id="">
                        <option v-for="color in createdColors" :value="color">
                            {{ color }}
                        </option>
                    </select>
                </div>
                <button
                    v-on:click="pushColor(colorBuffer)"
                    class="rounded-xl bg-green-500 p-[10px] text-white"
                >
                    Добавить
                </button>
            </div>
            <span v-for="color in colors">{{ color }}</span>
        </div>

        <div class="m-[20px] flex flex-col">
            <h5 class="uppercase">уход за тканью</h5>
            <div class="flex w-full flex-row">
                <div class="mr-[10px] w-full">
                    <input class="admin-input" v-model="careBuffer" type="text" name="" id="" />
                </div>
                <button
                    v-on:click="cares.includes(careBuffer) ? '' : cares.push(careBuffer)"
                    class="rounded-xl bg-green-500 p-[10px] text-white"
                >
                    Добавить
                </button>
            </div>
            <span v-for="care in cares">{{ care }}</span>
        </div>

        <div class="m-[20px] flex flex-col">
            <h5 class="uppercase">Размеры</h5>
            <p class="mb-1 text-[14px] text-gray-400">* укажите через пробел</p>
            <div class="flex w-full flex-row">
                <div class="mr-[10px] w-full">
                    <input class="admin-input" v-model="sizesInput" type="text" name="" id="" />
                </div>
            </div>
            <span v-for="size in sizes">{{ size }}</span>
        </div>

        <button
            v-on:click="createGood()"
            class="m-[40px] rounded-xl bg-green-500 p-[10px] text-white"
        >
            создать
        </button>
    </main>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import CreatePhotoPopup from "../../components/admin/CreatePhotoPopup.vue";
import { DOMAIN } from "@/constants";
import type Admin from "@/user/admin";
export default defineComponent({
    inject: ["admin"],
    components: {
        CreatePhotoPopup,
    },
    data() {
        return {
            admin: inject('admin') as Admin,
            price: "",
            good_name: "",
            createdColors: [] as string[],
            createdMaterials: [] as string[],
            photos: [] as {
                photo: string;
                gender: string;
                pk: number;
            }[],
            material: "",
            colors: [] as string[],
            colorBuffer: "",
            featureBuffer: "",
            features: [] as string[],
            careBuffer: "",
            cares: [] as string[],
            createdCares: [] as string[],
            description: "",
            sizesInput: "",
            categoryBuffer: {
                gender: "",
                name: "",
            },
            createdCategories: [] as {
                name: string;
                gender: string;
            }[],
        };
    },
    async mounted() {
        if (!this.admin || !(this.admin as Admin).isAutentificated()){ 
            window.location.href = '/admin/auth'
            console.log(this.admin)
            console.log(this.admin.isAutentificated())
        }
        const response = await fetch(`http://${DOMAIN}/goods/get/color/`, {
            method: "POST",
        });
        this.createdColors = (await response.json()).map((el: any) => {
            return el.color;
        });

        const materialsResponse = await fetch(`http://${DOMAIN}/goods/get/material/`, {
            method: "POST",
        });
        this.createdMaterials = (await materialsResponse.json()).map((el: any) => {
            return el.material;
        });

        const categoriesResponse = await fetch(`http://${DOMAIN}/goods/get/category/`, {
            method: "POST",
        });
        this.createdCategories = await categoriesResponse.json();
    },
    methods: {
        async openPhotosPopup() {
            const photo = await (this.$refs.createPhotoPopup as any).open();
            this.photos.push(photo);
            console.log(this.photos);
        },
        pushColor(color: string) {
            if (!this.colors.includes(color)) {
                this.colors.push(color);
            }
        },
        async createGood() {
            const goodObject = {
                description: this.description,
                price: this.price,
                good_name: this.good_name,
                colors: this.colors,
                sizes: this.sizes,
                fabric_cares: this.cares,
                features: this.features,
                photos: this.photos.map((photo) => {
                    return photo.pk;
                }),
                material: this.material,
                category: this.categoryBuffer,
            } as Record<string, any>;

            await fetch(`http://${DOMAIN}/goods/create/good/`, {
                method: "POST",
                body: JSON.stringify(goodObject),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        },
    },
    computed: {
        sizes() {
            return this.sizesInput.toUpperCase().trim().split(" ");
        },
    },
    watch: {
        colorBuffer() {
            this.colorBuffer = this.colorBuffer.toUpperCase();
        },
        categoryBuffer: {
            deep: true,
            handler() {
                this.categoryBuffer.name = this.categoryBuffer.name.toUpperCase();
            },
        },
    },
});
</script>

<style>
.admin-input {
    @apply border-green-500;
    @apply border-[1px];
    @apply outline-none;
    @apply pl-[8px];
    @apply rounded-md;
    @apply w-full;
}
</style>
