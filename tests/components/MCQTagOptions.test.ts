import { describe, it, expect, beforeEach } from "vitest";
import { getUniquePropertyValues } from "@components/QuestionStore";
import { createPinia, setActivePinia } from "pinia";
import { useQuizStore } from "../../src/store/QuizStore";
import { questionsData as questions } from "../testSeeds";

beforeEach(() => {
  setActivePinia(createPinia());
  const questionsQueue = useQuizStore();
  questionsQueue.allQs = questions;
});

// Test Cases related to getUniquePropertyValues function
// MCQTagOptions for correct render FilterCheckboxes refer to FilterCheckboxes.test.ts
describe("MCQTagOptions.vue", () => {
  it("Returns an empty array when input is empty", () => {
    const tags = [];

    const uniqueCourses = getUniquePropertyValues(tags);
    expect(uniqueCourses).toEqual({});
  });

  it("returns unique values for a given property", () => {
    const tags = [
      {
        course: ["VETS2011"],
        subject: ["Physiology"],
        system: ["Neurophysiology"],
        animal: ["Horse"],
      },
      {
        course: ["VETS2011"],
        subject: ["Anatomy"],
        system: ["Cardiovascular"],
        animal: ["Horse"],
      },
      {
        course: ["VETS2012"],
        subject: ["Physiology"],
        system: ["Neurophysiology"],
        animal: ["Horse"],
      },
    ];

    const uniqueCourses = getUniquePropertyValues(tags);
    expect(uniqueCourses).toEqual({
      course: ["VETS2011", "VETS2012"],
      subject: ["Physiology", "Anatomy"],
      system: ["Neurophysiology", "Cardiovascular"],
      animal: ["Horse"],
    });
  });
});
