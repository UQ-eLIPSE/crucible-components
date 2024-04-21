import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import ViewerPlugin from "./ViewerPlugin";

const pinia = createPinia();
const app = createApp(App);
app.use(ViewerPlugin);
app.use(pinia);
app.mount("#app");
