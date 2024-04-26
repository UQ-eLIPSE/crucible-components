import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import CrucibleComponent from "./components/CrucibleComponent.vue";

const pinia = createPinia();
const app = createApp(CrucibleComponent);
app.use(pinia);
app.mount("#app");
