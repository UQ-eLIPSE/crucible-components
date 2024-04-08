<template>
  <ul>
    <li
      v-for="[idx, topic] in Object.entries(topics)"
      :key="idx"
      class="filter-options"
    >
      <input
        :id="`${category}-${topic}-checkbox`"
        type="checkbox"
        :name="category"
        :value="topic"
        @change="onChecked($event)"
      />
      <label :for="`${category}-${topic}-checkbox`"
        >{{ topic }}
        <span
          v-if="getQuestionsnumByTags(topic, category) !== null"
          class="question-number"
          >{{ getQuestionsnumByTags(topic, category) }}</span
        >
      </label>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { SelectedTags } from "@/types/MCQ";
import { useQuizStore } from "@/store/QuizStore";
import { getAllQuestions } from "./DataAccessLayer";
import { filterQuestionsByTags } from "./QuestionStore";
const { category, topics } = defineProps<{
  category: string;
  topics: string[];
}>();
const questionsQueue = useQuizStore();
const onChecked = (event: Event) => {
  if (!(event.target instanceof HTMLInputElement))
    return console.error("Trying to click on non-input element");

  const category = event.target.name as keyof SelectedTags;
  const topic = event.target.value;
  questionsQueue.modifySelectedTags(event.target.checked, { category, topic });
};
const getQuestionsnumByTags = (
  topic: string,
  category: string,
): string | null => {
  const currentSelectedTags = questionsQueue.getselectedtags();

  if (currentSelectedTags[category]?.includes(topic)) {
    return null;
  }

  const modifiedSelectedTags = JSON.parse(
    JSON.stringify(questionsQueue.getselectedtags()),
  );

  if (!modifiedSelectedTags[category].includes(topic)) {
    modifiedSelectedTags[category].push(topic);
  }

  return filterQuestionsByTags(
    getAllQuestions(),
    modifiedSelectedTags,
  ).length.toString();
};
</script>

<style scoped>
.question-number {
  border-radius: 10px;
  text-align: center;
  background-color: #2a52be;
  color: white;
  padding: 4px 8px;
  text-align: left;
  width: fit-content;
  font-weight: bolder;
  font-size: small;
}

ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
@media screen and (max-width: 768px) {
  .filter-options {
    text-align: left;
    margin-left: 20vw;
  }
}
</style>
