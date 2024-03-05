import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { questions } from "@data/question-data.json";
import App from "@/App.vue";
import MCQQuiz from "@/components/MCQ/MCQQuiz.vue";
import StartPage from "@/components/MCQ/StartPage.vue";

describe("StartPage.vue", () => {
  it("renders App component", () => {
    const wrapper = mount(StartPage, {
      props: { questions },
    });
    expect(wrapper.exists()).toBe(true);
  });

  it("renders start button", () => {
    const wrapper = mount(StartPage, {
      props: { questions },
    });
    expect(wrapper.find("button").text()).toBe("Start");
  });

  // it("Sets input value to the max when a higher number than the question is set. ", async () => {
  //   const wrapper = mount(StartPage, {
  //     props: { questions },
  //   });
  //   const input = wrapper.find("#question-amount");
  //   await input.setValue("8");
  //   expect(wrapper.vm.questionAmount).toBe(questions.length);
  // });

  //   it("Sets input value in the range of the amount of questions. ", async () => {
  //     const wrapper = mount(StartPage);
  //     const input = wrapper.find("#question-amount");
  //     await input.setValue("2");
  //     expect(wrapper.vm.questionAmount).toBe(2);
  //   });

  //   it("No Default input has been set which pass all questions to MCQ Quiz.", async () => {
  //     const wrapper = mount(StartPage);
  //     await wrapper.find(".start-button").trigger("click");
  //     const mcqQuiz = wrapper.findComponent(MCQQuiz);
  //     expect(mcqQuiz.props().questions.length).toBe(questions.length);
  //   });
});
