import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const OrderDetailsPage = () => {
  const { id } = useParams(); // Get the actual ID from URL parameters
  const [orderDetails, setOrderDetails] = useState(null);
  
  useEffect(() => {
    // Create different mock data based on the ID
    const getMockOrderDetails = (orderId) => {
      const baseOrders = {
        "ORD-2024-001": {
          _id: orderId,
          createdAt: new Date('2024-01-15'),
          isPaid: true,
          isDelivered: true,
          paymentMethod: false,
          shippingMethod: 'Standard',
          shippingAddress: {
            city: 'Indore',
            country: 'USA',
          },
          orderItems: [
            {
              productId: '1',
              name: 'Black Leather Jacket',
              price: 120,
              quantity: 1,
              image: 'https://picsum.photos/200?random=1',
            },
            {
              productId: '2',
              name: 'Brown Leather Jacket',
              price: 120,
              quantity: 2,
              image: 'https://picsum.photos/200?random=2',
            },
          ],
        },
        "ORD-2024-002": {
          _id: orderId,
          createdAt: new Date('2024-02-10'),
          isPaid: false,
          isDelivered: false,
          paymentMethod: true,
          shippingMethod: 'Express',
          shippingAddress: {
            city: 'Mumbai',
            country: 'India',
          },
          orderItems: [
            {
              productId: '3',
              name: 'Denim Jacket',
              price: 85,
              quantity: 1,
              image: 'https://picsum.photos/200?random=3',
            },
            {
              productId: '4',
              name: 'Winter Coat',
              price: 200,
              quantity: 1,
              image: 'https://picsum.photos/200?random=4',
            },
            {
              productId: '5',
              name: 'Casual Blazer',
              price: 150,
              quantity: 1,
              image: 'https://picsum.photos/200?random=5',
            },
          ],
        },
        "ORD-2024-003": {
          _id: orderId,
          createdAt: new Date('2024-03-05'),
          isPaid: true,
          isDelivered: false,
          paymentMethod: true,
          shippingMethod: 'Standard',
          shippingAddress: {
            city: 'Delhi',
            country: 'India',
          },
          orderItems: [
            {
              productId: '6',
              name: 'Sports Jacket',
              price: 90,
              quantity: 3,
              image: 'https://picsum.photos/200?random=6',
            },
          ],
        },
      };

      // Return specific order if exists, otherwise create a default one
      return baseOrders[orderId] || {
        _id: orderId,
        createdAt: new Date(),
        isPaid: Math.random() > 0.5,
        isDelivered: Math.random() > 0.5,
        paymentMethod: Math.random() > 0.5,
        shippingMethod: Math.random() > 0.5 ? 'Express' : 'Standard',
        shippingAddress: {
          city: 'Indore',
          country: 'India',
        },
        orderItems: [
          {
            productId: orderId,
            name: `Product ${orderId}`,
            price: Math.floor(Math.random() * 200) + 50,
            quantity: Math.floor(Math.random() * 3) + 1,
            image: `https://picsum.photos/200?random=${orderId}`,
          },
        ],
      };
    };

    const mockOrderDetails = getMockOrderDetails(id);
    setOrderDetails(mockOrderDetails);
  }, [id]); // Make sure to include id in dependency array

  if (!orderDetails) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen ">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-900 border-t-transparent mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const totalPrice = orderDetails.orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Header Section */}
      <h1 className='text-3xl font-bold '>Order Details</h1>
      <div className="bg-white border rounded-lg p-8 shadow-sm">
        <p className="font-bold mb-1 text-gray-900">Order #{orderDetails._id}</p>
        <p className="text-gray-600">Placed on: {new Date(orderDetails.createdAt).toLocaleString()}</p>
        <div className="mt-4 w-full h-px bg-gray-200"></div>
      </div>

      {/* Shipping & Payment Info */}
      <div className="bg-white border rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Shipping & Payment Info</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Details */}
          <div className="space-y-4">
            <div className="border-l-4 border-gray-300 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Shipping Details</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Method:</strong> {orderDetails.shippingMethod}</p>
                <p><strong>Address:</strong> {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.country}</p>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="space-y-4">
            <div className="border-l-4 border-gray-300 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">Payment Details</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>Method:</strong> {orderDetails.paymentMethod ? "Online Payment" : "Cash on Delivery"}</p>
                <p>
                  <strong>Payment Status:</strong>{" "}
                  <span className={`font-medium ${orderDetails.isPaid ? "text-green-600" : "text-red-600"}`}>
                    {orderDetails.isPaid ? "Paid" : "Not Paid"}
                  </span>
                </p>
                <p>
                  <strong>Delivery Status:</strong>{" "}
                  <span className={`font-medium ${orderDetails.isDelivered ? "text-green-600" : "text-red-600"}`}>
                    {orderDetails.isDelivered ? "Delivered" : "Pending"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white border rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Items Summary</h2>
        
        <div className="space-y-4">
          {orderDetails.orderItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-6 p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg shadow-sm"
                />
              </div>
              
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-lg mb-1">{item.name}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Qty: {item.quantity}</span>
                  <span>${item.price.toFixed(2)} each</span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-xl text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center bg-gray-50 rounded-lg p-6">
            <span className="text-2xl font-bold text-gray-900">Total:</span>
            <span className="text-3xl font-bold text-gray-900">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <Link className='text-blue-500 hover:underline' to='/my-orders'>Back to My Orders</Link>
    </div>
  );
};

export default OrderDetailsPage;