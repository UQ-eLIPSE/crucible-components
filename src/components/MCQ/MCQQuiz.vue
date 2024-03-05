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
import type { MCQProps, MCQQuiz } from "@type/MCQ.d.ts";

const { questions } = defineProps<MCQQuiz>();
const currentQuestion = ref<MCQProps | undefined>();
const questionsQueue = ref<MCQProps[]>([...questions]);

onMounted(() => {
  nextQuestion();
});

const enqueueQuestion = (question: MCQProps) =>
  questionsQueue.value.push(question);

const dequeueQuestion = () => questionsQueue.value.shift();

const skipQuestion = () => {
  enqueueQuestion(currentQuestion.value as MCQProps);
  nextQuestion();
};

const nextQuestion = () => {
  const nextQuestion = dequeueQuestion();
  currentQuestion.value = nextQuestion;
};
</script>
