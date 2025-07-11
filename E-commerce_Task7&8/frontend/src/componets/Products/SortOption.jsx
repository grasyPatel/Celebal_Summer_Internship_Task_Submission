import React from "react";

const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" }
];

const SortOption = ({ 
  sortBy, 
  setSortBy, 
  variant = "desktop", // "desktop" or "mobile"
  className = ""
}) => {
  const baseClasses = "border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  
  const variantClasses = {
    desktop: "bg-white hover:bg-gray-50 transition-colors",
    mobile: "w-full bg-white"
  };

  return (
    <div className={`${className}`}>
      {variant === "mobile" && (
        <h4 className="font-medium mb-3 text-gray-900">Sort by</h4>
      )}
      
      <select 
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className={`${baseClasses} ${variantClasses[variant]}`}
        aria-label="Sort products"
      >
        {variant === "desktop" && (
          <option value="" disabled>Sort by...</option>
        )}
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {variant === "desktop" && option.value !== "default" 
              ? option.label 
              : option.label.replace("Price: ", "").replace("Name: ", "")
            }
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortOption;