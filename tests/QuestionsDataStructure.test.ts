import { questionsData as questions } from "./testSeeds";
import { MCQuestion } from "../src/types/MCQ";

describe("QuestionsDataStructure", () => {
  it("Should have a question object with the correct properties", () => {
    const questionList = questions;
    questionList.forEach((question: MCQuestion) => {
      expect(question).toHaveProperty("_id");
      expect(question).toHaveProperty("statement");
      expect(question.statement).toBeTruthy();
      expect(question).toHaveProperty("optionsList");
    });
  });

  it("Should have a question object with the correct option object properties", () => {
    const questionList = questions;
    questionList.forEach((question: MCQuestion) => {
      const option = question.optionsList[0];
      expect(option).toHaveProperty("optionValue");
      expect(option).toHaveProperty("optionCorrect");
    });
  });
});
