export type UpdateQAttemptCallbackType = (
  questionId: string,
  isCorrect: boolean,
) => Promise<void>;
