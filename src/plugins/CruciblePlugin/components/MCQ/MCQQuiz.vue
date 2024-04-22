<template>
  <MCQQuestion
    v-if="currentQuestion"
    v-model:selected-option="selectedOption"
    v-model:selected-question="isSelected"
    :statement="currentQuestion.statement"
    :options-list="currentQuestion.optionsList"
    @next-question="nextQuestion"
    @skip-question="skipQuestion"
  />
  <div v-if="currentQuestion" class="next-prev-question">
    <ButtonUi
      v-if="questionsQueue.quizMode === 'Tutor'"
      :button-name="buttonUi.buttonName"
      :button-fuc="buttonUi.buttonFunc"
      @next-question="nextQuestion()"
      @submit-answer="submitAnswer"
      @skip-question="skipQuestion"
    />
  </div>
  <MCQStatus v-if="!currentQuestion" />
  <button v-if="!currentQuestion" class="btn-relocate" @click="refreshPage">
    End
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import MCQQuestion from "./MCQQuestion.vue";
import type { MCQuestion } from "@/plugins/CruciblePlugin/types/MCQ";
import MCQStatus from "./MCQStatus.vue";
import ButtonUi from "./ButtonUi.vue";
import { useQuizStore } from "@/plugins/CruciblePlugin/store/QuizStore";

const currentQuestion = ref<MCQuestion | undefined>();
const selectedOption = ref<string | null>(null);
const isSelected = ref(false);

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
watch(isSelected, (newIsSelected) => {
  console.log("isSelected", isSelected.value);
  if (quizState.value === "initial" && newIsSelected) quizState.value = "next";
});
watch(quizState, (newState) => {
  console.log("Quiz state changed", newState);
  switch (newState) {
    case "initial":
      buttonUi.value.buttonName = "Skip";
      buttonUi.value.buttonFunc = "skipQuestion";
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
// const quizStateHandler = () => {
//   console.log("loading");
//   // console.log("Quiz state handler");
//   // quizState.value = quizState.value !== "initial" ? "initial" : "next";
// };
const submitAnswer = () => {
  // quizState.value = "initial";
  submitted.value = true;
};

const nextQuestion = () => {
  isSelected.value = false;
  quizState.value = "initial";
  console.log("next clicked", quizState.value);
  resetQuestion();
  remainingQuestions.value = questionsQueue.getRemainingQuestions();
  currentQuestion.value = questionsQueue.dequeueQuestion();
};

const skipQuestion = () => {
  // quizState.value = "next";
  isSelected.value = false;
  resetQuestion();
  questionsQueue.enqueueQuestion(currentQuestion.value as MCQuestion);
  console.log("Skip question", "isSelected", isSelected.value);
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
  // submitted.value = false;
  // selectedOption.value = null;
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
