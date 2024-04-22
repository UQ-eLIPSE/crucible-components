// import type { App } from "vue";
// import { CrucibleComponent } from "./components";

// export default {
//   install: (app: App) => {
//     app.component("CrucibleComponent", CrucibleComponent);
//   },
// };

// export { CrucibleComponent };
// import { createPinia } from 'pinia';
// import { createApp } from 'vue';
// import {CrucibleComponent} from './components'; // Adjust the path as necessary

// export function createViewerPlugin(): any {
//   const app = createApp(CrucibleComponent);
//   const pinia = createPinia();
//   app.use(pinia);
//   return app;
// }
// export { CrucibleComponent };
import { App } from "vue";
import { createPinia } from "pinia";
import { CrucibleComponent } from "./components"; // Ensure the correct path

// Function that enhances an existing Vue app instance
export function createViewerPlugin(app: App) {
  const pinia = createPinia();
  app.use(pinia);
  app.component("CrucibleComponent", CrucibleComponent);
}

// Exporting the component itself if direct import is needed elsewhere
export { CrucibleComponent };
