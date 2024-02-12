import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { title, options } from "@data/question-data.json";
import MCQ from "@components/MCQ.vue";
import { MCQProps } from "@/types/MCQ";

/**
 * This file contains utility functions for testing MCQ component
 */
export const optionMount = (propsData: MCQProps) => {
  const wrapper = mount(MCQ, { propsData });
  return wrapper.findAll(".mcq-option");
};

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
    expect(wrapper.get(".mcq-title").text()).toContain(title);
  });

  test("Renders component with no options", () => {
    const optionList = optionMount({ title, options: [] });
    expect(optionList.length).toBe(0);
  });

  test("Renders component with one option", () => {
    const singleOption = [{ text: "Option A", correct: true }];
    const optionList = optionMount({ title, options: singleOption });
    expect(optionList.length).toBe(1);
    expect(optionList[0].text()).toBe(singleOption[0].text);
  });

  test("Renders component with options", () => {
    const optionList = optionMount({ title, options });
    const questionKeys = Object.keys(options);
    expect(optionList.length).toBe(questionKeys.length);

    for (const [index] of questionKeys.entries()) {
      const renderedOption = optionList[index];
      const value = Object.values(options)[index];
      expect(renderedOption.text()).toBe(`${value.text}`);
    }
  });
});
