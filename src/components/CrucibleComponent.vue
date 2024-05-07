<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import MCQTimedQuiz from "@components/MCQ/MCQTimedQuiz.vue";
import StartPage from "@components/StartPage.vue";
import {
  filterQuestionsByTags,
  getQuestionsRandomly,
} from "../components/QuestionStore";
import { useQuizStore } from "../store/QuizStore";
import { StartQuizConfig } from "../types/MCQ";
import { MCQuestion } from "../types/MCQ";
import {
  getAllQuestionsFromApi,
  getQuestionsBasedOnEnv,
} from "../components/DataAccessLayer";

const quizQuestions = ref(0);
const questionsQueue = useQuizStore();
const quizStarted = ref<boolean>(false);
const questions = ref<MCQuestion[]>([]);

onMounted(async () => {
  // Fetch quiz data from API
  const useStatic = import.meta.env.VITE_USE_DUMMY_DATA === "false";
  questions.value = useStatic
    ? await getAllQuestionsFromApi()
    : getQuestionsBasedOnEnv();
});

const dataAPI = inject("dataLink");
const handleStartQuiz = ({ questionAmount, mode }: StartQuizConfig) => {
  console.log("dataLink: ", dataAPI);
  const selectedTags = questionsQueue.getselectedtags();
  if (!questions.value.length)
    return alert("Trouble fetching questions, please try again later");

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
