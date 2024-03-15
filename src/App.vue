<script setup lang="ts">
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import StartPage from "@components/StartPage.vue";
import { getQuestionsByTagAndLimit } from "./components/QuestionStore";
import { useQuestionsQueueStore } from '@store/QuizStore'
import { ref } from "vue";

const questionsQueue = useQuestionsQueueStore();
const quizStarted = ref<boolean>(false);

const handleStartQuiz = (questionAmount: number, tags?: string[]) => {
  questionsQueue.initialiseQueue(getQuestionsByTagAndLimit(questionAmount, tags));
  quizStarted.value = true;
};
</script>

<template>
  <MCQQuiz v-if="quizStarted" />
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
