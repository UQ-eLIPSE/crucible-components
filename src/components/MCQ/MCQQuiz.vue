<template>
  <MCQQuestion
    v-if="currentQuestion"
    v-model:selected-option="selectedOption"
    :statement="currentQuestion.statement"
    :options-list="currentQuestion.optionsList"
    :_id="currentQuestion._id"
    @next-question="nextQuestion"
    @skip-question="skipQuestion"
  />
  <div class="next-prev-question">
    <ButtonUi
      v-if="questionsQueue.quizMode === 'Tutor'"
      :button-name="buttonUi.buttonName"
      :button-fuc="buttonUi.buttonFunc"
      @click="quizStateHandler"
      @next-question="nextQuestion()"
      @submit-answer="submitAnswer"
      @skip-question="skipQuestion"
    />

    <ButtonUi
      v-if="questionsQueue.quizMode === 'Timed'"
      :button-name="'&#x2192;'"
      :button-fuc="'timedNextQuestion'"
      @timed-next-question="timedNextQuestion()"
    />
    <ButtonUi
      v-if="
        questionsQueue.quizMode === 'Timed' &&
        questionsQueue.questionsStack.length > 1
      "
      :button-fuc="'timedNextQuestion'"
      :button-name="'&#x2190;'"
      @prev-question="prevQuestion()"
    />
  </div>
  <MCQStatus v-if="!currentQuestion" />
  <button v-if="!currentQuestion" class="btn-relocate" @click="refreshPage">
    End
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import type { MCQuestion } from "@type/MCQ.d.ts";
import MCQStatus from "./MCQStatus.vue";
import ButtonUi from "../ButtonUi.vue";
import { useQuizStore } from "@/store/QuizStore";

const currentQuestion = ref<MCQuestion | undefined>();
const selectedOption = ref<string | null>(null);

const questionsQueue = useQuizStore();
const buttonUi = ref<{ buttonName: string; buttonFunc: string }>({
  buttonName: "Skip",
  buttonFunc: "skipQuestion",
});
const quizState = ref("initial");
const submitted = ref<boolean>(false);
const remainingQuestions = ref<number>(questionsQueue.getRemainingQuestions());
onMounted(() => {
  nextQuestion();
});

watch(quizState, (newState) => {
  console.log("Quiz state changed", newState);
  switch (newState) {
    case "initial":
      buttonUi.value.buttonName = "Start";
      buttonUi.value.buttonFunc = "submit";
      break;
    case "next":
      buttonUi.value.buttonName = "Next";
      buttonUi.value.buttonFunc = "nextQuestion";
      break;
    case "prev":
      buttonUi.value.buttonName = "Previous";
      buttonUi.value.buttonFunc = "prevQuestion";
      break;
    case "submit":
      buttonUi.value.buttonName = "Submit";
      buttonUi.value.buttonFunc = "submit";
      break;
    // Add more cases as necessary
  }
});
const quizStateHandler = () => {
  console.log("Quiz state handler");
  quizState.value = quizState.value !== "initial" ? "initial" : "submit";
};
const submitAnswer = () => {
  // quizState.value = "initial";
  submitted.value = true;
};
const timedNextQuestion = () => {
  if (currentQuestion.value) trackQuizStatus();
  selectedOption.value = null;
  currentQuestion.value = questionsQueue.dequeueQuestion();
};
const nextQuestion = () => {
  quizState.value = "next";
  resetQuestion();
  remainingQuestions.value = questionsQueue.getRemainingQuestions();
  currentQuestion.value = questionsQueue.dequeueQuestion();
};

const skipQuestion = () => {
  // quizState.value = "next";
  console.log("Skip question");
  resetQuestion();
  questionsQueue.enqueueQuestion(currentQuestion.value as MCQuestion);
  nextQuestion();
};

const trackQuizStatus = () => {
  console.log(
    "questionID",
    currentQuestion.value?._id.$oid,
    "optionIdex",
    selectedOption.value,
  );
  questionsQueue.incrementStat(
    //_id.$oid,
    currentQuestion.value?._id.$oid ?? "",
    "attempts",
    selectedOption.value ?? undefined,
  );
};

const resetQuestion = () => {
  if (currentQuestion.value) trackQuizStatus();
  submitted.value = false;
  selectedOption.value = null;
};
const prevQuestion = () => {
  currentQuestion.value =
    questionsQueue.removeFromLastHistory() ?? currentQuestion.value;
};

// const skipQuestion = () => {
//   questionsQueue.enqueueQuestion(currentQuestion.value as MCQuestion);
//   nextQuestion();
// };

// const nextQuestion = () => {
//   currentQuestion.value = questionsQueue.dequeueQuestion();
// };

const refreshPage = () => window.location.reload();
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
