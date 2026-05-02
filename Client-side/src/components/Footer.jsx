import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const footerLinks = {
  quick: [
    { label: 'Shop All', path: '/products' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ],
  support: [
    { label: 'Shipping Info', path: '/shipping' },
    { label: 'FAQ', path: '/faq' },
    { label: 'My Orders', path: '/orders' },
    { label: 'My Wishlist', path: '/wishlist' },
  ],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden bg-[#17151c] text-gray-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(197,133,215,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(0,128,128,0.16),_transparent_24%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-18 pb-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.95fr]">
          <div className="space-y-6 rounded-[1.75rem] border border-white/8 bg-white/5 p-7 backdrop-blur-sm">
            <div>
              <div className="section-kicker !bg-white/6 !border-white/10 !text-secondary-accent mb-4">
                Ethiopian Beauty Rituals
              </div>
              <span className="text-3xl font-serif font-bold text-white">AdeyBloom</span>
              <p className="mt-4 max-w-md text-sm text-gray-300/78 leading-relaxed">
                Empowering Ethiopian beauty through premium, curated products designed to feel elevated from first glance to final glow.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-gray-300/82">
              <div className="flex items-center gap-3">
                <FiMapPin className="text-primary-accent shrink-0" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-primary-accent shrink-0" />
                <span>+251-902-329-031</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMail className="text-primary-accent shrink-0" />
                <span>samuelaemrowork12@gmail.com</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-[0.22em] mb-5">Quick Links</h4>
            <ul className="space-y-3.5">
              {footerLinks.quick.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-gray-300/82 hover:text-primary-accent transition-colors flex items-center gap-1.5 group"
                  >
                    <FiArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-[0.22em] mb-5">Support</h4>
            <ul className="space-y-3.5">
              {footerLinks.support.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="text-sm text-gray-300/82 hover:text-primary-accent transition-colors flex items-center gap-1.5 group"
                  >
                    <FiArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-[0.22em] mb-5">Follow Us</h4>
            <p className="text-sm text-gray-300/74 mb-5 leading-relaxed">
              Stay connected with the latest beauty trends, launch drops, and thoughtful offers.
            </p>
            <div className="flex gap-3 mb-6">
              {[
                { Icon: FiFacebook, label: 'Facebook' },
                { Icon: FiTwitter, label: 'Twitter' },
                { Icon: FiInstagram, label: 'Instagram' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-300 hover:text-primary-accent hover:border-primary-accent transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <div className="rounded-[1.25rem] border border-white/8 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-secondary-accent mb-2">Why People Return</p>
              <p className="text-sm text-gray-300/78 leading-relaxed">
                Elegant textures, considered formulas, and a storefront that feels as premium as the products.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400/70">
            &copy; {currentYear} AdeyBloom. All rights reserved.
          </p>
          <p className="text-xs text-gray-400/70">
            Made with care for Ethiopian beauty
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
