import { MCQProps } from "@/types/MCQ";
import { questions } from "@data/question-data.json";

export const getQuestions = () => {
  return questions as MCQProps[];
};

export const setQuestions = (questionAmount: number, tags?: string[]) => {
  const allQuestions = getQuestions();
  const quizQuestions = Array.isArray(tags)
    ? allQuestions
        .filter(
          (question) =>
            question.tags && tags.some((tag) => question.tags?.includes(tag)),
        )
        .slice(0, questionAmount)
    : allQuestions.slice(0, questionAmount);

  return quizQuestions as MCQProps[];
};
