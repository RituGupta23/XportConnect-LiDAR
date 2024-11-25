import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-darkGrey text-white p-6">
      <div className="text-center max-w-lg">
        {/* 404 Error Text */}
        <h1 className="text-8xl font-extrabold text-yellow mb-6">
          404
        </h1>
        <p className="text-2xl md:text-3xl mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>

        {/* Back to Home Button */}
        <Link
          to="/"
          className="bg-yellow text-darkGrey px-8 py-3 rounded-lg text-xl font-semibold shadow-lg transform transition duration-300 hover:bg-yellowHover hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
