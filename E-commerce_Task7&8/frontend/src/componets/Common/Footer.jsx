import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Subscribed successfully!');
  };

  return (
    <footer className="bg-gray-100 text-gray-800 py-10 px-6">
      <div className="border-b-2 pb-1 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm mb-3">Subscribe to get the latest deals & updates.</p>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Men</Link></li>
            <li><Link to="/" className="hover:underline">Women</Link></li>
            <li><Link to="/" className="hover:underline">Top Wear</Link></li>
            <li><Link to="/" className="hover:underline">Bottom Wear</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link to="/faqs" className="hover:underline">FAQs</Link></li>
            <li><Link to="/shipping" className="hover:underline">Shipping & Returns</Link></li>
            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:underline"
              >
                <FaInstagram className="text-pink-600 h-5 w-5" />
                <span>Instagram </span>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:underline"
              >
                <FaFacebookF className="text-blue-700 h-5 w-5" />
                <span>Facebook </span>
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:underline"
              >
                <FaTwitter className="text-blue-500 h-5 w-5" />
                <span>Twitter </span>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 hover:underline"
              >
                <FaYoutube className="text-red-600 h-5 w-5" />
                <span>YouTube </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
       
      {/* Bottom Line */}
      <div className="mt-10 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} SHOPNOW. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
