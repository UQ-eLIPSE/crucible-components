<script setup lang="ts">
import MCQ from "./components/MCQ.vue";
import { title } from "@data/question-data.json";
</script>

<template>
  <MCQ :title="title" />
</template>

<style scoped></style>
