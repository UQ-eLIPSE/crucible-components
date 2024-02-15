<script setup lang="ts">
import MCQ from "./components/MCQ.vue";
import { questions } from "@data/question-data.json";
</script>

<template>
  <MCQ :questions="questions" />
</template>

<style scoped></style>
