<template>
  <div id="app">
    <CrucibleComponent />
  </div>
</template>

<script setup>
import { createApp } from "vue";
import App from "./App.vue";
import { createViewerPlugin, defaultData } from "@/ViewerPlugin.ts";

const app = createApp(App);

const options = {
  dataLink: defaultData,
};

// Use your plugin
createViewerPlugin(app, options);

app.mount("#app");
</script>
