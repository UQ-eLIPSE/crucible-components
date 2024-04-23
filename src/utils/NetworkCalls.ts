import { MCQuestion } from "@/types/MCQ";

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

const getQuiz = async () => {
  try {
    const resRaw = await fetchWithCredentials(
      window_api_url + `/api/resource/getQuiz`,
    );

    const res = await resRaw.json();

    // TODO: add validation here
    return res.questions as MCQuestion[];
  } catch (err) {
    console.error("An error occurred while fetching the quiz: ", err);
    return [];
  }
};

export default { getQuiz };
