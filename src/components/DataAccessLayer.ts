import { MCQuestion } from "@/types/MCQ";
import { generateDummyData } from "../../data/dummyQuestionData";
import NetworkCalls from "@/utils/NetworkCalls";
import UtilConversion from "@/utils/UtilConversion";
import { newQuestions } from "../../data/question-data-backend-sample.json";

// TODO: ADD TYPEGUARDS VALIDATION
export const getAllQuestions = () => {
  return UtilConversion.convertQuestions(newQuestions);
  // TODO: Replace this with passed in parent component data
  // return questions as MCQuestion[];
};

export const getDummyQuestions = (random = false) => {
  return generateDummyData(random);
};

export function getQuestionsBasedOnEnv() {
  return getAllQuestions();
}

export const getAllQuestionsFromApi = async (): Promise<MCQuestion[]> => {
  const allQuizzes = await NetworkCalls.getQuiz();
  return UtilConversion.convertQuestions(allQuizzes);
};
