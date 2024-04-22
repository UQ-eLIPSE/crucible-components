<template>
  <div>
    <button
      :disabled="
        hideSkip &&
        getButtonClassAndText(submitted, selectedOption).class === 'skip'
      "
      class="mcq-button"
      :class="getButtonClassAndText(submitted, selectedOption).class"
      @click="handleButtonClick(submitted, selectedOption)"
    >
      {{ getButtonClassAndText(submitted, selectedOption).text }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { MCQButton } from "@/plugins/CruciblePlugin/types/MCQ";

const { submitted, selectedOption, hideSkip } = defineProps<MCQButton>();
const buttonClass = ref<string>("skip");
const buttonText = ref<string>("Skip");
const emit = defineEmits(["submitAnswer", "nextQuestion", "skipQuestion"]);

const handleButtonClick = (
  submittedValue: boolean,
  selectedOptionValue: string | null,
) => {
  if (!submittedValue && selectedOptionValue) {
    modifyButtonAndEmit("next", "Next", "submitAnswer");
  } else if (submittedValue && selectedOptionValue) {
    modifyButtonAndEmit("skip", "Skip", "nextQuestion");
  } else if (!submittedValue && !selectedOptionValue) {
    modifyButtonAndEmit("skip", "Skip", "skipQuestion");
  }
};

const modifyButtonAndEmit = (
  className: string,
  text: string,
  event: "submitAnswer" | "nextQuestion" | "skipQuestion",
) => {
  buttonClass.value = className;
  buttonText.value = text;
  emit(event);
};

const getButtonClassAndText = (
  submittedValue: boolean,
  selectedOptionValue: string | null,
) => {
  if (submittedValue && selectedOptionValue) {
    return { class: "next", text: "Next" };
  }
  return !submittedValue && selectedOptionValue
    ? { class: "submit", text: "Submit" }
    : { class: buttonClass.value, text: buttonText.value };
};
</script>

<style scoped>
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
