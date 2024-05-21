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
          if (Array.isArray(value)) {
            // If is an array ad each element to the set
            value.forEach((val) => acc[key].add(val));
          } else {
            // If it is an string just add it to the set
            acc[key].add(value);
          }
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
  console.log(result);
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
      // Check if questionTag is an array or a single string
      if (Array.isArray(questionTag)) {
        // Return true if any tag in the question's tag array is equal to any tag in the selected tags
        return questionTag.some((tag) => selectedTags[key].includes(tag));
      } else {
        // Return true if the a question tag matches any tag in the selected tags
        return selectedTags[key].includes(questionTag);
      }
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
