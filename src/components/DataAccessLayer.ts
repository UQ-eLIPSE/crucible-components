import { MCQuestion } from "@/types/MCQ";
import { questions } from "@data/question-data.json";
import { generateDummyData } from "../../data/dummyQuestionData";

export const getAllQuestions = () => {
  return questions as MCQuestion[];
};

export const getDummyQuestions = (random = false) => {
  return generateDummyData(random);
};
