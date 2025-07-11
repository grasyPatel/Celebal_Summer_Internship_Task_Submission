import React from "react";
import MyOrdersPage from "./MyOrdersPage";

const Profile = () => {
  const user = {
    name: "Grace Patel",
    email: "grace@example.com",
  };

  const orders = [
    {
      id: "ORD12345",
      product: "Urban Comfort Jacket",
      image: "https://picsum.photos/400/500?random=1}",
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

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
      {/* Left: Profile Box */}
      <div className="md:col-span-1 bg-white shadow-md rounded-xl p-6 space-y-5 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900">Hi, {user.name}</h2>
        <p className="text-gray-700 text-sm">
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <button className="mt-4 bg-black text-white w-full py-2 rounded hover:bg-gray-800 transition">
          Log Out
        </button>
      </div>

      {/* Right: Orders Table */}
      <div className="md:col-span-2 bg-white shadow-md rounded-xl p-6 border border-gray-100">
        <MyOrdersPage/>
      </div>
    </section>
  );
};

export default Profile;
