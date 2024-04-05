import { MCQuestion, tags } from "@/types/MCQ";
import { getAllQuestions } from "./DataAccessLayer";

/**
 * shuffleArray - Shuffles the array using Fisher-Yates algorithm
 * @param array
 * @returns shuffled array
 */
export const shuffleArray = (array: MCQuestion[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getQuestionsRandomly = (count: number) => {
  const allQuestions = getAllQuestions();
  const shuffled = shuffleArray(allQuestions);
  return shuffled.slice(0, count);
};

export function getUniquePropertyValues(tagProps: tags[]) {
  const uniqueValues = {
    course: new Set(),
    subject: new Set(),
    system: new Set(),
  };

  for (const item of tagProps) {
    uniqueValues.course.add(item.course);
    uniqueValues.subject.add(item.subject);
    uniqueValues.system.add(item.system);
  }

  return {
    course: [...uniqueValues.course],
    subject: [...uniqueValues.subject],
    system: [...uniqueValues.system],
  };
}
