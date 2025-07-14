import React, { useState, useEffect } from 'react';
import Hero from '../componets/Layout/Hero';
import GenderCollectionSection from '../componets/Products/GenderCollectionSection';
import NewArrivals from '../componets/Products/NewArrivals';
import YouMayProduct from '../componets/Products/YouMayProduct';
import FeaturedCollection from '../componets/Products/FeaturedCollection';
import FeatureSection from '../componets/Products/FeatureSection';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { product: featuredProducts, loading, error } = useSelector((state) => state.products);

  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProductsByFilters({
      gender: "women",
      category: "bottom Wear",
      limit: 8
    }));

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        setBestSellerProducts(response.data);
      } catch (error) {
        console.error("Error fetching best seller:", error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller Section */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-semibold mb-4">Best Seller</h2>
        {bestSellerProducts.length > 0 ? (
          <YouMayProduct products={bestSellerProducts} />
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </section>

      {/* Featured Products Section */}
      <section className="px-6 py-10">
        <h2 className="text-2xl font-semibold mb-4">Bottom Wear for Women</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <FeaturedCollection products={featuredProducts} />
        )}
      </section>

      <FeatureSection />
    </div>
  );
};

export default Home;
