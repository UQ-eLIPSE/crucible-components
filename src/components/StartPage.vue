<template>
  <div>
    <h1>Welcome to VetsCloud Smart Quiz</h1>
    <div class="tags-display">
      <div class="tag-container course"><p class="tag-text">VETS2011</p></div>
      <div class="arrow"></div>
      <div class="tag-container subject"><p class="tag-text">Physiology</p></div>
      <div class="arrow"></div>
      <div class="tag-container system"><p class="tag-text">Neurophysiology</p></div>
      <div class="tag-container questions-count"><p class="tag-text">115</p></div>
    </div>
    <div>
      <label for="question-amount">Select the amount of questions:</label>
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
const emit = defineEmits(["start-quiz"]);

const startQuiz = () => {
  emit("start-quiz", questionAmount.value);
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
.questions-count {
  margin: 20px;
  background-color: lightgoldenrodyellow;
}
.course {
    background-color: lightblue;
}
.subject {
    background-color: lightcoral;
}
.system {
    background-color: lightgreen;
}
.tag-container {
    border-radius: 10px;
    padding: 10px;
    text-align: center;
}
.tag-text {
  margin: 0px;
}
.tags-display {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.arrow {
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 10px solid black;
  margin: 5px;
}
@media screen and (max-width: 768px) {
  .tags-display {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .arrow {
    transform: rotate(90deg);
  }
}
</style>
