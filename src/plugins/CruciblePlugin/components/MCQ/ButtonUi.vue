<template>
  <div>
    <button class="mcq-button" @click="handleClick(buttonFuc.toString())">
      {{ buttonName }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { buttonFuc, buttonName } = defineProps<{
  buttonFuc: string;
  buttonName: string;
}>();
const emit = defineEmits([
  "nextQuestion",
  "prevQuestion",
  "submit",
  "save",
  "timedNextQuestion",
  "skipQuestion",
]);

const handleClick = (buttonFuc: string) => {
  // const emit = defineEmits([buttonFuc as string]);
  if (
    [
      "nextQuestion",
      "prevQuestion",
      "submit",
      "save",
      "timedNextQuestion",
      "skipQuestion",
    ].includes(buttonFuc)
  ) {
    emit(
      buttonFuc as
        | "nextQuestion"
        | "prevQuestion"
        | "submit"
        | "save"
        | "timedNextQuestion"
        | "skipQuestion",
    );
  }
};
</script>

<style scoped>
.mcq-button {
  color: #ffffff;
  background-color: #7f7f7f;
  border-color: #c3e6cb;
  cursor: pointer;
  font-size: 24px;
  padding: 2px 10px;
}
.mcq-button:disabled {
  opacity: 50%;
  cursor: default;
}

.submit {
  background-color: #7f7f7f;
}
.next {
  background-color: #2a52be;
}
.skip {
  background-color: #569821;
}
</style>
