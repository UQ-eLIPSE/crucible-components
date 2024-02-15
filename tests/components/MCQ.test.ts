import { describe, test, expect, beforeEach } from "vitest";
import { questions as questionList } from "@data/question-data.json";
import MCQ from "@components/MCQ.vue";
import { MCQProps } from "@/types/MCQ";
import { mount, VueWrapper } from "@vue/test-utils";

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = mount(MCQ, {
    props: {
      questions: questionList,
    },
  });
});

export const optionMount = (propsData?: MCQProps) => {
  const optionWrapper = propsData
    ? mount(MCQ, { props: { questions: [propsData] } })
    : wrapper;

  return optionWrapper.findAll(".mcq-option");
};

describe("MCQ.vue", () => {
  test("Renders component", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain("MCQ Test");
  });

  test("Renders component with title", () => {
    expect(wrapper.get(".mcq-title").text()).toContain(questionList[0].title);
  });

  test("Renders component with no options", () => {
    const optionList = optionMount({
      title: questionList[0].title,
      options: [],
    });
    expect(optionList.length).toBe(0);
  });

  test("Renders component with one option", () => {
    const singleOption = [{ text: "Option A", correct: true }];
    const optionList = optionMount({
      title: questionList[0].title,
      options: singleOption,
    });
    expect(optionList.length).toBe(1);
    expect(optionList[0].text()).toBe(singleOption[0].text);
  });

  test("Renders component with options", () => {
    const optionList = optionMount();
    const questionKeys = Object.keys(questionList[0].options);
    expect(optionList.length).toBe(questionKeys.length);

    for (const [index] of questionKeys.entries()) {
      const renderedOption = optionList[index];
      const value = Object.values(questionList[0].options)[index];
      expect(renderedOption.text()).toBe(`${value.text}`);
    }
  });

  test("Selects the first option", async () => {
    expect(wrapper.vm.selectedOption).toBeNull();
    const optionList = wrapper.findAll(".mcq-option");
    const firstOption = optionList[0];
    await firstOption.trigger("click");
    expect(firstOption.classes()).toContain("selected");
    expect(wrapper.vm.selectedOption).toBe("0");
  });

  test("Check selection text", async () => {
    const optionList = optionMount();
    const selectedOption = optionList[2];
    await selectedOption.trigger("click");
    expect(selectedOption.text()).toContain(questionList[0].options[2].text);
  });

  test("Submit button is rendered", () => {
    expect(wrapper.find(".mcq-submit").exists()).toBe(true);
  });

  test("Adds correct class when submit is pressed for the correct option", async () => {
    const optionList = optionMount();
    const correctOption = optionList[1];
    await correctOption.trigger("click");
    await wrapper.find(".mcq-submit").trigger("click");
    expect(correctOption.classes()).toContain("correct");
  });

  test("Adds both correct and wrong classes when submit is pressed for the wrong option", async () => {
    const optionList = optionMount();
    const wrongOption = optionList[0];
    const correctOption = optionList[1];
    await wrongOption.trigger("click");
    await wrapper.find(".mcq-submit").trigger("click");
    expect(wrongOption.classes()).toContain("wrong");
    expect(correctOption.classes()).toContain("correct");
  });
});
