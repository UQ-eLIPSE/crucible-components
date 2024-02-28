import { describe, it, expect, beforeEach } from "vitest";
import { title, options } from "@data/question-data.json";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import { MCQProps } from "@/types/MCQ";
import { mount, VueWrapper } from "@vue/test-utils";

let wrapper: VueWrapper;

beforeEach(() => {
  wrapper = mount(MCQQuestion, {
    props: {
      title,
      options,
    },
  });
});

export const optionMount = (propsData?: MCQProps) => {
  const optionWrapper = propsData ? mount(MCQQuestion, { propsData }) : wrapper;
  return optionWrapper.findAll(".mcq-option");
};

describe("MCQButton.vue", () => {
  it("Should render disabled MCQ button initially with the right content", () => {
    expect(wrapper.find(".mcq-button[disabled]").exists()).toBe(true);
    expect(wrapper.find(".mcq-button[disabled]").classes()).toContain("submit");
    expect(wrapper.find(".mcq-button[disabled]").text()).toBe("Submit");
  });

  it("Should enable MCQ button when option is selected", async () => {
    const optionList = optionMount();
    const option = optionList[1];
    await option.trigger("click");
    expect(wrapper.find(".mcq-button:not([disabled])").exists()).toBe(true);
    expect(wrapper.find(".mcq-button:not([disabled])").classes()).toContain(
      "submit",
    );
    expect(wrapper.find(".mcq-button:not([disabled])").text()).toBe("Submit");
  });

  it("Should change MCQ button styling and content upon submission", async () => {
    const optionList = optionMount();
    const option = optionList[1];
    await option.trigger("click");
    await wrapper.get(".mcq-button:not([disabled])").trigger("click");
    expect(wrapper.find(".mcq-button:not([disabled])").exists()).toBe(true);
    expect(wrapper.find(".mcq-button:not([disabled])").classes()).toContain(
      "next",
    );
    expect(wrapper.find(".mcq-button:not([disabled])").text()).toBe("Next");
  });

  it("Should change MCQ button styling and content upon navigating to next question", async () => {
    const optionList = optionMount();
    const option = optionList[1];
    await option.trigger("click");
    await wrapper.get(".mcq-button:not([disabled])").trigger("click");
    await wrapper.get(".mcq-button:not([disabled])").trigger("click");
    expect(wrapper.find(".mcq-button[disabled]").exists()).toBe(true);
    expect(wrapper.find(".mcq-button[disabled]").classes()).toContain("submit");
    expect(wrapper.find(".mcq-button[disabled]").text()).toBe("Submit");
  });
});
