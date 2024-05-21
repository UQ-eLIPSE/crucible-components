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
      acc[key] = [...acc[key], value];
    } else {
      acc[key] = [value];
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
