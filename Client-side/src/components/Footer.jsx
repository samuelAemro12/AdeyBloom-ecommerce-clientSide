import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-semibold mb-4">AdeyBloom</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FiMapPin className="text-[#C585D7]" />
                <p>Addis Ababa, Ethiopia</p>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-[#C585D7]" />
                <p>+251-902-329-031</p>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-[#C585D7]" />
                <p>samuelaemrowork12@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="hover:text-[#C585D7] transition">Shop</Link></li>
              <li><Link to="/about" className="hover:text-[#C585D7] transition">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#C585D7] transition">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="hover:text-[#C585D7] transition">Shipping Info</Link></li>
              <li><Link to="/faq" className="hover:text-[#C585D7] transition">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-6">
              <a href="#" className="text-2xl hover:text-[#C585D7] transition"><FiFacebook /></a>
              <a href="#" className="text-2xl hover:text-[#C585D7] transition"><FiTwitter /></a>
              <a href="#" className="text-2xl hover:text-[#C585D7] transition"><FiInstagram /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; {currentYear} AdeyBloom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 