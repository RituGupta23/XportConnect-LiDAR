import { useState } from "react";
import { registerUser } from "../services/authService";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "seller",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registration successful!");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="bg-lightGrey min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-darkGrey text-center mb-6">
          Register with XportConnect
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-darkGrey mb-2">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-darkGrey mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-darkGrey mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-darkGrey mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
            >
              <option value="seller">Seller</option>
              <option value="carrier">Carrier</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow text-white py-3 rounded-md hover:bg-yellowHover focus:outline-none focus:ring-2 focus:ring-yellow transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-700 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-yellow hover:text-yellowHover transition duration-300"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
