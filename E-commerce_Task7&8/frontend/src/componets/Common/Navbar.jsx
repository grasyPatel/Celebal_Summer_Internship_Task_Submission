
import { Link } from 'react-router-dom'
import {HiBars3BottomRight, HiOutlineShoppingBag, HiOutlineUser, } from 'react-icons/hi2'

const Navbar = () => {
  return (
    <>
    <nav className='container mx-auto flex justify-between items-center py-4 px-6'>
        <div>
            <Link to="/" className='text-2xl font-medium'>SHOPNOW</Link>
        </div>

        <div className='hidden md:flex space-x-6'>
            <Link to="/" className='hover:text-black text-gray-700 text-sm font-medium uppercase'>Men
            </Link>
             <Link to="/" className='hover:text-black text-gray-700 text-sm font-medium uppercase'>Women
            </Link>
             <Link to="/" className='hover:text-black text-gray-700 text-sm font-medium uppercase'>Top Wear
            </Link>
             <Link to="/" className='hover:text-black text-gray-700 text-sm font-medium uppercase'>Bottom Wear
            </Link>
        </div>

        <div className='flex items-center space-x-4'>
            <Link to="/profile" className='hover:text-black'>
            <HiOutlineUser className='h-6 w-6 text-gray-700'/>
            </Link>
            <button className='relative hover:text-black'>
                <HiOutlineShoppingBag  className='h-6 w-6 text-gray-700'/>
                <span className='absolute -top-1 bg-shopnow-red text-xs rounded-full px-2 py-0.5 text-white'>4</span>
            </button>

            <button className='md:hidden'>
                <HiBars3BottomRight className='h-6 w-6 text-gray-700' />
            </button>


            


            
        </div>

    </nav>
    </>
  )
}

export default Navbar