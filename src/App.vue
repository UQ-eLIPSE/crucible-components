<script setup lang="ts">
import MCQ from "./components/MCQ.vue";
import { title, options } from "@data/question-data.json";
</script>

<template>
  <MCQ :title="title" :options="options" />
</template>

<style scoped></style>
