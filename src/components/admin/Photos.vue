<template>
    <BaseDefaultForm class="items-center" v-on:next="$emit('next')" v-on:prev="$emit('prev')" ref="baseForm">
        <div class="flex flex-row items-center gap-2">
            <h5 class="font-[Roboto] uppercase">Добавьте фотографии</h5>
            <label class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-gray-900">
                <span class="text-[20px] text-white">+</span>
                <input v-on:input="processInput" type="file" class="hidden" accept=".jpg,.jpeg,.png" />
            </label>
        </div>
        <div class="grid w-full grid-cols-[repeat(auto-fill,144px)] justify-between gap-3">
            <div class="relative aspect-square max-w-36" v-for="(photo, index) in photosPreviews" :key="photo">
                <div
                    @click="
                        photos.splice(index, 1);
                        photosPreviews.splice(index, 1);
                    "
                    class="absolute flex h-full w-full cursor-pointer items-center justify-center bg-[rgba(0,0,0,0.4)] opacity-0 hover:opacity-100"
                >
                    <span class="text-white underline">Удалить</span>
                </div>
                <img class="h-full w-full object-cover" :src="photo" alt="" />
            </div>
        </div>
    </BaseDefaultForm>
    <TheGenderPopup ref="genderPopup"></TheGenderPopup>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BaseDefaultForm from "./BaseDefaultForm.vue";
import TheGenderPopup from "./TheGenderPopup.vue";
import type { PhotoCreation } from "@/goods/Good";
export default defineComponent({
    data() {
        return {
            resolve: null as null | CallableFunction,
            photos: [] as PhotoCreation[],
            photosPreviews: [] as string[],
        };
    },
    components: {
        BaseDefaultForm,
        TheGenderPopup,
    },
    methods: {
        async genderPopup() {
            const genderPopup = this.$refs.genderPopup as InstanceType<typeof TheGenderPopup>;
            return await genderPopup.open();
        },
        async processInput(event: Event) {
            const eventTarget = event.target as HTMLInputElement;
            const file = eventTarget.files ? eventTarget.files[0] : null;
            if (!file) return;
            const gender = await this.genderPopup();
            if (gender) {
                this.photos.push({ file, gender });
                this.photosPreviews.push(URL.createObjectURL(file));
            }
        },
        getValue() {
            return this.photos;
        },
        setErrorMessage(errorMessage: string) {
            (this.$refs.baseForm! as InstanceType<typeof BaseDefaultForm>).setErrorMessage(errorMessage);
        },
    },
});
</script>

<style scoped></style>
