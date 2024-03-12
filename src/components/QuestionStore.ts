import { MCQuestion } from "@/types/MCQ";
import { getAllQuestions } from "./DataAccessLayer";

export const getQuestionsByTagAndLimit = (count: number, tags?: string[]) => {
  const allQuestions = getAllQuestions();
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
