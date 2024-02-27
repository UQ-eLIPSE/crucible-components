import { describe, test, expect, beforeEach } from "vitest";
import { title, options } from "@data/question-data.json";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import { MCQProps } from "@/types/MCQ";
import { mount, VueWrapper } from "@vue/test-utils";

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = mount(MCQQuestion, {
    props: {
      title,
      options,
    },
  });
});

export const optionMount = (propsData?: MCQProps) => {
  const optionWrapper = propsData ? mount(MCQQuestion, { propsData }) : wrapper;
  return optionWrapper.findAll(".mcq-option");
};

describe("MCQ.vue", () => {
  test("Renders component", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain("MCQ Test");
  });

  test("Renders component with title", () => {
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
    const optionList = optionMount();
    const questionKeys = Object.keys(options);
    expect(optionList.length).toBe(questionKeys.length);

    for (const [index] of questionKeys.entries()) {
      const renderedOption = optionList[index];
      const value = Object.values(options)[index];
      expect(renderedOption.text()).toBe(`${value.text}`);
    }
  });

  test("Selects the first option", async () => {
    expect(wrapper.vm.selectedOption).toBeNull();
    const optionList = optionMount();
    const firstOption = optionList[0];
    await firstOption.trigger("click");
    expect(firstOption.classes()).toContain("selected");
    expect(wrapper.vm.selectedOption).toBe("0");
  });

  test("MCQ button is rendered", () => {
    expect(wrapper.find(".mcq-button").exists()).toBe(true);
  });

  test("Check selection text", async () => {
    const optionList = optionMount();
    const selectedOption = optionList[2];
    await selectedOption.trigger("click");
    expect(selectedOption.text()).toContain(options[2].text);
    expect(selectedOption.classes()).toContain("selected");
  });

  test("Adds correct class when submit is pressed for the correct option", async () => {
    const optionList = optionMount();
    const correctOption = optionList[1];
    await correctOption.trigger("click");
    await wrapper.find(".mcq-button").trigger("click");
    expect(correctOption.classes()).toContain("correct");
  });

  test("Adds both correct and wrong classes when submit is pressed for the wrong option", async () => {
    const optionList = optionMount();
    const wrongOption = optionList[0];
    const correctOption = optionList[1];
    await wrongOption.trigger("click");
    await wrapper.find(".mcq-button").trigger("click");
    expect(wrongOption.classes()).toContain("wrong");
    expect(correctOption.classes()).toContain("correct");
  });

  test("MCQ button behaves as expected when submission is correct", async () => {
    let button = wrapper.find(".mcq-button[disabled]");
    expect(button.exists()).toBe(true);
    expect(button.classes()).toContain("submit");
    expect(button.text()).toBe("Submit");

    const optionList = optionMount();
    const correctOption = optionList[1];
    await correctOption.trigger("click");
    await button.trigger("click");
    button = wrapper.find(".mcq-button:not([disabled])");

    expect(button.exists()).toBe(true);
    expect(button.classes()).toContain("next");
    expect(button.text()).toBe("Next");
    await button.trigger("click");

    button = wrapper.find(".mcq-button[disabled]");
    expect(button.exists()).toBe(true);
    expect(button.classes()).toContain("submit");
    expect(button.text()).toBe("Submit");
  });

  test("MCQ button behaves as expected when submission is wrong", async () => {
    let button = wrapper.find(".mcq-button[disabled]");
    expect(button.exists()).toBe(true);
    expect(button.classes()).toContain("submit");
    expect(button.text()).toBe("Submit");

    const optionList = optionMount();
    const wrongOption = optionList[0];
    await wrongOption.trigger("click");
    await button.trigger("click");
    button = wrapper.find(".mcq-button:not([disabled])");

    expect(button.exists()).toBe(true);
    expect(button.classes()).toContain("next");
    expect(button.text()).toBe("Next");
    await button.trigger("click");

    button = wrapper.find(".mcq-button[disabled]");
    expect(button.exists()).toBe(true);
    expect(button.classes()).toContain("submit");
    expect(button.text()).toBe("Submit");
  });
});
