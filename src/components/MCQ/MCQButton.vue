<template>
  <div>
    <button
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
  dispatchEvent(event);
};

const dispatchEvent = (
  event: "submitAnswer" | "nextQuestion" | "skipQuestion"
) => {
  switch(event){
    case "nextQuestion":
      emit(event, false);
      break;
    case "skipQuestion":
      emit(event, true);
      break;
    default:
      emit(event);
  }
};

const getButtonClassAndText = (
  submittedValue: boolean,
  selectedOptionValue: string | null,
) =>
  !submittedValue && selectedOptionValue
    ? { class: "submit", text: "Submit" }
    : { class: buttonClass.value, text: buttonText.value };
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
