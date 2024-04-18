<template>
  <div>
    <button class="mcq-button" @click="handleButtonClick()">
      {{ buttonName }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { buttonName } = defineProps<{ buttonName: String }>();

const emit = defineEmits(["nextQuestion", "prevQuestion"]);

const handleButtonClick = () => {
  if (buttonName === "next question") {
    modifyButtonAndEmit("nextQuestion");
  } else {
    console.log("prev question");
    modifyButtonAndEmit("prevQuestion");
  }
};

const modifyButtonAndEmit = (event: "nextQuestion" | "prevQuestion") => {
  console.log("emit", event);
  emit(event);
};
</script>

<style scoped>
.mcq-button {
  color: #ffffff;
  background-color: #7f7f7f;
  border-color: #c3e6cb;
  cursor: pointer;
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
