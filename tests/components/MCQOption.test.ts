import { describe, it, expect, beforeEach } from "vitest";
import { questions } from "@data/question-data.json";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import { getOptions } from "./MCQQuestion.test";

let wrapper: VueWrapper;
const _id = questions[0]._id;
const statement = questions[0].statement;
const optionsList = questions[0].optionsList;
let mcqBtn: Omit<DOMWrapper<Element>, "exists">;

beforeEach(() => {
  wrapper = mount(MCQQuestion, {
    props: {
      _id,
      statement,
      optionsList,
    },
  });

  mcqBtn = wrapper.get(".mcq-button");
});

describe("MCQOption.vue", () => {
  it("Adds correct class when option is selected", async () => {
    const optionList = getOptions(wrapper);
    const selectedOption = optionList[2];
    await selectedOption.trigger("click");
    expect(selectedOption.html()).toContain(optionsList[2].optionValue);
    expect(selectedOption.classes()).toContain("selected");
  });

  it("Allows selection clearing", async () => {
    const optionList = getOptions(wrapper);
    const selectedOption = optionList[2];
    await selectedOption.trigger("click");
    await selectedOption.trigger("click");
    expect(selectedOption.classes()).not.toContain("selected");
  });

  it("Adds correct class when submit is pressed for the correct option", async () => {
    const optionList = getOptions(wrapper);
    const correctOption = optionList[0];
    await correctOption.trigger("click");
    await mcqBtn.trigger("click");
    expect(correctOption.classes()).toContain("correct");
  });

  it("Adds both correct and wrong classes when submit is pressed for the wrong option", async () => {
    const optionList = getOptions(wrapper);
    const wrongOption = optionList[1];
    const correctOption = optionList[0];
    await wrongOption.trigger("click");
    await mcqBtn.trigger("click");
    expect(wrongOption.classes()).toContain("wrong");
    expect(correctOption.classes()).toContain("correct");
  });

  it("Adds ignore-hover classe when upon wrong submission", async () => {
    const optionList = getOptions(wrapper);
    const option = optionList[0];
    await option.trigger("click");
    await mcqBtn.trigger("click");
    optionList.forEach((option) => {
      expect(option.classes()).toContain("ignore-hover");
    });
  });

  it("Adds ignore-hover classe when upon correct submission", async () => {
    const optionList = getOptions(wrapper);
    const option = optionList[0];
    await option.trigger("click");
    await mcqBtn.trigger("click");
    optionList.forEach((option) => {
      expect(option.classes()).toContain("ignore-hover");
    });
  });
});
