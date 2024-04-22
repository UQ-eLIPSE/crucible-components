import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useQuizStore } from "@/plugins/CruciblePlugin/store/QuizStore";
import DropDownbox from "@/plugins/CruciblePlugin/components/MCQ/DropDownbox.vue"; // Ensure the import is correct

describe("DropDownbox", () => {
  let wrapper: VueWrapper;
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useQuizStore();
    vi.spyOn(store, "setTimeLimit"); // Spy on `setTimeLimit` in quiz store

    wrapper = mount(DropDownbox, {
      props: {
        options: [
          { value: 2, label: "2 minutes", unit: "min" },
          { value: 3, label: "3 minute", unit: "min" },
        ],
        optionName: "Select Time",
      },
    });
  });

  it("should update timeLimit and call setTimeLimit on change", async () => {
    const select = wrapper.find("select");
    await select.setValue("2");

    // Check if timeLimit was updated correctly
    const timeLimit = wrapper.vm.timeLimit;
    expect(timeLimit).toBe(120); // 2 * 60
    expect(store.setTimeLimit).toHaveBeenCalledWith(120); // Verify if the method was called with 120
  });
});
