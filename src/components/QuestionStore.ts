import { getAllQuestions } from "./DataAccessLayer";

export const getQuestionsByTagAndLimit = (count: number) => {
  const allQuestions = getAllQuestions();
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
