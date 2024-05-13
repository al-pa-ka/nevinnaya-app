<template>
    <div class="flex h-screen w-full flex-col items-center justify-center gap-[20px]">
        <h5>Авторизуйтесь</h5>
        <form ref="form" class="flex flex-col gap-6">
            <input
                v-on:keyup.enter="auth()"
                class="border-[1px] border-green-400 pl-2 outline-none"
                placeholder="логин"
                name="login"
                type="text"
            />
            <input
                v-on:keyup.enter="auth()"
                class="border-[1px] border-green-400 pl-2 outline-none"
                placeholder="пароль"
                name="password"
                type="password"
                id=""
            />
        </form>
        <button v-on:click="auth()" class="bg-green-400 p-6 pb-2 pt-2 text-white">Войти</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import AuthCall from "@/api/Auth";
import Admin from "@/user/admin";
export default defineComponent({
    inject: ["admin"],
    data() {
        return {
            admin: (inject("admin") as Admin) || null,
        };
    },
    mounted() {
        if (this.admin && this.admin.isAutentificated()) {
            window.location.href = "/admin/";
        }
    },
    methods: {
        async auth() {
            const form = this.$refs.form as HTMLFormElement;
            const formData = new FormData(form);
            const authData = Object.fromEntries(formData) as { login: string; password: string };
            const admin = this.admin as Admin;
            const token = await admin?.authentificate(authData.login, authData.password);
            if (token && admin.isAutentificated()) {
                window.location.href = "/admin/add-new-good";
            }
        },
    },
});
</script>

<style></style>
