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
        <span>{{ getQuestionsnumByTags(topic, category) }}</span></label
      >
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
const emit = defineEmits(["checked"]);
const onChecked = (event: Event) => {
  if (!(event.target instanceof HTMLInputElement))
    return console.error("Trying to click on non-input element");

  const category = event.target.name as keyof SelectedTags;
  const topic = event.target.value;
  console.log("checked");
  questionsQueue.modifySelectedTags(event.target.checked, { category, topic });
};
const getQuestionsnumByTags = (topic: any, category: string) => {
  console.log("0", category);
  console.log("0", topic);

  return filterQuestionsByTags(
    getAllQuestions(),
    questionsQueue.getselectedtags(),
  ).filter((question) => {
    if (category == "course") {
      return question.tags.course == topic;
    } else if (category == "subject") {
      return question.tags.subject == topic;
    } else if (category == "system") {
      return question.tags.system == topic;
    }
  }).length;
};
</script>

<style scoped>
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
