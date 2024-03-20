import { describe, it, expect, beforeEach } from "vitest";
import { questions } from "@data/question-data.json";
import { createPinia, setActivePinia } from "pinia";
import { useQuizStore } from "@/store/QuizStore";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import { getOptions } from "./MCQQuestion.test";

let wrapper: VueWrapper;
let mcqBtn: Omit<DOMWrapper<Element>, "exists">;
const _id = questions[0]._id;
const statement = questions[0].statement;
const optionsList = questions[0].optionsList;

beforeEach(() => {
  setActivePinia(createPinia());
  // const questionsQueue = useQuizStore();
  const statUpdate = useQuizStore();

  wrapper = mount(MCQQuestion, {
    props: {
      _id,
      statement,
      optionsList,
    },
  });

  mcqBtn = wrapper.get(".mcq-button");
});

describe("MCQButton.vue", () => {
  it("Should initially allow to skip question as there is no selection", () => {
    expect(mcqBtn.classes()).toContain("skip");
    expect(mcqBtn.text()).toBe("Skip");
  });

  it("Should enable MCQ button submission when option is selected", async () => {
    const optionList = getOptions(wrapper);
    const option = optionList[1];
    await option.trigger("click");
    expect(mcqBtn.classes()).toContain("submit");
    expect(mcqBtn.text()).toBe("Submit");
  });

  it("Should change MCQ button styling and content upon submission", async () => {
    const optionList = getOptions(wrapper);
    const option = optionList[1];
    await option.trigger("click");
    await mcqBtn.trigger("click");
    expect(mcqBtn.classes()).toContain("next");
    expect(mcqBtn.text()).toBe("Next");
  });

  it("Should change MCQ button styling and content upon navigating to next question", async () => {
    const optionList = getOptions(wrapper);
    const option = optionList[1];
    await option.trigger("click");
    await mcqBtn.trigger("click");
    await mcqBtn.trigger("click");
    expect(mcqBtn.classes()).toContain("skip");
    expect(mcqBtn.text()).toBe("Skip");
  });

  it("Should allow skip question after clearing selection", async () => {
    const optionList = getOptions(wrapper);
    const option = optionList[1];
    await option.trigger("click");
    await option.trigger("click");
    expect(mcqBtn.classes()).toContain("skip");
    expect(mcqBtn.text()).toBe("Skip");
  });
});
