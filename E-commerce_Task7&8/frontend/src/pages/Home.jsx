import React from 'react'
import Hero from '../componets/Layout/Hero'
import GenderCollectionSection from '../componets/Products/GenderCollectionSection'
import NewArrivals from '../componets/Products/NewArrivals'
import ProductDeatils from '../componets/Products/ProductDeatils'
import YouMayProduct from '../componets/Products/YouMayProduct'
import FeaturedCollection from '../componets/Products/FeaturedCollection'
import FeatureSection from '../componets/Products/FeatureSection'

const Home = () => {

  const placeholderproducts = [
    {
    name: "All-Weather Trench Coat",
    originalPrice: 139.99,
    price: 99.99,
    description:
      "A versatile trench coat designed to keep you dry and fashionable, made from recycled fabrics.",
    images: [
 `https://picsum.photos/400/500?random=${1}`    ],
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
    name: "All-Weather Trench Coat",
    originalPrice: 139.99,
    price: 99.99,
    description:
      "A versatile trench coat designed to keep you dry and fashionable, made from recycled fabrics.",
    images: [
 `https://picsum.photos/400/500?random=${2}`    ],
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
 `https://picsum.photos/400/500?random=${3}`    ],
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
      `https://picsum.photos/400/500?random=${4}`
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
 `https://picsum.photos/400/500?random=${5}`    ],
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
  {
    name: "Eco-Chic Puffer",
    originalPrice: 159.99,
    price: 109.99,
    description:
      "Stay warm in style with this eco-friendly puffer jacket, filled with sustainable insulation.",
    images: [
      `https://picsum.photos/400/500?random=${6}`
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
    name: "Eco-Chic Puffer",
    originalPrice: 159.99,
    price: 109.99,
    description:
      "Stay warm in style with this eco-friendly puffer jacket, filled with sustainable insulation.",
    images: [
      `https://picsum.photos/400/500?random=${6}`
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
    name: "Eco-Chic Puffer",
    originalPrice: 159.99,
    price: 109.99,
    description:
      "Stay warm in style with this eco-friendly puffer jacket, filled with sustainable insulation.",
    images: [
      `https://picsum.photos/400/500?random=${7}`
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
    name: "Eco-Chic Puffer",
    originalPrice: 159.99,
    price: 109.99,
    description:
      "Stay warm in style with this eco-friendly puffer jacket, filled with sustainable insulation.",
    images: [
      `https://picsum.photos/400/500?random=${8}`
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
];
  return (
    <div>
        <Hero/>
        <GenderCollectionSection/>
        <NewArrivals/>


        <h2 className='text-3xl text-center font-bold  mt-7'>Best Seller</h2>
        <ProductDeatils/>


        <div className='container mx-auto'>
          <h2 className='text-3xl text-center font-bold  mt-7'>
            Top Wears for Women
          </h2>
          <YouMayProduct product={placeholderproducts}/>
        </div>

        <FeaturedCollection/>

        <FeatureSection/>
    </div>
  )
}

export default Home