import { MCQuestion } from "@/plugins/CruciblePlugin/types/MCQ";
import { generateDummyData } from "../../../../data/dummyQuestionData";

const questions = [
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse",
    },
    statement:
      "Which of the following is NOT a contributing factor to the performance capacity of horses?",
    optionsList: [
      {
        optionValue: "Upper airway function",
        optionCorrect: false,
      },
      {
        optionValue:
          "Increase in oxygen carrying capacity of blood due to splenic contraction",
        optionCorrect: false,
      },
      {
        optionValue: "Increase in maximum heart rate in response to training",
        optionCorrect: true,
      },
      {
        optionValue:
          "Enhanced oxidative enzymatic activity in response to training",
        optionCorrect: false,
      },
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87033",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290792c64c71f1df2110ece",
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse",
    },
    statement:
      "Which of the following is NOT a muscular adaptation to training?",
    optionsList: [
      {
        optionValue: "Increase in muscle capillary density",
        optionCorrect: false,
      },
      {
        optionValue: "Increased density of mitochondria",
        optionCorrect: false,
      },
      {
        optionValue: "Enhanced oxidative enzymatic activity",
        optionCorrect: false,
      },
      {
        optionValue: "Decreased size of mitochondria",
        optionCorrect: true,
      },
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87036",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290792c64c71f1df2110ece",
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse",
    },
    statement:
      "Which of the following best describes in order from greatest to least, the aerobic contribution to overall energy production of these equine performance disciplines?",
    optionsList: [
      {
        optionValue: "Endurance &gt; Thoroughbred racing &gt; Barrel racing",
        optionCorrect: true,
      },
      {
        optionValue: "Barrel racing &gt; Thoroughbred racing &gt; Endurance",
        optionCorrect: false,
      },
      {
        optionValue: "Thoroughbred racing &gt; Barrel racing &gt; Endurance",
        optionCorrect: false,
      },
      {
        optionValue: "Endurance &gt; Barrel racing &gt; Thoroughbred racing",
        optionCorrect: false,
      },
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87035",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290792c64c71f1df2110ece",
  },
  {
    tags: {
      course: "VETS2011",
      subject: "Physiology",
      system: "Exercise",
      animal: "Horse",
    },
    statement:
      "Which of the following does NOT cause a low arterial partial pressure of oxygen?",
    optionsList: [
      {
        optionValue: "Hypoventilation",
        optionCorrect: false,
      },
      {
        optionValue: "V/Q mismatch",
        optionCorrect: false,
      },
      {
        optionValue: "Right-to-left shunt",
        optionCorrect: false,
      },
      {
        optionValue: "Decreased cardiac output",
        optionCorrect: true,
      },
    ],
    _id: {
      $oid: "6539c0beeb2b18699ed87034",
    },
    label: "Placeholder label 1",
    link: "https://vetshub.uqcloud.net/resource/5a0ba18d34cc363763e05e99/61a9ae14e04e3d5bffb26ef7/6290636464c71f1df2110ec9/6290792c64c71f1df2110ece",
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
