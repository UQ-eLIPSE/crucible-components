import { MCQuestion } from "@/types/MCQ";
import { generateDummyData } from "../../data/dummyQuestionData";
import NetworkCalls from "@/utils/NetworkCalls";
import NetworkGuard from "@/utils/NetworkGuard";
import UtilConversion from "@/utils/UtilConversion";
import { newQuestions } from "../../data/question-data-backend-sample.json";

export const getAllQuestions = () => {
  return UtilConversion.convertQuestions(newQuestions);
  // return questions as MCQuestion[];
};

export const getDummyQuestions = (random = false) => {
  return generateDummyData(random);
};

export function getQuestionsBasedOnEnv() {
  return getAllQuestions();
}

export const getAllQuestionsFromApi = async () => {
  const allQuizzes = await NetworkCalls.getQuiz();
  const originalLength = allQuizzes.length;

  if (NetworkGuard.isMCQuestionArray(allQuizzes)) return allQuizzes;

  const totalQuestions: MCQuestion[] = allQuizzes.filter(
    NetworkGuard.isMCQuestion,
  );

  console.warn(
    "Invalid quiz data received from the server. Retrieved questions: ",
    originalLength,
    "\nContinuing with valid questions only:",
    totalQuestions.length,
    `\n${originalLength - totalQuestions.length}`,
    "questions needs checking",
  );

  return totalQuestions;
};
