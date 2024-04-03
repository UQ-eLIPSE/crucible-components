<template>
  <div>Filter Topics</div>
  <h3>
    Currently selected topics
    {{ numberOfSelectedTopics.valueOf() }}
  </h3>
  <form>
    <div class="filter-category-wrapper">
      <FilterCheckbox
        v-for="topic in sampleTopics"
        :key="topic.topic"
        :category="topic.category"
        :topic="topic.topic"
        @checked="onChecked"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import FilterCheckbox from "./FilterCheckbox.vue";
import { FilterOption } from "@/types/FilterTopic";
import { sampleTopics } from "../../../data/Filter_Topics";

// retrieve api data here or through state management and replace sampleTopics
const checkedTopics = ref<FilterOption[]>(sampleTopics);
const numberOfSelectedTopics = ref<number>(0);

const onChecked = (event: Event): void => {
  if (!(event.target instanceof HTMLInputElement))
    return console.error("Trying to click on non-input element");

  const target = event.target;

  const topic = checkedTopics.value.find(
    (topic) => topic.topic === target.value && topic.category === target.name,
  );
  if (topic) {
    topic.selected = target.checked;
    numberOfSelectedTopics.value += target.checked ? 1 : -1;
    return;
  }

  console.error("Can't find checked topic");
};
</script>

<style scoped>
.filter-category-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem;
}
</style>
