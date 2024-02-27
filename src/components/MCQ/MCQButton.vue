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
