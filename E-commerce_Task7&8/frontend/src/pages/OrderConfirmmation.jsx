import React from "react";

const checkout = {
  _id: 123,
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "black",
      size: "M",
      price: 120,
      quantity: 1,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: "2",
      name: "Jacket",
      color: "black",
      size: "M",
      price: 120,
      quantity: 5,
      image: "https://picsum.photos/200?random=2",
    },
    {
      productId: "3",
      name: "Jacket",
      color: "black",
      size: "M",
      price: 120,
      quantity: 3,
      image: "https://picsum.photos/200?random=3",
    },
  ],
  shippingAddress: {
    firstName: "Grace",
    lastName: "Patel",
    address: "123 City",
    city: "Indore",
    country: "USA",
  },
};

const OrderConfirmation = () => {
  const totalItems = checkout.checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = checkout.checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header with success animation */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Thank you for your order!
          </h1>
          <p className="text-lg text-slate-600 mb-2">
            Order <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-1 rounded">#{checkout._id}</span> placed on{" "}
            {checkout.createdAt.toLocaleString()}
          </p>
          <div className="w-24 h-1 bg-shopnow-red mx-auto rounded-full"></div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 mb-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center mb-6">
           
            <h2 className="text-2xl font-bold text-slate-800">Shipping Address</h2>
          </div>
          <div className="space-y-2 text-slate-700">
            <p className="text-lg font-medium">{checkout.shippingAddress.firstName} {checkout.shippingAddress.lastName}</p>
            <p className="text-slate-600">{checkout.shippingAddress.address}</p>
            <p className="text-slate-600">{checkout.shippingAddress.city}, {checkout.shippingAddress.country}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center mb-6">
           
            <h2 className="text-2xl font-bold text-slate-800">Order Summary</h2>
          </div>
          
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700">
                <tr>
                  <th className="text-left py-4 px-4 font-semibold">Product</th>
                  <th className="text-left py-4 px-4 font-semibold">Details</th>
                  <th className="text-center py-4 px-4 font-semibold">Qty</th>
                  <th className="text-right py-4 px-4 font-semibold">Price</th>
                  <th className="text-right py-4 px-4 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {checkout.checkoutItems.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-100 last:border-none hover:bg-slate-50 transition-colors duration-200">
                    <td className="py-6 px-4">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
                        />
                       
                      </div>
                    </td>
                    <td className="py-6 px-4">
                      <div className="font-semibold text-slate-800 mb-1">{item.name}</div>
                      <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full inline-block">
                        Color: {item.color} | Size: {item.size}
                      </div>
                    </td>
                    <td className="text-center py-6 px-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 font-semibold rounded-full">
                        {item.quantity}
                      </span>
                    </td>
                    <td className="text-right py-6 px-4 font-medium text-slate-700">${item.price.toFixed(2)}</td>
                    <td className="text-right py-6 px-4 font-bold text-slate-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mt-8">
            <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl p-6 shadow-inner">
              <div className="space-y-3 w-60 text-slate-700">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Items:</span>
                  <span className="font-semibold bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">{totalItems}</span>
                </div>
                <div className="border-t border-slate-300 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-800">Total:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer message */}
        <div className="text-center mt-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200">
          <p className="text-slate-600">
            We'll send you shipping updates at your email address. 
            <span className="block mt-2 font-medium text-slate-800">Thank you for shopping with us! 🎉</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;