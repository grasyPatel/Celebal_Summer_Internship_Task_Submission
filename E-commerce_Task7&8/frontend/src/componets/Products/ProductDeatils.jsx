import { useState } from "react";
import { toast } from "sonner";
import YouMayProduct from "./YouMayProduct";

const product = {
  name: "Urban Comfort Jacket",
  originalPrice: 129.99, // Original price added
  price: 89.99,
  description:
    "Stay warm and stylish with our Urban Comfort Jacket, designed for all seasons and crafted with sustainable materials.",
  images: [
      `https://picsum.photos/400/500?random=${1}`,
            `https://picsum.photos/400/500?random=${2}`,
            `https://picsum.photos/400/500?random=${3}`,
            `https://picsum.photos/400/500?random=${4}`,
                  `https://picsum.photos/400/500?random=${5}`


   
  ],
  sizes: ["S", "M", "L", "XL"],
  colors: [
    { name: "Black", hex: "#000000" },
    { name: "Grey", hex: "#808080" },
    { name: "Olive", hex: "#556B2F" },
  ],
  characteristics: {
    Brand: "UrbanEdge",
    Material: "Cotton Blend",
    Fit: "Regular",
    Features: "Water-resistant, Breathable, Eco-friendly",
  },
};


const similarProduct = [
  {
    name: "All-Weather Trench Coat",
    originalPrice: 139.99,
    price: 99.99,
    description:
      "A versatile trench coat designed to keep you dry and fashionable, made from recycled fabrics.",
    images: [
      `https://picsum.photos/400/500?random=${5}`
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Beige", hex: "#F5F5DC" },
      { name: "Navy", hex: "#000080" },
    ],
    characteristics: {
      Brand: "EcoWear",
      Material: "Recycled Polyester",
      Fit: "Slim",
      Features: "Waterproof, Breathable, Lightweight",
    },
  },
  {
    name: "Classic Bomber Jacket",
    originalPrice: 119.99,
    price: 74.99,
    description:
      "Timeless bomber style with modern insulation. Windproof, durable, and super comfy.",
    images: [
      `https://picsum.photos/400/500?random=${3}`
    ],
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Maroon", hex: "#800000" },
    ],
    characteristics: {
      Brand: "UrbanLine",
      Material: "Nylon",
      Fit: "Regular",
      Features: "Windproof, Zipper pockets, Machine washable",
    },
  },
  {
    name: "Eco-Chic Puffer",
    originalPrice: 159.99,
    price: 109.99,
    description:
      "Stay warm in style with this eco-friendly puffer jacket, filled with sustainable insulation.",
    images: [
      `https://picsum.photos/400/500?random=${1}`
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Green", hex: "#2E8B57" },
      { name: "Charcoal", hex: "#36454F" },
    ],
    characteristics: {
      Brand: "GreenFit",
      Material: "Recycled Fabric",
      Fit: "Oversized",
      Features: "Thermal, Water-resistant, Vegan materials",
    },
  },
  {
    name: "Minimalist Denim Jacket",
    originalPrice: 89.99,
    price: 69.99,
    description:
      "A sleek denim jacket for everyday wear. Designed for comfort, style, and layering.",
    images: [
      `https://picsum.photos/400/500?random=${2}`
    ],
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Denim Blue", hex: "#1E3A8A" },
      { name: "Faded Black", hex: "#3C3C3C" },
    ],
    characteristics: {
      Brand: "MinimalWear",
      Material: "Denim (Cotton)",
      Fit: "Slim",
      Features: "Durable, Stylish cut, Machine washable",
    },
  },
];


const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [quantity, setQuantity] = useState(1);

  return (
    <div className="w-full">
    <section className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-start">
      {/* Left: Thumbnails + Main Image */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Thumb ${i + 1}`}
              className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                selectedImage === img ? "border-black" : "border-transparent"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        <div className="flex-1">
          <img
            src={selectedImage}
            alt="Selected Product"
            className="w-full h-[450px] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-600 text-sm">{product.description}</p>

        {/* Price with Original Price */}
        <div className="flex items-center gap-4">
          <p className="text-lg text-gray-500 line-through">
            ${product.originalPrice.toFixed(2)}
          </p>
          <p className="text-xl font-semibold text-gray-800">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Color Selection as Circles */}
        <div className="flex gap-3 items-center">
          <span className="text-sm font-medium">Color:</span>
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              className={`w-6 h-6 rounded-full border-2 ${
                selectedColor?.name === color.name
                  ? "border-black"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>

        {/* Quantity Input */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>

        {/* Size Selection */}
        <div className="flex gap-3 items-center">
          <span className="text-sm font-medium">Size:</span>
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-3 py-1 text-xs border rounded ${
                selectedSize === size
                  ? "bg-black text-white"
                  : "text-gray-700 border-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => {
            if (!selectedColor) {
              toast.error("Please select a color");
              return;
            }

            if (!selectedSize) {
              toast.error("Please select a size");
              return;
            }

            toast.success(
              `${quantity}x "${product.name}" (Color: ${selectedColor.name}, Size: ${selectedSize}) added to cart`
            );
          }}
          className="mt-4 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>

        {/* Characteristics Table */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Product Details</h3>
          <table className="w-full text-sm text-left text-gray-600 border border-gray-200 rounded">
            <tbody>
              {Object.entries(product.characteristics).map(([key, value]) => (
                <tr key={key} className="border-t border-gray-200">
                  <th className="p-2 font-medium w-1/3 bg-gray-50">{key}</th>
                  <td className="p-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      

    </section>
     <div className="mt-20">
        <h2 className="text-2xl text-center font-medium mb-4">
          You May Also Like </h2>
        <YouMayProduct product={similarProduct}/>

       
      </div>
    </div>
  );
};

export default ProductDetails;
