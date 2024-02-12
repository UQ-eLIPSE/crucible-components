<template>
  <div>MCQ Test</div>
  <div class="mcq-title">{{ title }}</div>
  <ul class="mcq-list">
    <li
      v-for="[key, value] in Object.entries(options)"
      :key="key"
      class="mcq-option"
      :class="{ selected: selectedOption === key }"
      @click="selectedOption = key"
    >
      {{ value.text }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { MCQProps } from "@type/MCQ.d.ts";
const { title, options } = defineProps<MCQProps>();
const selectedOption = ref(null);
</script>
