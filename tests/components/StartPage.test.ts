import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { questionsData as questions } from "../testSeeds";
import StartPage from "@/plugins/CruciblePlugin/components/StartPage.vue";
import { createPinia, setActivePinia } from "pinia";

beforeEach(() => {
  setActivePinia(createPinia());
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
      props: { questions },
    });
    const input = wrapper.find("#question-amount");
    await input.setValue("2");
    expect(wrapper.vm.questionAmount).toBe(2);
  });

  it("Allows selection between Tutor mode and Timed mode", async () => {
    const wrapper = mount(StartPage, {
      props: { questions },
    });
    const select = wrapper.find("#mode-select");
    await select.setValue("Timed");
    expect(wrapper.vm.selectedMode).toBe("Timed");
    await select.setValue("Tutor");
    expect(wrapper.vm.selectedMode).toBe("Tutor");
  });
});
