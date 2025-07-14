import React, { useEffect } from "react";
import { FiX, FiChevronDown, FiChevronUp } from "react-icons/fi";
import SortOption from "./SortOption";
import { useNavigate, useSearchParams } from "react-router-dom";

const filters = {
  category: ["Top Wear", "Bottom Wear"],
  gender: ["Men", "Women"],
  colors: ["#000", "#f00", "#0f0", "#00f", "#ff0", "#0ff", "#fff", "#808080"],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  materials: ["Cotton", "Polyester", "Denim", "Linen", "Wool"],
  brands: ["UrbanEdge", "EcoWear", "GreenFit", "MinimalWear"],
};

const FilterSidebar = ({
  showFilters,
  setShowFilters,
  selectedFilters,
  setSelectedFilters,
  sortBy,
  setSortBy,
  expandedSections,
  setExpandedSections,
  filteredProductsCount,
}) => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // No longer calls updateUrlParams directly
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      const current = prev[filterType] || [];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      return {
        ...prev,
        [filterType]: updated,
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(selectedFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`, { replace: true });
  }, [selectedFilters]);

  return (
    <>
      {/* Filter Sidebar */}
      <aside
        className={`pr-5 fixed lg:sticky top-0 left-0 z-50 bg-white w-80 max-w-[85vw] h-full lg:h-auto lg:max-h-[calc(100vh-8rem)] overflow-y-auto transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none ${
          showFilters ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Mobile Filter Header */}
        <div className="lg:hidden flex justify-between items-center p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-lg">Filters</h3>
          <button
            onClick={() => setShowFilters(false)}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-4 lg:p-0 space-y-6">
          {/* Desktop Filter Header */}
          <div className="hidden lg:flex justify-between items-center">
            <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
            {Object.keys(selectedFilters).length > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Filter Groups */}
          <div className="space-y-4 ">
            {Object.entries(filters).map(([filterName, options]) => (
              <div key={filterName} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleSection(filterName)}
                  className="w-full flex items-center justify-between py-2 text-left"
                >
                  <h4 className="font-medium text-gray-900 capitalize">
                    {filterName}
                    {selectedFilters[filterName]?.length > 0 && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {selectedFilters[filterName].length}
                      </span>
                    )}
                  </h4>
                  {expandedSections[filterName] ? (
                    <FiChevronUp size={16} />
                  ) : (
                    <FiChevronDown size={16} />
                  )}
                </button>

                {expandedSections[filterName] && (
                  <div className="mt-3">
                    {filterName === "colors" ? (
                      <div className="grid grid-cols-4 gap-2">
                        {options.map((color, i) => (
                          <button
                            key={i}
                            style={{ backgroundColor: color }}
                            className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors relative"
                            onClick={() =>
                              handleFilterChange(filterName, color)
                            }
                          >
                            {selectedFilters[filterName]?.includes(color) && (
                              <div className="absolute inset-0 rounded-full border-2 border-blue-600 bg-black bg-opacity-20"></div>
                            )}
                          </button>
                        ))}
                      </div>
                    ) : filterName === "sizes" ? (
                      <div className="grid grid-cols-3 gap-2">
                        {options.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleFilterChange(filterName, size)}
                            className={`text-xs border px-3 py-2 rounded-lg text-center transition-colors ${
                              selectedFilters[filterName]?.includes(size)
                                ? "bg-black text-white border-black"
                                : "border-gray-300 hover:border-gray-500"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {options.map((opt) => (
                          <label
                            key={opt}
                            className="flex items-center cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={
                                selectedFilters[filterName]?.includes(opt) ||
                                false
                              }
                              onChange={() =>
                                handleFilterChange(filterName, opt)
                              }
                              className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900">
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Sort */}
            <SortOption
              sortBy={sortBy}
              setSortBy={setSortBy}
              variant="mobile"
              className="lg:hidden"
            />
          </div>

          {/* Mobile Apply Button */}
          <div className="lg:hidden pt-4 border-t">
            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Apply Filters ({filteredProductsCount})
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Filter Overlay */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}
    </>
  );
};

export default FilterSidebar;
