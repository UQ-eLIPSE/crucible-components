import { MCQuestion } from "@/types/MCQ";
import NetworkGuard from "./NetworkGuard";

const window_api_url = import.meta.env.VITE_USE_API_URL;

/**
 * Wrapper function for fetch that includes credentials: 'include' in the options
 */
export async function fetchWithCredentials(
  url: string,
  options?: RequestInit,
): Promise<Response> {
  // Set default options, including credentials: 'include'
  const defaultOptions: RequestInit = {
    ...options,
    credentials: "include",
  };

  // Call the actual fetch function with the modified options
  return fetch(url, defaultOptions);
}

const getQuiz = async (): Promise<MCQuestion[]> => {
  try {
    const resRaw = await fetchWithCredentials(
      window_api_url + `/api/resource/getQuiz`,
    );

    const res = await resRaw.json();

    if (NetworkGuard.isMCQuestionArray(res.questions))
      return res.questions as MCQuestion[];

    console.error(
      "Invalid quiz data received from the server. Retrieved questions: ",
      res.questions.length,
    );
    const totalQuestions = res.questions.filter(NetworkGuard.isMCQuestion);

    console.info("Valid questions filtered: ", totalQuestions.length);

    return totalQuestions as MCQuestion[];
  } catch (err) {
    console.error("An error occurred while fetching the quiz: ", err);
    return [];
  }
};

export default { getQuiz };
