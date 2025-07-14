import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate=useNavigate();

  // Simulate fetching data
  useEffect(() => {
    const fetchOrders = async () => {
      // In real use case, you'd fetch from API
      const fakeOrders = [
        {
          _id: "ORD12345",
          createdAt: new Date(),
          orderItems: [{
            name: "Urban Comfort Jacket",
            image: "https://picsum.photos/400/500?random=1",
          }],
          shippingAddress: {
            city: "Indore",
            country: "USA",
          },
          totalPrice: 100,
          isPaid: true
        },
        {
          _id: "0oD12345",
          createdAt: new Date(),
          orderItems: [{
            name: "Urban Comfort Jacket",
            image: "https://picsum.photos/400/500?random=2",
          }],
          shippingAddress: {
            city: "Indore",
            country: "USA",
          },
          totalPrice: 100,
          isPaid: true
        },
        {
          _id: "ERD12345",
          createdAt: new Date(),
          orderItems: [{
            name: "Urban Comfort Jacket",
            image: "https://picsum.photos/400/500?random=3",
          }],
          shippingAddress: {
            city: "Indore",
            country: "USA",
          },
          totalPrice: 100,
          isPaid: false
        },
      ];
      setOrders(fakeOrders);
    };

    fetchOrders();
  }, []);

  const handleRowClick = (orderId) => {

    console.log("Navigate to order:", orderId);
    navigate(`/order/${orderId}`);

  };

  return (
    <div className="m-10">
      <h2 className="text-xl font-bold mb-5 text-gray-900">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-sm">You haven't placed any orders yet.</p>
      ) : (
        <div className="overflow-x-auto border rounded-sm">
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
                <tr key={order._id} onClick={() => handleRowClick(order._id)} className="border-b hover:bg-gray-50 transition cursor-pointer">
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-14 h-14 object-cover rounded shadow-sm"
                    />
                    <span>{order.orderItems[0].name}</span>
                  </td>
                  <td className="p-3">{order._id}</td>
                  <td className="p-3">{order.orderItems.length}</td>
                  <td className="p-3">{order.shippingAddress.city}, {order.shippingAddress.country}</td>
                  <td className="p-3 font-medium">${order.totalPrice.toFixed(2)}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
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
                key={order._id}
                onClick={() => handleRowClick(order._id)}
                className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={order.orderItems[0].image}
                    alt={order.orderItems[0].name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-semibold">{order.orderItems[0].name}</h4>
                    <p className="text-xs text-gray-500">Order ID: {order._id}</p>
                  </div>
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Items:</span> {order.orderItems.length}
                  </p>
                  <p>
                    <span className="font-medium">Amount:</span> $
                    {order.totalPrice.toFixed(2)}
                  </p>
                  <p>
                    <span className="font-medium">Shipping:</span>{" "}
                    {order.shippingAddress.city}, {order.shippingAddress.country}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
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