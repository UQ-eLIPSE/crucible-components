import { test, expect } from "vitest";
import {
  retrieveNumberOfQuestionsFilteredByTags,
  retrieveAllQuestions,
} from "@components/QuestionStore";

const questions = retrieveAllQuestions();

test("Specify no questions and return with an empty array", () => {
  const result = retrieveNumberOfQuestionsFilteredByTags(0);
  expect(result).toEqual([]);
});

test("Specify questions more than provided", () => {
  const result = retrieveNumberOfQuestionsFilteredByTags(5);
  expect(result.length).toEqual(questions.length);
});

// TODO: Used Mocked questions to test the functions - https://vitest.dev/guide/mocking.html
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
