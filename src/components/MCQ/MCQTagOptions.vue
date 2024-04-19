<template>
  <div class="filter">
    <div
      v-for="[category, valueKeys] in Object.entries(filterSet)"
      :key="category"
      class="category"
    >
      <h2>{{ category }}</h2>
      <FilterCheckbox :category="category" :topics="valueKeys" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SelectedTags } from "@/types/MCQ";
import { getUniquePropertyValues } from "../QuestionStore";
import { getQuestionsBasedOnEnv } from "../DataAccessLayer";
import FilterCheckbox from "../FilterCheckbox.vue";

// Access environment variable
const questions = getQuestionsBasedOnEnv();
const tagSet = questions.flatMap((question) => question.tags);

const filterSet: SelectedTags = getUniquePropertyValues(tagSet);
</script>

<style>
.filter {
  text-align: left;
  text-transform: capitalize;
}
.category {
  margin-bottom: 20px;
}
li {
  list-style-type: none;
}
label {
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .category > h2 {
    --responsive-padding-left: clamp(10px, 5vw, 18px);
    padding-left: var(--responsive-padding-left);
    font-size: 1.25rem;
    margin-inline: clamp(0.1rem, 1.5vw, 0.25rem);
    margin-bottom: 0.5rem;
  }
}
</style>
