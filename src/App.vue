<script setup lang="ts">
import { ref, computed, watch } from "vue";
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import { questions } from "@data/question-data.json";
const showQuiz = ref(false);
const questionAmount = ref<number>(0);
const selectedQuestions = computed(() =>
  questionAmount.value > 0
    ? questions.slice(0, questionAmount.value)
    : questions,
);

watch(questionAmount, (newVal) => {
  if (newVal > questions.length) {
    questionAmount.value = questions.length;
  }
});

const startQuiz = () => {
  showQuiz.value = true;
};
</script>

<template>
  <MCQQuiz v-if="showQuiz" :questions="selectedQuestions" />
  <div v-else>
    <h1>Welcome to VetsCloud Smart Quiz</h1>
    <input
      v-model.number="questionAmount"
      class="question-amount"
      type="number"
      placeholder="Question amount"
      min="0"
      :max="questions.length"
    />
    <button class="start-button" @click="startQuiz">Start</button>
  </div>
</template>

<style scoped>
.start-button {
  color: #ffffff;
  background-color: #2a52be;
}
</style>
