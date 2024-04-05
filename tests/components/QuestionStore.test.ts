import { test, expect, vi } from "vitest";
import {
  filterQuestionsByTags,
  getQuestionsRandomly,
  shuffleArray,
} from "@components/QuestionStore";

const questions = [
  {
    statement: "The question 1",
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology",
    },
    optionsList: [
      { optionValue: "Answer A Q1", optionCorrect: false },
      { optionValue: "Answer B Q1", optionCorrect: true },
      { optionValue: "Answer C Q1", optionCorrect: false },
    ],
  },
  {
    statement: "The question 2",
    tags: {
      course: "VETS2022",
      subject: "Anatomy",
      system: "Musculoskeletal",
    },
    optionsList: [
      { optionValue: "Answer A Q2", optionCorrect: false },
      { optionValue: "Answer B Q2", optionCorrect: true },
      { optionValue: "Answer C Q2", optionCorrect: false },
    ],
  },
  {
    statement: "The question 3",
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Cardiovascular",
    },
    optionsList: [
      { optionValue: "Answer A Q3", optionCorrect: true },
      { optionValue: "Answer B Q3", optionCorrect: false },
      { optionValue: "Answer C Q3", optionCorrect: false },
    ],
  },
  {
    statement: "The question 4",
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology",
    },
    optionsList: [
      { optionValue: "Answer A Q4", optionCorrect: true },
      { optionValue: "Answer B Q4", optionCorrect: false },
      { optionValue: "Answer C Q4", optionCorrect: false },
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

test("Filter questions by a specific course, subject, and system", () => {
  const filterTags = {
    course: "VETS2011",
    subject: "Physiology",
    system: "Neurophysiology",
  };
  const filteredQuestions = filterQuestionsByTags(questions, filterTags);
  expect(filteredQuestions.length).equal(2);
  expect(
    filteredQuestions.every(
      (q) =>
        q.tags.course === "VETS2011" &&
        q.tags.subject === "Physiology" &&
        q.tags.system === "Neurophysiology",
    ),
  ).toBe(true);
});

test("Filter questions by course and subject, expecting multiple results", () => {
  const filterTags = {
    course: "VETS2011",
    subject: "Physiology",
  };
  const filteredQuestions = filterQuestionsByTags(questions, filterTags);
  expect(filteredQuestions.length).equal(3);
  expect(
    filteredQuestions.every(
      (q) => q.tags.course === "VETS2011" && q.tags.subject === "Physiology",
    ),
  ).toBe(true);
});

test("Filter questions with no matching tags, expecting empty array", () => {
  const filterTags = {
    course: "VETS4044",
    subject: "Unknown",
  };
  const filteredQuestions = filterQuestionsByTags(questions, filterTags);
  expect(filteredQuestions.length).equal(0);
  expect(filteredQuestions).toEqual([]);
});
