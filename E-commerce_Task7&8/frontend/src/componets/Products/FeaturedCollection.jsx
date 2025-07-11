import React from "react";
import featuredImg from "../../assets/featured.webp";

const FeaturedCollection = () => {
  return (
    <section className="w-full  md:px-12 mb-8">
      <div className="max-w-7xl bg-green-100 mx-auto flex flex-col-reverse md:grid md:grid-cols-2 md:gap-6 md:items-center">
        
        {/* Left: Text Content */}
        <div className="space-y-6 p-6  lg:pl-4 ">
          <h2 className="text-4xl font-bold text-gray-900">
            Discover Our Featured Collection
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our hand-picked styles perfect for every season. Designed
            with comfort and sustainability in mind.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
            Shop Now
          </button>
        </div>

        {/* Right: Image */}
        <div className="w-full h-full">
          <img
            src={featuredImg}
            alt="Featured Collection"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
