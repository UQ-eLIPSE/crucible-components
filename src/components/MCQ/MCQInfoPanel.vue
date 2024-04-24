<template>
  <h3 v-if="timeLeft" class="time-left-header">
    Time left: {{ formatSecondsToMinutes(timeLeft) }}
  </h3>
  <h3 class="questions-left-header">
    Question {{ questionsQueue.questionsStack.length }} out of
    {{
      questionsQueue.questionsQueue.length +
      questionsQueue.questionsStack.length
    }}
  </h3>
</template>

<script setup lang="ts">
import { useQuizStore } from "@/store/QuizStore";

const questionsQueue = useQuizStore();

const { timeLeft } = defineProps({
  timeLeft: {
    type: Number,
    default: 0,
  },
});

const formatSecondsToMinutes = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
</script>

<style scoped></style>
