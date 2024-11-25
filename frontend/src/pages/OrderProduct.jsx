import React, { useState } from 'react';
import { createOrder } from '../services/orderService';

const OrderProduct = () => {
  const [products, setProducts] = useState([{ product: '', quantity: 1 }]);
  const [message, setMessage] = useState('');

  const handleAddProduct = () => {
    setProducts([...products, { product: '', quantity: 1 }]);
  };

  const handleChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder({ products });
      setMessage('Order created successfully!');
      setProducts([{ product: '', quantity: 1 }]);
    } catch (error) {
      setMessage(error.message || 'Failed to create order.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl mb-6 font-bold text-darkGrey">Create Order</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        {products.map((item, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-sm font-medium mb-2">Product ID</label>
            <input
              type="text"
              value={item.product}
              onChange={(e) => handleChange(index, 'product', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required />
        
            <label className="block text-sm font-medium mb-2 mt-2">Quantity</label>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => handleChange(index, 'quantity', e.target.value)}
              min="1"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-yellow text-white py-2 rounded-md hover:bg-yellowHover"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default OrderProduct;
