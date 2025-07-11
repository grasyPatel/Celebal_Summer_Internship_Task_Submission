import React from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../../assets/shopnow-hero.webp'; // adjust the path if needed

const Hero = () => {
  return (
    <div
      className="w-full h-[80vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="bg-black bg-opacity-50 p-8 rounded-lg text-center max-w-xl mx-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          Discover the Latest Fashion Trends
        </h1>
        <p className="text-white text-sm sm:text-base mb-6">
          Shop stylish, premium quality clothing for men and women – only at SHOPNOW.
        </p>
        <Link to="/shop">
          <button className="bg-white text-black font-semibold px-6 py-3 rounded hover:bg-gray-200 transition duration-200">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
