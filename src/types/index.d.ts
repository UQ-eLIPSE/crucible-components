import { DataApi } from "./DataMCQ";

export type ViewerPluginOptions = {
  dataLink?: DataApi;
};

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $dataLink: DataApi;
  }
}
