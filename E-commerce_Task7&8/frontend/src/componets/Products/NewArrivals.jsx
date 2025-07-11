import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Dummy Data
const products = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: `${10 + i * 5}`,
  image: `https://picsum.photos/400/500?random=${i + 1}`,
}));

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (el) {
      const scrollAmount = el.clientWidth / 1.2;
      el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 500);
    }
  };

  return (
    <section className="w-full px-4 md:px-10 py-16 bg-gray-50 relative">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">New Arrivals</h2>
        <p className="text-gray-600 text-sm mt-2">Fresh styles just dropped! Be the first to grab them.</p>
      </div>

      {/* Scroll Buttons */}
      <button
        className={`absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full z-20 ${
          !canScrollLeft ? 'opacity-30 cursor-not-allowed' : ''
        }`}
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
      >
        <FaChevronLeft />
      </button>

      <button
        className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow p-2 rounded-full z-20 ${
          !canScrollRight ? 'opacity-30 cursor-not-allowed' : ''
        }`}
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
      >
        <FaChevronRight />
      </button>

      {/* Scrollable Gallery */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto space-x-4 scroll-smooth pb-2"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="relative min-w-[240px] md:min-w-[290px] h-[360px] rounded-lg overflow-hidden flex-shrink-0"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3 text-white">
              <h3 className="text-sm font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-300">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
