<template>
    <div class="box-border flex w-full flex-col pb-[100px] pl-[20px] pr-[20px] pt-[100px] 2xl:pl-[160px] 2xl:pr-[160px]">
        <div class="mt-[100px] flex h-fit flex-row items-start justify-between">
            <PageTitle>
                <template v-slot:category>{{ gender }}</template>
                <template v-slot:endpoint>{{ category }}</template>
            </PageTitle>
            <Flag />
        </div>
        <div class="mt-[30px] grid w-full grid-cols-1 xl:grid-cols-2">
            <div class="pr-[10px]">
                <div class="relative w-full">
                    <img class="absolute bottom-0 right-0" src="../assets//images/box-arrow.svg" alt="" />
                    <img :src="goodInfo?.photos[0]" class="h-full w-full" />
                </div>
                <div class="mt-[26px] flex flex-1 flex-row flex-wrap gap-[26px]">
                    <div v-for="photo in goodInfo?.photos.slice(1, goodInfo.photos.length)" class="aspect-square flex-1 basis-[45%] bg-gray-200">
                        <img class="h-full w-full object-cover" :src="photo" alt="" />
                    </div>
                </div>
            </div>
            <div class="flex w-full flex-col xl:pl-[60px]">
                <p class="mt-[36px] font-['Roboto'] text-[36px] uppercase">
                    {{ goodInfo?.goodName }}
                </p>
                <p class="2xl: text-[36px] font-bold uppercase">{{ goodInfo?.price }}₽</p>
                <p class="2xl: mt-5 w-full font-['Roboto-Light'] text-[26px]">
                    {{ goodInfo?.description }}
                </p>
                <p></p>
                <div class="mt-[56px] grid grid-cols-3 items-center gap-[50px]">
                    <div class="contents">
                        <p class="text-[20px]">ЦВЕТ</p>
                        <p class="col-span-2 text-[20px] uppercase">
                            <span
                                v-for="(color, index) in goodInfo?.colors"
                                v-on:click="currentColor = color"
                                :class="{
                                    'font-bold': color == currentColor,
                                }"
                                class="cursor-pointer"
                            >
                                {{ color + (index == (goodInfo?.colors.length as number) - 1 ? " " : " / ") }}
                            </span>
                        </p>
                    </div>
                    <div class="contents">
                        <p class="text-[20px] uppercase">Размер</p>
                        <div class="flex flex-row justify-between text-[20px] uppercase">
                            <span
                                v-for="size in goodInfo?.sizes"
                                class="cursor-pointer"
                                v-on:click="currentSize = size"
                                :class="{
                                    'font-bold': size == currentSize,
                                }"
                            >
                                {{ size }}
                            </span>
                        </div>
                        <p class="text-[20px] uppercase">таблица размеров</p>
                    </div>
                    <div class="contents">
                        <p class="text-[20px] uppercase">количество</p>
                        <p class="text-[20px] uppercase">
                            <span v-on:click="count++" class="mr-2 cursor-pointer text-[25px] font-bold">+</span>
                            <span class="text-[25px]">{{ count }}</span>
                            <span v-on:click="count = count - 1 > 0 ? count - 1 : count" class="ml-2 cursor-pointer text-[25px] font-bold">-</span>
                        </p>
                    </div>
                </div>
                <Button
                    v-on:click="
                        // addToCart({
                        //     pk: goodInfo?.pk,
                        //     color: currentColor,
                        //     size: currentSize,
                        //     quantity: count,
                        // } as GoodInCart)
                        $emit('addToCart', goodInfo.pk, currentColor, currentSize, count)
                    "
                    >добавить в корзину</Button
                >
                <ul class="mb-[20px] mt-[30px] flex list-none flex-col items-start text-[22px]">
                    <li v-for="feature in goodInfo?.features">
                        •
                        {{ feature }}
                    </li>
                </ul>
                <Details v-if="goodInfo" title="ткань/уход">
                    <p class="mt-[20px] text-[22px]">
                        <span class="font-bold">Материал: </span>
                        {{ goodInfo.material }}
                    </p>
                    <div class="mt-[20px] flex flex-col gap-[20px] text-[20px]">
                        <p v-for="item in goodInfo.fabricCares">
                            /
                            {{ item }}
                        </p>
                    </div>
                </Details>
                <Details v-if="goodInfo.deliveryAndReturn" title="доставка/возврат">
                    <ul class="flex flex-col items-start text-[22px]">
                        <li v-for="item in goodInfo?.deliveryAndReturn">
                            <h5 class="mt-[40px] font-bold">
                                {{ item.option }}
                            </h5>
                            <p>
                                {{ item.description }}
                            </p>
                            <span class="font-[Roboto-Light] text-[18px] text-gray-400">*{{ item.extra }}</span>
                        </li>
                    </ul>
                </Details>
                <Details title="поделиться">
                    <div class="mt-[16px] flex flex-row items-center gap-[24px]">
                        <a href=""><img src="../assets/images/telegram-dark.svg" alt="" /></a>
                        <a href=""><img src="../assets/images/whats-app-dark.svg" alt="" /></a>
                        <a href=""><img src="../assets/images/vk.svg" alt="" /></a>
                        <a href="" class="text-[13px] uppercase text-gray-400">скопировать ссылку</a>
                    </div>
                </Details>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { Good } from "@/goods/Good";
import Details from "@/components/Details.vue";
import Button from "@/components/Button.vue";
import PageTitle from "@/components/PageTitle.vue";
import Flag from "../components/Flag.vue";
export default defineComponent({
    components: {
        Details,
        Button,
        PageTitle,
        Flag,
    },
    emits: ["addToCart"],
    props: {
        goodInfo: { type: Object as PropType<Good>, required: true },
        gender: { type: String as PropType<string>, required: true },
        category: { type: String as PropType<string>, required: true },
    },
    data() {
        console.log(this.goodInfo);
        return {
            count: 1,
            currentColor: this.goodInfo.colors[0] || "",
            currentSize: this.goodInfo.sizes[0] || "",
        };
    },
    mounted() {},
});
</script>
