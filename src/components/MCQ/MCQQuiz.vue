<template>
  <div>MCQ Quiz</div>
  <MCQQuestion
    v-if="currentQuestion"
    :title="currentQuestion.title"
    :options="currentQuestion.options"
    @next-question="nextQuestion"
    @skip-question="skipQuestion"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import type { MCQuestion, MCQQuiz } from "@type/MCQ.d.ts";

const { questions } = defineProps<MCQQuiz>();
const currentQuestion = ref<MCQuestion | undefined>();
const questionsQueue = ref<MCQuestion[]>([...questions]);

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
