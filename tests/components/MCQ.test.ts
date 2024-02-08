import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { title } from "@data/question-data.json";
import MCQ from "@components/MCQ.vue";

describe("MCQ.vue", () => {
  test("Renders component with title", () => {
    const wrapper = mount(MCQ, {
      props: {
        title,
      },
    });
    expect(wrapper.text()).toContain(title);
  });
});
