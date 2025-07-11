
import { RiDeleteBin3Line } from 'react-icons/ri'

const CartContent = () => {
  const cartProducts = [
  {
    ProductId: 1,
    name: "T-shirt",
    size: "M",
    color: "Red",
    quantity: 1,
    price: 15,
    image: "https://picsum.photos/200?random=1"
  },
  {
    ProductId: 2,
    name: "Jeans",
    size: "L",
    color: "Blue",
    quantity: 2,
    price: 40,
    image: "https://picsum.photos/200?random=2"
  },
  {
    ProductId: 3,
    name: "Sneakers",
    size: "9",
    color: "White",
    quantity: 1,
    price: 60,
    image: "https://picsum.photos/200?random=3"
  },
  {
    ProductId: 4,
    name: "Hoodie",
    size: "XL",
    color: "Black",
    quantity: 1,
    price: 35,
    image: "https://picsum.photos/200?random=4"
  },
  {
    ProductId: 5,
    name: "Cap",
    size: "One Size",
    color: "Green",
    quantity: 3,
    price: 10,
    image: "https://picsum.photos/200?random=5"
  },
  {
    ProductId: 6,
    name: "Jacket",
    size: "L",
    color: "Grey",
    quantity: 1,
    price: 80,
    image: "https://picsum.photos/200?random=6"
  },
  {
    ProductId: 7,
    name: "Socks",
    size: "Free Size",
    color: "Black",
    quantity: 5,
    price: 5,
    image: "https://picsum.photos/200?random=7"
  },
  {
    ProductId: 8,
    name: "Watch",
    size: "Adjustable",
    color: "Silver",
    quantity: 1,
    price: 120,
    image: "https://picsum.photos/200?random=8"
  },
  {
    ProductId: 9,
    name: "Sunglasses",
    size: "Standard",
    color: "Brown",
    quantity: 2,
    price: 50,
    image: "https://picsum.photos/200?random=9"
  },
  {
    ProductId: 10,
    name: "Backpack",
    size: "Medium",
    color: "Navy Blue",
    quantity: 1,
    price: 70,
    image: "https://picsum.photos/200?random=10"
  }
];

  return (
    <div className="p-4 space-y-4">
      {cartProducts.map((product, index) => (
        <div
          key={product.ProductId}
          className="flex justify-between items-start gap-4 border p-4 rounded-lg shadow-sm"
        >
          {/* Left: Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-20 h-24 object-cover rounded-md"
          />

          {/* Middle: Product Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">
              Size: {product.size}, Color: {product.color}
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center mt-2">
              <button className="border px-2 rounded text-xl font-medium">-</button>
              <span className="mx-4">{product.quantity}</span>
              <button className="border px-2 rounded text-xl font-medium">+</button>
            </div>
          </div>

          {/* Right: Price & Delete */}
          <div className="flex flex-col items-end justify-between h-full">
            <p className="font-medium text-right text-gray-800">${product.price}</p>
            <button>
              <RiDeleteBin3Line className="h-6 w-6 text-red-600 hover:text-red-800" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent