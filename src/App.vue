<script setup lang="ts">
import { ref } from "vue";
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import StartPage from "./components/MCQ/StartPage.vue";
import { setQuestions } from "./components/QuestionStore";
const quizQuestions = ref();

const handleStartQuiz = (questionAmount: number, tag?: string) => {
  quizQuestions.value = setQuestions(questionAmount, tag);
};
</script>

<template>
  <MCQQuiz v-if="quizQuestions.length" :questions="quizQuestions" />
  <StartPage v-else @start-quiz="handleStartQuiz" />
</template>

<style scoped>
#question-amount {
  margin-left: 5px;
}

.start-button {
  color: #ffffff;
  background-color: #2a52be;
  margin-top: 5%;
}

.tag-list {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
}
</style>
