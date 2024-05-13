import "./assets/main.css";
import "../src/assets/index.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);

app.mount("#app");

// Vue.config.silent = true