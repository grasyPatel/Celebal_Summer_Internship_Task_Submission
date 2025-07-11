import React from "react";

const YouMayProduct = ({ product }) => {
  return (
    <section className="w-full bg-white py-10 pl-20 pr-20 ">

      <div className="w-full px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
          {product.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-96 object-cover"
              />
              <div className="p-3 space-y-2">
                <h3 className="text-base font-medium text-gray-800 truncate">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-black">
                    ${item.price.toFixed(2)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm line-through text-gray-500">
                      ${item.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouMayProduct;
