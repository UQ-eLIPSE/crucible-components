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
import { getAllQuestions, getDummyQuestions } from "../DataAccessLayer";
import FilterCheckbox from "../FilterCheckbox.vue";
import { onMounted } from "vue";

const emit = defineEmits(["dummyDataStatus"]);

const { dummyData } = defineProps<{ dummyData?: { random: boolean } }>();

const tagSet = dummyData
  ? getDummyQuestions(dummyData.random).flatMap((question) => question.tags)
  : getAllQuestions().flatMap((question) => question.tags);

const filterSet: SelectedTags = getUniquePropertyValues(tagSet);

onMounted(() => {
  emit("dummyDataStatus", dummyData ? false : true);
});
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
}
</style>
