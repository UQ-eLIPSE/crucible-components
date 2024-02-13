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
  <MCQSubmit
    :selected="!!selectedOption"
    :is-final="true"
    :submitted="submitted"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { MCQProps } from "@type/MCQ.d.ts";
import MCQSubmit from "./MCQSubmit.vue";
const { title, options } = defineProps<MCQProps>();
const selectedOption = ref<string | null>(null);
const submitted = ref<boolean>(false);

const handleSubmit = () => {
  submitted.value = true;
};

const selectOption = (key: string) => {
  if (!submitted.value) {
    selectedOption.value = key;
  }
};

const optionClass = (key: string) => {
  if (submitted.value) {
    if (selectedOption.value === key || options[parseInt(key)].correct) {
      return options[parseInt(key)].correct ? "correct" : "wrong";
    }
  }
  return selectedOption.value === key ? "selected" : "";
};
</script>
