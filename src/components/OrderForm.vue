<template>
    <div class="flex w-full flex-col">
        <div class="mt-[50px] h-[2px] w-full bg-gray-400"></div>

        <div v-if="states.CHOOSE_DELIVERY_TYPE" class="flex flex-col">
            <h5 class="mt-2 font-[Roboto] text-[30px] uppercase">выберите способ доставки</h5>
            <div class="mt-[20px] grid grid-cols-2 items-center">
                <p class="text-[25px]">Самовывоз из шоурума в г. Ростове-на-Дону</p>
                <input
                    class="h-[20px]"
                    type="radio"
                    name="delivery"
                    id=""
                    v-on:change="toEmail('pickup')"
                />
                <p class="text-[25px]">Курьерской службой (СДЭК/Boxberry/Yandex.GO)</p>
                <input
                    class="h-[20px]"
                    type="radio"
                    name="delivery"
                    id=""
                    v-on:change="toDeliveryService()"
                />
                <p class="text-[25px]">Курьерская доставка по Ростову-на-Дону</p>
                <input
                    class="h-[20px]"
                    type="radio"
                    name="delivery"
                    id=""
                    v-on:change="toCourierService()"
                />
            </div>
        </div>

        <div v-if="states.DELIVERY_SERVICE" class="flex flex-col">
            <h5 class="mt-2 font-[Roboto] text-[20px] uppercase">
                укажите адрес офиса, куда будет произведена доставка
            </h5>
            <div>
                <input
                    class="input"
                    ref="deliveryServiceAddress"
                    type="text"
                    v-model="address"
                    v-on:input="validate($event.target as HTMLInputElement)"
                />
                <p
                    class="text-[14px] text-red-600"
                    :class="{
                        block: error,
                        hidden: !error,
                    }"
                >
                    * не оставляйте это поле пустым!
                </p>
                <Button
                    v-on:click="
                        toEmail(address);
                        validate($refs.deliveryServiceAddress as HTMLInputElement);
                    "
                    >Далее</Button
                >
            </div>
        </div>

        <div v-if="states.COURIER_SERVICE" class="flex flex-col">
            <h5 class="mt-2 font-[Roboto] text-[20px] uppercase">укажите Ваш адрес</h5>
            <input
                class="input"
                ref="courierServiceAddress"
                type="text"
                v-model="address"
                v-on:input="validate($event.target as HTMLInputElement)"
            />
            <p
                class="text-[14px] text-red-600"
                :class="{
                    block: error,
                    hidden: !error,
                }"
            >
                * не оставляйте это поле пустым!
            </p>
            <Button
                v-on:click="
                    toEmail(address);
                    validate($refs.courierServiceAddress as HTMLInputElement);
                "
                >Далее</Button
            >
        </div>

        <div v-if="states.EMAIL" class="flex flex-col">
            <div class="flex flex-row items-center justify-between">
                <h5 class="mt-2 font-[Roboto] text-[20px] uppercase">
                    укажите e-mail адрес для получения чека
                </h5>
                <h5 class="mt-2 font-[Roboto] text-[20px] uppercase">
                    {{ `сумма к оплате ${totalPrice}₽` }}
                </h5>
            </div>

            <input
                class="input"
                v-model="email"
                type="text"
                v-on:input="validate($event.target as HTMLInputElement)"
            />
            <p class="text-[14px] text-gray-400">
                * пожалуйста, укажите Ваш действительный адрес почты, чтобы мы могли связаться с
                Вами в случае возникновения проблем, а также Вы смогли получить чек.
            </p>
            <p
                class="text-[14px] text-red-600"
                :class="{
                    block: error,
                    hidden: !error,
                }"
            >
                * не оставляйте это поле пустым!
            </p>
            <Button v-on:click="acceptOrder()">Перейти к оплате</Button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import Button from "./Button.vue";
import type { GoodInCart } from "@/cart/GoodInCart";
import { DOMAIN } from "@/constants";
export default defineComponent({
    props: {
        goodsInCart: {
            type: Object as PropType<GoodInCart[]>,
            required: true,
        },
        totalPriceWithoutDelivery: {
            type: Object as PropType<number>,
            required: true,
        },
    },
    components: {
        Button,
    },
    data() {
        return {
            error: false,
            address: "",
            email: "",
            strategy: "",
            states: {
                CHOOSE_DELIVERY_TYPE: true,
                DELIVERY_SERVICE: false,
                COURIER_SERVICE: false,
                EMAIL: false,
            },
        };
    },
    emits: ["orderSuccesful"],
    methods: {
        clearAll() {
            Object.keys(this.states).forEach((key) => {
                this.states[key as keyof typeof this.states] = false;
            });
        },
        validate(input: HTMLInputElement) {
            console.log(input.value);
            if (!input.value) {
                this.error = true;
            } else {
                this.error = false;
            }
        },
        toDeliveryService() {
            this.strategy = "DELIVERY_SERVICE";
            this.clearAll();
            this.states.DELIVERY_SERVICE = true;
        },
        toCourierService() {
            this.strategy = "COURIER_SERVICE";
            this.clearAll();
            this.states.COURIER_SERVICE = true;
        },
        toEmail(address: string) {
            if (!address) {
                return;
            }
            this.address = address;
            this.clearAll();
            this.states.EMAIL = true;
        },
        async acceptOrder() {
            if (!this.email) {
                this.error = true;
                return;
            }
            const acceptObject = {} as Record<string, any>;
            if (this.strategy) {
                acceptObject["need_delivery"] = true;
                acceptObject["address"] = this.address;
                acceptObject["delivery_type"] = this.strategy;
            } else {
                acceptObject["need_delivery"] = false;
            }
            acceptObject["email"] = this.email;
            acceptObject["goods"] = this.goodsInCart;
            console.log(acceptObject);
            const response = await fetch(`http://${DOMAIN}/goods/form_order/`, {
                method: "POST",
                body: JSON.stringify({
                    order_info: acceptObject,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                this.$emit("orderSuccesful");
            }
        },
    },
    computed: {
        totalPrice() {
            if (this.strategy == "DELIVERY_SERVICE" || this.strategy == "COURIER_SERVICE") {
                return this.totalPriceWithoutDelivery + 690;
            } else {
                return this.totalPriceWithoutDelivery;
            }
        },
    },
});
</script>

<style>
.input {
    @apply w-full;
    @apply h-[40px];
    @apply font-[Roboto];
    @apply text-[20px];
    @apply outline-none;
    @apply border-black;
    @apply border-[1px];
    @apply pl-[10px];
}
</style>
