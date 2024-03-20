import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useQuizStore } from "@/store/QuizStore";
import MCQStatus from "@/components/MCQ/MCQStatus.vue";
import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";
import { QuestionState } from "@/types/MCQ";
import { questions } from "@data/question-data.json";
import { data_test } from "../test_seeds";

let wrapper: VueWrapper;
let mcqBadge: DOMWrapper<Element>;

beforeEach(async () => {
  setActivePinia(createPinia());
  const quizAmount = questions.slice(0, 3);
  const questionsQueue = useQuizStore();
  questionsQueue.initialiseQuiz(quizAmount);
  const quizStatus: QuestionState[] = data_test;
  const workQuiz = data_test.length;
  wrapper = mount(MCQStatus, {
    props: {
      quizStatus,
      workQuiz,
    },
  });
  mcqBadge = wrapper.find(".mcq-result");
});

describe("MCQResultBadge.vue", () => {
  it("Renders props correctQuiz and workQuiz properly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(mcqBadge.get(".correct-result").text()).toBe("1");
    expect(mcqBadge.get(".workquiz").text()).toBe("3");
  });
});
