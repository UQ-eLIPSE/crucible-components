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
  <button v-if="!currentQuestion" class="btn-relocate" @click="refreshPage">
    End
  </button>
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
});

const skipQuestion = () => {
  questionsQueue.enqueueQuestion(currentQuestion.value as MCQuestion);
  nextQuestion();
};

const nextQuestion = () => {
  currentQuestion.value = questionsQueue.dequeueQuestion();
};

const refreshPage = () => window.location.reload();
</script>

<style>
.btn-relocate {
  float: right;
  background-color: green;
  color: white;
  padding: 6px 12px;
  text-align: center;
  border: 1px solid #7e7e7e;
  border-radius: 5px;
  width: fit-content;
  margin: auto;
  margin-bottom: 5px;
}
</style>
