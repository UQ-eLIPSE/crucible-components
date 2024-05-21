import { describe, it, expect } from "vitest";
import { convertTags } from "@/utils/UtilConversion.ts";

const testTagsData = [
  "course: VETs2012",
  "subject: physiology",
  "system: Nervous_System",
  "animal: Horse",
];

describe("test convertTags function", () => {
  it("should return the tags with space to replace underscore", () => {
    const expected = {
      course: ["vets2012"],
      subject: ["physiology"],
      system: ["nervous system"],
      animal: ["horse"],
    };
    expect(convertTags(testTagsData)).toEqual(expected);
  });
});
