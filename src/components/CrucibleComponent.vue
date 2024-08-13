<script setup lang="ts">
import { inject, onBeforeMount, ref, toRefs } from "vue";
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import MCQTimedQuiz from "@components/MCQ/MCQTimedQuiz.vue";
import StartPage from "@components/StartPage.vue";
import {
  filterQuestionsByTags,
  getQuestionsFromSRS,
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
import { DataMCQuestion } from "@/types/DataMCQ";
const props = defineProps({
  level: {
    type: Number,
    default: 5, // a default value is required for Vue props
  },
});
const enableSRS = ref(false);
const quizQuestions = ref(0);
const questionsQueue = useQuizStore();
const quizStarted = ref<boolean>(false);
const questions = ref<MCQuestion[]>([]);
// Inject data from crucible parent here
const apiData: string = inject("$dataLink") as string;
const { level } = toRefs(props);
onBeforeMount(async () => {
  if (apiData) {
    const result = async () => {
      const res = await fetch(`${apiData}?level=${level.value}`);
      const data = await res.json();
      const questionsFromServer = data.questions;

      return questionsFromServer;
    };
    const questionsMCQ = await result();
    questions.value = getAllQuestions(questionsMCQ as DataMCQuestion[]);
  } else {
    questions.value = getConvertedStaticData();
  }

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
  questionsQueue.setTagSet();
});

const handleStartQuiz = ({ questionAmount, mode }: StartQuizConfig) => {
  const selectedTags = questionsQueue.getselectedtags();
  if (!questions.value.length)
    return alert("Trouble fetching questions, please try again later");
  const filteredquestions: MCQuestion[] = filterQuestionsByTags(
    questions.value,
    selectedTags,
  );
  const quizAmount = enableSRS.value
    ? getQuestionsFromSRS(questionAmount, filteredquestions)
    : getQuestionsRandomly(questionAmount, filteredquestions);
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
  <StartPage v-else v-model="enableSRS" @start-quiz="handleStartQuiz" />
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
