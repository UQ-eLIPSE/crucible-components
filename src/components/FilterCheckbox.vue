<template>
  <ul>
    <li
      v-for="[idx, topic] in Object.entries(topics)"
      :key="idx"
      class="filter-options"
    >
      <input
        :id="`${category}-${topic}-checkbox`"
        type="checkbox"
        :name="category"
        :value="topic"
        @change="onChecked($event)"
      />
      <label :for="`${category}-${topic}-checkbox`">{{ topic }}</label>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { SelectedTags } from "@/types/MCQ";
const { category, topics } = defineProps<{
  category: string;
  topics: string[];
}>();

const emit = defineEmits(["checked"]);
const onChecked = (event: Event) => {
  if (!(event.target instanceof HTMLInputElement))
    return console.error("Trying to click on non-input element");

  const category = event.target.name as keyof SelectedTags;
  const topic = event.target.value;

  emit("checked", event.target.checked, { category, topic });
};
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .filter-options {
    text-align: left;
    margin-left: 20vw;
  }
}
</style>
