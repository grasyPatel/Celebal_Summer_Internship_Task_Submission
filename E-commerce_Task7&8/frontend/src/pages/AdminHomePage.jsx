import React from 'react';
import { Link } from 'react-router-dom';


const AdminHomePage = () => {
  const recentOrders = [
    {
      id: 'ORD12345',
      user:{name: 'Alice Johnson'},
      totalPrice: '$250.00',
      status: 'Completed',
    },
    {
      id: 'ORD12346',
      user: {name:'Bob Smith'},
      totalPrice: '$120.00',
      status: 'Pending',
    },
    {
      id: 'ORD12347',
      user: {name:'Charlie Lee'},
      totalPrice: '$500.00',
      status: 'Shipped',
    },
  ];

  return (
    <div className="space-y-8">
        <h1 className='text-3xl font-bold mb-6 text-gray-800'>Admin Dashboard</h1>
      {/* Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-sm text-gray-500 mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-gray-800">$12,500</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-sm text-gray-500 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-800">325</p>
        <Link to="/admin/orders" className="text-blue-500 hover:underline">Manage Orders</Link>

        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 className="text-sm text-gray-500 mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-gray-800">98</p>
          <Link to="/admin/products" className="text-blue-500 hover:underline">Manage Product</Link>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-medium">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Total Price</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800">{order.id}</td>
                  <td className="px-6 py-4 text-gray-700">{order.user.name}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{order.totalPrice}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : order.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;