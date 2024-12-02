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

      // Store both token and user data
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      return data;
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      if (
        !userData.firstName ||
        !userData.lastName ||
        !userData.email ||
        !userData.password
      ) {
        throw new Error("Required fields missing");
      }

      const registerData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        phone: userData.phone || null,
      };

      const response = await fetch(getApiUrl("/auth/register"), {
        method: "POST",
        headers: apiConfig.getHeaders(false),
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      // Don't store anything after registration - user should log in
      return data;
    } catch (error) {
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) {
        throw new Error("No auth token");
      }

      // Try to get cached user data first
      const cachedUser = localStorage.getItem(USER_KEY);
      if (cachedUser) {
        return JSON.parse(cachedUser);
      }

      const response = await fetch(getApiUrl("/auth/me"), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Server error");
      }

      const data = await response.json();
      localStorage.setItem(USER_KEY, JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Get current user error:", error);
      // Only clear storage if it's an auth error
      if (
        error.message === "No auth token" ||
        error.message === "Invalid token"
      ) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
      throw error;
    }
  },

  updateUserData: async (userData) => {
    try {
      if (!userData || Object.keys(userData).length === 0) {
        throw new Error("No data to update");
      }

      const response = await fetch(getApiUrl("/auth/update"), {
        method: "PUT",
        headers: apiConfig.getHeaders(true),
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to update user data"
        );
      }

      localStorage.setItem(USER_KEY, JSON.stringify(data));
      return data;
    } catch (error) {
      console.error("Update user data error:", error);
      throw error;
    }
  },

  verifyToken: async () => {
    try {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            throw new Error('No auth token');
        }

        const response = await fetch(getApiUrl("/auth/verify"), {
            method: "POST",
            headers: {
                ...apiConfig.getHeaders(false),
                'Authorization': `Bearer ${token}`
            }
        }).catch(error => {
            console.error('Network error:', error);
            // Return a fake response for offline/connection issues
            return new Response(JSON.stringify({ valid: true }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        });

        const data = await response.json();
        return data.valid;
    } catch (error) {
        console.error('Token verification error:', error);
        // Return true if we can't verify to prevent unnecessary logouts
        return true;
    }
},

  refreshToken: async (userId) => {
    try {
      const response = await fetch(getApiUrl("/auth/refresh"), {
        method: "POST",
        headers: apiConfig.getHeaders(true),
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();

      // Store new token
      localStorage.setItem(TOKEN_KEY, data.token);
      return data.token;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),

  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = localStorage.getItem(USER_KEY);
    return !!(token && user);
  },
};
