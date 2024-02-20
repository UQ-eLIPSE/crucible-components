<template>
  <div>
    <button class="mcq-submit" @click="handleClick">{{ buttonText }}</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { active, isSubmitted } = defineProps({
  active: Boolean,
  isSubmitted: Boolean,
});

const emit = defineEmits(["submit"]);

const handleClick = () => {
  emit("submit");
};

console.log(active, isSubmitted);

const buttonText = computed(() => (active && isSubmitted ? "Next" : "Submit"));
</script>
