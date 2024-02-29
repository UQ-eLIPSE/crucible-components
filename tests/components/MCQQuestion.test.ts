import { describe, it, expect, beforeEach } from "vitest";
import { questions } from "@data/question-data.json";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import { MCQProps } from "@/types/MCQ";
import { mount, VueWrapper } from "@vue/test-utils";

let wrapper: VueWrapper;
const title = questions[0].title;
const options = questions[0].options;

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

describe("MCQQuestion.vue", () => {
  it("Renders component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Renders component with title", () => {
    expect(wrapper.get(".mcq-title").text()).toContain(title);
  });

  it("Renders component with no options", () => {
    const optionList = optionMount({ title, options: [] });
    expect(optionList.length).toBe(0);
  });

  it("Renders component with one option", () => {
    const singleOption = [{ text: "Option A", correct: true }];
    const optionList = optionMount({ title, options: singleOption });
    expect(optionList.length).toBe(1);
    expect(optionList[0].text()).toBe(singleOption[0].text);
  });

  it("Renders component with options", () => {
    const optionList = optionMount();
    const questionKeys = Object.keys(options);
    expect(optionList.length).toBe(questionKeys.length);

    for (const [index] of questionKeys.entries()) {
      const renderedOption = optionList[index];
      const value = Object.values(options)[index];
      expect(renderedOption.text()).toBe(`${value.text}`);
    }
  });

  it("Initially has no selected option", () => {
    expect(wrapper.vm.selectedOption).toBeNull();
  });

  it("Selects the first option", async () => {
    const optionList = optionMount();
    const firstOption = optionList[0];
    await firstOption.trigger("click");
    expect(firstOption.classes()).toContain("selected");
    expect(wrapper.vm.selectedOption).toBe("0");
  });

  it("Selects and deselect the first option", async () => {
    const optionList = optionMount();
    const firstOption = optionList[0];
    await firstOption.trigger("click");
    await firstOption.trigger("click");
    expect(wrapper.vm.selectedOption).toBeNull();
  });
});
