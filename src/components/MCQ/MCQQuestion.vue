<template>
  <div>MCQ Test</div>
  <div class="mcq-title">{{ title }}</div>
  <div class="mcq-list">
    <div
      v-for="[key, value] in Object.entries(options)"
      :key="key"
      class="mcq-option"
      :class="optionClass(key)"
      @click="selectCurrentOption(key)"
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
    :active="!!selectedOption"
    :is-submitted="submitted"
    @submit="submit"
  />
  <button
    class="mcq-submit"
    :disabled="!selectedOption || submitted"
    @click="submit"
  >
    Submit
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { MCQProps } from "@type/MCQ.d.ts";
import MCQOption from "./MCQOption.vue";
import MCQButton from "./MCQButton.vue";
const { title, options } = defineProps<MCQProps>();
const selectedOption = ref<string | null>(null);
const submitted = ref<boolean>(false);

const submit = () => {
  submitted.value = true;
};

// Only allow selection if the quiz is not submitted
const selectCurrentOption = (key: string) => {
  if (!submitted.value) selectedOption.value = key;
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
