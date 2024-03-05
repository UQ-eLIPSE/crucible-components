<script setup lang="ts">
import { ref } from "vue";
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import { questions } from "@data/question-data.json";
const showQuiz = ref(false);

const startQuiz = () => {
  showQuiz.value = true;
};
</script>

<template>
  <MCQQuiz v-if="showQuiz" :questions="questions" />
  <div v-else>
    <h1>Welcome to VetsCloud Smart Quiz</h1>
    <button class="start-button" @click="startQuiz">Start</button>
  </div>
</template>

<style scoped>
.start-button {
  color: #ffffff;
  background-color: #2a52be;
}
</style>
