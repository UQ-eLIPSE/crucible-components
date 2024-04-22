import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { questionsData as questions } from "../testSeeds";
import { useQuizStore } from "@/store/QuizStore";
import MCQTimedQuiz from "@/components/MCQ/MCQTimedQuiz.vue";

let wrapper: VueWrapper;
let mcqBtn: Omit<DOMWrapper<Element>, "exists">;
let questionsQueue;
const defaultTimeLimit = 60;

describe("MCQTimedQuiz.vue", () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
    const quizAmount = [...questions];
    questionsQueue = useQuizStore();

    questionsQueue.initialiseQuiz(quizAmount, "Timed");

    wrapper = mount(MCQTimedQuiz, {});

    await wrapper.vm.$nextTick();
    mcqBtn = wrapper.get(".mcq-button");

    questionsQueue.setTimeLimit(defaultTimeLimit);

    vi.useFakeTimers();
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
    expect(questionIsFullyDisplayed(wrapper)).toBe(true);
  });

  it("Should contain an h3 element with specific text", () => {
    const h3Element = wrapper.find("h3");
    expect(h3Element.exists()).toBe(true);
    expect(h3Element.text()).toEqual("Time left: 1:00");
  });

  it("Setting time limit should change the h3 element text", async () => {
    questionsQueue.setTimeLimit(30);
    wrapper.unmount();
    wrapper = mount(MCQTimedQuiz, {});
    const h3Element = wrapper.find("h3");
    expect(h3Element.text()).toEqual("Time left: 0:30");
    await vi.advanceTimersByTimeAsync(1000);
    expect(h3Element.text()).toEqual("Time left: 0:29");
  });

  it("Alert box should appear when time is up", async () => {
    window.alert = vi.fn();
    expect(wrapper.text()).toContain("Time left: 1:00");
    vi.advanceTimersByTime(defaultTimeLimit * 1000 + 1000);
    // check if alert box shows up
    expect(window.alert).toHaveBeenCalledWith("Time's up! Quiz has ended.");
  });

  it("Quiz status table should be displayed after time runs out", async () => {
    await vi.advanceTimersByTimeAsync(defaultTimeLimit * 1000 + 1000);
    const score = wrapper.find(".score");
    expect(score.exists()).toBe(true);
    expect(score.text()).toContain("Result:");

    const wrongAnswers = wrapper.findAll(".wrong-answer");
    wrongAnswers.forEach((answer) => {
      expect(answer.exists()).toBe(true);
      expect(answer.text()).toContain("Reached Time Limit");
    });
  });

  // TODO: compartmentalise the end button and segment this into its own test.
  it("End quiz button exists after time has run out", async () => {
    const mockResponse = vi.fn();
    Object.defineProperty(window, "location", {
      value: {
        hash: {
          endsWith: mockResponse,
          includes: mockResponse,
        },
        assign: mockResponse,
      },
      writable: true,
    });

    Object.defineProperty(window.location, "reload", {
      value: mockResponse,
      writable: true,
    });

    expect(wrapper.find(".btn-relocate").exists()).toBe(false);
    expect(questionIsFullyDisplayed(wrapper)).toBe(true);

    await vi.advanceTimersByTimeAsync(defaultTimeLimit * 1000 + 1000);
    const endQuizBtn = wrapper.find(".btn-relocate");
    expect(endQuizBtn.exists()).toBe(true);
    expect(endQuizBtn.text()).toEqual("End");
    expect(questionIsFullyDisplayed(wrapper)).toBe(false);

    expect(window.location.reload).not.toHaveBeenCalled();
    await endQuizBtn.trigger("click");
    expect(window.location.reload).toHaveBeenCalled();
  });
});
