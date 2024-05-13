<template>
    <main
        v-if="isOpened"
        class="fixed z-20 flex h-screen w-full flex-col items-center justify-center bg-[rgba(0,0,0,0.2)]"
    >
        <div class="ml-[20px] mr-[20px] flex flex-col items-center gap-6 rounded-xl bg-white p-9">
            <h5 class="text-black">Добавить фото</h5>
            <label class="text-[30px] font-bold text-black" for="addPhoto">+</label>
            <input
                accept=".jpg,.jpeg,.png"
                v-on:change="setPhoto($event.target as HTMLInputElement)"
                class="hidden"
                type="file"
                name=""
                id="addPhoto"
            />
            <div class="max-h-[300px] w-fit max-w-[600px]">
                <img class="h-full w-full object-cover" :src="photoLocalUrl" alt="" />
            </div>

            <div class="flex flex-col gap-[15px]" v-if="photo">
                <p class="text-[14px] text-gray-400">
                    * этот выбор определит, в какой категории будут показываться фотографии. (Если
                    выбрать Female то фотография будет показываться в женском каталоге, если male то
                    в мужском. Unisex фотография будет показываться в обоих)
                </p>
                <label
                    >male <input v-model="gender" type="radio" name="gender" value="MALE" id=""
                /></label>
                <label
                    >female <input v-model="gender" type="radio" name="gender" value="FEMALE" id=""
                /></label>
                <label
                    >unisex <input v-model="gender" type="radio" name="gender" value="UNISEX" id=""
                /></label>
            </div>
            <button v-on:click="createPhoto()" class="rounded-xl bg-green-500 p-[10px]">
                Загрузить
            </button>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DOMAIN } from "../../constants";

export default defineComponent({
    data() {
        return {
            isOpened: false,
            photo: null as File | null,
            photoLocalUrl: "",
            resolve: null as any,
            reject: null as any,
            gender: "UNISEX",
        };
    },
    methods: {
        setPhoto(inputElement: HTMLInputElement) {
            if (inputElement.files) {
                this.photo = inputElement.files[0];
            }
        },
        async createPhoto() {
            if (!this.photo) {
                return;
            }
            const data = new FormData();
            data.append("photo", this.photo);
            data.append("gender", this.gender);
            const response = await fetch(`http://${DOMAIN}/goods/create/photo/`, {
                method: "POST",
                body: data,
            });
            const parsedResponse = await response.json();
            const photoData = await fetch(`http://${DOMAIN}/goods/get/photo/`, {
                method: "POST",
                body: JSON.stringify({
                    pk: parsedResponse.pk,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await photoData.json();
            result[0]["gender"] = this.gender;
            this.resolve(result[0]);
            this.isOpened = false;
        },
        async open(): Promise<{
            photo: string;
            pk: number;
            gender: string;
        }> {
            this.isOpened = true;
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
    },
    watch: {
        photo() {
            if (!this.photo) {
                this.photoLocalUrl = "";
            } else {
                this.photoLocalUrl = URL.createObjectURL(this.photo);
            }
        },
    },
});
</script>

<style></style>
