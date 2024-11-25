import React, { useEffect, useState } from "react";
import { getSellerOrders } from "../services/orderService";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getSellerOrders();
        console.log(data);
        setOrders(data);
      } catch (err) {
        setError(err.message || "Failed to fetch seller orders.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl mb-6 font-bold text-darkGrey">
        Orders for Your Products
      </h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-6 border border-gray-300 rounded-lg shadow-lg hover:border-yellow transition duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="font-medium text-darkGrey text-lg">
                  Order ID: {order._id}
                </p>
                <span className="text-xl font-semibold text-yellow">
                  ${order.totalPrice}
                </span>
              </div>
              <p className="text-darkGrey">Customer ID: {order.customer._id}</p>
              <p className="text-darkGrey">
                Customer Email: {order.customer.email}
              </p>
              <h3 className="font-medium mt-4 text-darkGrey text-xl">
                Products:
              </h3>
              <ul className="list-disc pl-6">
                {order.products.map((item, idx) => (
                  <li key={idx} className="text-darkGrey">
                    Product: {item._id} | <span className="font-semibold">{item.product.name}</span> |
                    Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
              <a href="/preshipment" className="w-full">
                <button className="mt-4 p4-2 w-full p-2 bg-yellow text-white rounded-lg font-medium hover:bg-yellowHover transition">
                  Upload Preshipment Image
                </button>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-darkGrey">No orders found.</p>
      )}
    </div>
  );
};

export default SellerOrders;
