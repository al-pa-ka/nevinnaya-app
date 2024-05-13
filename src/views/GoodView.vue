<template>
    <div v-if="goodInfo" class="flex flex-col justify-between overflow-x-hidden">
        <TheHeader :count-of-goods-in-cart="0" />
        <TheGoodViewContent :gender="gender" :goodInfo="goodInfo" :category="category"></TheGoodViewContent>
        <TheFooter />
    </div>
    <div v-else class="flex h-screen w-screen items-center justify-center">
        <h5 class="text-[30px] uppercase text-gray-400">Ничего не найдено...</h5>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheGoodViewContent from "@/components/TheGoodViewContent.vue";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

import type { Good } from "@/goods/Good";

import Cart from "../cart/Cart";
import type { GoodInCart } from "@/cart/GoodInCart";
import GetGoodByPk from "@/api/GetGoodsByPk";

export default defineComponent({
    components: {
        TheHeader,
        TheFooter,
        TheGoodViewContent,
    },
    data() {
        return {
            goodInfo: null as Good | null,
            cart: new Cart(),
            currentColor: "" as string,
            currentSize: "" as string,
            apiGet: new GetGoodByPk(),
            gender: this.$route.params.gender as string,
            category: this.$route.params.category as string,
        };
    },
    methods: {
        addToCart(good: GoodInCart) {
            this.cart.add(good);
            console.log("added");
        },
    },
    async mounted() {
        // this.goodInfo = {
        //     categoryName: "Женщины/верхняя одежда",
        //     colors: ["серо-бежевый", "черный"],
        //     sizes: ["s", "m", "l"],
        //     pk: 0,

        //     material: "100% хлопок/вискоза, утеплитель альполюкс 100 гр/м2 | 150 гр/м2",
        //     fabricCares: [
        //         "бережная машинная стирка или ручная стирка при температуре 30ºC",
        //         "не отбеливать",
        //         "не использовать агрессивные химические и механические средства",
        //         "вертикальная сушка",
        //         "гладить внешнюю сторону при температуре утюга до 150ºС",
        //     ],

        //     price: 1699,
        //     description:
        //         "Oversize унисекс пальто NEO из водоотталкивающего хлопкового полотна.Простое, самодостаточное, неизбежно привлекающее к себе внимание. За счёт плотности ткани и специального воротника-стойки отлично защищает от ветра и холода. А конструкция спинки со шлицей обеспечивает свободу и элегантность при движении. Доступно в двух вариантах утепления — до +5°С и до — 12°С.",
        //     goodName: 'пальто "neo"',
        //     photos: [],
        //     matchWith: [1, 2, 3],
        //     features: [
        //         "суперпрочный внешний материал из хлопка",
        //         "oversize крой",
        //         "контрастная подкладка",
        //         "воротник-стойка",
        //         "два варианта утепления",
        //         "спинка со щлицей",
        //         "внутренний карман",
        //     ],
        //     deliveryAndReturn: [
        //         {
        //             extra: "Для получения вашего заказа предъявите администратору чек об оплате и номер заказа. ",
        //             option: "1. Самовывоз из шоурума в г. Ростове-на-Дону",
        //             description: "Адрес: ул. Станиславского, 85к1, 3 этаж, фотостудия КОТТА. Срок хранения: 7 календарных дней.",
        //         },
        //     ],
        // };
        this.goodInfo = await this.apiGet.getGood(Number(this.$route.params.id));
    },
});
</script>

<style></style>
