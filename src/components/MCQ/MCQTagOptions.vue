<template>
  <div class="filter">
    <div
      v-for="[category, valueKeys] in Object.entries(filterSet)"
      :key="category"
      class="category"
    >
      <h2>{{ category }}</h2>
      <FilterCheckbox
        :category="category"
        :topics="valueKeys"
        @checked="modifySelectedTags"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { tags, SelectedTags } from "@/types/MCQ";
import { getAllQuestions } from "../DataAccessLayer";
import FilterCheckbox from "../FilterCheckbox.vue";
import { ref } from "vue";
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

const selectedTags = ref<SelectedTags>({
  course: [],
  subject: [],
  system: [],
});

const modifySelectedTags = (
  isChecked: boolean,
  { category, topic }: { category: keyof SelectedTags; topic: string },
): void => {
  selectedTags.value[category] = isChecked
    ? [...selectedTags.value[category], topic]
    : selectedTags.value[category].filter((t) => t !== topic);
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
