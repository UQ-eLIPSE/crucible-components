import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { questionsData as questions } from "../testSeeds";
import StartPage from "@components/StartPage.vue";
import { createPinia, setActivePinia } from "pinia";
import { useQuizStore } from "../../src/store/QuizStore";
import { getConvertedStaticData } from "../../src/components/DataAccessLayer";

beforeEach(() => {
  setActivePinia(createPinia());
  const questionsQueue = useQuizStore();
  questionsQueue.allQs = getConvertedStaticData();
});

describe("StartPage.vue", () => {
  it("renders App component", () => {
    const wrapper = mount(StartPage, {});
    expect(wrapper.exists()).toBe(true);
  });

  it("renders start button", () => {
    const wrapper = mount(StartPage, {});
    expect(wrapper.find("button").text()).toBe("Start");
  });

  it("Sets input value in the range of the amount of questions.", async () => {
    const wrapper = mount(StartPage, {
      props: {},
    });
    const input = wrapper.find("#question-amount");
    await input.setValue("2");
    expect(wrapper.vm.questionAmount).toBe(2);
  });

  it("Allows selection between Tutor mode and Timed mode", async () => {
    const wrapper = mount(StartPage, {
      props: {},
    });
    const select = wrapper.find("#mode-select");
    await select.setValue("Timed");
    expect(wrapper.vm.selectedMode).toBe("Timed");
    await select.setValue("Tutor");
    expect(wrapper.vm.selectedMode).toBe("Tutor");
  });

  it("Sets the default value of questionAmount to 10 if maximum questions is greater than 10", () => {
    const wrapper = mount(StartPage, {
      props: {},
    });

    expect(wrapper.vm.questionAmount).toBe(10);
  });

  it("Updates questionAmount if maximum questions changes", async () => {
    const wrapper = mount(StartPage, {
      props: {},
    });
    const quizStore = useQuizStore();
    quizStore.allQs = getConvertedStaticData().slice(0, 5);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.questionAmount).toBe(5);
  });
});
