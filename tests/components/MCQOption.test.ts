import { describe, it, expect, beforeEach } from "vitest";
import { questions } from "@data/question-data.json";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import { mount, VueWrapper } from "@vue/test-utils";
import { MCQProps } from "@/types/MCQ";

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

describe("MCQOption.vue", () => {
  it("Adds correct class when option is selected", async () => {
    const optionList = optionMount();
    const selectedOption = optionList[2];
    await selectedOption.trigger("click");
    expect(selectedOption.text()).toContain(options[2].text);
    expect(selectedOption.classes()).toContain("selected");
  });

  it("Allows selection clearing", async () => {
    const optionList = optionMount();
    const selectedOption = optionList[2];
    await selectedOption.trigger("click");
    await selectedOption.trigger("click");
    expect(selectedOption.classes()).not.toContain("selected");
  });

  it("Adds correct class when submit is pressed for the correct option", async () => {
    const optionList = optionMount();
    const correctOption = optionList[1];
    await correctOption.trigger("click");
    await wrapper.get(".mcq-button").trigger("click");
    expect(correctOption.classes()).toContain("correct");
  });

  it("Adds both correct and wrong classes when submit is pressed for the wrong option", async () => {
    const optionList = optionMount();
    const wrongOption = optionList[0];
    const correctOption = optionList[1];
    await wrongOption.trigger("click");
    await wrapper.get(".mcq-button").trigger("click");
    expect(wrongOption.classes()).toContain("wrong");
    expect(correctOption.classes()).toContain("correct");
  });

  it("Adds ignore-hover classe when upon wrong submission", async () => {
    const optionList = optionMount();
    const option = optionList[0];
    await option.trigger("click");
    await wrapper.get(".mcq-button").trigger("click");
    optionList.forEach((option) => {
      expect(option.classes()).toContain("ignore-hover");
    });
  });

  it("Adds ignore-hover classe when upon correct submission", async () => {
    const optionList = optionMount();
    const option = optionList[1];
    await option.trigger("click");
    await wrapper.get(".mcq-button").trigger("click");
    optionList.forEach((option) => {
      expect(option.classes()).toContain("ignore-hover");
    });
  });
});
