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
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, count);
};

export function getUniquePropertyValues(tagProps: Tags[]) {
  // populate unique values of the given tags
  const uniqueTags = tagProps.reduce(
    (acc: Record<string, Set<string>>, item) => {
      Object.keys(item).forEach((key) => {
        if (!acc[key]) {
          acc[key] = new Set<string>();
        }
        acc[key].add(item[key]);
      });
      return acc;
    },
    {},
  );

  const result = Object.keys(uniqueTags).reduce(
    (acc: Record<string, string[]>, key) => {
      acc[key] = [...uniqueTags[key]];
      return acc;
    },
    {},
  );
  console.log("Unique tags", result);
  return result;
}

export function filterQuestionsByTags(
  questions: MCQuestion[],
  selectedTags: SelectedTags,
): MCQuestion[] {
  return questions.filter((question: MCQuestion) => {
    return Object.keys(selectedTags).every((key) => {
      return (
        !selectedTags[key].length ||
        selectedTags[key].includes(question.tags[key])
      );
    });
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
