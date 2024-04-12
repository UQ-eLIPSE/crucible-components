<!-- eslint-disable vue/no-v-html -->
<template>
  <div v-if="statUpdate.quizMode === 'Timed'">
    <h3 v-if="timeLeft">Time left: {{ timeLeft }} seconds</h3>
    <h3 v-else class="time-up-msg">
      Time's up! Let's move on to the next question.
    </h3>
  </div>
  <div class="mcq-statement" v-html="statement" />
  <div class="mcq-list">
    <div
      v-for="[key, value] in Object.entries(optionsList)"
      :key="key"
      class="mcq-option"
      :class="optionClass(key, optionsList)"
      @click="selectOption(key)"
    >
      <MCQOption
        :option-key="key"
        :checked="selectedOption === key"
        :option="value"
        :submitted="submitted"
        @select-option="selectOption(key)"
      />
    </div>
  </div>
  <MCQButton
    :submitted="submitted"
    :selected-option="selectedOption"
    @submit-answer="submitAnswer"
    @next-question="nextQuestion(_id)"
    @skip-question="skipQuestion"
  />
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import type { MCQuestionProp, MCQOptions } from "@type/MCQ.d.ts";
import MCQOption from "./MCQOption.vue";
import MCQButton from "./MCQButton.vue";
import { useQuizStore } from "@/store/QuizStore";

const statUpdate = useQuizStore();

const { statement, optionsList, _id } = defineProps<MCQuestionProp>();
const selectedOption = ref<string | null>(null);
const submitted = ref<boolean>(false);
const emit = defineEmits(["nextQuestion", "skipQuestion"]);

// timer stuff if in "Timed" quizmode
let timeoutId: number | null = null;
let intervalId: number | null = null;
const timeLeft = ref(statUpdate.getTimeLimit());

const resetTimer = () => {
  timeoutId && clearTimeout(timeoutId);
  intervalId && clearInterval(intervalId);
};

const startTimer = () => {
  timeLeft.value = statUpdate.getTimeLimit();

  intervalId = window.setInterval(() => {
    timeLeft.value--;
  }, 1000);

  timeoutId = window.setTimeout(() => {
    selectedOption.value = "-1";
    submitAnswer();
  }, statUpdate.getTimeLimit() * 1000);
};

const submitAnswer = () => {
  submitted.value = true;
  resetTimer();
};

const performTimerActions = () => {
  if (statUpdate.quizMode !== "Timed") return;

  resetTimer();
  startTimer();
};

onBeforeMount(() => {
  performTimerActions();
});

onBeforeUnmount(() => {
  resetTimer();
});

const nextQuestion = (_id: { $oid: string }) => {
  resetQuestion(_id);
  emit("nextQuestion");
  performTimerActions();
};

const skipQuestion = () => {
  resetQuestion(_id);
  emit("skipQuestion");
  performTimerActions();
};

const trackQuizStatus = (_id: { $oid: string }) =>
  statUpdate.incrementStat(_id.$oid, "attempts", selectedOption.value || "");

const resetQuestion = (_id: { $oid: string }) => {
  trackQuizStatus(_id);
  submitted.value = false;
  selectedOption.value = null;
};

// Only allow selection if the quiz is not submitted
const selectOption = (key: string) => {
  if (!submitted.value && selectedOption.value != key) {
    selectedOption.value = key;
  } else if (!submitted.value && selectedOption.value === key) {
    selectedOption.value = null;
  }
};

const optionClass = (key: string, optionsList: MCQOptions[]) => {
  const option = optionsList[parseInt(key)];
  const isSelected = selectedOption.value === key;

  if (statUpdate.quizMode === "Timed" && submitted.value) {
    return isSelected ? "selected ignore-hover" : "ignore-hover";
  }

  if (!submitted.value) {
    return isSelected ? "selected" : "";
  }

  return option.optionCorrect
    ? "correct ignore-hover"
    : isSelected
      ? "wrong ignore-hover"
      : "ignore-hover";
};
</script>

<style scoped>
.mcq-list {
  list-style: none;
  padding: 0;
  margin: 1rem;
}

.mcq-option {
  cursor: default;
  margin: 0.2rem 0 0.2rem;
  padding: 1rem 1rem 1rem;
  border: 1px solid;
  border-radius: 0.2rem;
  box-shadow: transparent 0 0.2rem 0.5rem;
  -webkit-transition: background-color 0.3s;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

.mcq-option:not(.ignore-hover):hover {
  cursor: pointer;
  background-color: #7f7f7f;
}

.mcq-option.selected {
  background-color: #7f7f7f;
  color: white;
  border-color: black;
}

.mcq-option.wrong {
  background-color: #f2dede;
  color: #a94442;
}

.mcq-option.correct {
  background-color: #dff0d8;
  color: #3c763d;
}

.time-up-msg {
  color: rgb(248, 75, 75);
}
</style>
