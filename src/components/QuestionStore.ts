import { MCQuestion, SelectedTags, tags } from "@/types/MCQ";
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

export const getQuestionsRandomly = (
  count: number,
  questions: MCQuestion[],
) => {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, count);
};

export function getUniquePropertyValues(tagProps: tags[]) {
  const uniqueValues = {
    course: new Set<string>(),
    subject: new Set<string>(),
    system: new Set<string>(),
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

export function filterQuestionsByTags(
  questions: MCQuestion[],
  selectedTags: SelectedTags,
): MCQuestion[] {
  return questions.filter((question) => {
    return (
      (selectedTags.course.length === 0 ||
        selectedTags.course.includes(question.tags.course)) &&
      (selectedTags.subject.length === 0 ||
        selectedTags.subject.includes(question.tags.subject)) &&
      (selectedTags.system.length === 0 ||
        selectedTags.system.includes(question.tags.system))
    );
  });
}
