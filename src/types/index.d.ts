import { DataApi } from "./DataMCQ";
import { UpdateQAttemptCallbackType } from "./QuestionAttempt";

export type ViewerPluginOptions = {
  dataLink?: DataApi;
  // Updates the user's question attempt based on how they answered the question
  updateQAttemptCallback?: UpdateQAttemptCallbackType;
};

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $dataLink: DataApi;
  }
}
