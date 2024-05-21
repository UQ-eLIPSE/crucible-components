// The purpose of this file is to convert backend data to the frontend data format.
import { DataMCQuestion, DataTags } from "@/types/DataMCQ";
import { MCQuestion, Tags } from "@/types/MCQ";

// This function is used to convert the tags values to the correct format.
const getCorrectTagValues = (value: string): string => {
  return value.trim().toLowerCase().replace("_", " ");
};

export const convertTags = (tagsData: DataTags): Tags => {
  return tagsData.reduce((acc: Tags, tag: string) => {
    if (!tag.includes(":")) return acc;
    let [key, value] = tag.split(":");
    [key, value] = [key.trim().toLowerCase(), getCorrectTagValues(value)];

    // Check if key exists
    if (acc[key]) {
      // If the key exist and it's not already an array, convert it to array
      if (typeof acc[key] === "string") {
        acc[key] = [acc[key] as string];
      }

      (acc[key] as string[]).push(value);
    } else {
      // If the key does not exist assign the value
      acc[key] = value;
    }
    return acc;
  }, {});
};

const convertQuestions = (dataQuestions: DataMCQuestion[]): MCQuestion[] => {
  return dataQuestions.map((question: DataMCQuestion) => {
    return {
      _id: { $oid: question._id.$oid },
      statement: question.statement,
      tags: convertTags(question.tags),
      optionsList: question.optionsList,
      link: question.link,
    };
  });
};

export default { convertQuestions };
