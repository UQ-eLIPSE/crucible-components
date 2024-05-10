import { MCQuestion } from "@/types/MCQ";
import UtilConversion from "@/utils/UtilConversion";
import { pluginQuestions as questions } from "@/components/question-data";
import { DataMCQuestion } from "@/types/DataMCQ";
import NetworkGuard, { InvalidDataQsLogs } from "@/utils/NetworkGuard";

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

export const getStaticRawData = (): DataMCQuestion[] => {
  return questions;
};

export const getConvertedStaticData = (): MCQuestion[] => {
  // Validate questions
  const allDataQs: DataMCQuestion[] = getStaticRawData();
  return UtilConversion.convertQuestions(validateMCQuestions(allDataQs));
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

  const initialStats: InvalidDataQsLogs = {
    invalidTags: 0,
    noTags: 0,
    invalidQs: 0,
    totalTags: 0,
  };

  const stats = (allDataQs as DataMCQuestion[]).reduce((acc, dataQs) => {
    // Check question structure
    if (!NetworkGuard.isMCQuestion(dataQs)) {
      return { ...acc, invalidQs: acc.invalidQs + 1 };
    }

    let { tags } = dataQs;

    if (!tags || (Array.isArray(tags) && !tags.length)) {
      return { ...acc, noTags: acc.noTags + 1 };
    }

    const totalTags = acc.totalTags + tags.length;

    if (!NetworkGuard.isAllTags(tags)) {
      const validTags = tags.filter((tag) => NetworkGuard.isTag(tag));
      const invalidTags = acc.invalidTags + tags.length - validTags.length;
      tags = validTags; // remove all invalid tags
      return { ...acc, invalidTags, totalTags };
    }

    return { ...acc, totalTags };
  }, initialStats);

  logQsWarnings(stats, allDataQs.length);

  return allDataQs;
}

// condition will be > 0 (truthy) if there are invalid stats
function logWarning(condition: number, message: string) {
  condition && console.warn(message, "color: #FF0000"); // red text color
}

function logQsWarnings(stats: InvalidDataQsLogs, allQsLength: number): void {
  const { invalidQs, invalidTags, noTags, totalTags } = stats;
  logWarning(
    invalidQs,
    `Invalid Questions Received: %c${invalidQs} out of ${allQsLength}`,
  );
  logWarning(
    invalidTags,
    `Filtering out invalid tags: %c${invalidTags} out of ${totalTags}`,
  );
  logWarning(noTags, `Questions with no tags: %c${noTags}`);
}
