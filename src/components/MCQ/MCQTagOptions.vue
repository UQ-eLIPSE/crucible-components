<template>
  <div class="filter">
    <div
      v-for="[index, valueKeys] in Object.entries(filterSet)"
      :key="index"
      class="category"
    >
      <h2>{{ index }}</h2>
      <FilterCheckbox :topics="valueKeys" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { tags } from "@/types/MCQ";
import { getAllQuestions } from "../DataAccessLayer";
import FilterCheckbox from "../FilterCheckbox.vue";
function getUniquePropertyValues(
  array: tags[],
  property: "course" | "subject" | "system",
) {
  return [...new Set(array.map((item) => item[property]))];
}

const tagSet = getAllQuestions().flatMap((question) => question.tags);

const filterSet = {
  course: getUniquePropertyValues(tagSet, "course"),
  subject: getUniquePropertyValues(tagSet, "subject"),
  system: getUniquePropertyValues(tagSet, "system"),
};
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
  .filter {
    text-align: center;
  }
  .filter-options {
    text-align: left;
    margin-left: 20vw;
  }
}
</style>
