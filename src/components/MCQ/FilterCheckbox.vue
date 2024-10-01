<template>
  <ul>
    <li
      v-for="{
        idx,
        topic,
        disabledStyle,
        num,
        questionamount,
      } in questionsNumByTags"
      :key="idx"
      class="filter-options"
    >
      <input
        :id="`${category}-${topic}-checkbox`"
        type="checkbox"
        :name="category"
        :value="topic"
        :disabled="disabledStyle"
        @change="onChecked($event)"
      />
      <label
        :for="`${category}-${topic}-checkbox`"
        :class="disabledStyle ? 'grey-out' : ''"
      >
        {{ formatTopic(topic) }}
        <span>
          <!--  -->
          ({{ Number(questionamount) }})
          <!--  -->
        </span>
        <span v-if="num !== null" class="question-number">{{ num }}</span>
      </label>
    </li>
  </ul>
</template>
<script setup lang="ts">
import { SelectedTags } from "@/types/MCQ";
import { useQuizStore } from "@/store/QuizStore";
import {
  filterQuestionsByTags,
  filterQuestionsBySingleTopic,
} from "../QuestionStore";
import { computed } from "vue";

const { category, topics, selectedCourse } = defineProps<{
  category: string;
  topics: string[];
  selectedCourse: string | null;
}>();

const questionsQueue = useQuizStore();

const formatTopic = (topic: string) => {
  return category === "course" ? topic.toUpperCase() : topic;
};

const questionsNumByTags = computed(() =>
  Object.entries(topics)
    .map(([idx, topic]) => {
      const num = getQuestionsnumByTags(topic, category);
      const disabledStyle =
        (category === "course" &&
          selectedCourse !== null &&
          topic !== selectedCourse) ||
        num === "0";
      const questionamount = filterQuestionsBySingleTopic(
        questionsQueue.allQs,
        topic,
        category,
      ).length.toString();
      return { idx, topic, num, disabledStyle, questionamount };
    })
    .filter(({ topic }) => topic !== undefined),
);

const onChecked = (event: Event) => {
  if (!(event.target instanceof HTMLInputElement))
    return console.error("Trying to click on non-input element");

  const category = event.target.name as keyof SelectedTags;
  const topic = event.target.value;

  // Make sure checkList.value is initialized and push to the array
  questionsQueue.modifySelectedTags(event.target.checked, { category, topic });
};

const getQuestionsnumByTags = (
  topic: string,
  category: string,
): string | null => {
  const currentSelectedTags = questionsQueue.getselectedtags();

  if (
    !currentSelectedTags[category] ||
    (currentSelectedTags[category as keyof SelectedTags] as string[])?.includes(
      topic,
    )
  ) {
    return null;
  }

  const modifiedSelectedTags = JSON.parse(
    JSON.stringify(questionsQueue.getselectedtags()),
  );
  const selectedTopic = Object.values(modifiedSelectedTags).flat();

  if (!modifiedSelectedTags[category].includes(topic)) {
    modifiedSelectedTags[category].push(topic);
  }
  // not including selected topics
  modifiedSelectedTags[category] = modifiedSelectedTags[category].filter(
    (item: string) => !selectedTopic.includes(item),
  );
  const questions = questionsQueue.allQs;
  return filterQuestionsByTags(
    questions,
    modifiedSelectedTags,
  ).length.toString();
};
</script>

<style scoped>
.grey-out {
  opacity: 0.5;
  pointer-events: none;
}

.question-number {
  border-radius: 10px;
  float: right;
  text-align: center;
  background-color: #2a52be;
  color: white;
  padding: 4px 8px;
  text-align: center;
  width: fit-content;
  min-width: 1.5em;
  font-weight: bolder;
  font-size: small;
  margin: 2px;
  margin-right: 1.5em;
}

ul {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.25rem 1rem;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
  border-top: 1px solid grey;
  padding-left: 1rem;
  list-style-type: none;
}
.grey-out {
  color: grey;
}
@media screen and (max-width: 768px) {
  .filter-options {
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  ul {
    display: flex;
    flex-direction: column;
    text-align: left;
    flex-wrap: wrap;
    gap: 0.25rem;
    margin: 0;
    padding-left: clamp(10px, 5vw, 20px);
  }

  ul label {
    font-size: 0.85rem;
  }

  ul input {
    width: 8px;
    height: 8px;
  }

  .question-number {
    font-size: smaller;
    min-width: 1em;
  }
}
</style>
