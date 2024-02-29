<template>
  <MCQQuiz :questions="questions" />
</template>

<script setup lang="ts">
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import { questions } from "@data/question-data.json";
</script>
