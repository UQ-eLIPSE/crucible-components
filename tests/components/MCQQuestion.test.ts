import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { questions } from "@data/question-data.json";
import MCQQuestion from "@components/MCQ/MCQQuestion.vue";
import { MCQuestion } from "@/types/MCQ";
import { mount, VueWrapper } from "@vue/test-utils";

let wrapper: VueWrapper;
const _id = questions[0]._id;
const statement = questions[0].statement;
const optionsList = questions[0].optionsList;

beforeEach(async () => {
  setActivePinia(createPinia());

  wrapper = mount(MCQQuestion, {
    props: {
      _id,
      statement,
      optionsList,
    },
  });
});

const optionMount = (propsData: MCQuestion) => {
  const optionWrapper = mount(MCQQuestion, { propsData });
  return optionWrapper.findAll(".mcq-option");
};

export const getOptions = (wrapper: VueWrapper) => {
  return wrapper.findAll("input[type='radio']");
};

describe("MCQQuestion.vue", () => {
  it("Renders component", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("Renders component with statement", () => {
    expect(wrapper.get(".mcq-statement").html()).toContain(statement);
  });

  it("Renders component with no options", () => {
    const optionList = optionMount({ _id, statement, optionsList: [] });
    expect(optionList.length).toBe(0);
  });

  it("Renders component with one option", () => {
    const singleOption = [{ optionValue: "Option A", optionCorrect: true }];
    const optionList = optionMount({
      _id,
      statement,
      optionsList: singleOption,
    });
    expect(optionList.length).toBe(1);
    expect(optionList[0].text()).toBe(singleOption[0].optionValue);
  });

  it("Renders component with options", () => {
    const optionList = getOptions(wrapper);
    const questionKeys = Object.keys(optionsList);
    expect(optionList.length).toBe(questionKeys.length);

    for (const [index] of questionKeys.entries()) {
      const renderedOptionEle = optionList[index].element;
      const renderedOption = wrapper.find(
        `label[for="${renderedOptionEle.id}"]`,
      );
      const value = Object.values(optionsList)[index];
      expect(renderedOption.html()).toContain(`${value.optionValue}`);
    }
  });

  it("Initially has no selected option", () => {
    expect(wrapper.vm.selectedOption).toBeNull();
  });

  it("Selects the first option", async () => {
    const optionList = getOptions(wrapper);
    const firstOption = optionList[0];
    await firstOption.trigger("click");
    const parentEle = firstOption.element.parentElement?.className;
    expect(parentEle).toContain("selected");
    expect(wrapper.vm.selectedOption).toBe("0");
  });

  it("Selects and deselect the first option", async () => {
    const optionList = getOptions(wrapper);
    const firstOption = optionList[0];
    await firstOption.trigger("click");
    await firstOption.trigger("click");
    expect(wrapper.vm.selectedOption).toBeNull();
  });
});
