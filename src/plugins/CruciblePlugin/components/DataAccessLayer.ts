import { MCQuestion } from "@/plugins/CruciblePlugin/types/MCQ";
import { questions } from "../question-data.json";
import { generateDummyData } from "../../../../data/dummyQuestionData";

export const getAllQuestions = () => {
  return questions as MCQuestion[];
};

export const getDummyQuestions = (random = false) => {
  return generateDummyData(random);
};

export function getQuestionsBasedOnEnv() {
  const useDummyData = import.meta.env.VITE_USE_DUMMY_DATA === "true";

  return useDummyData ? getDummyQuestions(false) : getAllQuestions();
}
