<template>
  <div class="report-container">
    <div class="mcq-report">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>question</th>
              <th>correct option</th>
              <th>your answer</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="[key, value] in Object.entries(quizStatus)"
              :key="key"
              class="quiz-statment"
            >
              <td class="question-row">
                <a
                  :href="value.question.link"
                  target="_blank"
                  v-html="value.question.statement"
                ></a>
              </td>
              <td class="answer-row">
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
              <td class="answer-row">
                <span
                  :class="
                    value.correct === 1 ? 'correct-answer' : 'wrong-answer'
                  "
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
          </tbody>
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
import { useQuizStore } from "../../store/QuizStore";

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
  border-radius: 1rem;
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
  table-layout: fixed;
  margin: 0;
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  height: 100%;
}

tr th {
  padding: 0.75rem;
}

td {
  text-align: center;
  padding: 0.5rem 1rem;
  line-height: 1.25;
}
td span {
  display: flex;
  align-items: center;
  justify-content: center;
}
span p {
  text-align: left;
  margin-left: 25px;
}

th {
  padding: 8px;
  text-transform: capitalize;
  background-color: #7e7e7e;
  color: white;
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

.question-row {
  font-style: italic;
}

.question-row > a {
  text-underline-offset: 0.15rem;
  transition: color 0.3s ease;
}

.question-row:hover > a:hover,
.question-row > a:focus {
  color: #0056b3;
}

.answer-row {
  font-weight: bold;
  color: green;
}
</style>
