<template>
  <div>MCQ Quiz</div>
  <MCQQuestion
    :title="questions[currentQuestionIndex].title"
    :options="questions[currentQuestionIndex].options"
    @next-question="nextQuestion"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import type { MCQQuiz } from "@type/MCQ.d.ts";

const { questions } = defineProps<MCQQuiz>();
const currentQuestionIndex = ref<number>(0);

const nextQuestion = () => {
  currentQuestionIndex.value =
    currentQuestionIndex.value + 1 < questions.length
      ? currentQuestionIndex.value + 1
      : 0;
};
</script>
