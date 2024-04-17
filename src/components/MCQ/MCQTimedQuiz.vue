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
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";
import { MCQuestion } from "@/types/MCQ";

const oneSecond = 1000;

const questionsQueue = useQuizStore();
const currentQuestion = ref<MCQuestion | undefined>();

let timeoutId: number | null = null;
let intervalId: number | null = null;
const timeLeft = ref(questionsQueue.timeLimit);

onMounted(() => {
  nextQuestion();
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

  intervalId = window.setInterval(() => {
    if (!timeLeft.value) {
      resetTimer();
      return;
    }
    timeLeft.value--;
  }, oneSecond);

  timeoutId = window.setTimeout(() => {}, questionsQueue.timeLimit * oneSecond);
};

const performTimerActions = () => {
  resetTimer();
  startTimer();
};

onBeforeMount(() => {
  performTimerActions();
});

onBeforeUnmount(() => {
  resetTimer();
});

// A function that converts seconds to MM:SS format
const formatSecondsToMinutes = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
