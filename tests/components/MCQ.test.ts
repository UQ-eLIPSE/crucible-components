import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { title } from "@data/question-data.json";
import MCQ from "@components/MCQ.vue";

describe("MCQ.vue", () => {
  test("Renders component", () => {
    const wrapper = mount(MCQ, {
      props: {
        title,
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain("MCQ Test");
  });
  test("Renders component with title", () => {
    const wrapper = mount(MCQ, {
      props: {
        title,
      },
    });
    // Rather than looking at the whole wrapper, targetting specific class.
    expect(wrapper.get(".mcq-title").text()).toContain(title);
  });
});
