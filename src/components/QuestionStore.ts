import { MCQProps } from "@/types/MCQ";
import { questions } from "@data/question-data.json";

export const getQuestions = () => {
  return questions as MCQProps[];
};

export const setQuestions = (questionAmount: number, tag?: string) => {
  let quizQuestions = getQuestions();
  if (tag)
    quizQuestions = quizQuestions
      .filter((question) => question.tags && question.tags.includes(tag))
      .slice(0, questionAmount);
  else quizQuestions = quizQuestions.slice(0, questionAmount);

  return quizQuestions as MCQProps[];
};
