import React from "react";
import { Link } from "react-router-dom";

const YouMayProduct = ({ products, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!products || !Array.isArray(products) || products.length === 0) {
    return <p>No products available</p>;
  }

  return (
    <section className="w-full bg-white py-10 px-6">
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <Link
              to={`/product/${item._id}`}
              key={item._id}
              className="bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition overflow-hidden block"
            >
              <img
                src={
                  typeof item.images[0] === "string"
                    ? item.images[0]
                    : item.images[0]?.url || "https://via.placeholder.com/400"
                }
                alt={item.name}
                className="w-full h-96 object-cover"
              />
              <div className="p-3 space-y-2">
                <h3 className="text-base font-medium text-gray-800 truncate">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-black">
                    ${item.price?.toFixed(2)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm line-through text-gray-500">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouMayProduct;
