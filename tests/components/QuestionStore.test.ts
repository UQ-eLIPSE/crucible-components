import { test, expect, vi } from "vitest";
import {
  filterQuestionsByTags,
  getQuestionsRandomly,
  shuffleArray,
} from "@/plugins/CruciblePlugin/components/QuestionStore";
import { SelectedTags } from "@/plugins/CruciblePlugin/types/MCQ";

const questions = [
  {
    statement: "The question 1",
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Neurophysiology",
      animal: "Horse",
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
      animal: "Horse",
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
      animal: "Horse",
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
      animal: "Horse",
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
  const result = getQuestionsRandomly(0, questions);
  expect(result).toEqual([]);
});

test("Specify questions more than provided", () => {
  const result = getQuestionsRandomly(5, questions);
  expect(result.length).toEqual(questions.length);
});

test("No question tags specified", () => {
  const result = getQuestionsRandomly(7, questions);
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
        question.tags.course === "VETS2011" &&
        question.tags.subject === "Physiology" &&
        (question.tags.system === "Neurophysiology" ||
          question.tags.system === "Cardiovascular"),
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
        (question.tags.course === "VETS2011" ||
          question.tags.course === "VETS2022") &&
        (question.tags.subject === "Physiology" ||
          question.tags.subject === "Anatomy"),
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
