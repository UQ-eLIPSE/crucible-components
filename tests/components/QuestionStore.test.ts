import { test, expect, vi } from "vitest";
import { getQuestionsByTagAndLimit } from "@components/QuestionStore";

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
  const result = getQuestionsByTagAndLimit(0);
  expect(result).toEqual([]);
});

test("Specify questions more than provided", () => {
  const result = getQuestionsByTagAndLimit(5);
  expect(result.length).toEqual(questions.length);
});

test("No question tags specified", () => {
  const result = getQuestionsByTagAndLimit(7);
  expect(result).toEqual(questions);
});
