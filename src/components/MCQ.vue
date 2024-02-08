<template>
  <div>MCQ Test</div>
  <div class="mcq-title">{{ title }}</div>
  <ul>
    <li v-for="[key, value] in options" :key="key">{{ key }}: {{ value }}</li>
  </ul>
</template>

<script setup lang="ts">
import type { MCQProps } from "@type/MCQ.d.ts";
const { title, options } = defineProps<MCQProps>();
</script>
