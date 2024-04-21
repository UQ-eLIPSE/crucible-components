<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="mcq-statement" v-html="statement" />
  <div class="mcq-list">
    <div
      v-for="[key, value] in Object.entries(optionsList)"
      :key="key"
      class="mcq-option"
      @click="selectOption(key, _id.$oid)"
    >
      <input
        :id="'option-' + key"
        :key="key"
        test-id="radio_options"
        type="radio"
        name="options"
        :checked="selectedOption === key"
        :class="className"
        @click="selectOption(key, _id.$oid)"
      />
      <label
        :for="'option-' + key"
        :class="className"
        v-html="value.optionValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MCQuestionProp } from "@type/MCQ.d.ts";

const { statement, optionsList, className, _id } =
  defineProps<MCQuestionProp>();
const selectedQuestion = defineModel("selectedQuestion", {
  type: String,
  default: null,
});

const selectedOption = defineModel("selectedOption", {
  type: String,
  default: null,
});
const selectOption = (key: string, questionId: string) => {
  selectedOption.value = key;
  selectedQuestion.value = questionId;
};

// const optionClass = (key: string, optionsList: MCQOptions[]) => {
//   // quizState.value = quizState.value !== "initial" ? "initial" : "submit";
//   const option = optionsList[parseInt(key)];
//   const isSelected = selectedOption.value === key;

//   if (!submitted.value) {
//     return isSelected ? "selected" : "";
//   }

//   return option.optionCorrect
//     ? "correct ignore-hover"
//     : isSelected
//       ? "wrong ignore-hover"
//       : "ignore-hover";
// };
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

.next-prev-question {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
</style>
