import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import CrucibleComponent from "@components/CrucibleComponent.vue";
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import { createPinia, setActivePinia } from "pinia";
import { useQuizStore } from "../src/store/QuizStore";
import { getConvertedStaticData as mockData } from "../src/components/DataAccessLayer";

let questionsQueue;
beforeEach(() => {
  setActivePinia(createPinia());
  questionsQueue = useQuizStore();
});

describe("CrucibleComponent.vue", () => {
  it("renders App component", () => {
    const wrapper = mount(CrucibleComponent);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders start button", () => {
    const wrapper = mount(CrucibleComponent);
    expect(wrapper.find("button").text()).toBe("Start");
  });

  it("renders MCQQuiz component when start button is clicked", async () => {
    const wrapper = mount(CrucibleComponent);
    expect(wrapper.findComponent({ name: "MCQQuiz" }).exists()).toBe(false);
    await wrapper.find("button").trigger("click");
    expect(wrapper.findComponent({ name: "MCQQuiz" }).exists()).toBe(true);
  });

  it("No Default input has been set which pass all questions to MCQ Quiz.", async () => {
    const wrapper = mount(CrucibleComponent, {
      provide: {
        $dataLink: mockData,
      },
    });
    await wrapper.find(".start-button").trigger("click");
    expect(questionsQueue.allQs.length).toBe(13);
  });
});
