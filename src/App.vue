<script setup lang="ts">
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import { title, options } from "@data/question-data.json";
</script>

<template>
  <MCQQuestion :title="title" :options="options" />
</template>

<style scoped></style>
