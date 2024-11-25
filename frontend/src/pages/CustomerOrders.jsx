import React, { useState } from "react";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([
    {
      _id: "67408240d0bfe6664ad780aa",
      customer: "67405cc11e3f2ff1b6d89145",
      products: [
        {
          product: { name: "Almonds" },
          quantity: 1,
          seller: { name: "Premium Quality Gluten Free Almonds" },
        },
      ],
      totalPrice: 599.99,
      status: "Out for Delivery",
      createdAt: "2024-11-22T13:08:16.569+00:00",
      updatedAt: "2024-11-22T13:08:16.569+00:00",
    },
    {
      _id: "6743389577ea13a8ca513c4c",
      customer: "67405cc11e3f2ff1b6d89145",
      products: [
        {
          product: { name: "Date" },
          quantity: 1,
          seller: { name: "Premium quality seedless dates" },
        },
      ],
      totalPrice: 499.99,
      status: "Delivered",
      createdAt: "2024-11-24T14:30:45.479+00:00",
      updatedAt: "2024-11-24T14:30:45.479+00:00",
    },
  ]);
  const [error, setError] = useState("");

  const handleClaim = (orderId) => {
    alert(`Claim initiated for order ID: ${orderId}`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-3xl mb-6 font-bold text-darkGrey">
        Your Orders
      </h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-6 border border-gray-300 rounded-lg shadow-sm bg-white hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-4">
                <p className="font-semibold text-lg text-gray-800">
                  Total Price:{" "}
                  <span className="text-yellow">${order.totalPrice}</span>
                </p>
                <span
                  className={`text-sm font-medium py-1 px-3 rounded-full ${
                    order.status === "Out for Delivery"
                      ? "bg-rose-100 text-rose-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <h3 className="font-semibold text-gray-700 mb-2">Products:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {order.products.map((item, idx) => (
                  <li key={idx} className="text-gray-600">
                    <span className="font-medium text-gray-800">Product:</span>{" "}
                    {item.product.name} |
                    <span className="font-medium text-gray-800">
                      {" "}
                      Quantity:
                    </span>{" "}
                    {item.quantity} |
                    <span className="font-medium text-gray-800"> Seller:</span>{" "}
                    {item.seller.name}
                  </li>
                ))}
              </ul>
              <div className="flex flex-row gap-2">
                <button
                  onClick={() => handleClaim(order._id)}
                  className="mt-4 w-full py-2 bg-yellow text-white rounded-lg font-medium hover:bg-yellowHover transition"
                >
                  <a href="/claims" className="w-full block">
                    Claim
                  </a>
                </button>

                

                <button className="mt-4 w-full py-2 bg-darkGrey text-white rounded-lg font-medium hover:bg-greyHover transition">
                <a href="/claim-status" className="w-full block">
                    Claim Status
                  </a>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default CustomerOrders;
