<template>
  <div>
    <button
      class="mcq-button"
      :class="getButtonClass(submitted, selectedOption)"
      @click="handleButtonClick(submitted, selectedOption)"
    >
      {{ getButtonText(submitted, selectedOption) }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { MCQButton } from "@type/MCQ.d.ts";

const { submitted, selectedOption } = defineProps<MCQButton>();
const buttonClass = ref<string>("skip");
const buttonText = ref<string>("Skip");
const emit = defineEmits(["submitAnswer", "nextQuestion", "skipQuestion"]);

const handleButtonClick = (
  submittedValue: boolean,
  selectedOptionValue: string | null,
) => {
  if (!submittedValue && selectedOptionValue) {
    emit("submitAnswer");
    buttonClass.value = "next";
    buttonText.value = "Next";
  } else if (submittedValue && selectedOptionValue) {
    emit("nextQuestion");
    buttonClass.value = "skip";
    buttonText.value = "Skip";
  } else if (!submittedValue && !selectedOptionValue) {
    emit("skipQuestion");
    buttonClass.value = "skip";
    buttonText.value = "Skip";
  }
};

const getButtonClass = (
  submittedValue: boolean,
  selectedOptionValue: string | null,
) => {
  return !submittedValue && selectedOptionValue ? "submit" : buttonClass.value;
};

const getButtonText = (
  submittedValue: boolean,
  selectedOptionValue: string | null,
) => {
  return !submittedValue && selectedOptionValue ? "Submit" : buttonText.value;
};
</script>

<style scoped>
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  transition: border-color 0.25s;
}
button:not([disabled]):hover {
  border-color: black;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.mcq-button {
  color: #ffffff;
  background-color: #7f7f7f;
  border-color: #c3e6cb;
  cursor: pointer;
}

.mcq-button:disabled {
  opacity: 50%;
  cursor: default;
}

.submit {
  background-color: #7f7f7f;
}
.next {
  background-color: #2a52be;
}
.skip {
  background-color: #569821;
}
</style>
