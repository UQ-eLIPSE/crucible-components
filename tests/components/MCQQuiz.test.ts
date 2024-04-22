import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useQuizStore } from "@/store/QuizStore";
import { questions } from "@data/question-data.json";
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import { getOptions } from "./MCQQuestion.test";

let wrapper: VueWrapper;
let mcqBtn: Omit<DOMWrapper<Element>, "exists">;

describe("MCQQuiz.vue", () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
    // Access the store and initialize it with some data
    const quizAmount = [...questions];
    const questionsQueue = useQuizStore();

    questionsQueue.initialiseQuiz(quizAmount, "Tutor");

    wrapper = mount(MCQQuiz);

    await wrapper.vm.$nextTick();
    mcqBtn = wrapper.get(".mcq-button");
  });

  const questionIsFullyDisplayed = (wrapper: VueWrapper) => {
    const statementExists = wrapper.find(".mcq-statement").exists();
    const optionsListExists = wrapper.find(".mcq-list").exists();
    const buttonExists = wrapper.find(".mcq-button").exists();
    return statementExists && optionsListExists && buttonExists;
  };

  it("Renders quiz properly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.html()).toContain("mcq-statement");
    expect(wrapper.html()).toContain("mcq-option-label");
  });

  it("Navigates question stack upon skip", async () => {
    await mcqBtn.trigger("click");
    expect(wrapper.text()).toContain(
      "Action potentials are transmitted along which part of a neuron?AxonPre-synaptic terminalCell bodyDendriteMyelinSkip",
    );
  });

  it("Navigates question stack upon submission and next", async () => {
    const optionList = getOptions(wrapper);
    const firstOption = optionList[0];
    await firstOption.trigger("click");
    await mcqBtn.trigger("click");
    await mcqBtn.trigger("click");
    expect(wrapper.text()).toContain(
      "Action potentials are transmitted along which part of a neuron?AxonPre-synaptic terminalCell bodyDendriteMyelinSkip",
    );
  });

  it("Should go back to first question when skipping all the questions", async () => {
    for (let i = 0; i < questions.length; i++) {
      await mcqBtn.trigger("click");
    }
    expect(wrapper.text()).toContain(
      "Which part of a neuron receives information from surrounding cells?AxonPresynaptic terminalCell bodyDendriteMyelinSkip",
    );
  });

  it("Should display all questions properly when skipping them", async () => {
    for (let i = 0; i < questions.length; i++) {
      expect(questionIsFullyDisplayed(wrapper)).toBe(true);
      await mcqBtn.trigger("click");
    }
  });

  it("Should display all questions properly when answering them", async () => {
    const optionList = getOptions(wrapper);
    const firstOption = optionList[0];
    for (let i = 0; i < questions.length; i++) {
      expect(questionIsFullyDisplayed(wrapper)).toBe(true);
      await firstOption.trigger("click");
      await mcqBtn.trigger("click");
      await mcqBtn.trigger("click");
    }
  });

  it("Should display no questions after answering them all, and display the correct Score", async () => {
    for (let i = 0; i < questions.length; i++) {
      const optionList = getOptions(wrapper);
      const firstOption = optionList[0];
      await firstOption.trigger("click");
      await mcqBtn.trigger("click");
      await mcqBtn.trigger("click");
    }

    await wrapper.vm.$nextTick();

    expect(questionIsFullyDisplayed(wrapper)).toBe(false);

    expect(wrapper.get(".score").text()).toBe(
      "⌛ Result: 45 out of 185 - (24 %)",
    );
  });
});
