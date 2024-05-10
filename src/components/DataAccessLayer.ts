import { MCQuestion } from "@/types/MCQ";
import { generateDummyData } from "../../data/dummyQuestionData";
import NetworkCalls from "@/utils/NetworkCalls";
import UtilConversion from "@/utils/UtilConversion";
import { pluginQuestions as questions } from "@/components/question-data";
import { DataMCQuestion } from "@/types/DataMCQ";
import NetworkGuard from "@/utils/NetworkGuard";

// TODO: ADD TYPEGUARDS VALIDATION
export const getAllQuestions = (apiData: DataMCQuestion[]) => {
  try {
    if (!apiData) {
      throw new Error("No question data found. Please Try again later.");
    }
    return UtilConversion.convertQuestions(validateMCQuestions(apiData));
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
  // Validate questions
  const allDataQs: DataMCQuestion[] = getStaticRawData();
  return UtilConversion.convertQuestions(validateMCQuestions(allDataQs));
};

export const getAllQuestionsFromApi = async (): Promise<MCQuestion[]> => {
  const allQuizzes = await NetworkCalls.getQuiz();

  return UtilConversion.convertQuestions(allQuizzes);
};

// helpers functions with typeguards and console warns
// IMPORTANT: This function is also used to filter out invalid tags.
function validateMCQuestions(allDataQs: DataMCQuestion[]): DataMCQuestion[] {
  NetworkGuard.isMCQuestionArray(allDataQs)
    ? console.info(
        "%cAll questions are valid",
        "color: #00FF00",
        "\nTotal Questions Validated:",
        allDataQs.length,
      )
    : console.warn(
        "%cWARNING: Some questions contains invalid structure",
        "color: #FF0000",
      );

  let invalidTags = 0;
  let noTags = 0;
  let invalidQs = 0;
  let totalTags = 0;
  const allQsLength = allDataQs.length;

  for (const dataQs of allDataQs as DataMCQuestion[]) {
    // Check question structure
    if (!NetworkGuard.isMCQuestion(dataQs)) {
      invalidQs++;
    }

    let { tags } = dataQs;

    if (!tags || (Array.isArray(tags) && !tags.length)) {
      noTags++;
      continue;
    }

    totalTags += tags.length;

    if (!NetworkGuard.isAllTags(tags)) {
      const validTags = tags.filter((tag) => NetworkGuard.isTag(tag));
      invalidTags += tags.length - validTags.length;
      tags = validTags; // remove all invalid tags
    }
  }

  logQsWarnings(invalidQs, allQsLength, invalidTags, totalTags, noTags);

  return allDataQs;
}

function logQsWarnings(
  invalidQs: number,
  allQsLength: number,
  invalidTags: number,
  totalTags: number,
  noTags: number,
): void {
  invalidQs &&
    console.warn(
      `Invalid Questions Received: %c${invalidQs} out of ${allQsLength}`,
      "color: #FF0000",
    );

  invalidTags &&
    console.warn(
      `Filtering out invalid tags: %c${invalidTags} out of ${totalTags}`,
      "color: #FF0000",
    );

  noTags &&
    console.warn(`Questions with no tags: %c${noTags}`, "color: #FF0000");
}
