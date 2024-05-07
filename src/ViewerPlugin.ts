import { App } from "vue";
import { createPinia } from "pinia";
import CrucibleComponent from "./components/CrucibleComponent.vue";
import { ViewerPluginOptions } from "./types";

const defaultDataLink = "http://localhost:8080/api/resource/getQuiz";
export function createViewerPlugin(
  app: App,
  options: ViewerPluginOptions = {},
) {
  const pinia = createPinia();
  app.use(pinia);
  app.component("CrucibleComponent", CrucibleComponent);
  app.provide("dataLink", options.dataLink || defaultDataLink);
  console.log(options.dataLink);
}

export { CrucibleComponent };
