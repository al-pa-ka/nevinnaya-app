<template>
    <template v-if="!mobileView">
        <header class="header__wrapper" :class="{ header__wrapper_active: menuOpened }" ref="wrapper">
            <div class="header">
                <ul :class="{ header_active: menuOpened }">
                    <li class="header__tab" v-on:click="switchMenu('womenMenu')">женщины</li>
                    <li class="header__tab" v-on:click="switchMenu('menMenu')">мужчины</li>
                    <li class="header__tab">о нас</li>
                    <li class="header__tab">для бизнеса</li>
                    <li class="header__tab header__tab-logo">nvиn</li>
                    <li class="header__tab">lookbook</li>
                    <li class="header__tab">поиск</li>
                    <li class="header__tab account" v-on:click="switchMenu('accountMenu')">мой аккаунт</li>
                    <li class="header__tab">
                        <a href="/cart">корзина</a><span class="header__tab-cart-count">({{ cart.getLength() }})</span>
                    </li>
                    <ul ref="menu" class="account-menu" :class="{ 'account-menu_active': activeMenu['accountMenu'] }">
                        <li class="account-menu__item">войти</li>
                        <li class="account-menu__item">мой кабинет</li>
                        <li class="account-menu__item">мои заказы</li>
                        <li class="account-menu__item">избранное</li>
                        <li class="account-menu__item">мои возвраты</li>
                        <li class="account-menu__item">вопросы и ответы</li>
                        <li class="account-menu__item">служба поддержки</li>
                        <li class="account-menu__item">выйти</li>
                    </ul>

                    <div
                        class="col-span-full max-h-[200px] auto-cols-max grid-flow-col grid-rows-[repeat(auto-fill,minmax(20px,25px))] gap-x-5 gap-y-2"
                        :class="{
                            'hidden ': !(activeMenu['menMenu'] || activeMenu['womenMenu']),
                            'grid ': activeMenu['menMenu'] || activeMenu['womenMenu'],
                        }"
                    >
                        <template v-if="activeMenu['menMenu']">
                            <li class="account-menu__item overflow-visible text-nowrap" v-for="tab in menTabs">{{ tab }}</li>
                        </template>
                        <template v-if="activeMenu['womenMenu']">
                            <li class="account-menu__item overflow-visible text-nowrap" v-for="tab in womenTabs">{{ tab }}</li>
                        </template>
                    </div>
                </ul>
            </div>
        </header>
    </template>
    <template v-else>
        <header class="absolute top-0 box-border w-[100%] p-[50px] pl-[20px] pr-[20px]">
            <div class="flex w-full flex-row justify-between">
                <img class="cursor-pointer" :src="burger" alt="" v-on:click="mobileMenuOpened = true" />
                <span class="font-[Arkhip] text-[30px]">nvиn</span>
            </div>
        </header>
        <ul
            class="fixed left-0 top-0 z-20 flex h-screen w-screen flex-col items-start justify-start gap-[20px] bg-[rgba(255,255,255,0.8)] p-[20px] backdrop-blur-sm"
            v-if="mobileMenuOpened"
        >
            <template v-if="!(activeMenu['accountMenu'] || activeMenu['menMenu'] || activeMenu['womenMenu'])">
                <img class="cursor-pointer" :src="backArrow" alt="" v-on:click="mobileMenuOpened = false" />
                <li class="cursor-pointer font-[Arkhip] text-[25px] uppercase">nvиn</li>
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase" v-on:click="switchMenu('womenMenu')">женщины</li>
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase" v-on:click="switchMenu('menMenu')">мужчины</li>
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase">о нас</li>
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase">для бизнеса</li>
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase">lookbook</li>
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase">поиск</li>
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase" v-on:click="switchMenu('accountMenu')">мой аккаунт</li>
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase">
                    <a href="/cart">корзина</a><span class="header__tab-cart-count">({{ cart.getLength() }})</span>
                </li>
            </template>
            <template v-if="activeMenu['menMenu']">
                <img class="cursor-pointer" :src="backArrow" alt="" v-on:click="activeMenu['menMenu'] = false" />
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase" v-for="tab in menTabs">{{ tab }}</li>
            </template>
            <template v-if="activeMenu['womenMenu']">
                <img class="cursor-pointer" :src="backArrow" alt="" v-on:click="activeMenu['womenMenu'] = false" />
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase" v-for="tab in womenTabs">{{ tab }}</li>
            </template>
            <template v-if="activeMenu['accountMenu']">
                <img class="cursor-pointer" :src="backArrow" alt="" v-on:click="activeMenu['accountMenu'] = false" />
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase">войти</li>
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase">мой кабинет</li>
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase">мои заказы</li>
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase">избранное</li>
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase">мои возвраты</li>
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase">вопросы и ответы</li>
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase">служба поддержки</li>
                <li class="cursor-pointer font-[Roboto] text-[18px] uppercase">выйти</li>
            </template>
        </ul>
    </template>
</template>

<script lang="ts">
import Cart from "@/cart/Cart";
import { DOMAIN } from "@/constants";
import { defineComponent } from "vue";
import burger from "@/assets/images/burger-menu.svg";
import backArrow from "@/assets/images/back-arrow.svg";
const MOBILE_THRESHOLD = 1280;

