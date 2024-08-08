import { test, expect, vi } from "vitest";
import {
  filterQuestionsByTags,
  getQuestionsRandomly,
  shuffleArray,
} from "@components/QuestionStore";
import { SelectedTags } from "@/types/MCQ";

const questions = [
  {
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0b",
    },
    statement: "The question 1",
    tags: {
      course: ["VETS2011"],
      subject: ["Physiology"],
      system: ["Neurophysiology"],
      animal: ["Horse"],
    },
    optionsList: [
      { optionValue: "Answer A Q1", optionCorrect: false },
      { optionValue: "Answer B Q1", optionCorrect: true },
      { optionValue: "Answer C Q1", optionCorrect: false },
    ],
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
  },
  {
    _id: {
      $oid: "6625c7c8c8259deb8c3af39b",
    },
    statement: "The question 2",
    tags: {
      course: ["VETS2022"],
      subject: ["Anatomy"],
      system: ["Musculoskeletal"],
      animal: ["Horse"],
    },
    optionsList: [
      { optionValue: "Answer A Q2", optionCorrect: false },
      { optionValue: "Answer B Q2", optionCorrect: true },
      { optionValue: "Answer C Q2", optionCorrect: false },
    ],
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
  },
  {
    _id: {
      $oid: "6539c0bdeb2b18699ed86fac",
    },
    statement: "The question 3",
    tags: {
      course: ["VETS2011"],
      subject: ["Physiology"],
      system: ["Cardiovascular"],
      animal: ["Horse"],
    },
    optionsList: [
      { optionValue: "Answer A Q3", optionCorrect: true },
      { optionValue: "Answer B Q3", optionCorrect: false },
      { optionValue: "Answer C Q3", optionCorrect: false },
    ],
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
  },
  {
    _id: {
      $oid: "6539c0bdeb2b18699ed86fae",
    },
    statement: "The question 4",
    tags: {
      course: ["VETS2011"],
      subject: ["Physiology"],
      system: ["Neurophysiology"],
      animal: ["Horse"],
    },
    optionsList: [
      { optionValue: "Answer A Q4", optionCorrect: true },
      { optionValue: "Answer B Q4", optionCorrect: false },
      { optionValue: "Answer C Q4", optionCorrect: false },
    ],
    attempts: 0,
    correctAttempts: 0,
    lastAttempted: new Date("2024-08-07T09:55:35.944+00:00"),
  },
];

vi.mock("@components/DataAccessLayer", () => {
  return {
    getAllQuestions: () => questions,
  };
});

test("Specify no questions and return with an empty array", () => {
  const result = getQuestionsRandomly(0, questions);
  expect(result).toEqual([]);
});

test("Specify questions more than provided", () => {
  const result = getQuestionsRandomly(5, questions);
  expect(result.length).toEqual(questions.length);
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

test("Filter questions by a specific course, subject, and system, allowing multiple selections", () => {
  const filterTags: SelectedTags = {
    course: ["VETS2011"],
    subject: ["Physiology"],
    system: ["Neurophysiology", "Cardiovascular"],
    animal: ["Horse"],
  };
  const filteredQuestions = filterQuestionsByTags(questions, filterTags);
  expect(filteredQuestions.length).toBe(3);
  expect(
    filteredQuestions.every(
      (question) =>
        question.tags.course[0] === "VETS2011" &&
        question.tags.subject[0] === "Physiology" &&
        (question.tags.system[0] === "Neurophysiology" ||
          question.tags.system[0] === "Cardiovascular"),
    ),
  ).toBe(true);
});

test("Filter questions by multiple courses and subjects", () => {
  const filterTags: SelectedTags = {
    course: ["VETS2011", "VETS2022"],
    subject: ["Physiology", "Anatomy"],
    system: [],
    animal: [],
  };
  const filteredQuestions = filterQuestionsByTags(questions, filterTags);
  expect(filteredQuestions.length).toBe(4);
  expect(
    filteredQuestions.every(
      (question) =>
        (question.tags.course[0] === "VETS2011" ||
          question.tags.course[0] === "VETS2022") &&
        (question.tags.subject[0] === "Physiology" ||
          question.tags.subject[0] === "Anatomy"),
    ),
  ).toBe(true);
});

test("Filter questions with multiple selections but no matches", () => {
  const filterTags: SelectedTags = {
    course: ["VETS2022"],
    subject: ["Unknown"],
    system: ["Neurophysiology"],
  };
  const filteredQuestions = filterQuestionsByTags(questions, filterTags);
  expect(filteredQuestions.length).toBe(0);
  expect(filteredQuestions).toEqual([]);
});
