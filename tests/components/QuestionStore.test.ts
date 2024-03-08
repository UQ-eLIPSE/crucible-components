import { test, expect } from "vitest";
import { setQuestions, getQuestions } from "@components/QuestionStore";

const questions = getQuestions();

test("Specify no questions and return with an empty array", () => {
  const result = setQuestions(0);
  expect(result).toEqual([]);
});

test("Specify questions more than provided", () => {
  const result = setQuestions(5);
  expect(result.length).toEqual(questions.length);
});

test("Specify question tag and amount ", () => {
  const result = setQuestions(2, ["tag1"]);
  const tagged = questions.filter((question) =>
    question.tags?.includes("tag1"),
  );
  expect(result).toEqual(tagged);
});

test("Specify multiple question tags and amount ", () => {
  const tags = ["tag1", "tag2"];
  const result = setQuestions(2, tags);
  const tagged = questions.filter(
    (question) =>
      question.tags && tags.some((tag) => question.tags?.includes(tag)),
  );
  expect(result).toEqual(tagged);
});
