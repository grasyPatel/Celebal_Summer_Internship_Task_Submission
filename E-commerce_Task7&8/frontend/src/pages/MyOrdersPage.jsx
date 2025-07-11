import React, { useEffect, useState } from "react";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    const fetchOrders = async () => {
      // In real use case, you'd fetch from API
      const fakeOrders = [
        {
          id: "ORD12345",
          product: "Urban Comfort Jacket",
          image: "https://picsum.photos/400/500?random=1",
          date: "2025-07-10",
          status: "Delivered",
          amount: 89.99,
          shippingAddress: "123 Green Avenue, Mumbai, India",
          items: 1,
        },
        {
          id: "ORD12346",
          product: "Classic Bomber Jacket",
          image: "https://picsum.photos/400/500?random=2",
          date: "2025-06-20",
          status: "Shipped",
          amount: 74.99,
          shippingAddress: "456 Park Street, Delhi, India",
          items: 2,
        },
      ];
      setOrders(fakeOrders);
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-5 text-gray-900">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-sm">You haven’t placed any orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700 border-collapse hidden md:table">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3">Product</th>
                <th className="p-3">Order ID</th>
                <th className="p-3">Items</th>
                <th className="p-3">Shipping Address</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="w-14 h-14 object-cover rounded shadow-sm"
                    />
                    <span>{order.product}</span>
                  </td>
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.items}</td>
                  <td className="p-3">{order.shippingAddress}</td>
                  <td className="p-3 font-medium">${order.amount.toFixed(2)}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile Card View */}
          <div className="space-y-4 md:hidden">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white"
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold">{order.product}</h4>
                    <p className="text-xs text-gray-500">Order ID: {order.id}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Items:</span> {order.items}
                  </p>
                  <p>
                    <span className="font-medium">Amount:</span> $
                    {order.amount.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-medium">Shipping:</span>{" "}
                    {order.shippingAddress}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
