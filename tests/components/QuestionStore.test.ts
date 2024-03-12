import { test, expect, vi } from "vitest";
import { retrieveNumberOfQuestionsFilteredByTags } from "@components/QuestionStore";

const questions = [
  {
    title: "The question 0",
    tags: ["tag1"],
    options: [
      { text: "Answer A Q0" },
      { text: "Answer B Q0", correct: true },
      { text: "Answer C Q0" },
    ],
  },
  {
    title: "The question 2",
    tags: ["tag2", "tag1"],
    options: [
      { text: "Answer A Q2" },
      { text: "Answer B Q2" },
      { text: "Answer C Q2", correct: true },
    ],
  },
  {
    title: "The question 3",
    tags: [],
    options: [
      { text: "Answer A Q3", correct: true },
      { text: "Answer B Q3" },
      { text: "Answer C Q3" },
    ],
  },
];

vi.mock("@components/DataAccessLayer", () => {
  return {
    retrieveAllQuestions: () => questions,
  };
});

test("Specify no questions and return with an empty array", () => {
  const result = retrieveNumberOfQuestionsFilteredByTags(0);
  expect(result).toEqual([]);
});

test("Specify questions more than provided", () => {
  const result = retrieveNumberOfQuestionsFilteredByTags(5);
  expect(result.length).toEqual(questions.length);
});

test("No question tags specified", () => {
  const result = retrieveNumberOfQuestionsFilteredByTags(7);
  expect(result).toEqual(questions);
});

test("Specify a non-existent tag", () => {
  const result = retrieveNumberOfQuestionsFilteredByTags(2, [
    "Non-existent-tag",
  ]);
  expect(result).toEqual([]);
});

test("Specify question tag and amount ", () => {
  const result = retrieveNumberOfQuestionsFilteredByTags(2, ["tag1"]);
  const tagged = questions.filter((question) =>
    question.tags?.includes("tag1"),
  );

  expect(result).toEqual(tagged);
});

test("Specify multiple question tags and amount ", () => {
  const tags = ["tag1", "tag2"];
  const result = retrieveNumberOfQuestionsFilteredByTags(3, tags);
  const tagged = questions.filter(
    (question) =>
      question.tags && tags.some((tag) => question.tags?.includes(tag)),
  );
  expect(result).toEqual(tagged);
});
