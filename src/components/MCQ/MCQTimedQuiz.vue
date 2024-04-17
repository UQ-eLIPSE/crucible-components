<template>
  <h3>Time left: {{ formatSecondsToMinutes(timeLeft) }}</h3>
  <MCQQuiz />
</template>

<script setup lang="ts">
import { useQuizStore } from "@/store/QuizStore";
import MCQQuiz from "./MCQQuiz.vue";
import { onBeforeMount, onBeforeUnmount, ref } from "vue";

const oneSecond = 1000;

const quizStore = useQuizStore();

let timeoutId: number | null = null;
let intervalId: number | null = null;
const timeLeft = ref(quizStore.timeLimit);

const resetTimer = () => {
  timeoutId && clearTimeout(timeoutId);
  intervalId && clearInterval(intervalId);
};

const startTimer = () => {
  timeLeft.value = quizStore.timeLimit;

  intervalId = window.setInterval(() => {
    timeLeft.value--;
  }, oneSecond);

  timeoutId = window.setTimeout(() => {}, quizStore.timeLimit * oneSecond);
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

<style></style>
