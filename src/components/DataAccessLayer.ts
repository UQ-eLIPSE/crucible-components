import { MCQuestion } from "@/types/MCQ";
import { generateDummyData } from "../../data/dummyQuestionData";
import NetworkCalls from "@/utils/NetworkCalls";
import UtilConversion from "@/utils/UtilConversion";
import { newQuestions } from "../../data/question-data-backend-sample.json";
import NetworkGuard from "@/utils/NetworkGuard";

export const getAllQuestions = () => {
  const questions = newQuestions;
  if (NetworkGuard.isMCQuestionArray(questions)) {
    return UtilConversion.convertQuestions(questions);
  }

  return UtilConversion.convertQuestions(newQuestions);
  // TODO: Replace this with passed in parent component data
  // return questions as MCQuestion[];
};

export const getDummyQuestions = (random = false) => {
  return generateDummyData(random);
};

export function getQuestionsBasedOnEnv() {
  // TODO: A lot of components are depending on this static data. They need to be refactored to take in async
  return getAllQuestions();
}

export const getAllQuestionsFromApi = async (): Promise<MCQuestion[]> => {
  const allQuizzes = await NetworkCalls.getQuiz();
  return UtilConversion.convertQuestions(allQuizzes);
};
