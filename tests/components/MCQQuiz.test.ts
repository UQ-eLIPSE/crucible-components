import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useQuizStore } from "@/store/QuizStore";
import { questions } from "@data/question-data.json";
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";

let wrapper: VueWrapper;
let mcqBtn: Omit<DOMWrapper<Element>, "exists">;

beforeEach(async () => {
  setActivePinia(createPinia());
  // Access the store and initialize it with some data
  const quizAmount = questions;
  const questionsQueue = useQuizStore();
  console.log("qyuz", quizAmount.length);
  questionsQueue.initialiseQuiz(quizAmount);

  wrapper = mount(MCQQuiz, {});

  await wrapper.vm.$nextTick();
  mcqBtn = wrapper.get(".mcq-button");
});

const questionIsFullyDisplayed = (wrapper: VueWrapper) => {
  const statementExists = wrapper.find(".mcq-statement").exists();
  const optionsListExists = wrapper.find(".mcq-list").exists();
  const buttonExists = wrapper.find(".mcq-button").exists();
  return statementExists && optionsListExists && buttonExists;
};

describe("MCQQuiz.vue", () => {
  it("Renders quiz properly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.html()).toContain("mcq-statement");
    expect(wrapper.html()).toContain("mcq-option-label");
  });

  it("Navigates question stack upon skip", async () => {
    await mcqBtn.trigger("click");
    expect(wrapper.text()).toContain(
      "Which cranial nerve contains sensory neurons that contribute to the gag reflex",
    );
  });

  it("Navigates question stack upon submission and next", async () => {
    const optionList = wrapper.findAll(".mcq-option");
    const firstOption = optionList[0];
    await firstOption.trigger("click");
    await mcqBtn.trigger("click");
    await mcqBtn.trigger("click");
    expect(wrapper.text()).toContain(
      "What is the mechanism of smell transduction via the olfactory nerve",
    );
  });

  it("Should go back to first question when skipping all the questions", async () => {
    for (let i = 0; i < questions.length; i++) {
      await mcqBtn.trigger("click");
    }
    expect(wrapper.text()).toContain(
      "Which of the given primary taste stimuli are triggered by ions in the saliva",
    );
  });

  it("Should display all questions properly when skipping them", async () => {
    for (let i = 0; i < questions.length; i++) {
      expect(questionIsFullyDisplayed(wrapper)).toBe(true);
      await mcqBtn.trigger("click");
    }
  });

  it("Should display all questions properly when answering them", async () => {
    const optionList = wrapper.findAll(".mcq-option"); //getOptions(wrapper);
    const firstOption = optionList[0];
    for (let i = 0; i < questions.length; i++) {
      expect(questionIsFullyDisplayed(wrapper)).toBe(true);
      await firstOption.trigger("click");
      await mcqBtn.trigger("click");
      await mcqBtn.trigger("click");
    }
  });

  it("Should display no questions after answering them all", async () => {
    const questionsLength = questions.length + 1;
    for (let i = 0; i < questionsLength; i++) {
      const optionList = wrapper.findAll(".mcq-option");
      const firstOption = optionList[0];
      await firstOption.trigger("click");
      await mcqBtn.trigger("click");
      await mcqBtn.trigger("click");
    }
    await wrapper.vm.$nextTick();
    // assert for number of quiz with first option is true

    expect(questionIsFullyDisplayed(wrapper)).toBe(false);
  });
});
