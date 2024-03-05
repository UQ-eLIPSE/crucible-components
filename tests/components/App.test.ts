import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { questions } from "@data/question-data.json";
import App from "@/App.vue";
import MCQQuiz from "@/components/MCQ/MCQQuiz.vue";

describe("App.vue", () => {
  it("renders App component", () => {
    const wrapper = mount(App);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders start button", () => {
    const wrapper = mount(App);
    expect(wrapper.find("button").text()).toBe("Start");
  });

  it("renders MCQQuiz component when start button is clicked", async () => {
    const wrapper = mount(App);
    expect(wrapper.findComponent({ name: "MCQQuiz" }).exists()).toBe(false);
    await wrapper.find("button").trigger("click");
    expect(wrapper.findComponent({ name: "MCQQuiz" }).exists()).toBe(true);
  });

  it("Sets input value to the max when a higher number than the question is set. ", async () => {
    const wrapper = mount(App);
    const input = wrapper.find(".question-amount");
    await input.setValue("8");
    expect(wrapper.vm.questionAmount).toBe(questions.length);
  });

  it("Sets input value in the range of the amount of questions. ", async () => {
    const wrapper = mount(App);
    const input = wrapper.find(".question-amount");
    await input.setValue("2");
    expect(wrapper.vm.questionAmount).toBe(2);
  });

  it("No Default input has been set which pass all questions to MCQ Quiz.", async () => {
    const wrapper = mount(App);
    await wrapper.find(".start-button").trigger("click");
    const mcqQuiz = wrapper.findComponent(MCQQuiz);
    expect(mcqQuiz.props().questions.length).toBe(questions.length);
  });
});
