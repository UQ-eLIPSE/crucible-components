import { test, expect, vi } from "vitest";
import { getQuestionsRandomly, shuffleArray } from "@components/QuestionStore";

const questions = [
  {
    statement: "The question 1",
    tags: ["tag1"],
    optionsList: [
      { optionValue: "Answer A Q0", optionCorrect: false },
      { optionValue: "Answer B Q0", optionCorrect: true },
      { optionValue: "Answer C Q0", optionCorrect: false },
    ],
  },
  {
    statement: "The question 2",
    tags: ["tag2", "tag1"],
    optionsList: [
      { optionValue: "Answer A Q2", optionCorrect: false },
      { optionValue: "Answer B Q2", optionCorrect: false },
      { optionValue: "Answer C Q2", optionCorrect: true },
    ],
  },
  {
    statement: "The question 3",
    tags: [],
    optionsList: [
      { optionValue: "Answer A Q3", optionCorrect: true },
      { optionValue: "Answer B Q3", optionCorrect: false },
      { optionValue: "Answer C Q3", optionCorrect: false },
    ],
  },
  {
    statement: "The question 4",
    optionsList: [
      { optionValue: "Answer A Q3", optionCorrect: true },
      { optionValue: "Answer B Q3", optionCorrect: false },
      { optionValue: "Answer C Q3", optionCorrect: false },
    ],
  },
];

vi.mock("@components/DataAccessLayer", () => {
  return {
    getAllQuestions: () => questions,
  };
});

test("Specify no questions and return with an empty array", () => {
  const result = getQuestionsRandomly(0);
  expect(result).toEqual([]);
});

test("Specify questions more than provided", () => {
  const result = getQuestionsRandomly(5);
  expect(result.length).toEqual(questions.length);
});

test("No question tags specified", () => {
  const result = getQuestionsRandomly(7);
  expect(result).toEqual(questions);
});

test("should return an array with the same length", () => {
  const shuffled = shuffleArray([...questions]);
  expect(shuffled).to.have.lengthOf(questions.length);
});

test("should contain all the same elements", () => {
  const shuffled = shuffleArray([...questions]);
  for (const item of questions) {
    expect(shuffled).to.include(item);
  }
});

test("should not return the same array", () => {
  const shuffled = shuffleArray([...questions]);
  expect(shuffled).to.not.deep.equal(questions);
});
