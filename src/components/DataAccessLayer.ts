import { MCQuestion } from "@/types/MCQ";
import { generateDummyData } from "../../data/dummyQuestionData";
import NetworkCalls from "@/utils/NetworkCalls";
import UtilConversion from "@/utils/UtilConversion";
import { questions } from "@/components/question-data";
import { DataMCQuestion } from "@/types/DataMCQ";

// TODO: ADD TYPEGUARDS VALIDATION
export const getAllQuestions = (apiData: DataMCQuestion[]) => {
  return UtilConversion.convertQuestions(apiData);
  // return UtilConversion.convertQuestions(newQuestions);
};

export const getDummyQuestions = (random = false) => {
  return generateDummyData(random);
};

export const getStaticRawData = (): DataMCQuestion[] => {
  return questions;
};

export const getConvertedStaticData = (): MCQuestion[] => {
  return UtilConversion.convertQuestions(questions);
};

export const getAllQuestionsFromApi = async (): Promise<MCQuestion[]> => {
  const allQuizzes = await NetworkCalls.getQuiz();
  return UtilConversion.convertQuestions(allQuizzes);
};
