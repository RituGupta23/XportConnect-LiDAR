import axios from 'axios';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${BASE_URL}/api/orders`; // Replace with your backend URL

// Create an order
export const createOrder = async (orderData) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.post(API_URL, orderData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error(error.response ? error.response.data.message : 'Failed to create order');
    }
};

// Get customer orders
export const getCustomerOrders = async () => {
    try {
        const token = localStorage.getItem('token');
        console.log(token)
        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.get(`${API_URL}/customer`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching customer orders:', error);
        throw new Error(error.response ? error.response.data.message : 'Failed to fetch orders');
    }
};

// Get seller orders
export const getSellerOrders = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.get(`${API_URL}/seller`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching seller orders:', error);
        throw new Error(error.response ? error.response.data.message : 'Failed to fetch orders');
    }
};
