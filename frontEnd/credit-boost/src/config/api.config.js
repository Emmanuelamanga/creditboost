const API_URL = import.meta.env.VITE_DEV_URL || "http://localhost:3000/api";

const TOKEN_KEY = "auth_token";

export const apiConfig = {
  baseURL: API_URL,
  getHeaders: (requireAuth = true) => {
    const headers = {
      "Content-Type": "application/json",
    };

    if (requireAuth) {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  },
};

if (import.meta.env.DEV) {
  console.log("API Configuration:", {
    baseURL: API_URL,
    environment: import.meta.env.MODE,
    allEnvVars: import.meta.env,
  });
}

export const getApiUrl = (endpoint) => `${API_URL}${endpoint}`;
