interface ErrorResponse {
  status: number;
  error: string;
}

const handleResponse = async (response: Response): Promise<any> => {
  try {
    if (response.ok) {
      const contentType = response.headers.get("content-type");
      const status = response.status;
      if (contentType && contentType.includes("application/json")) {
        const json = await response.json();
        return { json, status };
      } else {
        return { status }; // Return status code if no JSON data is present
      }
    } else {
      const errorData: ErrorResponse = await response.json();
      const error = {
        status: response.status,
        message: errorData.error || "An error occurred",
      };
      throw error;
    }
  } catch (error) {
    console.error("Error processing response:", error);
    throw error;
  }
};

export async function fetchJson(
  url: string,
  options: RequestInit = {},
  customHeaders: Record<string, string> = {},
  type: string
) {
  let API_URL = "";
  switch (type) {
    case "api1":
      API_URL = "http://localhost:3001";
      break;
    case "api2":
      API_URL = "http://localhost:3000";
      break;
  }

  try {
    const response = await fetch(API_URL + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...customHeaders,
      },
      ...options,
    });
    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
}
