import { describe, it, expect, beforeEach } from "vitest";
import { title, options } from "@data/question-data.json";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import { MCQProps } from "@/types/MCQ";
import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";

let wrapper: VueWrapper;
let mcqBtn: Omit<DOMWrapper<Element>, "exists">;

beforeEach(() => {
  wrapper = mount(MCQQuestion, {
    props: {
      title,
      options,
    },
  });

  mcqBtn = wrapper.get(".mcq-button");
});

export const optionMount = (propsData?: MCQProps) => {
  const optionWrapper = propsData ? mount(MCQQuestion, { propsData }) : wrapper;
  return optionWrapper.findAll(".mcq-option");
};

describe("MCQButton.vue", () => {
  it("Should initially allow to skip question as there is no selection", () => {
    expect(mcqBtn.classes()).toContain("skip");
    expect(mcqBtn.text()).toBe("Skip");
  });

  it("Should enable MCQ button submission when option is selected", async () => {
    const optionList = optionMount();
    const option = optionList[1];
    await option.trigger("click");
    expect(mcqBtn.classes()).toContain("submit");
    expect(mcqBtn.text()).toBe("Submit");
  });

  it("Should change MCQ button styling and content upon submission", async () => {
    const optionList = optionMount();
    const option = optionList[1];
    await option.trigger("click");
    await mcqBtn.trigger("click");
    expect(mcqBtn.classes()).toContain("next");
    expect(mcqBtn.text()).toBe("Next");
  });

  it("Should change MCQ button styling and content upon navigating to next question", async () => {
    const optionList = optionMount();
    const option = optionList[1];
    await option.trigger("click");
    await mcqBtn.trigger("click");
    await mcqBtn.trigger("click");
    expect(mcqBtn.classes()).toContain("skip");
    expect(mcqBtn.text()).toBe("Skip");
  });

  it("Should allow skip question after clearing selection", async () => {
    const optionList = optionMount();
    const option = optionList[1];
    await option.trigger("click");
    await option.trigger("click");
    expect(mcqBtn.classes()).toContain("skip");
    expect(mcqBtn.text()).toBe("Skip");
  });
});
