import { MCQuestion } from "@/types/MCQ";
import { fsrs, generatorParameters, Rating, State } from "ts-fsrs";

// Define a list of questions with initial review times

interface Card {
  id: string;
  last_review: Date;
  due: Date;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  reps: number; // Number of repetitions
  lapses: number; // Number of lapses
  state: State; // State of the card (e.g., 'active', 'suspended')
}

// Initialize the FSRS parameters
const params = generatorParameters({ enable_fuzz: true });
const f = fsrs(params);
// Function to transform a Question to CardInput
const transformToCard = (card: MCQuestion): Card => ({
  id: card._id.$oid,
  last_review: card.lastAttempted as Date,
  due: new Date(), // Default due date; you may adjust based on your logic
  stability: 1.0, // initial value
  difficulty: 2.5, // initial value
  elapsed_days: Math.floor(
    (new Date().getTime() - new Date(card.lastAttempted).getTime()) /
      (1000 * 60 * 60 * 24), // convert minisecond to days
  ),
  scheduled_days: 1, // Example initial value
  reps: 0, // Number of repetitions so far
  lapses: 0, // Number of lapses so far
  state: card.correctAttempts === 0 ? 0 : 1, // correctAttempts
});
// Function to update card status and determine next review
function updateCard(card: MCQuestion) {
  const now = new Date();
  const cardInput = transformToCard(card);
  const scheduling_cards = f.repeat(cardInput, now);

  const rating =
    card.correctAttempts / (card.attempts + 0.1) > 0.5
      ? Rating.Good
      : Rating.Again; // Simplified rating logic
  const { card: updatedCard } = scheduling_cards[rating];

  return {
    ...updatedCard,
    reviewDue: updatedCard.due,
  };
}

// Example: Update questions based on user performance

export const updatedQuestions = (questions: MCQuestion[]) =>
  questions.map((question) => {
    const updatedCard = updateCard(question);
    return {
      ...question,
      reviewDue: updatedCard.reviewDue,
    };
  });

// Sort questions based on the next review date
export const sortedQuestions = (questions: MCQuestion[]) => {
  return updatedQuestions(questions).sort(
    (curr, next) => curr.reviewDue.getTime() - next.reviewDue.getTime(),
  );
};
