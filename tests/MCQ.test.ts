import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { title, options } from "../question-data.json";
import MCQ from "../src/components/MCQ.vue";

describe("MCQ.vue", () => {
  test("Renders component with title", () => {
    const wrapper = mount(MCQ, {
      props: {
        title,
        options,
      },
    });
    expect(wrapper.text()).toContain(title);
  });
  test("Renders component with options", () => {
    const wrapper = mount(MCQ, {
      props: {
        title,
        options,
      },
    });

    const questionKeys = Object.keys(options);

    // Check that the correct number of options are rendered
    const optionList = wrapper.findAll("li");
    expect(optionList.length).toBe(questionKeys.length);

    // Check that each option is rendered correctly
    for (const [index, option] of questionKeys) {
      const option = optionList[index];
      const [key, value] = Object.entries(options)[index];
      expect(option.text()).toBe(`${key}: ${value}`);
    }
  });
});
