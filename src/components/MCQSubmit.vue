<template>
  <button class="mcq-submit" :disabled="!selected" @click="submit">
    {{ submitted && isFinal ? "Finished" : "Submit" }}
  </button>
</template>

<script setup lang="ts">
import type { MCQButtonProps } from "@type/MCQ.d.ts";

const { selected, submitted, isFinal } = defineProps<MCQButtonProps>();
const emit = defineEmits(["submit"]);

const submit = () => {
  emit("submit");
};
</script>
