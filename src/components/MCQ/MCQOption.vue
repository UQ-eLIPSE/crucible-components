<!-- eslint-disable vue/no-v-html -->
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
    v-html="option.optionValue"
  />
</template>

<script setup lang="ts">
import type { MCQRadioOption } from "@type/MCQ.d.ts";
const { optionKey, checked, option, submitted } = defineProps<MCQRadioOption>();
</script>

<style scoped>
.mcq-option-label:not(.ignore-hover):hover {
  cursor: pointer;
}

input[type="radio"] {
  cursor: default;
  width: 18px;
  height: 18px;
  border: 1px solid black;
  font-family: "icomoon";
  margin: 0 12px 0 0;
  border-radius: 50%;
  appearance: none;
}

input[type="radio"]:not(.ignore-hover):hover {
  cursor: pointer;
}

.selected input[type="radio"]:checked {
  border-color: white;
}

.selected input[type="radio"]:checked::before {
  color: #ffffff;
  content: "\e906";
  display: flex;
  align-items: center;
  justify-content: center;
}

.correct input[type="radio"],
.correct input[type="radio"]:checked {
  border-color: #3c763d;
}

.correct input[type="radio"]::before {
  color: #3c763d;
  border-color: #3c763d;
  content: "\f00c";
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrong input[type="radio"]:checked {
  border-color: #a94442;
}

.wrong input[type="radio"]::before {
  color: #a94442;
  border-color: #a94442;
  content: "\f00d";
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
