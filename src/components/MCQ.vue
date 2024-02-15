<template>
  <div>MCQ Test</div>
  <div v-for="(value, index) in questions" :key="index">
    <div class="mcq-title">{{ value.title }}</div>
    <ul class="mcq-list">
      <li
        v-for="[key, val] in Object.entries(value.options)"
        :key="key"
        class="mcq-option"
        :class="optionClass(key, value.options)"
        @click="selectCurrentOption(key)"
      >
        {{ val.text }}
      </li>
    </ul>
    <MCQSubmit
      :selected="!!selectedOption"
      :is-final="index === questions.length - 1"
      :submitted="submitted"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MCQSubmit from "./MCQSubmit.vue";
import { MCQOptions, MCQProps } from "@/types/MCQ";
const { questions } = defineProps<{ questions: MCQProps[] }>();

const selectedOption = ref<string | null>(null);
const submitted = ref<boolean>(false);

const handleSubmit = () => {
  submitted.value = true;
};

// Only allow selection if the quiz is not submitted
const selectCurrentOption = (key: string) => {
  if (!submitted.value) {
    selectedOption.value = key;
  }
};

const optionClass = (key: string, options: MCQOptions[]) => {
  const option = options[parseInt(key)];
  const isSelected = selectedOption.value === key;

  if (!submitted.value) {
    return isSelected ? "selected" : "";
  }

  return option.correct ? "correct" : isSelected ? "wrong" : "";
};
</script>
