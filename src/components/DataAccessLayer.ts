import { MCQuestion } from "@/types/MCQ";
import { generateDummyData } from "../../data/dummyQuestionData";
import NetworkCalls from "@/utils/NetworkCalls";
import UtilConversion from "@/utils/UtilConversion";
import { newQuestions } from "../../data/question-data-backend-sample.json";
import NetworkGuard from "@/utils/NetworkGuard";
import { DataMCQuestion } from "@/types/DataMCQ";

export const getAllQuestions = () => {
  const questions = newQuestions;
  if (NetworkGuard.isMCQuestionArray(questions)) {
    return UtilConversion.convertQuestions(questions);
  }

  if (!Array.isArray(questions) || !newQuestions.length) {
    throw new Error("No questions found in the data");
  }
  const validQuestions: DataMCQuestion[] = newQuestions.filter(
    NetworkGuard.isMCQuestion,
  );

  console.warn(
    `Some questions' structures are not correct. Proceeding with using 
    ${validQuestions.length} questions out of 
    ${(questions as DataMCQuestion[]).length} questions`,
  );

  return UtilConversion.convertQuestions(newQuestions);
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

  if (NetworkGuard.isMCQuestionArray(allQuizzes)) {
    return UtilConversion.convertQuestions(allQuizzes);
  }

  if (!Array.isArray(allQuizzes) || !allQuizzes.length) {
    throw new Error("No questions found in the data");
  }
  const validQuestions: DataMCQuestion[] = newQuestions.filter(
    NetworkGuard.isMCQuestion,
  );

  console.warn(
    `Some questions' structures are not correct. Proceeding with using 
    ${validQuestions.length} questions out of 
    ${(allQuizzes as DataMCQuestion[]).length} questions`,
  );

  return UtilConversion.convertQuestions(allQuizzes);
};
