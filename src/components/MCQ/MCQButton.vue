<template>
  <div>
    <button
      class="mcq-button"
      :class="buttonClass"
      :disabled="buttonDisabled"
      @click="handleButtonClick(submitted)"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { MCQButton } from "@type/MCQ.d.ts";

const { submitted, buttonDisabled } = defineProps<MCQButton>();
const buttonClass = ref<string>("submit");
const buttonText = ref<string>("Submit");
const emit = defineEmits(["submitAnswer", "nextQuestion"]);

const handleButtonClick = (submittedValue: boolean) => {
  if (!submittedValue) {
    emit("submitAnswer");
    buttonClass.value = "next";
    buttonText.value = "Next";
  } else if (submittedValue) {
    emit("nextQuestion");
    buttonClass.value = "submit";
    buttonText.value = "Submit";
  }
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
</style>
