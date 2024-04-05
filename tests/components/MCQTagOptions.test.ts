import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import MCQTagOptions from "@/components/MCQ/MCQTagOptions.vue";
import { getUniquePropertyValues } from "@/components/QuestionStore";

describe("MCQTagOptions.vue", () => {
  it("Renders filter options", () => {
    const wrapper = mount(MCQTagOptions, {
      props: {
        filterSet: {
          course: ["VETS2011", "VETS2012"],
          subject: ["Physiology", "Anatomy"],
          system: ["Neurophysiology", "Cardiovascular"],
        },
      },
    });

    expect(wrapper.findAll(".filter-options").length).toBe(3);
  });

  it("Returns an empty array when input is empty", () => {
    const tags = [];

    const uniqueCourses = getUniquePropertyValues(tags, "course");
    expect(uniqueCourses).toEqual([]);
  });

  it("returns unique values for a given property", () => {
    const tags = [
      { course: "VETS2011", subject: "Physiology", system: "Neurophysiology" },
      { course: "VETS2011", subject: "Anatomy", system: "Cardiovascular" },
      { course: "VETS2012", subject: "Physiology", system: "Neurophysiology" },
    ];

    const uniqueCourses = getUniquePropertyValues(tags, "course");
    expect(uniqueCourses).toEqual(["VETS2011", "VETS2012"]);

    const uniqueSubjects = getUniquePropertyValues(tags, "subject");
    expect(uniqueSubjects).toEqual(["Physiology", "Anatomy"]);

    const uniqueSystems = getUniquePropertyValues(tags, "system");
    expect(uniqueSystems).toEqual(["Neurophysiology", "Cardiovascular"]);
  });
});
