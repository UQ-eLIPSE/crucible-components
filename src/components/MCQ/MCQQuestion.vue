<!-- eslint-disable vue/no-v-html -->
<template>
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
      />
    </div>
  </div>
  <MCQButton
    :submitted="submitted"
    :selected-option="selectedOption"
    @submit-answer="submitAnswer"
    @next-question="nextQuestion"
    @skip-question="skipQuestion"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { MCQuestion, MCQOptions } from "@type/MCQ.d.ts";
import MCQOption from "./MCQOption.vue";
import MCQButton from "./MCQButton.vue";

const { statement, optionsList } = defineProps<MCQuestion>();
const selectedOption = ref<string | null>(null);
const submitted = ref<boolean>(false);
const emit = defineEmits(["nextQuestion", "skipQuestion"]);

const submitAnswer = () => {
  submitted.value = true;
};

const nextQuestion = () => {
  resetQuestion();
  emit("nextQuestion");
};

const skipQuestion = () => {
  resetQuestion();
  emit("skipQuestion");
};

const resetQuestion = () => {
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
</style>
