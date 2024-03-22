<template>
  <div class="report-container">
    <div class="mcq-report">
      <div class="table-container">
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
            <td
              style="font-style: italic"
              v-html="value.question.statement"
            ></td>
            <td style="font-weight: bold; color: green">
              <span
                v-for="[index, element] in Object.entries(
                  value.question.optionsList,
                )"
                :key="index"
              >
                <span
                  v-if="element.optionCorrect"
                  v-html="element.optionValue"
                ></span
              ></span>
            </td>
            <td>
              <span
                :class="value.correct === 1 ? 'correct-answer' : 'wrong-answer'"
                v-html="
                  value.correct === 1
                    ? '&#10004;'
                    : '&#10008;' + value.selectedValue
                "
              ></span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="mcq-result">
      <span class="score"
        >&#8987; Result: {{ correctQuizNum }} out of {{ workQuiz }} - ({{
          correctQuizNumPercent
        }}
        %)</span
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

const correctQuizNumPercent = ((correctQuizNum * 100) / workQuiz).toFixed(0);
</script>

<style scoped>
.report-container {
  position: relative;
  height: 80vh;
  display: flex;
  flex-direction: column;
}
.mcq-report {
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  margin: auto;
  width: 70vw;
  height: 80%;
  padding: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
  overflow: scroll;
}

.mcq-report:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

table {
  position: absolute;
  top: 0;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  margin: auto;
}

td {
  text-align: left;
  padding: 8px;
  margin: 5px;
}

th {
  top: 0;
  padding: 8px;
  position: sticky;
  position: -webkit-sticky;
  text-transform: capitalize;
  background-color: #7e7e7e;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.mcq-result {
  position: absolute;
  bottom: 0;
  right: 0;
  float: right;
  color: rgb(1, 118, 185);
  padding: 4px 8px;
  text-align: left;
  width: fit-content;
  font-weight: bolder;
}

.correct-answer {
  color: green;
}

.wrong-answer {
  color: rgb(251, 3, 3);
}

.check {
  height: 50px;
  width: 18px;
  border-bottom: 10px solid green;
  border-right: 10px solid green;
  transform: rotate(45deg);
  margin: 20px;
}
</style>
