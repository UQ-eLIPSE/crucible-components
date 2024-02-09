/**
 * This file contains utility functions for testing MCQ component
 */
import { MCQProps } from "@/types/MCQ";
import MCQ from "@components/MCQ.vue";
import { mount } from "@vue/test-utils";

export const optionMount = (propsData: MCQProps) => {
  const wrapper = mount(MCQ, { propsData });
  return wrapper.findAll(".mcq-option");
};
