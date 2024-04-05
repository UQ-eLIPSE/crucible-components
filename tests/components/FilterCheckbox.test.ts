import { describe, it, expect, beforeEach } from "vitest";
import FilterCheckbox from "@/components/FilterCheckbox.vue";
import { DOMWrapper, VueWrapper, mount } from "@vue/test-utils";

let wrapper: VueWrapper;
const category: string = "course";
const topics: string[] = ["VETS2011", "VETS2012"];
let firstCheckbox: Omit<DOMWrapper<HTMLInputElement>, "exists">;

beforeEach(() => {
  wrapper = mount(FilterCheckbox, {
    props: {
      category,
      topics,
    },
  });
  firstCheckbox = wrapper.get("input[type='checkbox']");
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

  it("Should call the checked event when clicked", async () => {
    let emitted = wrapper.emitted();
    expect(emitted).not.toHaveProperty("checked");

    await firstCheckbox.trigger("change");

    emitted = wrapper.emitted();
    expect(emitted).toHaveProperty("checked");
    expect(emitted.checked[0]).toEqual([
      firstCheckbox.element.checked,
      { category, topic: topics[0] },
    ]);
  });
});
