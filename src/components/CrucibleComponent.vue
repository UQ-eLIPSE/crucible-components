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
import { UpdateQAttemptCallbackType } from "@/types/QuestionAttempt";
import { defaultUpdateQAttemptCallback } from "@/ViewerPlugin";

const quizQuestions = ref(0);
const questionsQueue = useQuizStore();
const quizStarted = ref<boolean>(false);
const questions = ref<MCQuestion[]>([]);
// Inject data from crucible parent here
const apiData: DataApi = inject("$dataLink") as DataApi;
const updateQuestionAttemptApi =
  (inject("$updateQAttemptCallback") as UpdateQAttemptCallbackType) ??
  defaultUpdateQAttemptCallback;

console.log("update q attempt function", updateQuestionAttemptApi);
// testing purposes
console.log(
  "updating 64ba560447d01bfdcb099df8",
  updateQuestionAttemptApi("64ba560447d01bfdcb099df8", true),
);
onBeforeMount(() => {
  // Fetch quiz data from API
  questions.value = apiData
    ? getAllQuestions(apiData.data.questions as DataMCQuestion[])
    : getConvertedStaticData();

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

<style>
@font-face {
  font-family: "icomoon";
  src:
    url("../public/fonts/icomoon.eot?tvt6dy#iefix") format("embedded-opentype"),
    url("../public/fonts/icomoon.ttf?tvt6dy") format("truetype"),
    url("../public/fonts/icomoon.woff?tvt6dy") format("woff"),
    url("../public/fonts/icomoon.svg?tvt6dy#icomoon") format("svg");
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  transition: border-color 0.25s;
}

button:not([disabled]):hover {
  border-color: black;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
label p {
  margin: 0;
}
</style>
