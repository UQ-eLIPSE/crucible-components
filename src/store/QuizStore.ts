import { MCQuestion } from '@/types/MCQ';
import { defineStore } from 'pinia'

export const useQuestionsQueueStore = defineStore('questionsQueue', {
  state: () => {
    return { questionsQueue: [] as MCQuestion[] }
  },
  actions: {
    initialiseQueue(questions: MCQuestion[]) {
        this.questionsQueue = questions;
    },
    enqueueQuestion(question: MCQuestion) {
        this.questionsQueue.push(question);
    },
    dequeueQuestion() {
        return this.questionsQueue.shift();
    }
  },
});