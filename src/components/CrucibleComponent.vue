<script setup lang="ts">
import { inject, onBeforeMount, ref } from "vue";
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import MCQTimedQuiz from "@components/MCQ/MCQTimedQuiz.vue";
import StartPage from "@components/StartPage.vue";
import {
  filterQuestionsByTags,
  getQuestionsRandomly,
  getUniquePropertyValues,
} from "../components/QuestionStore";
import { useQuizStore } from "../store/QuizStore";
import { StartQuizConfig } from "../types/MCQ";
import { MCQuestion } from "../types/MCQ";
import {
  getAllQuestions,
  getConvertedStaticData,
} from "../components/DataAccessLayer";
import { DataApi, DataMCQuestion } from "@/types/DataMCQ";

const quizQuestions = ref(0);
const questionsQueue = useQuizStore();
const quizStarted = ref<boolean>(false);
const questions = ref<MCQuestion[]>([]);
// Inject data from crucible parent here
const apiData: DataApi = inject("$dataLink") as DataApi;

onBeforeMount(() => {
  // Fetch quiz data from API
  const useStatic = import.meta.env.VITE_USE_DUMMY_DATA === "false";
  questions.value = useStatic
    ? getConvertedStaticData()
    : getAllQuestions(apiData.data.questions as DataMCQuestion[]);
  questionsQueue.allQs = questions.value;

  const allUniqueTags = getUniquePropertyValues(
    questions.value.map((q) => q.tags),
  );
  // For filtering functionality
  questionsQueue.setselectedTags(
    Object.keys(allUniqueTags).reduce((acc, tag) => {
      return { ...acc, [tag]: [] };
    }, {}),
  );
});

const handleStartQuiz = ({ questionAmount, mode }: StartQuizConfig) => {
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
@font-face {
  font-family: "icomoon";
  src:
    url("../public/fonts/icomoon.eot?tvt6dy#iefix") format("embedded-opentype"),
    url("../public/fonts/icomoon.ttf?tvt6dy") format("truetype"),
    url("../public/fonts/icomoon.woff?tvt6dy") format("woff"),
    url("../public/fonts/icomoon.svg?tvt6dy#icomoon") format("svg");
}

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
