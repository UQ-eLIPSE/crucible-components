import { describe, it, expect, beforeEach, vi } from "vitest";
import FilterCheckbox from "@components/MCQ/FilterCheckbox.vue";
import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useQuizStore } from "../../src/store/QuizStore";
import { questionsData as questions } from "../testSeeds";
let wrapper: VueWrapper;
const category: string = "course";
const topics: string[] = ["VETS2011", "VETS9999", "VETS2013"];
let firstCheckbox: Omit<DOMWrapper<HTMLInputElement>, "exists">;
let secondCheckbox: Omit<DOMWrapper<HTMLInputElement>, "exists">;
let thirdCheckbox: Omit<DOMWrapper<HTMLInputElement>, "exists">;

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

describe("FilterCheckbox.vue", () => {
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

it("Should disable and grey out checkboxes with no associated questions", async () => {
  //VETS9999 has no questions.
  expect(secondCheckbox.attributes("disabled")).toBe("");
  expect(wrapper.find(".grey-out").exists()).toBe(true);
});

it("Should display question count only for topics with available questions", async () => {
  const questionNumbers = wrapper.findAll(".question-number");
  expect(questionNumbers.length).toBe(2);
  expect(isNaN(Number(questionNumbers[0].text()))).toBe(false);
  expect(questionNumbers[0].text()).toBe("2");
});

it("Should update correctly when we select a tag", async () => {
  const questionsQueue = useQuizStore();
  questionsQueue.modifySelectedTags(true, {
    category: "course",
    topic: "VETS2011",
  });

  const questionNumbers = wrapper.findAll(".question-number");
  expect(questionNumbers[1].text()).toBe("1"); // VETS2013
});
