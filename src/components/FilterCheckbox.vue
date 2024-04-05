<template>
  <ul>
    <li
      v-for="[key, val] in Object.entries(topics)"
      :key="key"
      class="filter-options"
    >
      <input type="checkbox" />
      <label>{{ val }} </label>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
const { topics } = defineProps<{ topics: string[] }>();

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
