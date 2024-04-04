<template>
  <div v-for="[key, value] in Object.entries(tags)" :key="key">
    <div>{{ tags }}</div>
    <div
      v-for="[index, valueKeys] in Object.keys(value)"
      :key="index"
      class="category"
    >
      <h2>{{ valueKeys }}</h2>
      <ul>
        <li>
          <input id="anatomy" type="checkbox" /><label for="anatomy"
            >Anatomy <span class="badge">17</span></label
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuizStore } from "@/store/QuizStore";
const quizStore = useQuizStore();
const tags = quizStore.questionsQueue.map((question) => question.tags);
</script>

<style>
.category {
  margin-bottom: 20px;
}

/* Style the list items */
.category ul li {
  list-style-type: none;
}

/* Style the checkbox labels */
.category ul li label {
  cursor: pointer;
  /* Add other styles as needed */
}

/* Style the badge */
.badge {
  background-color: purple;
  color: white;
  border-radius: 10px;
  padding: 5px;
}
</style>
