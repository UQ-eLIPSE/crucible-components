import { App } from "vue";
import { createPinia } from "pinia";
import CrucibleComponent from "./components/CrucibleComponent.vue";
import { ViewerPluginOptions } from "./types";

export const defaultData = {
  data: {
    questions: [
      {
        _id: { $oid: "6625c7c8c8259deb8c3af39e" },
        statement: "",
        tags: [""],
        optionsList: { optionValue: "", optionCorrect: false },
        link: "",
      },
    ],
  },
};

export function createViewerPlugin(
  app: App,
  options: ViewerPluginOptions = {},
) {
  const pinia = createPinia();
  app.use(pinia);
  app.component("CrucibleComponent", CrucibleComponent);
  app.provide("$dataLink", options.dataLink || defaultData);
}

export { CrucibleComponent };
