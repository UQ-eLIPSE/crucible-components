<template>
  <div class="start-page-container">
    <h1>VetCloud Smart Quiz</h1>
    <MCQTagOptions />
    <div class="quiz-config-container">
      <div class="question-config-container">
        <p class="tag-text">
          Maximum possible questions:
          <span class="question-number">{{
            questionsQueue.getquestionnumber()
          }}</span>
        </p>
        <div class="question-amount-container">
          <label for="question-amount">Select the amount of questions:</label>
          <input
            id="question-amount"
            v-model.number="questionAmount"
            type="number"
            placeholder="Question amount"
            min="1"
            :max="questionsQueue.getquestionnumber()"
            @input="checkMax"
          />
        </div>
        <p v-if="showMaxMsg" class="show-max-msg">
          Cannot select more than
          {{ questionsQueue.getquestionnumber() }} questions.
        </p>
        <div>
          <label for="mode-select">Select mode:</label>
          <select id="mode-select" v-model="selectedMode">
            <option value="Tutor">Tutor</option>
            <option value="Timed">Timed</option>
          </select>
        </div>
        <DropDownbox
          :options="[
            { value: 1, label: 'Time Option 2', unit: 'Min.' },
            { value: 1.5, label: 'Time Option 1', unit: 'Min.' },
          ]"
          :option-name="'Time per Question'"
          :class="selectedMode === 'Timed' ? '' : 'input-disabled'"
          :disabled="selectedMode !== 'Timed'"
        />
      </div>
    </div>
    <button class="start-button" @click="startQuiz">Start</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MCQTagOptions from "@components/MCQ/MCQTagOptions.vue";
import DropDownbox from "./DropDownbox.vue";
import { useQuizStore } from "@/store/QuizStore";
const questionAmount = ref<number>(1);
const selectedMode = ref<string>("Tutor");

const showMaxMsg = ref<boolean>(false);
const showMaxMsgDelay = 3000;
const showMaxMsgTimeoutId = ref<number | null>(null);
const emit = defineEmits(["start-quiz"]);
const questionsQueue = useQuizStore();

const startQuiz = () => {
  emit("start-quiz", {
    questionAmount: questionAmount.value,
    mode: selectedMode.value,
  });
};

const checkMax = () => {
  if (showMaxMsgTimeoutId.value) {
    clearTimeout(showMaxMsgTimeoutId.value);
  }
  if (questionAmount.value > questionsQueue.getquestionnumber()) {
    questionAmount.value = questionsQueue.getquestionnumber();
    showMaxMsg.value = true;
    showMaxMsgTimeoutId.value = window.setTimeout(() => {
      showMaxMsg.value = false;
    }, showMaxMsgDelay);
  }
};
</script>

<style scoped>
#mode-select,
#question-amount {
  margin-left: 0.5rem;
}

.question-config-container {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: left;
  padding-left: 0.5rem;
  margin-bottom: 40px;
}

.show-max-msg {
  color: red;
  margin: 0.15rem 0;
}

.start-button {
  color: #ffffff;
  background-color: #2a52be;
  cursor: pointer;
}
.tag-text {
  margin: 0px;
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
  margin-left: 2px;
}

.start-page-container {
  min-width: 350px;
  background: linear-gradient(145deg, #ffffff, #e1e1e1);
  padding: 1.5rem;
  border-radius: 50px;
  box-shadow:
    43px 55px 87px #b8b8b8,
    -43px -55px 87px #ffffff;
}

.time-limit-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.input-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }
  .question-config-container {
    font-size: 0.85rem;
  }
  .question-amount-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .question-amount-container input {
    align-self: center;
  }
  #question-amount {
    margin-left: 0;
  }

  .question-config-container {
    --responsive-padding-left: clamp(10px, 5vw, 20px);
    padding-left: var(--responsive-padding-left);
  }
}
</style>
