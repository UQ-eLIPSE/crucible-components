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

export const defaultUpdateQAttemptCallback = async (
  questionId: string,
  isCorrect: boolean,
) => {
  console.info(
    `Default updateQAttemptCallback called on ${questionId} and is correct: ${isCorrect}`,
  );
};

export function createViewerPlugin(
  app: App,
  options: ViewerPluginOptions = {},
) {
  const pinia = createPinia();
  app.use(pinia);
  app.component("CrucibleComponent", CrucibleComponent);
  app.provide("$dataLink", options.dataLink || defaultData);
  app.provide(
    "$updateQAttemptCallback",
    options.updateQAttemptCallback || defaultUpdateQAttemptCallback,
  );
}

export { CrucibleComponent };
