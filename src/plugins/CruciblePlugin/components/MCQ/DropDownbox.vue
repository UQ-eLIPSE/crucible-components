<template>
  <div :class="disabled ? 'dropdown input-disabled' : 'dropdown'">
    <label for="optionName">{{ optionName }}: &nbsp; </label>
    <select id="optionName" name="optionName" @change="handleChange">
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
import { ref } from "vue";
import { useQuizStore } from "@/plugins/CruciblePlugin/store/QuizStore";

// Define the props expected from the parent component
defineProps<{
  options: Array<{
    value: number;
    label: string;
    unit: string;
  }>;
  optionName: string;
  disabled: boolean;
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

<style scoped>
.input-disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
