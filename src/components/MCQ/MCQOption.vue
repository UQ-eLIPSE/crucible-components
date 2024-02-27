<template>
  <input
    type="radio"
    disabled=true
    name="options"
    :id="'option-' + optionKey"
    :key="optionKey"
    :checked="checked"
    :class="optionClass()"
  />
  <label :key="optionKey" :for="'option-' + optionKey" class="mcq-option-label">
    {{ option.text }}
  </label>
</template>

<script setup lang="ts">
import type { MCQRadioOption } from "@type/MCQ.d.ts";
const { optionKey, checked, option, submitted } = defineProps<MCQRadioOption>();

const optionClass = () => {
  if (!submitted) {
    return checked ? "selected" : "";
  }

  return option.correct ? "correct" : checked ? "wrong" : "";
};
</script>
