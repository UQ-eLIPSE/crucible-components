<template>
  <div>
    <h1>Welcome to VetsCloud Smart Quiz</h1>
    <h3>Enter a tag</h3>
    <input
      id=""
      v-model="tag"
      type="text"
      name="tags"
      placeholder="Enter your tag"
    />
    <div>
      <label for="question-amount"> Select the amount of questions:</label>
      <input
        id="question-amount"
        v-model.number="questionAmount"
        type="number"
        placeholder="Question amount"
        min="1"
        :max="questions.length"
      />
    </div>
    <button class="start-button" @click="startQuiz">Start</button>
  </div>
</template>

<script setup lang="ts">
import { MCQQuiz } from "@/types/MCQ";
import { ref, defineEmits } from "vue";
const { questions } = defineProps<MCQQuiz>();
const questionAmount = ref<number>(0);
const tag = ref<string>("");
const emit = defineEmits(["start-quiz"]);

const startQuiz = () => {
  emit("start-quiz", questionAmount.value, tag.value);
};
</script>

<style scoped>
#question-amount {
  margin-left: 5px;
}
.start-button {
  color: #ffffff;
  background-color: #2a52be;
  margin-top: 5%;
}
</style>
