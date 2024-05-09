import { MCQuestion } from "@/types/MCQ";
import { generateDummyData } from "../../data/dummyQuestionData";
import NetworkCalls from "@/utils/NetworkCalls";
import UtilConversion from "@/utils/UtilConversion";
import { questions } from "@/components/question-data";
import { DataMCQuestion } from "@/types/DataMCQ";

// TODO: ADD TYPEGUARDS VALIDATION
export const getAllQuestions = (apiData: DataMCQuestion[]) => {
  try {
    if (!apiData) {
      throw new Error("No question data found. Please Try again later.");
    }
    return UtilConversion.convertQuestions(apiData);
  } catch (err) {
    alert(err);
    return [];
  }
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
