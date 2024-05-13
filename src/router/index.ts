import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import MainPageVue from "../views/MainPage.vue";
import AboutUsViewVue from "../views/AboutUsView.vue";
import ForBuisnessVue from "../views/ForBuisness.vue";
import TheTestVue from "../views/TheTest.vue";
import CatalogViewVue from "@/views/CatalogView.vue";
import GoodViewVue from "@/views/GoodView.vue";
import CartView from "@/views/CartView.vue";
import AddNewGoodVue from "@/views/admin/AddNewGood.vue";
import AddNewGoodTest from "@/views/admin/GoodInfoInput.vue";
import AdminAuthViewVue from "@/views/admin/AdminAuthView.vue";
import AdminViewVue from "@/views/admin/AdminView.vue";
import _AddNewGoodVue from "@/views/admin/_AddNewGood.vue";
import ChooseCategory from '@/components/admin/ChooseCategory.vue';
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "main",
        component: MainPageVue,
    },
    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: AboutUsViewVue,
    },
    {
        path: "/for-buisness",
        component: ForBuisnessVue,
    },
    {
        path: "/admin/add-new-good",
        component: _AddNewGoodVue,
    },
    {
        path: "/admin/auth",
        component: AdminAuthViewVue,
    },
    {
        path: "/admin/",
        component: AdminViewVue
    },
    {
        path: "/catalog/:gender/:category",
        component: CatalogViewVue,
    },
    {
        path: "/catalog/:gender/:category/:id",
        component: GoodViewVue,
    },
    {
        path: "/cart",
        component: CartView,
    },
    {
        path: '/test',
        component: ChooseCategory
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
