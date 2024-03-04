<script setup lang="ts">
import { ref } from "vue";
import MCQQuiz from "@components/MCQ/MCQQuiz.vue";
import { questions } from "@data/question-data.json";
const showQuiz = ref(false);
const selectedTags = ref<string[]>([]);

const startQuiz = () => {
  showQuiz.value = true;
};

const tags = Array.from(
  new Set(questions.map((question) => question.tags).flat()),
);

const handleTagSelection = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.checked) {
    selectedTags.value.push(target.value);
  } else {
    selectedTags.value = selectedTags.value.filter(
      (tag) => tag !== target.value,
    );
  }
};
</script>

<template>
  <div v-if="!showQuiz">
    <h1>Welcome to VetsCloud Smart Quiz</h1>
    <h3>Select your tags:</h3>
    <div class="tag-list">
      <div v-for="tag in tags" :key="tag">
        <input
          :id="tag"
          type="checkbox"
          :value="tag"
          @change="handleTagSelection"
        />
        <label :for="tag">{{ tag }}</label>
      </div>
    </div>
    <button class="start-button" @click="startQuiz">Start</button>
  </div>
  <MCQQuiz v-if="showQuiz" :questions="questions" />
</template>

<style scoped>
.start-button {
  color: #ffffff;
  background-color: #2a52be;
}
.tag-list {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
}
</style>
