<template>
  <div class="mcq-result">
    <span class="correct-result">{{ correctQuiz }}</span> /
    <span class="workquiz">{{ workQuiz }}</span>
  </div>
</template>

<script setup lang="ts">
import { MCQResult } from "@/types/MCQ";
const { correctQuiz, workQuiz } = defineProps<MCQResult>();
</script>
