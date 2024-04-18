import { MCQuestion, QuestionState, QuizMode, SelectedTags } from "@/types/MCQ";
import { getQuestionsBasedOnEnv } from "@/components/DataAccessLayer";
import { filterQuestionsByTags } from "@/components/QuestionStore";
import { defineStore } from "pinia";

type Stat = "correct" | "skipped" | "attempts" | "selectedValue";
const statIndex = (questionId: string, quizStats: QuestionState[]) =>
  quizStats.findIndex((quizStat) => quizStat.question._id?.$oid === questionId);

export const useQuizStore = defineStore("questionsQueue", {
  state: () => {
    return {
      questionsQueue: [] as MCQuestion[],
      quizStats: [] as QuestionState[],
      quizMode: "Tutor" as QuizMode,
      selectedTags: {
        course: [],
        subject: [],
        system: [],
        animal: [],
      } as SelectedTags,
      timeLimit: 60, // default time limit 1 min per qs
    };
  },
  actions: {
    getquestionnumber() {
      const questions = getQuestionsBasedOnEnv();
      return filterQuestionsByTags(questions, this.selectedTags).length;
    },
    setselectedTags(tags: SelectedTags) {
      this.selectedTags = tags;
    },
    getselectedtags() {
      return this.selectedTags;
    },
    modifySelectedTags(
      isChecked: boolean,
      { category, topic }: { category: keyof SelectedTags; topic: string },
    ) {
      this.selectedTags[category] = isChecked
        ? [...this.selectedTags[category], topic]
        : this.selectedTags[category].filter(
            (selectedTopic) => selectedTopic !== topic,
          );
    },
    initialiseQuiz(questions: MCQuestion[], mode: QuizMode) {
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

        if (selectedOptionValue === "-1") {
          this.quizStats[questionIndex]["selectedValue"] = "Reached Time Limit";
          return;
        }

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
    getTimeLimit() {
      return this.timeLimit;
    },
    setTimeLimit(seconds: number) {
      this.timeLimit = seconds;
    },
    getRemainingQuestions() {
      return this.questionsQueue.length;
    },
  },
});
