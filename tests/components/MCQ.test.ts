import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { title, options } from "@data/question-data.json";
import MCQ from "@components/MCQ.vue";
import { optionMount } from "./MCQUtils";

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

  test("Renders component with no options", () => {
    const optionList = optionMount({ title, options: [] });
    expect(optionList.length).toBe(0);
  });

  test("Renders component with one option", () => {
    const singleOption = [{ text: "Option A", correct: true }];
    const optionList = optionMount({ title, options: singleOption });
    expect(optionList.length).toBe(1);
    expect(optionList[0].text()).toBe("0: Option A");
  });

  test("Renders component with options", () => {
    const optionList = optionMount({ title, options });
    const questionKeys = Object.keys(options);
    expect(optionList.length).toBe(questionKeys.length);

    for (const [index] of questionKeys.entries()) {
      const renderedOption = optionList[index];
      const [key, value] = Object.entries(options)[index];
      expect(renderedOption.text()).toBe(`${key}: ${value.text}`);
    }
  });
});