export default defineComponent({
    setup() {
        return { burger, backArrow };
    },
    props: {
        countOfGoodsInCart: Number,
    },
    data() {
        return {
            activeMenu: {
                womenMenu: false,
                menMenu: false,
                accountMenu: false,
            },
            womenTabs: [] as string[],
            menTabs: [] as string[],
            cart: new Cart(),
            mobileView: window.innerWidth < MOBILE_THRESHOLD,
            mobileMenuOpened: false,
        };
    },
    async mounted() {
        this.womenTabs = await this.getWomenTabs();
        this.menTabs = await this.getMenTabs();
        window.addEventListener("resize", () => {
            console.log("resized");
            this.mobileView = window.innerWidth < MOBILE_THRESHOLD;
        });
    },
    computed: {
        menuOpened() {
            return Boolean(
                Object.entries(this.activeMenu).filter((value) => {
                    return value[1];
                }).length
            );
        },
    },
    methods: {
        switchMenu(categoryName: string) {
            console.log("clicked");
            for (const key of Object.keys(this.activeMenu).filter((key) => {
                return key != categoryName;
            })) {
                this.activeMenu[key as keyof typeof this.activeMenu] = false;
            }
            this.activeMenu[categoryName as keyof typeof this.activeMenu] = !this.activeMenu[categoryName as keyof typeof this.activeMenu];
        },
        async getUnisexTabs(): Promise<string[]> {
            const response = await fetch(`http://${DOMAIN}/goods/get/category/`, {
                method: "POST",
                body: JSON.stringify({
                    gender: "UNISEX",
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const unisexTabs = await response.json();
            return unisexTabs.map((category: any) => {
                return category.name;
            });
        },
        async getWomenTabs(): Promise<string[]> {
            const response = await fetch(`http://${DOMAIN}/goods/get/category/`, {
                method: "POST",
                body: JSON.stringify({
                    gender: "FEMALE",
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const womenCategories = await response.json();
            const womenTabs = womenCategories.map((category: any) => {
                return category.name;
            }) as string[];
            return womenTabs.concat(await this.getUnisexTabs());
        },
        async getMenTabs(): Promise<string[]> {
            const response = await fetch(`http://${DOMAIN}/goods/get/category/`, {
                method: "POST",
                body: JSON.stringify({
                    gender: "MALE",
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const menCategories = await response.json();
            const menTabs = menCategories.map((category: any) => {
                return category.name;
            }) as string[];
            return menTabs.concat(await this.getUnisexTabs());
        },
    },
    watch: {
        mobileMenuOpened(newValue, prevValue) {
            const scrollbarWitdth = window.innerWidth - document.documentElement.clientWidth;
            console.log(scrollbarWitdth);
            if (newValue) {
                document.body.classList.add(`fixed`);
                document.body.classList.add("overflow-x-hidden");
                document.body.style.setProperty("padding-right", `${scrollbarWitdth}px`);
            } else {
                document.body.classList.remove("fixed");
                document.body.style.setProperty("padding-right", `0px`);
            }
        },
    },
});
</script>

<style>
* {
    user-select: none;
}

ul {
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(9, auto);
    grid-template-rows: 1fr 0px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    margin: 0;
}

ul.header_active {
    grid-template-rows: none;
    display: grid;
    grid-template-rows: 1fr minmax(1fr, 200px) !important;
}

.header__wrapper {
    z-index: 2;
    display: flex;
    width: 100%;
    padding: 50px 96px 50px 96px;
    box-sizing: border-box;
    top: 0;
    position: absolute;
    transition: 1s;
}

.header__wrapper_active {
    transition: 0.5s;
    backdrop-filter: blur(15px);
    background-color: rgba(255, 255, 255, 0.5);
}

.header {
    width: 100%;
    height: fit-content;
}

.header__tab {
    text-transform: uppercase;
    font-family: Roboto;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* text-align: center; */
}

.header__tab_first {
    justify-content: start;
}

.header__tab_inactive {
    color: #808080;
    transition: 1s;
}

.header__tab-cart-count {
    font-weight: 900;
}

.header__tab.account {
    align-items: start;
    justify-content: start;
    width: 100%;
}

.header__tab-logo {
    padding-top: 0;
    font-family: Arkhip;
    font-size: 48px;
}

.account-menu {
    display: none;
    grid-column: 8 / span 2;
    gap: 12px;
    top: 0;
    flex-direction: column;
    align-items: start;
    opacity: 0;
    /* transition: 1s; */
}

.account-menu_active {
    display: flex;
    transition-property: opacity;
    /* transition: 1s; */
    opacity: 1;
}

.account-menu__item {
    font-size: 18px;
    font-family: Roboto;
    text-transform: uppercase;
    transition: 0.5s;
    cursor: pointer;
}

.account-menu__item:hover {
    color: #808080;
    transition: 0.5s;
}

.women-menu_active {
    opacity: 1;
    display: flex;
    transition: 1s;
    transition-property: opacity;
}

@media (width <=1475px) {
    .header__wrapper {
        padding: 50px 20px 50px 20px;
    }
}
</style>
