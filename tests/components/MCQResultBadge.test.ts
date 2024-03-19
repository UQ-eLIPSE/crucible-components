import { describe, it, expect, beforeEach } from "vitest";
import MCQResultBadge from "@/components/MCQ/MCQResultBadge.vue";
import { mount, VueWrapper, DOMWrapper } from "@vue/test-utils";

let wrapper: VueWrapper;
let mcqBadge: DOMWrapper<Element>;

//  test seed for the props correctQuiz and workQuiz
const correctQuiz = 5;
const workQuiz = 10;

beforeEach(async () => {
  wrapper = mount(MCQResultBadge, {
    props: {
      correctQuiz,
      workQuiz,
    },
  });
  mcqBadge = wrapper.find(".mcq-result");
});

describe("MCQResultBadge.vue", () => {
  it("Renders props correctQuiz and workQuiz properly", () => {
    expect(wrapper.exists()).toBe(true);
    expect(mcqBadge.get(".correct-result").text()).toBe("5");
    expect(mcqBadge.get(".workquiz").text()).toBe("10");
  });
});
