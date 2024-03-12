<template>
  <div>
    <h1>Welcome to VetsCloud Smart Quiz</h1>
    <div>
      <label for="question-amount">Enter a tag:</label>
      <input
        id="question-tag"
        v-model="tag"
        type="text"
        name="tags"
        placeholder="Enter your tag"
      />
    </div>
    <div>
      <label for="question-amount"> Select the amount of questions:</label>
      <input
        id="question-amount"
        v-model.number="questionAmount"
        type="number"
        placeholder="Question amount"
        min="1"
      />
    </div>
    <button class="start-button" @click="startQuiz">Start</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const questionAmount = ref<number>(0);
const tag = ref<string | null>(null);
const emit = defineEmits(["start-quiz"]);

const startQuiz = () => {
  emit("start-quiz", questionAmount.value, tag.value && tag.value.split(" "));
};
</script>

<style scoped>
#question-amount,
#question-tag {
  margin-left: 5px;
  margin-bottom: 5%;
}
.start-button {
  color: #ffffff;
  background-color: #2a52be;
}
</style>
