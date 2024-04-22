import { describe, it, expect, beforeEach } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useQuizStore } from "@/plugins/CruciblePlugin/store/QuizStore";
import { questionsData } from "../testSeeds";

setActivePinia(createPinia());
const quizStore = useQuizStore();

describe("QuizStore", () => {
  beforeEach(async () => {
    quizStore.initialiseQuiz(questionsData, "Timed");
  });

  it(`should return the second question in questionData, 
  if I called method removeFromLastHistory() after calling
   method dequeueQuestion 3 times from quizStore`, () => {
    const previousQuestion = quizStore.questionsQueue[1];
    const currentQuestion = quizStore.questionsQueue[2];
    for (let i = 0; i < 2; i++) {
      quizStore.dequeueQuestion();
    }
    const currResult = quizStore.dequeueQuestion();
    expect(currResult).toBe(currentQuestion);
    const result = quizStore.removeFromLastHistory();
    expect(result).toBe(previousQuestion);
    expect(result).not.toBe(currentQuestion);
  });

  it(`should return undefined value when I call prev questions, in case:
   I only called dequeueQestion 1 time`, () => {
    for (let i = 0; i < 3; i++) {
      quizStore.removeFromLastHistory();
    }
    const result = quizStore.removeFromLastHistory();
    expect(result).toBe(undefined);
  });
});
