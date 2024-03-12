export const questions = [
  {
    title: "The question 0",
    tags: ["tag1"],
    options: [
      { text: "Answer A Q0" },
      { text: "Answer B Q0", correct: true },
      { text: "Answer C Q0" },
    ],
  },
];

export const mockRetrieveAllQuestions = () => {
  return questions;
};
