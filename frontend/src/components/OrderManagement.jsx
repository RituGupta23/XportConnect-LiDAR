import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Package, Truck, Clock, ShoppingCart, Plus } from 'lucide-react';

const mockOrders = [
  { id: '001', customer: 'John Doe', date: '2023-05-15', status: 'delayed_delivery' },
  { id: '002', customer: 'Jane Smith', date: '2023-05-16', status: 'delayed_pickup' },
  { id: '003', customer: 'Bob Johnson', date: '2023-05-17', status: 'new' },
  { id: '004', customer: 'Alice Brown', date: '2023-05-18', status: 'ready_to_ship' },
  { id: '005', customer: 'Charlie Davis', date: '2023-05-19', status: 'delayed_delivery' },
  { id: '006', customer: 'Eva Wilson', date: '2023-05-20', status: 'new' },
  { id: '007', customer: 'Frank Miller', date: '2023-05-21', status: 'ready_to_ship' },
  { id: '008', customer: 'Grace Lee', date: '2023-05-22', status: 'delayed_pickup' },
];

const statusConfig = {
  delayed_delivery: { label: 'Delayed (Delivery)', color: 'bg-red-100 text-red-800', icon: <AlertCircle className="w-4 h-4 mr-1" /> },
  delayed_pickup: { label: 'Delayed (Pickup)', color: 'bg-orange-100 text-orange-800', icon: <Clock className="w-4 h-4 mr-1" /> },
  new: { label: 'New Order', color: 'bg-blue-100 text-blue-800', icon: <ShoppingCart className="w-4 h-4 mr-1" /> },
  ready_to_ship: { label: 'Ready to Ship', color: 'bg-green-100 text-green-800', icon: <Package className="w-4 h-4 mr-1" /> },
};

function OrderDashboard() {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const navigate = useNavigate();

  const filteredOrders = selectedStatus === 'all'
    ? mockOrders
    : mockOrders.filter(order => order.status === selectedStatus);

  const orderCounts = {
    delayed_delivery: mockOrders.filter(o => o.status === 'delayed_delivery').length,
    delayed_pickup: mockOrders.filter(o => o.status === 'delayed_pickup').length,
    new: mockOrders.filter(o => o.status === 'new').length,
    ready_to_ship: mockOrders.filter(o => o.status === 'ready_to_ship').length,
  };

  const handleViewDetails = (orderId) => {
    if (orderId === '003') {
      navigate("/tracking");
    } else {
      navigate(`/order/${orderId}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Order Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-8">
        {Object.keys(statusConfig).map((status) => (
          <div
            key={status}
            className="cursor-pointer p-4 bg-white rounded-lg shadow-md hover:shadow-lg"
            onClick={() => setSelectedStatus(status)}
          >
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-sm font-medium">
                {statusConfig[status].label}
              </h2>
              {statusConfig[status].icon}
            </div>
            <div>
              <div className="text-2xl font-bold">{orderCounts[status]}</div>
              <p className="text-xs text-gray-500">
                {orderCounts[status] === 1 ? 'order' : 'orders'}
              </p>
            </div>
          </div>
        ))}
        <div className="cursor-pointer bg-yellow-500 text-black p-4 rounded-lg shadow-md hover:shadow-lg">
          <div className="flex items-center justify-between pb-2">
            <h2 className="text-sm font-medium">Create New Order</h2>
            <Plus className="h-4 w-4" />
          </div>
          <div>
            <div className="text-2xl font-bold">+</div>
            <p className="text-xs">Click to create</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-sm text-gray-500">
            {selectedStatus === 'all' ? 'All orders' : `${statusConfig[selectedStatus].label} orders`}
          </p>
        </div>
        <div>
          {filteredOrders.length === 0 ? (
            <p>No orders for the selected status.</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.customer}</td>
                    <td className="px-4 py-2">{order.date}</td>
                    <td className="px-4 py-2">
                      <span className={`${statusConfig[order.status].color} py-1 px-2 rounded-full flex items-center`}>
                        {statusConfig[order.status].icon}
                        {statusConfig[order.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm"
                        onClick={() => handleViewDetails(order.id)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
export default OrderDashboard;
