import React, { useEffect, useState } from "react";
import { getSellerProducts } from "../services/productService";

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) {
        setError("No token found. Please log in.");
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
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className=" py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl mb-6 font-bold text-darkGrey">Your Products</h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven't added any products yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-darkGrey truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {product.description}
                  </p>
                  <p className="text-yellow font-bold mt-4">
                    Price: ${product.price}
                  </p>
                  <button
                    className="mt-4 p4-2 w-full p-2 bg-yellow text-white rounded-lg font-medium hover:bg-yellowHover transition"
                  >
                    <a href="/packing" className="w-full">
                      Get Packaging Recommendations
                    </a>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerProducts;
