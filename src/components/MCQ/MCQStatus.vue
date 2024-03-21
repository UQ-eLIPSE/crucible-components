<template>
  <div>
    <!-- ToDo: add quizstatus report card here -->
    <div class="mcq-result">
      Score:
      <span class="correct-result">{{ numer }}</span> out of
      <span class="workquiz">{{ workQuiz }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MCQResult } from "@/types/MCQ";
const { quizStatus, workQuiz } = defineProps<MCQResult>();
const numer = quizStatus.filter((quiz) => {
  return quiz.correct === 1;
}).length;
</script>

<style scoped>
.mcq-result {
  background-color: green;
  color: white;
  padding: 4px 8px;
  text-align: center;
  border-radius: 5px;
  width: fit-content;
  margin: auto;
}
</style>
