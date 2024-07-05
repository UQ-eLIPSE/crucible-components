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

/**
 * Placeholder for the actual function that will be passed from the parent
 * component. Used for updating the user's attempt on a question.
 * Used for local testing.
 */
export const defaultUpdateQAttemptCallback = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _questionId: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _isCorrect: boolean,
) => {};

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
