import { MCQuestion } from "@/types/MCQ";
import { questions } from "@data/question-data.json";

export const retrieveAllQuestions = () => {
  return questions as MCQuestion[];
};
