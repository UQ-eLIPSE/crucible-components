import { MCQuestion } from "@/types/MCQ";
import { questions } from "@data/question-data.json";

export const retrieveAllQuestions = () => {
  return questions as MCQuestion[];
};

export const retrieveNumberOfQuestionsFilteredByTags = (
  count: number,
  tags?: string[],
) => {
  const allQuestions = retrieveAllQuestions();
  const quizQuestions = tags
    ? allQuestions
        .filter(
          (question) =>
            question.tags && tags.some((tag) => question.tags?.includes(tag)),
        )
        .slice(0, count)
    : allQuestions.slice(0, count);

  return quizQuestions as MCQuestion[];
};
