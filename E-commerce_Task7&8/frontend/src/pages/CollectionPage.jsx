import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import FilterSidebar from "../componets/Products/FilterSidebar";
import SortOption from "../componets/Products/SortOption";

const filters = {
  category: ["Top Wear", "Bottom Wear"],
  gender: ["Men", "Women"],
  colors: ["#000", "#f00", "#0f0", "#00f", "#ff0", "#0ff", "#fff", "#808080"],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  materials: ["Cotton", "Polyester", "Denim", "Linen", "Wool"],
  brands: ["UrbanEdge", "EcoWear", "GreenFit", "MinimalWear"]
};

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleCount, setVisibleCount] = useState(15);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [sortBy, setSortBy] = useState("default");
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    gender: true,
    colors: true,
    sizes: true,
    materials: false,
    brands: false
  });

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] 
        ? prev[filterType].includes(value)
          ? prev[filterType].filter(item => item !== value)
          : [...prev[filterType], value]
        : [value]
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockProducts = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        name: `Premium Product ${i + 1}`,
        price: (Math.random() * 200 + 20).toFixed(2),
        originalPrice: (Math.random() * 250 + 50).toFixed(2),
        image: `https://picsum.photos/400/500?random=${i + 1}`,
        category: filters.category[Math.floor(Math.random() * filters.category.length)],
        brand: filters.brands[Math.floor(Math.random() * filters.brands.length)],
        isNew: Math.random() > 0.7,
        onSale: Math.random() > 0.6
      }));
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getFilteredProducts = () => {
    let filtered = products;
    
    // Apply filters
    Object.entries(selectedFilters).forEach(([filterType, values]) => {
      if (values && values.length > 0) {
        filtered = filtered.filter(product => {
          if (filterType === 'category') return values.includes(product.category);
          if (filterType === 'brands') return values.includes(product.brand);
          if (filterType === 'gender') return values.some(gender => 
            product.name.toLowerCase().includes(gender.toLowerCase())
          );
          if (filterType === 'materials') return values.some(material => 
            product.name.toLowerCase().includes(material.toLowerCase())
          );
          return true;
        });
      }
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id); // Assuming higher ID means newer
        break;
      case 'popular':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); // Show new items first as "popular"
        break;
      default:
        // Keep original order for default
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-6 lg:py-10">
      {/* Mobile Header */}
      <div className="flex justify-between items-center mb-6 lg:hidden">
        <h1 className="text-2xl font-bold text-gray-900">All Collections</h1>
        <button
          onClick={() => setShowFilters(true)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <FiFilter size={16} />
          Filters
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Collections</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {filteredProducts.length} products found
          </span>
          <SortOption 
            sortBy={sortBy}
            setSortBy={setSortBy}
            variant="desktop"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Filter Sidebar Component */}
        <FilterSidebar 
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
          expandedSections={expandedSections}
          setExpandedSections={setExpandedSections}
          filteredProductsCount={filteredProducts.length}
        />

        {/* Products Grid */}
        <main className="relative">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : (
            <>
              {/* Results count for mobile */}
              <div className="lg:hidden mb-4 text-sm text-gray-600">
                {filteredProducts.length} products found
              </div>

              <div className=" pl-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {filteredProducts.slice(0, visibleCount).map((product) => (
                  <div key={product.id} className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.isNew && (
                        <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                          NEW
                        </span>
                      )}
                      {product.onSale && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                          SALE
                        </span>
                      )}
                    </div>
                    <div className="p-3 lg:p-4">
                      <h4 className="font-medium text-sm lg:text-base text-gray-900 mb-1 truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs lg:text-sm text-gray-600 mb-2">
                        {product.brand}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm lg:text-base text-gray-900">
                          ${product.price}
                        </span>
                        {product.onSale && (
                          <span className="text-xs lg:text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {visibleCount < filteredProducts.length && (
                <div className="text-center mt-8 lg:mt-12">
                  <button
                    onClick={() => setVisibleCount((prev) => prev + 15)}
                    className="px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Load More Products ({filteredProducts.length - visibleCount} remaining)
                  </button>
                </div>
              )}

              {/* No products message */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg mb-4">No products found matching your filters</p>
                  <button
                    onClick={clearAllFilters}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </section>
  );
};

export default CollectionPage;