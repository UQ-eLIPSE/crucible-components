<template>
  <div>
    <button
      :class="buttonName === 'Submit' ? 'submit_btn' : 'mcq-button'"
      @click="handleButtonClick()"
    >
      {{ buttonName }}
    </button>
  </div>
</template>

<script setup lang="ts">
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
  color: #ffffff;
  border-color: #c3e6cb;
  cursor: pointer;
  background-color: #569821;
  font-size: 24px;
  padding: 2px 10px;
}
</style>
