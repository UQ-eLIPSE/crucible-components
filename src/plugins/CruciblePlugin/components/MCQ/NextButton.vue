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

<style>
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
