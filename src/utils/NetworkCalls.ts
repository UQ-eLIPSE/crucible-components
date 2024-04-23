export interface apiResponse {
  success: boolean;
  payload: any;
  message: string;
}

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

export default class NetworkCalls {
  private static window_api_url = import.meta.env.VITE_USE_API_URL;

  public static async getQuiz() {
    const resRaw = await fetchWithCredentials(
      this.window_api_url + `/api/resource/getQuiz`,
    );

    const res: apiResponse = await resRaw.json();

    if (!res.success) {
      throw new Error(res.message);
    }

    return res.payload;
  }
}
