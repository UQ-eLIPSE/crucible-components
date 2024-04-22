import { MCQuestion } from "@/plugins/CruciblePlugin/types/MCQ";

import { generateDummyData } from "../../../../data/dummyQuestionData";

const questions: MCQuestion[] = [
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System",
      animal: "",
    },
    statement:
      "<p>Which of the following statements regarding action potentials is TRUE?</p>",
    optionsList: [
      {
        optionValue:
          "<p>Multiple depolarising events minimises the chance of action potential generation</p>",
        optionCorrect: false,
      },
      {
        optionValue:
          "<p>Reaching the subthreshold level does not stimulate the post-synaptic membrane</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Threshold event generates an action potential</p>",
        optionCorrect: true,
      },
      {
        optionValue:
          "<p>Reaching the subthreshold level is enough to generate an action potential</p>",
        optionCorrect: false,
      },
      {
        optionValue:
          "<p>Depolarised synaptic membrane is more negative than the hyperpolarised membrane</p>",
        optionCorrect: false,
      },
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0b",
    },

    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Nervous System",
      animal: "horse",
    },
    statement:
      "<p>Which of the following statements regarding action potentials is TRUE?</p>",
    optionsList: [
      {
        optionValue:
          "<p>Multiple depolarising events minimises the chance of action potential generation</p>",
        optionCorrect: false,
      },
      {
        optionValue:
          "<p>Reaching the subthreshold level does not stimulate the post-synaptic membrane</p>",
        optionCorrect: false,
      },
      {
        optionValue: "<p>Threshold event generates an action potential</p>",
        optionCorrect: true,
      },
      {
        optionValue:
          "<p>Reaching the subthreshold level is enough to generate an action potential</p>",
        optionCorrect: false,
      },
      {
        optionValue:
          "<p>Depolarised synaptic membrane is more negative than the hyperpolarised membrane</p>",
        optionCorrect: false,
      },
    ],
    _id: {
      $oid: "6615c7fb49fbda0108a9ac0b",
    },

    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/62142eee64c71f1df2110cf5/62142f2764c71f1df2110cf7/6214407964c71f1df2110d03",
  },
];

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
