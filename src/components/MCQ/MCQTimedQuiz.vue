<template>
  <main>
    <MCQInfoPanel :time-left="timeLeft" />
    <MCQQuestion
      v-if="currentQuestion"
      :statement="currentQuestion.statement"
      :options-list="currentQuestion.optionsList"
      :_id="currentQuestion._id"
      @next-question="nextQuestionhandler"
      @prev-question="prevQuestionHandler"
    />
    <MCQStatus v-if="!currentQuestion" />
    <button v-if="!currentQuestion" class="btn-relocate" @click="refreshPage">
      End
    </button>
  </main>
</template>

<script setup lang="ts">
import { useQuizStore } from "../../store/QuizStore";
import MCQQuestion from "./MCQQuestion.vue";
import MCQStatus from "./MCQStatus.vue";
import { onBeforeMount, onMounted, ref } from "vue";
import { MCQuestion } from "../../types/MCQ";
import MCQInfoPanel from "./MCQInfoPanel.vue";
const oneSecond = 1000;
const timeoutTag = "-1"; // Marks a question as timed out in quiz store

const questionsQueue = useQuizStore();
const currentQuestion = ref<MCQuestion | undefined>();

let timeoutId: number | null = null;
let intervalId: number | null = null;
const timeLeft = ref(questionsQueue.timeLimit);

onMounted(() => {
  nextQuestionhandler();
});

onBeforeMount(() => {
  resetTimer();
  startTimer();
});
const prevQuestionHandler = () => {
  currentQuestion.value =
    questionsQueue.removeFromLastHistory() ?? currentQuestion.value;
};
const nextQuestionhandler = () =>
  (currentQuestion.value = questionsQueue.dequeueQuestion());

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

const skipToEnd = () => {
  resetTimer();
  const markQuestionAsTimedOut = (currQuestionId: string) =>
    questionsQueue.incrementStat(currQuestionId, "attempts", timeoutTag);

  markQuestionAsTimedOut(currentQuestion.value?._id.$oid ?? "");

  while ((currentQuestion.value = questionsQueue.dequeueQuestion())) {
    markQuestionAsTimedOut(currentQuestion.value._id.$oid);
  }

  alert("Time's up! Quiz has ended.");

  return nextQuestionhandler();
};
</script>

<style scoped>
main {
  width: 800px;
}

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

@media screen and (max-width: 1000px) {
  main {
    width: 100%;
  }
}
</style>
