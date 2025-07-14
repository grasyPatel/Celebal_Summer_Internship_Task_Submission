import React, { useState } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    {
      _id: 123123123,
      user: { name: 'John Doe' },
      totalPrice: 100,
      status: 'Processing',
    },
    {
      _id: 987654321,
      user: { name: 'Jane Smith' },
      totalPrice: 250,
      status: 'Delivered',
    },
  ]);

  const handleMarkDelivered = (index) => {
    const updated = [...orders];
    updated[index].status = 'Delivered';
    setOrders(updated);
  };

  const handleStatusChange = (index, newStatus) => {
    const updated = [...orders];
    updated[index].status = newStatus;
    setOrders(updated);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'Shipped':
        return 'bg-blue-100 text-blue-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto bg-white shadow-md rounded-lg border border-gray-100">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-6 py-4 font-semibold">Order ID</th>
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Total Price</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800 font-medium">{order._id}</td>
                <td className="px-6 py-4">{order.user.name}</td>
                <td className="px-6 py-4">${order.totalPrice}</td>
                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold outline-none transition cursor-pointer ${getStatusColor(order.status)}`}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    disabled={order.status === 'Delivered'}
                    onClick={() => handleMarkDelivered(index)}
                    className={`px-4 py-2 rounded text-white font-medium transition-colors ${
                      order.status === 'Delivered'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    Mark as Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {orders.map((order, index) => (
          <div key={order._id} className="bg-white rounded-lg shadow-md border border-gray-100 p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Order #{order._id}</h3>
                <p className="text-sm text-gray-600">{order.user.name}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">${order.totalPrice}</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(index, e.target.value)}
                className={`w-full rounded-lg px-3 py-2 text-sm font-semibold outline-none transition cursor-pointer border ${getStatusColor(order.status)}`}
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <button
              disabled={order.status === 'Delivered'}
              onClick={() => handleMarkDelivered(index)}
              className={`w-full py-2 rounded-lg text-white text-sm font-medium transition ${
                order.status === 'Delivered'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              Mark as Delivered
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
