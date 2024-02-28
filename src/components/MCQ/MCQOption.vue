<template>
  <input
    :id="'option-' + optionKey"
    :key="optionKey"
    type="radio"
    disabled="true"
    name="options"
    :checked="checked"
    :class="submitted && 'ignore-hover'"
  />
  <label
    :key="optionKey"
    :for="'option-' + optionKey"
    :class="submitted ? 'mcq-option-label ignore-hover' : 'mcq-option-label'"
  >
    {{ option.text }}
  </label>
</template>

<script setup lang="ts">
import type { MCQRadioOption } from "@type/MCQ.d.ts";
const { optionKey, checked, option, submitted } = defineProps<MCQRadioOption>();
</script>
