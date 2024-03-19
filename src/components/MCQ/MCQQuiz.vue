<template>
  <MCQQuestion
    v-if="currentQuestion"
    :statement="currentQuestion.statement"
    :options-list="currentQuestion.optionsList"
    @next-question="nextQuestion"
    @skip-question="skipQuestion"
    @update-count="count += 1"
  />
  <MCQResultBadge
    v-if="!currentQuestion"
    :correct-quiz="count"
    :work-quiz="questions.length"
  />
  <div v-if="!currentQuestion">You are done! Please refresh this page.</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import MCQResultBadge from "./MCQResultBadge.vue";
import type { MCQuestion, MCQQuiz } from "@type/MCQ.d.ts";

const { questions } = defineProps<MCQQuiz>();
const currentQuestion = ref<MCQuestion | undefined>();
const questionsQueue = ref<MCQuestion[]>([...questions]);
const count = ref(0);

onMounted(() => {
  nextQuestion();
});
const enqueueQuestion = (question: MCQuestion) =>
  questionsQueue.value.push(question);

const dequeueQuestion = () => questionsQueue.value.shift();

const skipQuestion = () => {
  enqueueQuestion(currentQuestion.value as MCQuestion);
  nextQuestion();
};

const nextQuestion = () => (currentQuestion.value = dequeueQuestion());
</script>
