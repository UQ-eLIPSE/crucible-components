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
            <td style="font-style: italic; width: 23em">
              <a
                :href="value.question.link"
                target="_blank"
                v-html="value.question.statement"
              ></a>
            </td>
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
                    ? '<span> &#10004;</span> '
                    : '<span> &#10008;</span> ' +
                      '<span> &nbsp; &nbsp </span>' +
                      value.selectedValue
                "
              ></span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <div class="mcq-result">
        <span class="score"
          >&#8987; Result: {{ correctQuizNum }} out of {{ workQuiz }} - ({{
            correctQuizNumPercent
          }}
          %)</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MCQResult } from "@/types/MCQ";
import { useQuizStore } from "@/store/QuizStore";

const questionsQueue = useQuizStore();

const quizStatus = questionsQueue.quizStats;

const workQuiz = questionsQueue.quizStats.length;

const correctQuizNum = quizStatus.filter((quiz) => {
  return quiz.correct === 1;
}).length;

const correctQuizNumPercent = ((correctQuizNum * 100) / workQuiz).toFixed(0);
</script>

<style scoped>
.report-container {
  position: relative;
  width: 50em;
  height: 30em;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  margin-bottom: 1em;
}
.mcq-report {
  position: relative;
  transition: 0.3s;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 30em;
  padding-bottom: 0px;
  overflow-y: auto;
  align-self: flex-start;
}

.mcq-result {
  float: left;
  color: rgb(1, 131, 206);
  padding: 4px 8px;
  text-align: left;
  width: fit-content;
  font-weight: bolder;
  font-size: larger;
}

table {
  position: absolute;
  top: 0;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  height: 100%;
}

td {
  text-align: left;
  padding: 0px 10px 0px 10px;
}
td span {
  display: flex;
  align-items: center;
}
span p {
  text-align: left;
  margin-left: 25px;
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

.correct-answer {
  color: green;
}

.wrong-answer {
  color: rgb(251, 3, 3);
}
</style>
