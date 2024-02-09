import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { title, options } from "@data/question-data.json";
import MCQ from "@components/MCQ.vue";

describe("MCQ.vue", () => {
  test("Renders component", () => {
    const wrapper = mount(MCQ, {
      props: {
        title,
        options,
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain("MCQ Test");
  });
  test("Renders component with title", () => {
    const wrapper = mount(MCQ, {
      props: {
        title,
        options,
      },
    });
    // Rather than looking at the whole wrapper, targetting specific class.
    expect(wrapper.get(".mcq-title").text()).toContain(title);
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
    const optionList = wrapper.findAll(".mcq-option");
    expect(optionList.length).toBe(questionKeys.length);

    // Check that each option is rendered correctly
    for (const [index] of questionKeys.entries()) {
      const renderedOption = optionList[index];
      const [key, value] = Object.entries(options)[index];
      expect(renderedOption.text()).toBe(`${key}: ${value}`);
    }
  });
});
