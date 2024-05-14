import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { getUniquePropertyValues } from "../../src/components/QuestionStore";
import { Tags } from "@/types/MCQ.d.ts";
import { getConvertedStaticData } from "../../src/components/DataAccessLayer";

const questions = getConvertedStaticData();
const badTags = questions.map((q) => q.tags);

describe("should return correct tags structure", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("should return unique values of the given tags", () => {
    const tags = getUniquePropertyValues(badTags as Tags[]);
    expect(tags).toEqual({
      course: ["vets2011", "vets2012", "vets2013"],
      subject: ["physiology", "atonomy"],
      system: ["nervous system"],
      234: ["tagvalue"],
      "@#": ["wr"],
      animal: ["horse", "dog", "cat"],
    });
  });
});
