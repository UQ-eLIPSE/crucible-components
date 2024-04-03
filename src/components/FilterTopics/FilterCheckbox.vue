<template>
  <div class="checkbox-wrapper">
    <input
      :id="`${category}-${topic}-checkbox`"
      type="checkbox"
      :name="category"
      :value="topic"
      @change="onChange"
    />
    <label :for="`${category}-${topic}-checkbox`">{{ topic }}</label>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { FilterOption } from "@/types/FilterTopic";

const { category, topic } = defineProps<FilterOption>();
const emit = defineEmits(["checked"]);

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("checked", { category, topic });
};
</script>

<style scoped>
.checkbox-wrapper {
  text-align: left;
}

label {
  text-transform: capitalize;
}
</style>
