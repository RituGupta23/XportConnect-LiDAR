import React, { useEffect, useState } from 'react';
import { getSellerProducts } from '../services/productService';

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const data = await getSellerProducts(token); // Fetch products using the token
        setProducts(data);
      } catch (err) {
        setError(err.message); // Handle errors
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]); // Depend on token so it reloads when the token changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-list">
      <h2>Your Products</h2>
      {products.length === 0 ? (
        <p>You haven't added any products yet.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id} className="product-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SellerProducts;
