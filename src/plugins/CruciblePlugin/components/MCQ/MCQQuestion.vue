<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="mcq-statement" v-html="statement" />
  <div class="mcq-list">
    <div
      v-for="[key, value] in Object.entries(optionsList)"
      :key="key"
      class="mcq-option"
      @click="selectOption(key)"
    >
      <input
        :id="'option-' + key"
        :key="key"
        test-id="radio_options"
        type="radio"
        name="options"
        :checked="selectedOption === key"
        :class="className"
        @click="selectOption(key)"
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
import type { MCQuestionProp } from "@/plugins/CruciblePlugin/types/MCQ";

const { statement, optionsList, className } = defineProps<MCQuestionProp>();
const selectedQuestion = defineModel("selectedQuestion", {
  type: Boolean,
  default: null,
});

const selectedOption = defineModel("selectedOption", {
  type: String,
  default: null,
});
const selectOption = (key: string) => {
  selectedOption.value = key;
  selectedQuestion.value = true;
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

.next-prev-question {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}
</style>
