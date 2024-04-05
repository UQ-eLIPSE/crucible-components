<script setup lang="ts">
import { ref } from "vue";
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import StartPage from "@components/StartPage.vue";
import {
  filterQuestionsByTags,
  getQuestionsRandomly,
} from "./components/QuestionStore";
import { useQuizStore } from "./store/QuizStore";
import { MCQuestion, SelectedTags } from "./types/MCQ";
import { getAllQuestions } from "./components/DataAccessLayer";

const quizQuestions = ref(0);
const questionsQueue = useQuizStore();
const quizStarted = ref<boolean>(false);

const handleStartQuiz = ({
  questionAmount,
  selectedTags,
}: {
  questionAmount: number;
  selectedTags: SelectedTags;
}) => {
  const questions: MCQuestion[] = getAllQuestions();
  const filteredquestions: MCQuestion[] = filterQuestionsByTags(
    questions,
    selectedTags,
  );
  const quizAmount = getQuestionsRandomly(questionAmount, filteredquestions);
  quizQuestions.value = quizAmount.length;
  questionsQueue.initialiseQuiz(quizAmount);
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
