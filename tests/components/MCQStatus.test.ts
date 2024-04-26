import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useQuizStore } from "../../src/store/QuizStore";
import MCQStatus from "@components/MCQ/MCQStatus.vue";
import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import { QuestionState } from "@types/MCQ";
import { dataTest } from "../testSeeds";

let wrapper: VueWrapper;
let mcqResult: DOMWrapper<Element>;
let mcqStatus: DOMWrapper<Element>;

beforeEach(async () => {
  setActivePinia(createPinia());
  const quizStore = useQuizStore();
  const quizStatus: QuestionState[] = dataTest;
  quizStore.$state.quizStats = quizStatus;
  wrapper = mount(MCQStatus);
});

describe("MCQStatus.vue", () => {
  it("Renders Score properly", () => {
    expect(wrapper.exists()).toBe(true);
    mcqResult = wrapper.find(".mcq-result");
    expect(mcqResult.get(".score").text()).toBe(
      "⌛ Result: 1 out of 3 - (33 %)",
    );
  });

  it("Renders Quiz Status properly", () => {
    expect(wrapper.exists()).toBe(true);
    mcqStatus = wrapper.find(".mcq-report");

    expect(mcqStatus.findAll(".quiz-statment").length).toBe(3);
  });
});
