import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MCQ from "../src/components/MCQ.vue";

describe("MCQ.vue", () => {
  test("Renders component", () => {
    const wrapper = mount(MCQ);
    expect(wrapper.text()).toContain("MCQ Test");
  });
});
