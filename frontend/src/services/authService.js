import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${BASE_URL}/api/auth`; // Replace with your backend base URL

/**
 * Registers a new user.
 * @param {Object} userData - The user registration data.
 * @returns {Object} - The response data.
 */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

/**
 * Logs in a user.
 * @param {Object} credentials - The user's login credentials.
 * @returns {Object} - The response data containing the token.
 */
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

/**
 * Fetches the currently logged-in user's data.
 * @returns {Object} - The user's data.
 */
export const getUser = async () => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  if (!token) {
    throw new Error("No token found. Please log in.");
  }

  try {
    const response = await axios.get(`${API_URL}/getUser`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch user data");
  }
};
