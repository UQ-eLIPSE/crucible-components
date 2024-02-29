import { describe, it, expect, beforeEach } from "vitest";
import { questions } from "@data/question-data.json";
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import { mount, VueWrapper } from "@vue/test-utils";

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = mount(MCQQuiz, {
    props: {
      questions,
    },
  });
});

describe("MCQQuiz.vue", () => {
  it("Renders component", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toContain("MCQ Quiz");
  });
});
