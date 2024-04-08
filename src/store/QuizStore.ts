import { MCQuestion, QuestionState } from "@/types/MCQ";
import { SelectedTags } from "@/types/MCQ";
import { defineStore } from "pinia";

type Stat = "correct" | "skipped" | "attempts" | "selectedValue";
const statIndex = (questionId: string, quizStats: QuestionState[]) =>
  quizStats.findIndex((quizStat) => quizStat.question._id?.$oid === questionId);

export const useQuizStore = defineStore("questionsQueue", {
  state: () => {
    return {
      questionsQueue: [] as MCQuestion[],
      quizStats: [] as QuestionState[],
      selectedTags: {
        course: [],
        subject: [],
        system: [],
      } as SelectedTags,
    };
  },
  actions: {
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
      console.log(isChecked);
      console.log("modify", category);
      console.log("seleted Tags", this.selectedTags);
      this.selectedTags[category] = isChecked
        ? [...this.selectedTags[category], topic]
        : this.selectedTags[category].filter(
            (selectedTopic) => selectedTopic !== topic,
          );
      console.log("this.selected", this.selectedTags);
    },
    initialiseQuiz(questions: MCQuestion[]) {
      this.questionsQueue = questions;
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
