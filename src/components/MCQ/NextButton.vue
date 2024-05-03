<template>
  <div>
    <button :class="buttonClass" @click="handleButtonClick()">
      {{ buttonName }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const { buttonName } = defineProps<{ buttonName: String }>();

const emit = defineEmits(["nextQuestion", "prevQuestion"]);

const handleButtonClick = () => {
  if (buttonName !== "\u2190") {
    modifyButtonAndEmit("nextQuestion");
  } else {
    modifyButtonAndEmit("prevQuestion");
  }
};

const modifyButtonAndEmit = (event: "nextQuestion" | "prevQuestion") => {
  emit(event);
};

const buttonClass = computed(() => ({
  "mcq-button": true,
  submit_btn: buttonName === "Submit",
  next: buttonName == "\u2192",
  prev: buttonName == "\u2190",
}));
</script>

<style scoped>
.mcq-button {
  color: #ffffff;
  border-color: #c3e6cb;
  cursor: pointer;
  background-color: #2a52be;
  font-size: 24px;
  padding: 2px 10px;
}
.mcq-button:disabled {
  opacity: 50%;
  cursor: default;
}
.submit_btn {
  background-color: #569821;
}
.next {
  background-color: #2a52be;
}
.prev {
  background-color: #2a52be;
}
</style>
