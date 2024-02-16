<template>
  <input
    :id="'option-' + optionKey"
    :key="optionKey"
    type="radio"
    :checked="checked"
    name="options"
    :class="optionClass(optionKey)"
  />
  <label :key="optionKey" :for="'option-' + optionKey" class="mcq-option-label">
    {{ optionText }}
  </label>
</template>

<script setup lang="ts">
import type { MCQRadioOption } from "@type/MCQ.d.ts";
const { optionKey, checked, optionText, optionClass } =
  defineProps<MCQRadioOption>();
</script>
