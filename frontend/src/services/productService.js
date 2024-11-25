import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${BASE_URL}/api/products/`; 

// Add Product (Seller only)
export const addProduct = async (productData) => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token'); // Ensure the token is saved after login
  
      if (!token) {
        throw new Error('No token found');
      }
  
      // Send the token in the Authorization header
      const response = await axios.post(API_URL, productData, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token here
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding product:', error);
      throw new Error(error.response ? error.response.data.message : 'Failed to add product');
    }
  };

// Get all products (for Customers)
export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get products for the current seller
export const getSellerProducts = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Send the token in the header
      },
    };
  
    try {
      const response = await axios.get(`${API_URL}my-products`, config); // Fetch seller's products
      return response.data;
    } catch (error) {
      console.error("Error fetching seller products:", error);
      throw new Error(error.response ? error.response.data.message : 'Failed to fetch seller products');
    }
  };
