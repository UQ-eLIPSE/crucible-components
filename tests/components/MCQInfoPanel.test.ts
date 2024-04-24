import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { questionsData as questions } from "../testSeeds";
import { useQuizStore } from "@/store/QuizStore";
import MCQInfoPanel from "@components/MCQ/MCQInfoPanel.vue";

describe("MCQInfoPanel.vue", () => {
  let wrapper: VueWrapper;
  let timeLeftHeader: Omit<DOMWrapper<Element>, "exists">;
  let questionsLeftHeader: Omit<DOMWrapper<Element>, "exists">;
  const defaultTimeLimit = 60;
  let questionsQueue;

  beforeEach(async () => {
    setActivePinia(createPinia());
    const quizAmount = [...questions];
    questionsQueue = useQuizStore();
    questionsQueue.initialiseQuiz(quizAmount, "Timed");

    wrapper = mount(MCQInfoPanel, {
      props: {
        timeLeft: defaultTimeLimit,
      },
    });

    await wrapper.vm.$nextTick();
    timeLeftHeader = wrapper.find(".time-left-header");
    questionsLeftHeader = wrapper.find(".questions-left-header");

    questionsQueue.setTimeLimit(defaultTimeLimit);
    vi.useFakeTimers();
  });

  it("Renders time left header", () => {
    expect(timeLeftHeader.text()).toContain("Time left: 1:00");
  });

  it("Renders questions left header", () => {
    expect(questionsLeftHeader.text()).toEqual(
      `Question 0 out of ${questions.length}`,
    );
  });

  it("Updates time left header based on prop", async () => {
    await wrapper.setProps({ timeLeft: 30 });
    expect(timeLeftHeader.text()).toContain("Time left: 0:30");
  });

  it("Updates questions left", async () => {
    questionsQueue.dequeueQuestion();
    await wrapper.vm.$nextTick();
    expect(questionsLeftHeader.text()).toEqual(
      `Question 1 out of ${questions.length}`,
    );

    questionsQueue.enqueueQuestion();
    await wrapper.vm.$nextTick();
    expect(questionsLeftHeader.text()).toEqual(
      `Question 1 out of ${questions.length + 1}`,
    );
  });
});
