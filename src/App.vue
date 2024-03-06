<script setup lang="ts">
import { ref } from "vue";
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import { questions } from "@data/question-data.json";
import StartPage from "./components/MCQ/StartPage.vue";
const showQuiz = ref(false);
const quizQuestions = ref(questions);

const handleStartQuiz = (questionAmount: number, tag?: string) => {
  quizQuestions.value = questions.slice(0, questionAmount);

  if (tag) {
    quizQuestions.value = quizQuestions.value.filter(
      (question) => question.tags && question.tags.includes(tag),
    );
  }
  showQuiz.value = true;
};
</script>

<template>
  <MCQQuiz v-if="showQuiz" :questions="quizQuestions" />
  <StartPage v-else :questions="questions" @start-quiz="handleStartQuiz" />
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
