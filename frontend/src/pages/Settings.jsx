import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const navigate = useNavigate();
  const { isSeller, isCustomer } = useAuth();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const data = await getUser(); // Use getUser to fetch user data
  //       setUser(data); // Set user data in state
  //     } catch (err) {
  //       console.error("Failed to fetch user data:", err);
  //     }
  //   };

  //   fetchUser(); // Call the fetchUser function when the component mounts
  // }, []);

  const handleLogout = () => {
    // Clear localStorage and navigate to login
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="p-8 ">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl mb-6 font-bold text-darkGrey">
          Settings & Profile
        </h1>
        <p className="text-lg text-darkGrey mt-2">
          Manage your profile and settings
        </p>
      </div>

      {/* User Details Section */}
      <div className="mt-6 bg-white overflow-hidden shadow rounded-lg">
        <div className="px-6 py-5">
          <h3 className="text-xl font-medium text-darkGrey">User Details</h3>
          {isSeller && (
            <>
              <div className="mt-4">
                <p className="text-darkGrey">
                  <strong>Username: seller456</strong>
                </p>
                <p className="text-darkGrey">
                  <strong>Email: seller2@example.com</strong>
                </p>
              </div>
            </>
          )}

          {isCustomer && (
            <>
              <div className="mt-4">
                <p className="text-darkGrey">
                  <strong>Username: customer123</strong>
                </p>
                <p className="text-darkGrey">
                  <strong>Email: customer@example.com</strong>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-yellow text-white py-2 px-6 rounded-md hover:bg-yellowHover focus:outline-none focus:ring-2 focus:ring-yellow"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
