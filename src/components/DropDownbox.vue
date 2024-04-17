<template>
  <div class="dropdown">
    <label for="optionName">{{ optionName }}</label>
    <select id="optionName" name="optionName" @change="handleChange">
      <option value="">--Please choose an option--</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.value }} {{ option.unit }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps } from "vue";
import { useQuizStore } from "@/store/QuizStore";

// Define the props expected from the parent component
defineProps<{
  options: Array<{
    value: number;
    label: string;
    unit: string;
  }>;
  optionName: string;
}>();
const questionsQueue = useQuizStore();
const timeLimit = ref(0);
function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement;
  if (target.value) {
    timeLimit.value = parseFloat(target.value) * 60;
    questionsQueue.setTimeLimit(timeLimit.value);
  }
}
</script>
