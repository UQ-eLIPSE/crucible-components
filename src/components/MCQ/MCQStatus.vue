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
          {{ value.selectedValue }}
        </td>
      </tr>
    </table>
    <div class="mcq-result">
      <span class="correct-result">{{ correctQuizNumPercent }} %</span>
      <br />
      <span class="workquiz"
        >{{ correctQuizNum }} out of {{ workQuiz }} Quiz</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { MCQResult } from "@/types/MCQ";
const { quizStatus, workQuiz } = defineProps<MCQResult>();
const correctQuizNum = quizStatus.filter((quiz) => {
  return quiz.correct === 1;
}).length;
const correctQuizNumPercent = ((correctQuizNum * 100) / workQuiz).toFixed(2);
</script>

<style scoped>
.mcq-report {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin: auto;
  width: 70vh;
  height: 60vh;
  padding: 10px;
}

.mcq-report:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

table {
  display: block;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  padding: 1em;
  margin-top: 3em;
  margin-bottom: 2em;
}

th,
td {
  text-align: left;
  padding: 8px;
}

th {
  text-transform: capitalize;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.mcq-result {
  background-color: green;
  color: white;
  padding: 4px 8px;
  text-align: center;
  border: 1px solid #7e7e7e;
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
