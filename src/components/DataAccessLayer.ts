import { MCQuestion } from "@/types/MCQ";
import { questions } from "@data/question-data.json";
import { generateDummyData } from "../../data/dummyQuestionData";
import NetworkCalls from "@/utils/NetworkCalls";
import NetworkGuard from "@/utils/NetworkGuard";

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
  const allQuizzes = await NetworkCalls.getQuiz();
  const originalLength = allQuizzes.length;

  if (NetworkGuard.isMCQuestionArray(allQuizzes)) return allQuizzes;

  console.error(
    "Invalid quiz data received from the server. Retrieved questions: ",
    originalLength,
  );

  const totalQuestions: MCQuestion[] = allQuizzes.filter(
    NetworkGuard.isMCQuestion,
  );

  console.info("Valid questions filtered: ", totalQuestions.length);

  return totalQuestions;
};
