import React, { useRef, useState, useEffect, use } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { products } from './product'; // Import from shared file
import axios from 'axios';


const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);
  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);

        const data = response.data;
        console.log(data);
        setNewArrivals(data);

      }catch(error){
        console.log(error);
      }  
    }
    fetchNewArrivals();
    

  },[])

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
  }, [newArrivals]);

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
        className=" h-5/6 flex overflow-x-auto space-x-4 scroll-smooth pb-2"
      >
        {newArrivals.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product._id}
            className="relative min-w-[240px] md:min-w-[290px] h-[360px] rounded-lg overflow-hidden flex-shrink-0"
           >
            <img
              src={product.images[0]?.url} // Use first image from the images array
               alt={product.images[0]?.altText || product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3 text-white">
              <h3 className="text-sm font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-300">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;