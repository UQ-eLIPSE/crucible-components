<template>
  <div class="mcq-result">
    Score:
    <span class="correct-result">{{ correctQuiz }}</span> out of
    <span class="workquiz">{{ workQuiz }}</span>
  </div>
</template>

<script setup lang="ts">
import { MCQResult } from "@/types/MCQ";
const { correctQuiz, workQuiz } = defineProps<MCQResult>();
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
