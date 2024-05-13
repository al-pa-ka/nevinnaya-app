<template>
    <div class="h-full w-full bg-gray-400 p-5">
        <div class="absolute top-8 flex flex-row bg-white p-5" v-if="goodData?.category.gender == 'UNISEX'">
            <label for=""><input v-model="gender" type="checkbox" name="gender" value="MALE" id="" />Мужчина</label>
            <label for=""><input v-model="gender" type="checkbox" name="gender" value="FEMALE" />Женщина</label>
        </div>
        <TheGoodViewContent
            class="bg-white"
            :gender="gender!"
            :category="goodData?.category.name!"
            v-if="goodDataPreview"
            :good-info="goodDataPreview"
        ></TheGoodViewContent>
    </div>
    <img
        class="fixed top-[50%] ml-2 rotate-180 cursor-pointer drop-shadow-[0_-5px_10px_rgba(0,0,0,0.5)]"
        @click="$emit('toEdit')"
        :src="arrowNext"
        alt=""
    />
    <img :src="checkmark" alt="" class="fixed right-0 top-[50%] mr-2 cursor-pointer drop-shadow-[0_5px_10px_rgba(0,0,0,0.3)]" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import TheGoodViewContent from "../TheGoodViewContent.vue";
import type { Category, GoodCreation, PhotoCreation, UnisexCategory } from "@/goods/Good";
import type { Good } from "@/goods/Good";
import arrowNext from "@/assets/images/arrow-next.svg";
import checkmark from "@/assets/images/ready.svg";

export default defineComponent({
    setup() {
        return {
            arrowNext,
            checkmark,
        };
    },
    emits: ["toEdit"],
    components: { TheGoodViewContent },
    data() {
        console.log(this.goodData);
        return {
            gender: this.goodData?.category.gender == "UNISEX" ? "MALE" : (this.goodData?.category.gender as "MALE" | "FEMALE"),
        };
    },
    props: {
        goodData: { type: Object as PropType<GoodCreation> },
    },
    computed: {
        goodDataPreview(): Good | null {
            const _getCategoryName = (category: Category | UnisexCategory) => {
                if (category.gender == "UNISEX") {
                    if (this.gender == "FEMALE") {
                        return category.nameForWomen;
                    } else {
                        return category.nameForMen;
                    }
                } else {
                    return category.name;
                }
            };
            const _getPhotos = (photos: PhotoCreation[]) => {
                const photosUrls = photos
                    .filter((photo) => {
                        return [this.gender, "UNISEX"].includes(photo.gender);
                    })
                    .map((photo) => URL.createObjectURL(photo.file));
                console.log(photosUrls);
                return photosUrls;
            };
            console.log("the good preview computed", this.goodData);
            if (!this.goodData) return null;

            const goodDataPreview = {
                categoryName: _getCategoryName(this.goodData.category),
                colors: this.goodData.colors,
                description: this.goodData.description,
                fabricCares: this.goodData.fabricCares,
                sizes: this.goodData.sizes,
                photos: _getPhotos(this.goodData.photos),
                goodName: this.goodData.goodName,
                features: this.goodData.features,
                material: this.goodData.material,
                price: this.goodData.price,
                deliveryAndReturn: [],
            } as Good;
            return goodDataPreview;
        },
    },
    methods: {},
});
</script>
