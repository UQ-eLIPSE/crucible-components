import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useQuizStore } from "@/store/QuizStore";
import MCQStatus from "@/components/MCQ/MCQStatus.vue";
import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import { QuestionState } from "@/types/MCQ";
import { questions } from "@data/question-data.json";
import { dataTest } from "../testSeeds";

let wrapper: VueWrapper;
let mcqResult: DOMWrapper<Element>;
let mcqStatus: DOMWrapper<Element>;

beforeEach(async () => {
  setActivePinia(createPinia());
  const quizAmount = questions.slice(0, 3);
  const questionsQueue = useQuizStore();
  questionsQueue.initialiseQuiz([...quizAmount]);
  const quizStatus: QuestionState[] = dataTest;
  const workQuiz = dataTest.length;
  wrapper = mount(MCQStatus, {
    props: {
      quizStatus,
      workQuiz,
    },
  });
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
