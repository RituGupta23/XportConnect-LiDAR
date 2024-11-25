import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClaimStatus = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="flex items-center justify-center h-full" >
      <div
        className="bg-white p-8 rounded-lg shadow-lg"
        style={{
          width: "450px",
          border: `1px solid #232F3E`,
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)"
        }}
      >
        <h1 className="text-center text-3xl font-semibold mb-6" style={{ color: "#232F3E" }}>
          Claim Status
        </h1>

        <div className="text-center text-xl text-gray-700 mb-4">
          <p>Your claim is currently under review.</p>
          <p className="font-medium text-gray-600 mt-2">
            We will inform you if your claim is approved or requires further action.
          </p>
        </div>

        <div className="mt-6 text-center">
          <button
            className="w-full bg-yellow text-white py-2 px-4 rounded-lg hover:bg-yellowHover transition duration-300 ease-in-out"
            style={{
              backgroundColor: "#FF9900",
              transition: "background-color 0.3s ease"
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#FF7F00")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#FF9900")}
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimStatus;
