import { updatedQuestions, sortedQuestions } from "../../src/utils/SrsSort";
import { it, expect } from "vitest";

export const generateTestMCQs = (number: number) =>
  Array.from({ length: number }, (_, i) => ({
    _id: { $oid: `${i}` },
    attempts: i,
    correctAttempts: i,
    lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
  }));
const testMCQquestions = generateTestMCQs(3);
it("should return updatedQuestions with property: reviewDue for each MCQquestions", () => {
  const result = updatedQuestions(testMCQquestions);
  result.forEach((question) => {
    expect(Object.keys(question).includes("reviewDue")).toBe(true);
  });
});
it("should return order based on reviewDue", () => {
  const unorderedQs = generateTestMCQs(3);
  unorderedQs[0].correctAttempts = 10;
  unorderedQs[0].attempts = 10;
  unorderedQs[1].correctAttempts = 3;
  unorderedQs[1].attempts = 10;
  unorderedQs[2].correctAttempts = 0;
  unorderedQs[2].attempts = 10;
  const result = sortedQuestions(unorderedQs);

  expect(result[0].correctAttempts).toEqual(0);
  expect(result[1].correctAttempts).toEqual(3);
  expect(result[2].correctAttempts).toEqual(10);
});
