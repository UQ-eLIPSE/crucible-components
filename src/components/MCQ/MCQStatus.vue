<template>
  <div class="mcq-report">
    <table>
      <tr>
        <th>question</th>
        <th>correct option</th>
        <th>your answer</th>
      </tr>
      <tr
        v-for="[key, value] in Object.entries(quizStatus)"
        :key="key"
        class="quiz-statment"
      >
        <th>{{ value.question.statement }}</th>
        <td>
          <span
            v-for="[index, element] in Object.entries(
              value.question.optionsList,
            )"
            :key="index"
          >
            <span v-if="element.optionCorrect">{{
              element.optionValue
            }}</span></span
          >
        </td>
        <td :class="value.correct === 1 ? 'correct-answer' : 'wrong-answer'">
          {{ value.input }}{{ value.correct }}
        </td>
      </tr>
    </table>
    <div class="mcq-result">
      Score:
      <span class="correct-result">{{ correctQuizNum }}</span> out of
      <span class="workquiz">{{ workQuiz }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MCQResult } from "@/types/MCQ";
const { quizStatus, workQuiz } = defineProps<MCQResult>();
const correctQuizNum = quizStatus.filter((quiz) => {
  return quiz.correct === 1;
}).length;
</script>

<style scoped>
.mcq-report {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin: auto;
  width: 70vh;
  height: 60vh;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
  padding: 1em;
  margin-bottom: 2em;
}

th,
td {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.mcq-report:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.mcq-result {
  background-color: green;
  color: white;
  padding: 4px 8px;
  text-align: center;
  border-radius: 5px;
  width: fit-content;
  margin: auto;
  margin-bottom: 5px;
}

.correct-answer {
  color: green;
}

.wrong-answer {
  color: rgb(251, 3, 3);
}
</style>
