import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${BASE_URL}/api/chat`; // Replace with your backend base URL

/**
 * Retrieves all chat messages.
 * @param {string} token - The user's authentication token.
 * @returns {Array} - The list of messages.
 */
export const getMessages = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch messages");
  }
};

/**
 * Sends a new chat message.
 * @param {string} token - The user's authentication token.
 * @param {string} text - The message text to send.
 * @returns {Object} - The response data.
 */
export const sendMessage = async (token, text) => {
  try {
    const response = await axios.post(
      `${API_URL}/send`,
      { text },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to send message");
  }
};
