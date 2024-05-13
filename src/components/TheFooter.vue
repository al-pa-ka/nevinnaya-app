<template>
    <section class="flex bg-black p-5">
        <div class="w-full">
            <div class="flex flex-col justify-between gap-10 md:flex-row">
                <div class="flex flex-col gap-4">
                    <h5 class="footer__nav-content-title">Навигация</h5>
                    <ul class="flex flex-col items-start gap-3">
                        <li class="footer__nav-content-item">Женщины</li>
                        <li class="footer__nav-content-item">Мужчины</li>
                        <li class="footer__nav-content-item">Lookbook</li>
                        <li class="footer__nav-content-item">О нас</li>
                        <li class="footer__nav-content-item">Для бизнеса</li>
                    </ul>
                </div>
                <div class="flex flex-col gap-4">
                    <h5 class="footer__nav-content-title">Информация</h5>
                    <ul class="flex flex-col items-start gap-3">
                        <li class="footer__nav-content-item">Мой аккаунт</li>
                        <li class="footer__nav-content-item">Политика возврата</li>
                        <li class="footer__nav-content-item">Политика конфиденциальности</li>
                        <li class="footer__nav-content-item">Таблица размеров</li>
                        <li class="footer__nav-content-item">Вопросы и ответы</li>
                    </ul>
                </div>
                <div class="footer__nav-content news">
                    <h5 class="font-[Roboto] text-[24px] uppercase text-white">Получай новости</h5>
                    <input class="footer__nav-content-email-input" type="text" name="" placeholder="E-mail" id="" />
                    <p class="footer__nav-content-email-caption">Подпишитесь и получите скидку 10% на первый заказ</p>
                </div>
            </div>
            <div class="delimetr mt-4"></div>
            <div class="flex flex-col items-start justify-between gap-1 pt-3 sm:flex-row sm:items-center">
                <p class="cookies-and-contacts__cookies-notice h-fit">Cookie notice</p>
                <div class="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
                    <p class="h-fit font-[Roboto-Light] text-[18px] text-white">Контакты</p>
                    <img class="cookies-and-contacts__contacts-social-media" src="../assets/images/whats-app.svg" alt="" />
                    <img class="cookies-and-contacts__contacts-social-media" src="../assets/images/telegram.svg" alt="" />
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.footer {
    background-color: black;
    width: 100%;
    height: fit-content;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 128px;
    padding-right: 128px;
    padding-top: 88px;
    padding-bottom: 50px;
}

.footer__nav-wrapper {
    width: 100%;
}

.footer__nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

h5 {
    margin: 0;
    padding: 0;
}

ul {
    margin: 0;
    padding: 0;
    flex: 1;
    list-style-type: none;
    display: flex;
    flex-direction: column;
}

.footer__nav-content-title {
    font-family: Roboto;
    color: white;
    font-size: 24px;
    text-transform: uppercase;
    font-weight: 400;
}

.footer__nav-content-email-caption,
.footer__nav-content-item,
.cookies-and-contacts__cookies-notice,
.cookies-and-contacts__contacts-text {
    color: white;
    font-family: Roboto-Light;
    font-size: 18px;
}

.footer__nav-content-email-caption {
    margin: 0;
}

.footer__nav-content-list {
    padding-top: 45px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.footer__nav-content-title-news {
    font-size: 32px;
}

.footer__nav-content-email-input {
    width: 100%;
    height: 58px;
    font-family: Roboto;
    font-size: 20px;
    box-sizing: border-box;
    padding-left: 18px;
    outline: none;
}

.footer__nav-content.news {
    display: flex;
    flex-direction: column;
    gap: 32px;
}

.delimetr {
    width: 100%;
    height: 1px;
    background-color: white;
}

.cookies-and-contacts {
    display: flex;
    justify-content: space-between;
}
.cookies-and-contacts__contacts {
    display: flex;
    flex-direction: row;
    gap: 18px;
}
.cookies-and-contacts__contacts-text {
    padding-right: 31px;
}
</style>
