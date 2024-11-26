/* eslint-disable no-useless-catch */
import { apiConfig, getApiUrl } from "@/config/api.config";

const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";

export const authService = {
  login: async (email, password) => {
    try {
      const response = await fetch(getApiUrl("/auth/login"), {
        method: "POST",
        headers: apiConfig.getHeaders(false),
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");
      const data = await response.json();
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      return data;
    } catch (error) {
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await fetch(getApiUrl("/auth/me"), {
        headers: apiConfig.getHeaders(true),
      });
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data = await response.json();
      localStorage.setItem(USER_KEY, JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
      
      throw error;
    }
  },

  updateUserData: async (userData) => {
    try {
      const response = await fetch(getApiUrl("/auth/update"), {
        method: "PUT",
        headers: apiConfig.getHeaders(true),
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error("Failed to update user data");
      const data = await response.json();
      localStorage.setItem(USER_KEY, JSON.stringify(data));
      return data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(getApiUrl("/auth/register"), {
        method: "POST",
        headers: apiConfig.getHeaders(false),
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Registration failed");
      const data = await response.json();
      // localStorage.setItem(TOKEN_KEY, data.token);
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  },

  verifyToken: async () => {
    try {
    const response = await fetch(getApiUrl("/auth/verify"), {
      method: "POST",
      headers: apiConfig.getHeaders(true),
    });
    if (!response.ok) throw new Error("Token invalid");
    return await response.json();
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),

  isAuthenticated: () => !!localStorage.getItem(TOKEN_KEY),
};
