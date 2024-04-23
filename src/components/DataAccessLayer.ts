import { MCQuestion } from "@/types/MCQ";
import { questions } from "@data/question-data.json";
import { generateDummyData } from "../../data/dummyQuestionData";
import NetworkCalls from "@/utils/NetworkCalls";

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

export const getAllQuestionsFromApi = async () => {
  return await NetworkCalls.getQuiz();
};
