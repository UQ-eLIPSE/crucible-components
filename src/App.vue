<script setup lang="ts">
import { ref } from "vue";
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import MCQTimedQuiz from "@components/MCQ/MCQTimedQuiz.vue";
import StartPage from "@components/StartPage.vue";
import {
  filterQuestionsByTags,
  getQuestionsRandomly,
} from "./components/QuestionStore";
import { useQuizStore } from "./store/QuizStore";
import { QuizMode, StartQuizConfig } from "./types/MCQ";
import { MCQuestion } from "./types/MCQ";
import { getQuestionsBasedOnEnv } from "./components/DataAccessLayer";

const quizQuestions = ref(0);
const questionsQueue = useQuizStore();
const quizStarted = ref<boolean>(false);
const quizMode = ref<QuizMode>("Tutor");

const handleStartQuiz = ({
  questionAmount,
  mode,
  timeLimit,
}: StartQuizConfig) => {
  const selectedTags = questionsQueue.getselectedtags();

  const questions = getQuestionsBasedOnEnv();
  const filteredquestions: MCQuestion[] = filterQuestionsByTags(
    questions,
    selectedTags,
  );
  const quizAmount = getQuestionsRandomly(questionAmount, filteredquestions);
  quizQuestions.value = quizAmount.length;
  questionsQueue.initialiseQuiz(quizAmount, mode);
  quizStarted.value = true;
  quizMode.value = mode;

  if (mode === "Timed") {
    questionsQueue.setTimeLimit(timeLimit * quizAmount.length);
  }
};
</script>

<template>
  <MCQQuiz v-if="quizStarted && quizMode === 'Tutor'" />
  <MCQTimedQuiz v-else-if="quizStarted && quizMode === 'Timed'" />
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
