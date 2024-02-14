import { describe, test, expect } from "vitest";
import { mount } from "@vue/test-utils";
import MCQSubmit from "@components/MCQSubmit.vue";

describe("MCQSubmit", () => {
  test("emits submit event when clicked", async () => {
    const wrapper = mount(MCQSubmit, {
      props: {
        selected: true,
        submitted: false,
        isFinal: false,
      },
    });

    await wrapper.findComponent(MCQSubmit).trigger("click");

    expect(wrapper.emitted()).toHaveProperty("submit");
  });

  test('displays "Submit" when not submitted', () => {
    const wrapper = mount(MCQSubmit, {
      props: {
        selected: true,
        submitted: false,
        isFinal: false,
      },
    });

    expect(wrapper.find(".mcq-submit").text()).toBe("Submit");
  });

  test('displays "Finished" when submitted', () => {
    const wrapper = mount(MCQSubmit, {
      props: {
        selected: true,
        submitted: true,
        isFinal: true,
      },
    });

    expect(wrapper.find(".mcq-submit").text()).toBe("Finished");
  });
});
