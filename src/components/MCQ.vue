<template>
  <div>MCQ Test</div>
  <div class="mcq-title">{{ title }}</div>
  <ul class="mcq-list">
    <li
      v-for="[key, value] in Object.entries(options)"
      :key="key"
      class="mcq-option"
      :class="optionClass(key)"
      @click="selectOption(key)"
    >
      {{ value.text }}
    </li>
  </ul>
  <button class="mcq-submit" :disabled="!selectedOption" @click="submit">
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

const selectOption = (key: string) => {
  if (!submitted.value) {
    selectedOption.value = key;
  }
};

const optionClass = (key: string) => {
  if (submitted.value) {
    if (selectedOption.value === key) {
      return options[parseInt(key)].correct ? "correct" : "wrong";
    }
    if (options[parseInt(key)].correct) {
      return "correct";
    }
  }
  return selectedOption.value === key ? "selected" : "";
};
</script>
