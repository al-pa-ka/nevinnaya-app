<template>
    <div class="mt-[100px] flex h-screen flex-col justify-between">
        <TheHeader />
        <div class="mb-[50px] flex w-full flex-col pl-[165px] pr-[165px]">
            <div class="mt-[20px] flex h-fit w-full flex-row items-center justify-between">
                <div class="w-fit">
                    <h5 class="m-0 font-[Roboto] text-[50px] uppercase">корзина</h5>
                    <div class="h-[2px] w-full bg-black"></div>
                </div>
                <div class="flex h-full flex-row items-end">
                    <p class="text-[40px]">
                        {{ totalPrice + "₽" }}
                    </p>
                </div>
            </div>
            <div class="mt-7 flex w-full flex-col gap-[20px]">
                <div v-for="(good, index) in goodsInCart" class="flex max-w-[880px] flex-row">
                    <div class="flex flex-1">
                        <img class="h-full w-full object-cover" :src="good.photos[0]" alt="" />
                    </div>

                    <div class="ml-[20px] flex flex-1 flex-col">
                        <div>
                            <h5 class="text-[34px] uppercase">
                                {{ good.goodName }}
                            </h5>
                            <h5 class="text-[34px] font-bold">{{ good.price }}₽</h5>
                            <div class="flex flex-row justify-between">
                                <p class="text-[20px] uppercase">количество</p>
                                <div class="flex flex-row">
                                    <span
                                        v-on:click="productsInCart[index].quantity++"
                                        class="cursor-pointer text-[20px]"
                                        >+</span
                                    >
                                    <span class="text-[20px]">{{ good.quantity }}</span>
                                    <span
                                        v-on:click="
                                            productsInCart[index].quantity =
                                                productsInCart[index].quantity - 1 > 0
                                                    ? productsInCart[index].quantity - 1
                                                    : productsInCart[index].quantity
                                        "
                                        class="cursor-pointer text-[20px]"
                                        >-</span
                                    >
                                </div>
                            </div>
                            <div class="flex flex-row justify-between">
                                <p class="text-[20px] uppercase">цвет</p>
                                <p class="text-[20px]">
                                    {{ good.color }}
                                </p>
                            </div>
                            <div class="flex flex-row justify-between">
                                <p class="text-[20px] uppercase">размер</p>
                                <p class="text-[20px] uppercase">
                                    {{ good.size }}
                                </p>
                            </div>
                        </div>
                        <Button class="mt-[40px]" v-on:click="productsInCart.splice(index)"
                            >Убрать из корзины</Button
                        >
                    </div>
                </div>
            </div>
            <OrderForm
                :total-price-without-delivery="totalPrice"
                :goods-in-cart="productsInCart"
                v-if="goodsInCart.length"
            ></OrderForm>
            <div class="flex w-full justify-center" v-else>
                <h5 class="text-[30px] uppercase text-gray-500">корзина пуста</h5>
            </div>
        </div>
        <TheFooter />
    </div>
</template>

<script lang="ts">
import TheFooter from "@/components/TheFooter.vue";
import TheHeader from "@/components/TheHeader.vue";
import { defineComponent } from "vue";
import Cart from "../cart/Cart";
import type { GoodInCart } from "@/cart/GoodInCart";
import GetGoodByPk from "@/api/GetGoodsByPk";
import type { Good } from "@/goods/Good";
import Button from "@/components/Button.vue";
import OrderForm from "@/components/OrderForm.vue";
export default defineComponent({
    components: {
        TheFooter,
        TheHeader,
        Button,
        OrderForm,
    },
    data() {
        return {
            cart: new Cart(),
            productsInCart: [] as GoodInCart[],
            fetchedData: [] as Good[],
        };
    },
    async mounted() {
        this.productsInCart = this.cart.get();
        console.log(this.productsInCart);
        const goods = await Promise.all(
            this.productsInCart.map((productInCart) => {
                const apiGet = new GetGoodByPk();
                return apiGet.getGood(productInCart.pk);
            })
        );
        console.log(goods);
        this.fetchedData = goods;
        console.log("fetchedGoods", this.fetchedData);
    },
    computed: {
        totalPrice() {
            let priceOfGoods = 0;
            this.productsInCart.forEach((product) => {
                console.log(product.quantity);
                console.log();
                const priceOfGood = this.fetchedData.find((el) => {
                    return el.pk;
                })?.price;
                if (!priceOfGood) {
                    return;
                }
                priceOfGoods += product.quantity * priceOfGood;
            });
            priceOfGoods = priceOfGoods > 10000 ? priceOfGoods : priceOfGoods;
            return priceOfGoods;
        },
        goodsInCart(): (Good & GoodInCart)[] {
            const resultGoods = [] as (Good & GoodInCart)[];
            this.productsInCart.forEach((product) => {
                console.log("foreach");
                console.log(this.fetchedData);
                const fetchedGood = this.fetchedData.find((fetchedGood) => {
                    console.log("currGood", fetchedGood);
                    console.log("currProduct", product);
                    return fetchedGood.pk == product.pk;
                });
                console.log(fetchedGood);
                if (!fetchedGood) return;
                const resultGood = Object.assign(fetchedGood, product);
                resultGoods.push(resultGood);
            });
            console.log("resultGoods", resultGoods);
            return resultGoods;
        },
    },
    watch: {
        productsInCart: {
            handler() {
                this.cart.updateCart(this.productsInCart);
            },
            deep: true,
        },
    },
});
</script>

<style></style>
