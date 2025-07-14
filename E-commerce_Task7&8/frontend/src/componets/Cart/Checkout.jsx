import { useState } from "react";
import PayPalButton from "./PayPalButton";
import { useNavigate } from "react-router-dom";

const cart = {
  products: [
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Red",
      price: 45,
      image: "https://picsum.photos/200?random=1",
    },
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Red",
      price: 75,
      image: "https://picsum.photos/200?random=2",
    },
    {
      name: "Stylish Jacket",
      size: "M",
      color: "Red",
      price: 75,
      image: "https://picsum.photos/200?random=3",
    },
  ],
  totalPrice: 195,
};

const Checkout = () => {
  const navigate = useNavigate(); // Fixed: Added parentheses to call the hook
  const [checkoutId, setCheckoutId] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // Calculate total with shipping and tax
  const totalAmount = cart.totalPrice + 15 + 15.60;

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCheckoutId(123);
    setShowPaymentOptions(true);
    console.log("Shipping Info:", shippingAddress);
  };

  const handlePaymentSuccess = (details) => {
    console.log("Payment Successful:", details);
    navigate("/order-confirmation"); // Fixed: Added semicolon
  };

  

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Shipping Form */}
      <div className="space-y-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-2">Shipping Address</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={shippingAddress.email}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-1">First Name</label>
              <input
                name="firstName"
                value={shippingAddress.firstName}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name</label>
              <input
                name="lastName"
                value={shippingAddress.lastName}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Address</label>
            <input
              name="address"
              value={shippingAddress.address}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">City</label>
              <input
                name="city"
                value={shippingAddress.city}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">State</label>
              <input
                name="state"
                value={shippingAddress.state}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Postal Code</label>
              <input
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Country</label>
              <input
                name="country"
                value={shippingAddress.country}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <input
              name="phone"
              value={shippingAddress.phone}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            Continue to Payment
          </button>
        </form>

        {/* Payment Options Section - Only show after form submission */}
        {showPaymentOptions && (
          <div className="pt-6 border-t">
            <h3 className="text-xl font-semibold mb-4">Payment Options</h3>
            <div className="space-y-3">
              <div className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-center py-2 rounded transition font-semibold">
                <PayPalButton 
                  amount={totalAmount.toFixed(2)} 
                  onSuccess={handlePaymentSuccess} 
                  onError={(err) => alert("Payment Failed, Try Again")}
                />
              </div>
             
            </div>
          </div>
        )}
      </div>

      {/* Right: Order Summary */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

        <table className="w-full text-sm mb-4">
          <thead className="text-left text-gray-600 border-b">
            <tr>
              <th className="pb-2">Product</th>
              <th className="pb-2 hidden sm:table-cell">Details</th>
              <th className="pb-2 text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((item, index) => (
              <tr key={index} className="border-b py-2">
                <td className="py-3 pr-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>
                <td className="py-3 hidden sm:table-cell">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">
                    Size: {item.size}, Color: {item.color}
                  </div>
                </td>
                <td className="py-3 text-right">
                  <div className="font-semibold">${item.price.toFixed(2)}</div>
                  <div className="text-xs text-gray-500 sm:hidden">
                    {item.name} ({item.size}, {item.color})
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>${cart.totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping:</span>
            <span>$15.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax:</span>
            <span>$15.60</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Mobile Payment Options - Only show after form submission */}
        {showPaymentOptions && (
          <div className="md:hidden space-y-3">
            <div className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-center py-2 rounded transition font-semibold">
              <div className="mb-2">Pay with PayPal</div>
              <PayPalButton 
                amount={totalAmount.toFixed(2)} 
                onSuccess={handlePaymentSuccess} 
                onError={(err) => alert("Payment Failed, Try Again")}
              />
            </div>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;