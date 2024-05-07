// The purpose of this file is to convert backend data to the frontend data format.
import { DataMCQuestion, DataTags } from "@/types/DataMCQ";
import { MCQuestion, Tags } from "@/types/MCQ";

// TODO: ADD VALIDATION
const convertTags = (tagsData: DataTags): Tags => {
  return tagsData.reduce((acc: Tags, tag: string) => {
    if (!tag.includes(":")) return acc;
    const [key, value] = tag.split(":");
    acc[key] = value.trim();
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
