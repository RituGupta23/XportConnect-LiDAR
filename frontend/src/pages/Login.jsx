import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData); // Assuming loginUser is the service function that calls the backend API
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role); // Save user role in localStorage

      alert("Login successful!");
      navigate("/"); // Redirect to the home page
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="bg-lightGrey min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-darkGrey text-center mb-6">
          Login to XportConnect
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-darkGrey mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow"
              required
            />
          </div>
          <div className="mb-6">
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
          <button
            type="submit"
            className="w-full bg-yellow text-white py-3 rounded-md hover:bg-yellowHover focus:outline-none focus:ring-2 focus:ring-yellow transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-700 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-yellow hover:text-yellowHover transition duration-300"
          >
            Register now
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
