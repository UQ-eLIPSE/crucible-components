import { App } from "vue";
import { createPinia } from "pinia";
import CrucibleComponent from "./components/CrucibleComponent.vue";

export function createViewerPlugin(app: App) {
  const pinia = createPinia();
  app.use(pinia);
  app.component("CrucibleComponent", CrucibleComponent);
}

export { CrucibleComponent };
