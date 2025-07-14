import {IoMdClose} from 'react-icons/io';
import CartContent from '../Cart/CartContent';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({drawerOpen, toggleCartDrawer}) => {

  const navigate=useNavigate();

  const handleCheckout=()=>{
    navigate('/checkout');
    toggleCartDrawer();

  }
  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-1/4 h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className='flex justify-end p-4'>
        <button onClick={toggleCartDrawer} className=''>
          <IoMdClose className='h-6 w-6 text-gray-600' />
          </button>

      </div>

      {/*Card Content*/}
      <div className='flex-grow overflow-y-auto p-4'>
        <h2 className='text-xl font-semibold mb-4 '>Your Cart</h2>
        <CartContent/>
      </div>

      <div className='p-4 bg-white sticky bottom-0'>
        <button onClick={handleCheckout} className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'>Checkout</button>
        <p className='text-sm text-gray-600 mt-2 tracking-tighter'>Shipping, taxes, and discounts calculated at checkout.</p>

      </div>
    </div>
  )
}

export default CartDrawer

