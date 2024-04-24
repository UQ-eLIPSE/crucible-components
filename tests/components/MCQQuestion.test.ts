import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { questionsData as questions } from "../testSeeds";
import MCQQuestion from "@/plugins/CruciblePlugin/components/MCQ/MCQQuestion.vue";
import { MCQuestion } from "@/plugins/CruciblePlugin/types/MCQ";
import { mount, VueWrapper } from "@vue/test-utils";
import { useQuizStore } from "@/plugins/CruciblePlugin/store/QuizStore";
import { QuestionState } from "@/plugins/CruciblePlugin/types/MCQ";
import { dataTest } from "../testSeeds";
import { findSelectedOptionValue } from "@/plugins/CruciblePlugin/components/QuestionStore";

let wrapper: VueWrapper;
const _id = questions[0]._id;
const statement = questions[0].statement;
const optionsList = questions[0].optionsList;

beforeEach(async () => {
  setActivePinia(createPinia());
  const quizStore = useQuizStore();
  const quizStatus: QuestionState[] = dataTest;
  quizStore.$state.quizStats = quizStatus;
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

describe("findSelectedOptionValue", () => {
  it("returns the correct index when the option value matches", () => {
    const questionIndex = 0;
    const answer = "<p>Hippocampus</p>";
    const result = findSelectedOptionValue(dataTest, questionIndex, answer);
    expect(result).toBe(2); // Index of the correct answer in optionsList
  });

  it("returns undefined when the option value does not match any option", () => {
    const questionIndex = 0;
    const answer = "<p>Not a real option</p>";
    const result = findSelectedOptionValue(dataTest, questionIndex, answer);
    expect(result).toBeUndefined();
  });

  it("returns undefined when the optionsList is empty", () => {
    const questionIndex = 1;
    const answer = "Any answer";
    const modifiedData = JSON.parse(JSON.stringify(dataTest));
    modifiedData[questionIndex].question.optionsList = [];
    const result = findSelectedOptionValue(modifiedData, questionIndex, answer);
    expect(result).toBeUndefined();
  });
});
