// Shared product data
export const products = [
  {
    id: 1,
    name: "Urban Comfort Jacket",
    originalPrice: 129.99,
    price: 89.99,
    description:
      "Stay warm and stylish with our Urban Comfort Jacket, designed for all seasons and crafted with sustainable materials.",
    images: [
      `https://picsum.photos/400/500?random=1`,
      `https://picsum.photos/400/500?random=2`,
      `https://picsum.photos/400/500?random=3`,
      `https://picsum.photos/400/500?random=4`,
      `https://picsum.photos/400/500?random=5`,
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
  },
  {
    id: 2,
    name: "All-Weather Trench Coat",
    originalPrice: 139.99,
    price: 99.99,
    description:
      "A versatile trench coat designed to keep you dry and fashionable, made from recycled fabrics.",
    images: [`https://picsum.photos/400/500?random=6`],
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
    id: 3,
    name: "Classic Bomber Jacket",
    originalPrice: 119.99,
    price: 74.99,
    description:
      "Timeless bomber style with modern insulation. Windproof, durable, and super comfy.",
    images: [`https://picsum.photos/400/500?random=7`],
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
    id: 4,
    name: "Eco-Chic Puffer",
    originalPrice: 159.99,
    price: 109.99,
    description:
      "Stay warm in style with this eco-friendly puffer jacket, filled with sustainable insulation.",
    images: [`https://picsum.photos/400/500?random=8`],
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
    id: 5,
    name: "Minimalist Hoodie",
    originalPrice: 89.99,
    price: 59.99,
    description:
      "Clean lines and comfortable fit. Perfect for casual wear and layering.",
    images: [`https://picsum.photos/400/500?random=9`],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Grey", hex: "#808080" },
    ],
    characteristics: {
      Brand: "SimpleStyle",
      Material: "Organic Cotton",
      Fit: "Regular",
      Features: "Soft, Breathable, Machine washable",
    },
  },
  {
    id: 6,
    name: "Vintage Denim Jacket",
    originalPrice: 99.99,
    price: 69.99,
    description:
      "Classic denim jacket with a vintage wash. Timeless style that never goes out of fashion.",
    images: [`https://picsum.photos/400/500?random=10`],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blue", hex: "#4169E1" },
      { name: "Black", hex: "#000000" },
    ],
    characteristics: {
      Brand: "RetroFit",
      Material: "Cotton Denim",
      Fit: "Regular",
      Features: "Vintage wash, Button closure, Chest pockets",
    },
  },
  {
    id: 7,
    name: "Tech Fleece Jacket",
    originalPrice: 149.99,
    price: 99.99,
    description:
      "Modern fleece jacket with tech-inspired design. Warm, lightweight, and perfect for active lifestyles.",
    images: [`https://picsum.photos/400/500?random=11`],
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Navy", hex: "#000080" },
      { name: "Charcoal", hex: "#36454F" },
    ],
    characteristics: {
      Brand: "TechWear",
      Material: "Synthetic Fleece",
      Fit: "Athletic",
      Features: "Moisture-wicking, Lightweight, Zip pockets",
    },
  },
  {
    id: 8,
    name: "Cotton Blazer",
    originalPrice: 179.99,
    price: 129.99,
    description:
      "Smart-casual blazer in premium cotton. Perfect for both office and weekend wear.",
    images: [`https://picsum.photos/400/500?random=12`],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Navy", hex: "#000080" },
      { name: "Beige", hex: "#F5F5DC" },
    ],
    characteristics: {
      Brand: "ClassicFit",
      Material: "Premium Cotton",
      Fit: "Tailored",
      Features: "Structured, Lined, Two-button closure",
    },
  },
  {
    id: 9,
    name: "Windbreaker Jacket",
    originalPrice: 79.99,
    price: 54.99,
    description:
      "Lightweight windbreaker perfect for outdoor activities. Packable and weather-resistant.",
    images: [`https://picsum.photos/400/500?random=13`],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Red", hex: "#FF0000" },
      { name: "Blue", hex: "#0000FF" },
    ],
    characteristics: {
      Brand: "OutdoorGear",
      Material: "Nylon",
      Fit: "Regular",
      Features: "Packable, Wind-resistant, Adjustable hood",
    },
  },
  {
    id: 10,
    name: "Leather Moto Jacket",
    originalPrice: 299.99,
    price: 199.99,
    description:
      "Genuine leather motorcycle jacket with classic styling. Durable and timeless.",
    images: [`https://picsum.photos/400/500?random=14`],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Brown", hex: "#8B4513" },
    ],
    characteristics: {
      Brand: "RoadRider",
      Material: "Genuine Leather",
      Fit: "Fitted",
      Features: "Asymmetric zip, Multiple pockets, Quilted lining",
    },
  },
  {
    id: 11,
    name: "Sherpa Lined Jacket",
    originalPrice: 119.99,
    price: 84.99,
    description:
      "Cozy sherpa-lined jacket for maximum warmth. Perfect for cold weather adventures.",
    images: [`https://picsum.photos/400/500?random=15`],
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Tan", hex: "#D2B48C" },
      { name: "Olive", hex: "#556B2F" },
    ],
    characteristics: {
      Brand: "WarmWear",
      Material: "Cotton/Sherpa",
      Fit: "Regular",
      Features: "Sherpa lining, Button closure, Chest pockets",
    },
  },
  {
    id: 12,
    name: "Performance Track Jacket",
    originalPrice: 109.99,
    price: 79.99,
    description:
      "Athletic track jacket designed for performance and style. Moisture-wicking and comfortable.",
    images: [`https://picsum.photos/400/500?random=16`],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
    ],
    characteristics: {
      Brand: "SportsFit",
      Material: "Polyester Blend",
      Fit: "Athletic",
      Features: "Moisture-wicking, Breathable, Full zip",
    },
  },
];