import { describe, it, expect } from "vitest";
import { convertTags } from "@/utils/UtilConversion.ts";

const testTagsData = [
  "course: VETs2012",
  "subject: physiology",
  "system: Nervous_System",
  "animal: Horse",
];

describe("test convertTags function", () => {
  it("should return the correct tags format", () => {
    const expected = {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System",
      animal: "Horse",
    };
    expect(convertTags(testTagsData)).toEqual(expected);
  });
});
