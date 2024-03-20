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
      console.log("Index: ", questionIndex);
      this.quizStats[questionIndex][stat]++;
    },
    enqueueQuestion(question: MCQuestion) {
      this.questionsQueue.push(question);
    },
    dequeueQuestion() {
      return this.questionsQueue.shift();
    },
  },
});
