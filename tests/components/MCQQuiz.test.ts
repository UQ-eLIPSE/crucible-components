import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useQuizStore } from "@/store/QuizStore";
import { questionsData as questions } from "../testSeeds";
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
      "What happens when an IPSP is generated after EPSP?The membrane is more depolarisedThe effect of the subthreshold is enhancedAction potential is reachedA threshold event takes placeThe membrane is hyperpolarisedSkip",
    );
  });

  it("Navigates question stack upon submission and next", async () => {
    const optionList = getOptions(wrapper);
    const firstOption = optionList[0];
    await firstOption.trigger("click");
    await mcqBtn.trigger("click");
    await mcqBtn.trigger("click");
    expect(wrapper.text()).toContain(
      "What happens when an IPSP is generated after EPSP?The membrane is more depolarisedThe effect of the subthreshold is enhancedAction potential is reachedA threshold event takes placeThe membrane is hyperpolarisedSkip",
    );
  });

  it("Should go back to first question when skipping all the questions", async () => {
    for (let i = 0; i < questions.length; i++) {
      await mcqBtn.trigger("click");
    }
    expect(wrapper.text()).toContain(
      "Which of the following statements regarding action potentials is TRUE?Multiple depolarising events minimises the chance of action potential generationReaching the subthreshold level does not stimulate the post-synaptic membraneThreshold event generates an action potentialReaching the subthreshold level is enough to generate an action potentialDepolarised synaptic membrane is more negative than the hyperpolarised membraneSkip",
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
      const firstOption = optionList[2];
      await firstOption.trigger("click");
      await mcqBtn.trigger("click");
      await mcqBtn.trigger("click");
    }

    await wrapper.vm.$nextTick();

    expect(questionIsFullyDisplayed(wrapper)).toBe(false);

    expect(wrapper.get(".score").text()).toBe("⌛ Result: 2 out of 3 - (67 %)");
  });
});
