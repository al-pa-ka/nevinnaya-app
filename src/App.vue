<script setup lang="ts">
import { provide } from "vue";
import Admin from "./user/admin";
import { RouterView } from "vue-router";

provide("admin", new Admin());
</script>

<template>
    <RouterView />
</template>
