<template>
  <h3 v-if="timeLeft">Time left: {{ formatSecondsToMinutes(timeLeft) }}</h3>
  <MCQQuestion
    v-if="currentQuestion"
    :statement="currentQuestion.statement"
    :options-list="currentQuestion.optionsList"
    :_id="currentQuestion._id"
    @next-question="nextQuestion"
    @skip-question="skipQuestion"
  />
  <MCQStatus v-if="!currentQuestion" />
  <button v-if="!currentQuestion" class="btn-relocate" @click="refreshPage">
    End
  </button>
</template>

<script setup lang="ts">
import { useQuizStore } from "@/store/QuizStore";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import MCQStatus from "./MCQStatus.vue";
import { onBeforeMount, onMounted, ref } from "vue";
import { MCQuestion } from "@/types/MCQ";

const oneSecond = 1000;
const timeoutTag = "-1"; // Marks a question as timed out in quiz store

const questionsQueue = useQuizStore();
const currentQuestion = ref<MCQuestion | undefined>();

let timeoutId: number | null = null;
let intervalId: number | null = null;
const timeLeft = ref(questionsQueue.timeLimit);

onMounted(() => {
  nextQuestion();
});

onBeforeMount(() => {
  resetTimer();
  startTimer();
});

const nextQuestion = () =>
  (currentQuestion.value = questionsQueue.dequeueQuestion());

const skipQuestion = () => {
  if (!currentQuestion.value) {
    console.error(
      "Attempting to skip a question when no remaining questions are available.",
    );
    return;
  }
  questionsQueue.enqueueQuestion(currentQuestion.value as MCQuestion);
  nextQuestion();
};

const refreshPage = () => window.location.reload();

const resetTimer = () => {
  timeoutId && clearTimeout(timeoutId);
  intervalId && clearInterval(intervalId);
};

const startTimer = () => {
  timeLeft.value = questionsQueue.timeLimit;

  const decrementTimer = () => {
    if (!currentQuestion.value) return resetTimer();
    return !timeLeft.value ? skipToEnd() : timeLeft.value--;
  };

  intervalId = window.setInterval(decrementTimer, oneSecond);

  timeoutId = window.setTimeout(() => {}, questionsQueue.timeLimit * oneSecond);
};

// A function that converts seconds to MM:SS format
const formatSecondsToMinutes = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const skipToEnd = () => {
  resetTimer();
  const markQuestionAsTimedOut = (currQuestionId: string) =>
    questionsQueue.incrementStat(currQuestionId, "attempts", timeoutTag);

  markQuestionAsTimedOut(currentQuestion.value?._id.$oid ?? "");

  while ((currentQuestion.value = questionsQueue.dequeueQuestion())) {
    markQuestionAsTimedOut(currentQuestion.value._id.$oid);
  }

  alert("Time's up! Quiz has ended.");

  return nextQuestion();
};
</script>

<style>
.btn-relocate {
  float: right;
  background-color: green;
  color: white;
  padding: 6px 12px;
  text-align: center;
  border: 1px solid #7e7e7e;
  border-radius: 5px;
  width: fit-content;
  margin: auto;
  margin-bottom: 5px;
  cursor: pointer;
}
</style>
