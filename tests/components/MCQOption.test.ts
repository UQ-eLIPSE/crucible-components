import { describe, it, expect, beforeEach } from "vitest";
import { questions } from "@data/question-data.json";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import { MCQ } from "@/types/MCQ";

let wrapper: VueWrapper;
let mcqBtn: Omit<DOMWrapper<Element>, "exists">;
const question = questions[0];

beforeEach(() => {
  wrapper = mount(MCQQuestion, {
    props: {
      title: question.title,
      options: question.options,
    },
  });

  mcqBtn = wrapper.get(".mcq-button");
});

const optionMount = (propsData?: MCQ) => {
  const optionWrapper = propsData ? mount(MCQQuestion, { propsData }) : wrapper;
  return optionWrapper.findAll(".mcq-option");
};

describe("MCQOption.vue", () => {
  it("Adds correct class when option is selected", async () => {
    const optionList = optionMount();
    const selectedOption = optionList[2];
    await selectedOption.trigger("click");
    expect(selectedOption.text()).toContain(question.options[2].text);
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
    const correctOption = optionList[0];
    await correctOption.trigger("click");
    await mcqBtn.trigger("click");
    expect(correctOption.classes()).toContain("correct");
  });

  it("Adds both correct and wrong classes when submit is pressed for the wrong option", async () => {
    const optionList = optionMount();
    const wrongOption = optionList[1];
    const correctOption = optionList[0];
    await wrongOption.trigger("click");
    await mcqBtn.trigger("click");
    expect(wrongOption.classes()).toContain("wrong");
    expect(correctOption.classes()).toContain("correct");
  });

  it("Adds ignore-hover classe when upon wrong submission", async () => {
    const optionList = optionMount();
    const option = optionList[0];
    await option.trigger("click");
    await mcqBtn.trigger("click");
    optionList.forEach((optionInList) => {
      expect(optionInList.classes()).toContain("ignore-hover");
    });
  });

  it("Adds ignore-hover classe when upon correct submission", async () => {
    const optionList = optionMount();
    const option = optionList[1];
    await option.trigger("click");
    await mcqBtn.trigger("click");
    optionList.forEach((optionInList) => {
      expect(optionInList.classes()).toContain("ignore-hover");
    });
  });
});
