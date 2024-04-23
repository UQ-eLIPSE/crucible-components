<script setup lang="ts">
import { onMounted, ref } from "vue";
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import MCQTimedQuiz from "@components/MCQ/MCQTimedQuiz.vue";
import StartPage from "@components/StartPage.vue";
import {
  filterQuestionsByTags,
  getQuestionsRandomly,
} from "./components/QuestionStore";
import { useQuizStore } from "./store/QuizStore";
import { StartQuizConfig } from "./types/MCQ";
import { MCQuestion } from "./types/MCQ";
import {
  // getQuestionsBasedOnEnv,
  getAllQuestionsFromApi,
} from "./components/DataAccessLayer";

const quizQuestions = ref(0);
const questionsQueue = useQuizStore();
const quizStarted = ref<boolean>(false);
const questions = ref<MCQuestion[]>([]);

onMounted(async () => {
  const data = await getAllQuestionsFromApi();
  if (!data) return;
  questions.value = data;
});

const handleStartQuiz = ({ questionAmount, mode }: StartQuizConfig) => {
  const selectedTags = questionsQueue.getselectedtags();
  if (!questions.value.length)
    return alert("Trouble fetching questions, please try again later");

  // const questions = getQuestionsBasedOnEnv();
  const filteredquestions: MCQuestion[] = filterQuestionsByTags(
    questions.value,
    selectedTags,
  );
  const quizAmount = getQuestionsRandomly(questionAmount, filteredquestions);
  quizQuestions.value = quizAmount.length;
  questionsQueue.initialiseQuiz(quizAmount, mode);

  // Scale current time limit by the number of questions
  mode === "Timed" &&
    questionsQueue.setTimeLimit(questionAmount * questionsQueue.timeLimit);

  quizStarted.value = true;
};
</script>

<template>
  <MCQQuiz v-if="quizStarted && questionsQueue.quizMode === 'Tutor'" />
  <MCQTimedQuiz
    v-else-if="quizStarted && questionsQueue.quizMode === 'Timed'"
  />
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
