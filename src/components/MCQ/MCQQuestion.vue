<template>
  <div>MCQ Test</div>
  <div class="mcq-title">{{ title }}</div>
  <div class="mcq-list">
    <div
      v-for="[key, value] in Object.entries(options)"
      :key="key"
      class="mcq-option"
      :class="optionClass(key)"
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
    :button-disabled="buttonDisabled"
    @submit-answer="submitAnswer"
    @next-question="nextQuestion"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { MCQProps } from "@type/MCQ.d.ts";
import MCQOption from "./MCQOption.vue";
import MCQButton from "./MCQButton.vue";

const { title, options } = defineProps<MCQProps>();
const selectedOption = ref<string | null>(null);
const submitted = ref<boolean>(false);
const buttonDisabled = ref<boolean>(true);

const submitAnswer = () => {
  submitted.value = true;
  buttonDisabled.value = false;
};

const nextQuestion = () => {
  submitted.value = false;
  buttonDisabled.value = true;
  selectedOption.value = null;
};

// Only allow selection if the quiz is not submitted
const selectOption = (key: string) => {
  if (!submitted.value && selectedOption.value != key) {
    selectedOption.value = key;
    buttonDisabled.value = false;
  } else if (!submitted.value && selectedOption.value === key) {
    selectedOption.value = null;
    buttonDisabled.value = true;
  }
};

const optionClass = (key: string) => {
  const option = options[parseInt(key)];
  const isSelected = selectedOption.value === key;

  if (!submitted.value) {
    return isSelected ? "selected" : "";
  }

  return option.correct ? "correct" : isSelected ? "wrong" : "";
};
</script>
