import { MCQuestion, QuestionState } from "@/types/MCQ";
import { defineStore } from "pinia";

type Stat = "correct" | "skipped" | "attempts";
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
      }));
    },
    incrementStat(questionId: string, stat: Stat) {
      const questionIndex = statIndex(questionId, this.quizStats);
      // MCQButton.test.ts line54 need the changes.
      if (
        this.quizStats[questionIndex] &&
        Object.prototype.hasOwnProperty.call(
          this.quizStats[questionIndex],
          stat,
        )
      ) {
        this.quizStats[questionIndex][stat]++;
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
