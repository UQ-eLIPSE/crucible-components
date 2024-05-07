import "@vue/runtime-core";

export type ViewerPluginOptions = {
  dataLink?: string;
};

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $dataLink: string;
  }
}
