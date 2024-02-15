<template>
  <div>MCQ Test</div>
  <div class="mcq-title">{{ title }}</div>
  <ul class="mcq-list">
    <li
      v-for="[key, value] in Object.entries(options)"
      :key="key"
      class="mcq-option"
      :class="optionClass(key)"
      @click="selectCurrentOption(key)"
    >
      <input
        :id="'option-' + key"
        :key="key"
        type="radio"
        :checked="selectedOption === key"
        name="options"
        :class="optionClass(key)"
      />
      <label :key="key" :for="'option-' + key" class="mcq-option-label">
        {{ value.text }}
      </label>
    </li>
  </ul>

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
const { title, options } = defineProps<MCQProps>();
const selectedOption = ref<string | null>(null);
const submitted = ref<boolean>(false);

const submit = () => {
  submitted.value = true;
};

// Only allow selection if the quiz is not submitted
const selectCurrentOption = (key: string) => {
  selectedOption.value = key;
  submitted.value = false;
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
