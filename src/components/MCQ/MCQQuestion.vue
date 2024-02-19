<template>
  <div>MCQ Test</div>
  <div class="mcq-title">{{ title }}</div>
  <ul class="mcq-list">
    <li
      v-for="[key, value] in Object.entries(options)"
      :key="key"
      class="mcq-option"
      :class="optionClass(key)"
      @click="selectedOption = key"
    >
      <MCQOption
        :option-key="key"
        :checked="selectedOption === key"
        :option-text="value.text"
        :option-class="optionClass"
      />
    </li>
  </ul>

  <button class="mcq-submit" @click="submit">Submit</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { MCQProps } from "@type/MCQ.d.ts";
import MCQOption from "./MCQOption.vue";
const { title, options } = defineProps<MCQProps>();
const selectedOption = ref<string | null>(null);
const submitted = ref<boolean>(false);

const submit = () => {
  if (!selectedOption.value) return;
  submitted.value = true;
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
