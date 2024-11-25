import React, { useState } from "react";

const PackagingRecommendation = () => {
  const [category, setCategory] = useState("");
  const [fragilityScore, setFragilityScore] = useState("");
  const [temperatureSensitive, setTemperatureSensitive] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let rec = "";

    // Example logic for providing packaging recommendations
    if (category === "Perishables") {
      rec = "Use insulated packaging with ice packs to maintain freshness.";
    } else if (category === "Electronics") {
      rec = "Ensure anti-static and shock-absorbing materials for safe delivery.";
    } else if (category === "Fragile Items") {
      rec = "Use bubble wrap and sturdy boxes to prevent breakage.";
    } else {
      rec = "Use standard packaging with padding for added protection.";
    }

    // Add temperature sensitivity to the recommendation
    if (temperatureSensitive === "Yes") {
      rec += " Include temperature control solutions like cold packs or heat insulation.";
    }

    // Add fragility score to the recommendation
    if (fragilityScore >= 7) {
      rec += " Ensure extra protection due to high fragility.";
    } else if (fragilityScore >= 4) {
      rec += " Standard protection should be sufficient.";
    }

    setRecommendation(rec); // Set the final recommendation
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen "
    >
      <div
        className="bg-white p-8 rounded-lg shadow-md"
        style={{
          width: "400px",
          border: `1px solid ${"#232F3E"}`,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          className="text-center text-2xl font-bold mb-6"
          style={{ color: "#232F3E" }}
        >
          Packaging Recommendation System
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#232F3E" }}
            >
              Product Category:
            </label>
            <select
              className="w-full p-2 border rounded"
              style={{
                borderColor: "#232F3E",
                backgroundColor: "#F3F3F3",
                color: "#232F3E",
              }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Perishables">Perishables</option>
              <option value="Electronics">Electronics</option>
              <option value="Fragile Items">Fragile Items</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#232F3E" }}
            >
              Fragility Score (1-10):
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded"
              min="1"
              max="10"
              value={fragilityScore}
              onChange={(e) => setFragilityScore(e.target.value)}
              style={{
                borderColor: "#232F3E",
                backgroundColor: "#F3F3F3",
                color: "#232F3E",
              }}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "#232F3E" }}
            >
              Temperature Sensitive:
            </label>
            <select
              className="w-full p-2 border rounded"
              style={{
                borderColor: "#232F3E",
                backgroundColor: "#F3F3F3",
                color: "#232F3E",
              }}
              value={temperatureSensitive}
              onChange={(e) => setTemperatureSensitive(e.target.value)}
            >
              <option value="">Select</option>
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 text-white font-medium rounded"
            style={{
              backgroundColor: "#FF9900",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#FF7F00")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#FF9900")}
          >
            Get Recommendation
          </button>
        </form>

        {/* Display the recommendation below the form */}
        {recommendation && (
          <div className="mt-6 p-4 bg-yellow-100 border border-yellow-400 rounded-md">
            <h2 className="font-semibold text-lg">Packaging Recommendation:</h2>
            <p>{recommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackagingRecommendation;
