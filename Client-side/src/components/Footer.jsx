import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400 mt-auto">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1 space-y-5">
            <div>
              <span className="text-2xl font-serif font-bold text-white">AdeyBloom</span>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-xs">
                Empowering Ethiopian beauty through premium, curated products designed for you.
              </p>
            </div>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 text-sm">
                <FiMapPin className="text-primary-accent shrink-0" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FiPhone className="text-primary-accent shrink-0" />
                <span>+251-902-329-031</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FiMail className="text-primary-accent shrink-0" />
                <span>samuelaemrowork12@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Shop All', path: '/products' },
                { label: 'About Us', path: '/about' },
                { label: 'Contact', path: '/contact' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm hover:text-primary-accent transition-colors flex items-center gap-1.5 group"
                  >
                    <FiArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">Support</h4>
            <ul className="space-y-3">
              {[
                { label: 'Shipping Info', path: '/shipping' },
                { label: 'FAQ', path: '/faq' },
                { label: 'My Orders', path: '/orders' },
                { label: 'My Wishlist', path: '/wishlist' },
              ].map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm hover:text-primary-accent transition-colors flex items-center gap-1.5 group"
                  >
                    <FiArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-widest mb-5">Follow Us</h4>
            <p className="text-sm mb-5 leading-relaxed">
              Stay connected with the latest beauty trends and offers.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FiFacebook, label: 'Facebook' },
                { Icon: FiTwitter, label: 'Twitter' },
                { Icon: FiInstagram, label: 'Instagram' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-primary-accent hover:border-primary-accent transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            &copy; {currentYear} AdeyBloom. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Made with 🌸 for Ethiopian beauty
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
