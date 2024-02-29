<script setup lang="ts">
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import { questions } from "@data/question-data.json";
</script>

<template>
  <MCQQuiz :questions="questions" />
</template>

<style scoped></style>
