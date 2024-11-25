import React from "react";

const QueryManagement = () => {
  const mockData = [
    { id: "Q00123", importer: "Global Fruits Inc.", category: "Shipping", priority: "High", status: "Open", lastUpdated: "2023-10-05 14:30" },
    { id: "Q00124", importer: "Tropical Imports LLC", category: "Pricing", priority: "Medium", status: "In Progress", lastUpdated: "2023-10-05 13:45" },
    { id: "Q00125", importer: "Fruit Express Co.", category: "Documentation", priority: "Low", status: "Resolved", lastUpdated: "2023-10-04 16:50" },
  ];

  const colors = {
    yellow: "#FF9900",
    darkGrey: "#232F3E",
    lightGrey: "#F3F3F3",
    yellowHover: "#FF7F00",
    greyHover: "#131A22",
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: colors.darkGrey }}>Query Management</h1>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search queries..."
          style={{
            padding: "10px",
            border: `1px solid ${colors.darkGrey}`,
            borderRadius: "4px",
            width: "300px",
          }}
        />
        <div>
          <button
            style={{
              backgroundColor: colors.yellow,
              border: "none",
              color: "white",
              padding: "10px 20px",
              cursor: "pointer",
              marginRight: "10px",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = colors.yellowHover)}
            onMouseOut={(e) => (e.target.style.backgroundColor = colors.yellow)}
          >
            New Query
          </button>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: colors.greyHover, color: "white" }}>
            <th style={{ padding: "10px", border: `1px solid ${colors.darkGrey}` }}>Query ID</th>
            <th style={{ padding: "10px", border: `1px solid ${colors.darkGrey}` }}>Importer Name</th>
            <th style={{ padding: "10px", border: `1px solid ${colors.darkGrey}` }}>Category</th>
            <th style={{ padding: "10px", border: `1px solid ${colors.darkGrey}` }}>Priority</th>
            <th style={{ padding: "10px", border: `1px solid ${colors.darkGrey}` }}>Status</th>
            <th style={{ padding: "10px", border: `1px solid ${colors.darkGrey}` }}>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((query) => (
            <tr key={query.id} style={{ backgroundColor: "white", textAlign: "center" }}>
              <td style={{ padding: "10px", border: `1px solid ${colors.darkGrey}` }}>{query.id}</td>
              <td style={{ padding: "10px", border: `1px solid ${colors.darkGrey}` }}>{query.importer}</td>
              <td style={{ padding: "10px", border: `1px solid ${colors.darkGrey}` }}>{query.category}</td>
              <td
                style={{
                  padding: "10px",
                  border: `1px solid ${colors.darkGrey}`,
                  color: query.priority === "High" ? "red" : query.priority === "Medium" ? "orange" : "green",
                }}
              >
                {query.priority}
              </td>
              <td style={{ padding: "10px", border: `1px solid ${colors.darkGrey}` }}>{query.status}</td>
              <td style={{ padding: "10px", border: `1px solid ${colors.darkGrey}` }}>{query.lastUpdated}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Query Submission Section */}
      <div className="p-6 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Ask Your Query</h1>
        <div className="grid grid-cols-1 flex flex-col items-center justify-center gap-6 w-1/2 max-w-4xl">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105">
            <div className="px-6 py-4 text-center">
              <p className="text-gray-600">
                Get instant assistance with your import-related queries.
              </p>
            </div>
            <div style={{ backgroundColor: colors.yellow }} className="text-white text-center py-3">
              <a
                href="https://healthcare-assistant-rtplulntkyjfnrfr4pkal3.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium hover:underline"
              >
                Visit Assistant
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryManagement;
