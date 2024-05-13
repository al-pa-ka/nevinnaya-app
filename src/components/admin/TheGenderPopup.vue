<template>
    <div v-if="opened" class="absolute flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div class="flex w-[50%] flex-col gap-5 bg-white p-5">
            <h5 class="text-[20px] uppercase">Выберите режим отображения фотографии</h5>
            <p class="font-[Roboto-Light] text-[15px]">
                Если вы выберете female, то фотография будет отображаться только у женщин (когда товар просматривают из женского раздела каталога),
                если выбрать male, то у мужчин, unisex же будет отображаться у обоих полов
            </p>
            <div class="flex flex-col gap-2">
                <button
                    class="border-2 border-transparent bg-black pb-2 pt-2 font-[Roboto] text-[20px] text-white hover:border-black hover:bg-transparent hover:text-black"
                    v-on:click="
                        resolve!('MALE');
                        opened = false;
                    "
                >
                    MALE
                </button>
                <button
                    class="border-2 border-transparent bg-black pb-2 pt-2 font-[Roboto] text-[20px] text-white hover:border-black hover:bg-transparent hover:text-black"
                    v-on:click="
                        resolve!('FEMALE');
                        opened = false;
                    "
                >
                    FEMALE
                </button>
                <button
                    class="border-2 border-transparent bg-black pb-2 pt-2 font-[Roboto] text-[20px] text-white hover:border-black hover:bg-transparent hover:text-black"
                    v-on:click="
                        resolve!('UNISEX');
                        opened = false;
                    "
                >
                    UNISEX
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    data() {
        return {
            opened: false,
            resolve: null as null | CallableFunction,
            reject: null as null | CallableFunction,
        };
    },
    methods: {
        async open(): Promise<"MALE" | "FEMALE" | "UNISEX"> {
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
                this.opened = true;
            });
        },
    },
});
</script>
