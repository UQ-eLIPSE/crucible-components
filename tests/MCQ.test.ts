import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { title } from "../question-data.json";
import MCQ from "../src/components/MCQ.vue";

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
