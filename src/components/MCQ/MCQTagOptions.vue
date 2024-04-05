<template>
  <div class="filter">
    <div
      v-for="[index, valueKeys] in Object.entries(filterSet)"
      :key="index"
      class="category"
    >
      <h2>{{ index }}</h2>
      <ul>
        <li
          v-for="[key, val] in Object.entries(valueKeys)"
          :key="key"
          class="filter-options"
        >
          <input type="checkbox" /><label>{{ val }} </label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { tags } from "@/types/MCQ";
import { getAllQuestions } from "../DataAccessLayer";
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
