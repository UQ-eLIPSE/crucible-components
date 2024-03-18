import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { questions } from "@data/question-data.json";
import StartPage from "@components/StartPage.vue";

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

  it("Sets input value in the range of the amount of questions. ", async () => {
    const wrapper = mount(StartPage, {
      props: { questions },
    });
    const input = wrapper.find("#question-amount");
    await input.setValue("2");
    expect(wrapper.vm.questionAmount).toBe(2);
  });
});
