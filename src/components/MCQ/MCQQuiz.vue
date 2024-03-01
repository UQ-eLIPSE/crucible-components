<template>
  <div>MCQ Quiz</div>
  <MCQQuestion
    v-if="currentQuestion"
    :title="currentQuestion.title"
    :options="currentQuestion.options"
    @next-question="nextQuestion"
  />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import type { MCQProps, MCQQuiz } from "@type/MCQ.d.ts";

const { questions } = defineProps<MCQQuiz>();
const currentQuestion = ref<MCQProps | null>(null);
const questionsQueue = ref<MCQProps[]>([]);

onMounted(() => {
  enqueueQuestionItems();
  nextQuestion(false);
});

const enqueueQuestionItems = () => {
  for (const question of questions) {
    questionsQueue.value.push(question);    
  }
}

const enqueueSkippedQuestion = (question: MCQProps) => {
  questionsQueue.value.push(question);
}

const nextQuestion = (skipped: boolean) => {
  if(skipped) enqueueSkippedQuestion(currentQuestion.value as MCQProps);
  const nextQuestion = questionsQueue.value.shift();
  currentQuestion.value = nextQuestion ? nextQuestion : null;
};
</script>
