import type { App } from "vue";
import { CrucibleComponent } from "./components";

export default {
  install: (app: App) => {
    app.component("CrucibleComponent", CrucibleComponent);
  },
};

export { CrucibleComponent };
