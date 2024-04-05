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
        @change="emit('checked', $event)"
      />
      <label :for="`${category}-${topic}-checkbox`">{{ topic }}</label>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const { category, topics } = defineProps<{
  category: string;
  topics: string[];
}>();

const emit = defineEmits(["checked"]);
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .filter-options {
    text-align: left;
    margin-left: 20vw;
  }
}
</style>
