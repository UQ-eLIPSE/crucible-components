<template>
  <div>{{ title }}</div>
  <ul>
    <li v-for="[key, value] in questionOptions" :key="key">
      {{ key }}: {{ value }}
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  options: { [key: string]: string };
}>();

const questionOptions = Object.entries(props.options);
</script>
