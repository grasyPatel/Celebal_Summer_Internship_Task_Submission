import { Link } from 'react-router-dom';
import {
  HiBars3BottomRight,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import Searchbar from './Searchbar';
import CartDrawer from '../Layout/CartDrawer';
import { useState } from 'react';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div>
          <Link to="/" className="text-2xl font-semibold tracking-wide">
            SHOPNOW
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6">
         
            <Link
              
              to="/collections/all"
              className="hover:text-black text-gray-700 text-sm font-medium uppercase"
            >
              MEN
            </Link>
             <Link
             
              to=""
              className="hover:text-black text-gray-700 text-sm font-medium uppercase"
            >
             WOMEN
            </Link>
             <Link
              
              to=""
              className="hover:text-black text-gray-700 text-sm font-medium uppercase"
            >
             TOP WEAR
            </Link>
             <Link
             
              to=""
              className="hover:text-black text-gray-700 text-sm font-medium uppercase"
            >
             BOTTOM WEAR
            </Link>
         
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/admin" className="text-white bg-black px-2 rounded">Admin</Link>
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          <button onClick={toggleCartDrawer} className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 -right-2 bg-shopnow-red text-xs rounded-full px-2 py-0.5 text-white">
              4
            </span>
          </button>

          <div className="overflow-hidden">
            <Searchbar />
          </div>

          {/* Mobile Nav Toggle */}
          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="flex flex-col px-6 space-y-6 mt-6">
            <h2 className="text-xl font-semibold mb-3">Categories</h2>
          {['Men', 'Women', 'Top Wear', 'Bottom Wear'].map((item) => (
            <Link
              key={item}
              to="/collections/all"
              className="text-gray-700 text-base font-medium hover:text-black uppercase"
              onClick={toggleNavDrawer}
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Backdrop (optional) */}
      {navDrawerOpen && (
        <div
          onClick={toggleNavDrawer}
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
        />
      )}
    </>
  );
};

export default Navbar;
