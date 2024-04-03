<template>
  <div>Filter Topics</div>
  <form>
    <div class="filter-category-wrapper">
      <FilterCheckbox category="physiology" topic="neurophysiology" />
      <FilterCheckbox category="physiology" topic="neurophysiology" />
    </div>
  </form>
</template>

<script setup lang="ts">
import FilterCheckbox from "./FilterCheckbox.vue";
</script>

<style scoped>
.filter-category-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.25rem;
}
</style>
