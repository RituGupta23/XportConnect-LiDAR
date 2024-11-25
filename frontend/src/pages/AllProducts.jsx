import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/productService';
import { useNavigate } from 'react-router-dom';
import almonds from '../images/almonds.jpg';
import dates from '../images/dates.jpg';
import laptop from '../images/laptop.jpg';
import smartphone from '../images/smartphone.jpg';
import smartphone4 from '../images/smartphone4.jpg';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Array of image objects
  const productImages = [
    { name: 'almonds', src: almonds },
    { name: 'dates', src: dates },
    { name: 'laptop', src: laptop },
    { name: 'smartphone', src: smartphone },
    { name: 'smartphone4', src: smartphone4 },
  ];

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const data = await getAllProducts(); // Fetch products using the token
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token]);

  const handlePlaceOrder = (productId) => {
    navigate(`/${productId}/place`);
  };

  if (loading) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl mb-6 font-bold text-darkGrey">Available Products</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => {
              // Find the image based on the product name
              const productImage = productImages.find(image => image.name.toLowerCase() === product.name.toLowerCase())?.src || almonds; // Fallback to 'almonds' image if not found
              return (
                <div
                  key={product._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
                >
                  {/* Product Image */}
                  <img
                    src={productImage}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-darkGrey truncate">
                      {product.name}
                    </h3>
                    <p className="text-gray-900 font-semibold text-sm mt-2">Product ID</p>
                    <p className="text-gray-900 font-semibold text-sm mt-2">{product._id}</p>
                    <p className="text-gray-600 text-sm mt-2">{product.description}</p>
                    <p className="text-yellow font-bold mt-4">Price: ${product.price}</p>

                    {/* Place Order Button */}
                    <button
                      onClick={() => handlePlaceOrder(product._id)}
                      className="w-full bg-yellow text-white py-2 mt-4 rounded-md hover:bg-yellowHover"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
