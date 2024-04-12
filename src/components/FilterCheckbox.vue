<template>
  <ul>
    <li
      v-for="{ idx, num, topic } in questionsNumByTags"
      :key="idx"
      class="filter-options"
      :class="{ 'grey-out': num === '0' }"
    >
      <input
        :id="`${category}-${topic}-checkbox`"
        type="checkbox"
        :name="category"
        :value="topic"
        :disabled="num === '0'"
        @change="onChecked($event)"
      />
      <label :for="`${category}-${topic}-checkbox`">
        {{ topic }}
        <span v-if="num !== null && num !== '0'" class="question-number">{{
          num
        }}</span></label
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
import { SelectedTags } from "@/types/MCQ";
import { useQuizStore } from "@/store/QuizStore";
import { getQuestionsBasedOnEnv } from "./DataAccessLayer";
import { filterQuestionsByTags } from "./QuestionStore";
import { computed } from "vue";
const { category, topics } = defineProps<{
  category: string;
  topics: string[];
}>();
const questionsQueue = useQuizStore();

const questionsNumByTags = computed(() =>
  Object.entries(topics)
    .map(([idx, topic]) => {
      const num = getQuestionsnumByTags(topic, category);
      return { idx, topic, num };
    })
    .filter(({ topic }) => topic !== undefined),
);

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

  if (
    (currentSelectedTags[category as keyof SelectedTags] as string[])?.includes(
      topic,
    )
  ) {
    return null;
  }

  const modifiedSelectedTags = JSON.parse(
    JSON.stringify(questionsQueue.getselectedtags()),
  );

  if (!modifiedSelectedTags[category].includes(topic)) {
    modifiedSelectedTags[category].push(topic);
  }

  const questions = getQuestionsBasedOnEnv();

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
    /* text-align: left; */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
