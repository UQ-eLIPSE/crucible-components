import { MCQuestion, QuestionState } from "@/types/MCQ";
import { defineStore } from "pinia";

type Stat = "correct" | "skipped" | "attempts" | "selectedValue";
type QuizMode = string;
const statIndex = (questionId: string, quizStats: QuestionState[]) =>
  quizStats.findIndex((quizStat) => quizStat.question._id?.$oid === questionId);

export const useQuizStore = defineStore("questionsQueue", {
  state: () => {
    return {
      questionsQueue: [] as MCQuestion[],
      quizStats: [] as QuestionState[],
      quizMode: "" as QuizMode,
    };
  },
  actions: {
    initialiseQuiz(questions: MCQuestion[], mode: QuizMode = "default") {
      this.questionsQueue = questions;
      this.quizMode = mode;
      this.quizStats = questions.map((question) => ({
        question,
        correct: 0,
        skipped: 0,
        attempts: 0,
        selectedValue: "",
      }));
    },
    incrementStat(
      questionId: string,
      stat: Stat,
      selectedOptionValue: string = "",
    ) {
      const questionIndex = statIndex(questionId, this.quizStats);

      // Add attempts
      if (this.quizStats[questionIndex]) {
        this.quizStats[questionIndex][stat]++;

        // Check and Add Correct
        const correctOptionIndex = this.quizStats[
          questionIndex
        ].question.optionsList
          .map((e) => e.optionCorrect)
          .indexOf(true);

        Number(selectedOptionValue) === Number(correctOptionIndex) &&
          this.quizStats[questionIndex]["correct"]++;

        // Input Option
        this.quizStats[questionIndex]["selectedValue"] =
          this.quizStats[questionIndex].question.optionsList[
            Number(selectedOptionValue)
          ].optionValue;
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
