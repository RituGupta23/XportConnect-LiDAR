import { useState } from "react";
import { addProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(formData, token);
      alert("Product added successfully!");
      //navigate("/my-products");
    } catch (error) {
      // alert("Failed to add product: " + error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl mb-6 font-bold text-darkGrey">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Product Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="description">
            Product Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="image">
            Product Image URL
          </label>
          <input
            id="image"
            name="image"
            type="text"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow text-white py-2 rounded-md hover:bg-yellowHover"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
