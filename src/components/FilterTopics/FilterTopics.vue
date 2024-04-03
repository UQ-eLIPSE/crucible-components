<template>
  <div>Filter Topics</div>
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
const checkedTopics = ref<FilterOption[]>([]);

const sampleTopics: FilterOption[] = [
  { category: "physiology", topic: "neurophysiology" },
  { category: "physiology", topic: "cardiophysiology" },
];

const onChecked = (topic: FilterOption) => {
  const index = checkedTopics.value.findIndex(
    (checkedTopic) => checkedTopic.topic === topic.topic,
  );
  index === -1
    ? checkedTopics.value.push(topic)
    : checkedTopics.value.splice(index, 1);
};

console.log(checkedTopics.value);
</script>

<style scoped>
.filter-category-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem;
}
</style>
