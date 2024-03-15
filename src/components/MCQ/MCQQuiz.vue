<template>
  <div>MCQ Quiz</div>
  <MCQQuestion
    v-if="currentQuestion"
    :statement="currentQuestion.statement"
    :options-list="currentQuestion.optionsList"
    @next-question="nextQuestion"
    @skip-question="skipQuestion"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import type { MCQuestion } from "@type/MCQ.d.ts";
import { useQuestionsQueueStore } from '@store/QuizStore'

const currentQuestion = ref<MCQuestion | undefined>();
const questionsQueue = useQuestionsQueueStore();

onMounted(() => {
  nextQuestion();
});

const skipQuestion = () => {
  questionsQueue.enqueueQuestion(currentQuestion.value as MCQuestion);
  nextQuestion();
};

const nextQuestion = () => (currentQuestion.value = questionsQueue.dequeueQuestion());
</script>
