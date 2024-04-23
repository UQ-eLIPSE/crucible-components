import { describe, it, expect, beforeEach } from "vitest";
import { questionsData as questions } from "../testSeeds";
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
    await selectedOption?.trigger("click");
    expect(selectedOption.element.parentElement?.className).toContain(
      "selected",
    );
    expect(selectedOption.element.parentElement?.innerHTML).toContain(
      optionsList[2].optionValue,
    );
  });

  it("Adds correct class when option box is selected", async () => {
    const selectedOptionWrapper = wrapper.findAll(".mcq-option")[2];
    await selectedOptionWrapper?.trigger("click");
    expect(selectedOptionWrapper.classes()).toContain("selected");
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
    const correctOption = optionList[2];
    await correctOption.trigger("click");
    await mcqBtn.trigger("click");
    expect(correctOption.element.parentElement?.className).toContain("correct");
  });

  it("Adds both correct and wrong classes when submit is pressed for the wrong option", async () => {
    const optionList = getOptions(wrapper);
    const wrongOption = optionList[1];
    const correctOption = optionList[2];
    await wrongOption.trigger("click");
    await mcqBtn.trigger("click");
    expect(wrongOption.element.parentElement?.className).toContain("wrong");
    expect(correctOption.element.parentElement?.className).toContain("correct");
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
