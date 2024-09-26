<template>
  <div class="start-page-container">
    <h1>VetCloud Smart Quiz</h1>
    <MCQTagOptions />
    <p class="select-box">
      <span
        v-for="([key, items], keyIndex) in setSelectedTags"
        :key="key"
        style="text-transform: capitalize"
      >
        <span v-for="(item, index) in items" :key="index">
          {{ item }}
          <span
            v-if="index < items.length - 1"
            style="color: black; font-size: 1.2em"
          >
            &cup;
          </span>
        </span>
        <span
          v-if="keyIndex < setSelectedTags.length - 1"
          style="color: black; font-size: 1.2em"
        >
          &cap;
        </span>
      </span>
    </p>
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
import { onMounted, ref, watchEffect, computed } from "vue";
import MCQTagOptions from "./MCQ/MCQTagOptions.vue";
import DropDownbox from "./MCQ/DropDownbox.vue";
import { useQuizStore } from "@/store/QuizStore";

const questionAmount = ref<number>(1);
const selectedMode = ref<string>("Tutor");
const showMaxMsg = ref<boolean>(false);
const showMaxMsgDelay = 3000;
const showMaxMsgTimeoutId = ref<number | null>(null);
const emit = defineEmits(["start-quiz", "enable-srs"]);
const questionsQueue = useQuizStore();
const setSelectedTags = computed(() => {
  return Object.entries(questionsQueue.getselectedtags()).filter(
    ([_key, items]) => Array.isArray(items) && items.length !== 0,
  );
});
onMounted(() => {
  watchEffect(() => {
    const maxQuestions = questionsQueue.getquestionnumber();
    questionAmount.value = Math.min(10, maxQuestions);
  });
});

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
  text-align: center;
  color: #41752d;
  padding: 4px 8px;
  text-align: left;
  font-size: 1.6em;
  font-weight: 800;
  font-style: oblique;
  text-decoration: underline;
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

.srs-toggle-frame {
  margin: auto;
  padding-bottom: 5px;
  display: flex;
}

.srs-toggle {
  height: 0;
  width: 0;
  visibility: hidden;
}

.srs-label {
  position: relative;
  cursor: pointer;
  text-indent: -9999px;
  width: 50px;
  height: 27px;
  background: grey;
  display: block;
  border-radius: 25px;
}

.srs-label:after {
  content: "";
  position: absolute;
  top: 1px;
  left: 1px;
  width: 25px;
  height: 25px;
  background: #fff;
  border-radius: 25px;
  transition: 0.3s;
}

.srs-toggle:checked + label {
  background: blue;
}

.srs-toggle:checked + label:after {
  left: calc(100%);
  transform: translateX(-100%);
}

.srs-label:active:after {
  width: 20px;
}
.select-box {
  color: #2a52be;
  border: 2px solid #2a52be;
  width: 100%;
  max-width: 350px;
  word-wrap: break-word;
  text-transform: capitalize;
}
</style>
