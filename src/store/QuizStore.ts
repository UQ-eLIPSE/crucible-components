import { MCQuestion, QuestionState } from "@/types/MCQ";
import { defineStore } from "pinia";

type Stat = "correct" | "skipped" | "attempts" | "input";
const statIndex = (questionId: string, quizStats: QuestionState[]) =>
  quizStats.findIndex((quizStat) => quizStat.question._id?.$oid === questionId);

export const useQuizStore = defineStore("questionsQueue", {
  state: () => {
    return {
      questionsQueue: [] as MCQuestion[],
      quizStats: [] as QuestionState[],
    };
  },
  actions: {
    initialiseQuiz(questions: MCQuestion[]) {
      this.questionsQueue = questions;
      this.quizStats = questions.map((question) => ({
        question,
        correct: 0,
        skipped: 0,
        attempts: 0,
        input: "",
      }));
    },
    incrementStat(questionId: string, stat: Stat, index: string = "") {
      const questionIndex = statIndex(questionId, this.quizStats);
      // MCQButton.test.ts line54 need the changes.
      if (
        this.quizStats[questionIndex] &&
        Object.prototype.hasOwnProperty.call(
          this.quizStats[questionIndex],
          stat,
        )
      ) {
        // Add attempts
        this.quizStats[questionIndex][stat]++;
        // Check and Add Correct
        const correctIndex = this.quizStats[questionIndex].question.optionsList
          .map((e) => e.optionCorrect)
          .indexOf(true);
        Number(index) === Number(correctIndex) &&
          this.quizStats[questionIndex]["correct"]++;
        // Input Option
        this.quizStats[questionIndex]["input"] =
          this.quizStats[questionIndex].question.optionsList[
            Number(index)
          ].optionValue;
      } else {
        console.error(`Stat ${stat} not found for question ${questionId}`);
      }
    },
    enqueueQuestion(question: MCQuestion) {
      this.questionsQueue.push(question);
    },
    dequeueQuestion() {
      return this.questionsQueue.shift();
    },
  },
});
