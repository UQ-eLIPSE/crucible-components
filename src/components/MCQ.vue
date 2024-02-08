<template>
  <div>MCQ Test</div>
  <div class="mcq-title">{{ title }}</div>
</template>

<script setup lang="ts">
import type { MCQProps } from "@type/MCQ.d.ts";
defineProps<MCQProps>();
</script>
