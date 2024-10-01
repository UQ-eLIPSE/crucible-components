import { describe, it, expect, beforeEach, vi } from "vitest";
import FilterCheckbox from "@components/MCQ/FilterCheckbox.vue";
import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useQuizStore } from "../../src/store/QuizStore";
import { questionsData as questions } from "../testSeeds";
let wrapper: VueWrapper;
const category: string = "animal";
const topics: string[] = ["horse", "dog", "cat"];
let firstCheckbox: Omit<DOMWrapper<HTMLInputElement>, "exists">;
let secondCheckbox: Omit<DOMWrapper<HTMLInputElement>, "exists">;
let thirdCheckbox: Omit<DOMWrapper<HTMLInputElement>, "exists">;
const coures: string = "course";
const course_topics: string[] = ["VETS2011", "VETS9999", "VETS2013"];

describe("FilterCheckbox.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    // * NEED TO ADD THIS I THINK
    const questionsQueue = useQuizStore();
    questionsQueue.allQs = questions;
    // Access the store and initialize it with some data
    wrapper = mount(FilterCheckbox, {
      props: {
        category,
        topics,
      },
    });
    const checkboxes = wrapper.findAll("input[type='checkbox']");
    firstCheckbox = checkboxes[0] as DOMWrapper<HTMLInputElement>;
    secondCheckbox = checkboxes[1] as DOMWrapper<HTMLInputElement>;
    thirdCheckbox = checkboxes[2] as DOMWrapper<HTMLInputElement>;
  });
  it("Should render the right number of checkboxes", () => {
    expect(wrapper.findAll("input[type='checkbox']").length).toBe(
      topics.length,
    );
  });

  it("Should have the desired value and id attributes", () => {
    const firstTopic = topics[0];
    expect(firstCheckbox.attributes("value")).toBe(firstTopic);
    expect(firstCheckbox.attributes("id")).toBe(
      `${category}-${firstTopic}-checkbox`,
    );
    expect(firstCheckbox.attributes("name")).toBe(category);
  });

  it("Should be checked when clicked", async () => {
    await firstCheckbox.trigger("click");

    expect(firstCheckbox.element.checked).toBe(true);
  });
});
