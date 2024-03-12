import { MCQuestion } from "@/types/MCQ";
import { questions } from "@data/question-data.json";

export const getAllQuestions = () => {
  return questions as MCQuestion[];
};
