<template>
  <div v-if="questionsQueue.allQs" class="filter">
    <div
      v-for="[category, valueKeys] in Object.entries(filterSet)"
      :key="category"
      class="category"
    >
      <h2 class="category-heading">{{ category }}</h2>
      <FilterCheckbox :category="category" :topics="valueKeys" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SelectedTags, Tags } from "@/types/MCQ";
import { getUniquePropertyValues } from "../QuestionStore";
import FilterCheckbox from "./FilterCheckbox.vue";
import { useQuizStore } from "@/store/QuizStore";
import { watch, ref } from "vue";

const tagSet = ref<Tags[]>([]); // Use a ref to make tagSet reactive
const questionsQueue = useQuizStore();
let filterSet: SelectedTags = {};

watch(
  () => questionsQueue.allQs,

  (_newValue, _oldValue) => {
    questionsQueue.setTagSet();
    tagSet.value = questionsQueue.getTagSet(); // Update tagSet inside the watch function
    filterSet = getUniquePropertyValues(tagSet.value);
  },
);
</script>

<style scoped>
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

h2.category-heading {
  margin-bottom: 0;
  font-size: 0.9rem;
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
