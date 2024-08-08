import { sortedQuestions } from "@/utils/SrsSort";
import { MCQuestion, QuestionState, SelectedTags, Tags } from "../types/MCQ";

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
  const srsQuestions = sortedQuestions(questions);
  const shuffled = shuffleArray(srsQuestions.slice(0, count));
  return shuffled;
};
// this is the function to generate Taxonomies
export function getUniquePropertyValues(tagProps: Tags[]) {
  const uniqueTags = tagProps.reduce(
    (acc: Record<string, Set<string>>, item) => {
      Object.keys(item).forEach((key) => {
        // during generate taxonomies, exclude empty strings
        if (key.trim() !== "") {
          if (!acc[key]) {
            acc[key] = new Set<string>();
          }
          const value = item[key];
          value.forEach((val) => acc[key].add(val));
        }
      });
      return acc;
    },
    {} as Record<string, Set<string>>,
  );

  // Convert Sets to arrays and populate the result object
  const result = Object.keys(uniqueTags).reduce(
    (acc: Record<string, string[]>, key) => {
      acc[key] = [...uniqueTags[key]];
      return acc;
    },
    {},
  );
  return result;
}

export function filterQuestionsByTags(
  questions: MCQuestion[],
  selectedTags: SelectedTags,
): MCQuestion[] {
  return questions.filter((question: MCQuestion) => {
    return Object.keys(selectedTags).every((key) => {
      if (!selectedTags[key].length) {
        return true;
      }
      const questionTag = question.tags[key];
      if (questionTag) {
        return questionTag.some((tag) => selectedTags[key].includes(tag));
      }
    });
  });
}

export function filterQuestionsBySingleTopic(
  questions: MCQuestion[],
  topic: string,
  category: string,
): MCQuestion[] {
  return questions.filter((question: MCQuestion) => {
    const questionTags = question.tags[category];
    return questionTags && questionTags.includes(topic);
  });
}

export function findSelectedOptionValue(
  quizStats: QuestionState[],
  questionIndex: number,
  answer: string,
): number | undefined {
  const optionsList = quizStats[questionIndex].question.optionsList;
  for (let i = 0; i < optionsList.length; i++) {
    if (optionsList[i].optionValue === answer) {
      return i; // This returns the index if the answer matches
    }
  }
  return undefined; // Return undefined if no match is found
}
