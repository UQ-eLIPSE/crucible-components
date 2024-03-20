<template>
  <MCQQuestion
    v-if="currentQuestion"
    :statement="currentQuestion.statement"
    :options-list="currentQuestion.optionsList"
    :_id="currentQuestion._id"
    @next-question="nextQuestion"
    @skip-question="skipQuestion"
  />
  <MCQStatus
    v-if="!currentQuestion"
    :quiz-status="questionsQueue.quizStats"
    :work-quiz="questionsQueue.quizStats.length"
  />
  <div v-if="!currentQuestion">You are done! Please refresh this page.</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import type { MCQuestion } from "@type/MCQ.d.ts";
import MCQStatus from "./MCQStatus.vue";
import { useQuizStore } from "@/store/QuizStore";

const currentQuestion = ref<MCQuestion | undefined>();

const questionsQueue = useQuizStore();

onMounted(() => {
  nextQuestion();
  console.log("onMonuted");
});

const skipQuestion = () => {
  questionsQueue.enqueueQuestion(currentQuestion.value as MCQuestion);
  nextQuestion();
};

const nextQuestion = () =>
  (currentQuestion.value = questionsQueue.dequeueQuestion());
</script>
