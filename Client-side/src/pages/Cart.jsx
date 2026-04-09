import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import LoadingSpinner from '../components/LoadingSpinner';
import { useTranslation } from '../context/TranslationContext';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiArrowLeft, FiCreditCard } from 'react-icons/fi';
import useRequireAuth from '../context/useRequireAuth';

const Cart = () => {
  const { cartItems, loading, error } = useCart();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const requireAuth = useRequireAuth();

  const handleProceedToCheckout = () => {
    const proceed = requireAuth(() => navigate('/checkout'), { returnTo: '/checkout' });
    if (!proceed) return;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-coral-rose text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back link + Title */}
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm text-secondary-text hover:text-primary-accent transition-colors mb-5"
          >
            <FiArrowLeft className="w-4 h-4" />
            {t('continueShopping')}
          </Link>
          <h1 className="section-heading">{t('shoppingCart')}</h1>
          {cartItems.length > 0 && (
            <p className="text-sm text-secondary-text mt-1">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</p>
          )}
        </div>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 rounded-full bg-secondary-accent flex items-center justify-center mx-auto mb-6">
              <FiShoppingBag className="w-9 h-9 text-primary-accent" />
            </div>
            <h2 className="text-xl font-serif font-semibold text-primary-text mb-3">{t('yourCartIsEmpty')}</h2>
            <p className="text-sm text-secondary-text mb-8 max-w-xs mx-auto">{t('cartEmptyMessage')}</p>
            <Link to="/products" className="btn-primary">
              {t('startShopping')}
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-cloud-gray/50 shadow-sm p-6">
                <h2 className="text-sm font-semibold text-primary-text mb-5 uppercase tracking-wider">
                  {t('cartItems')} ({cartItems.length})
                </h2>
                <div className="divide-y divide-cloud-gray/40">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.product._id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.07 }}
                      className="py-5 first:pt-0 last:pb-0"
                    >
                      <CartItem item={item} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}

        {/* Mobile Checkout Button */}
        {cartItems.length > 0 && (
          <div className="lg:hidden mt-6">
            <motion.button
              onClick={handleProceedToCheckout}
              className="w-full flex items-center justify-center gap-2 py-4 bg-primary-accent hover:bg-brand-highlight text-white rounded-xl font-semibold text-sm transition-all duration-300"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiCreditCard className="w-4 h-4" />
              {t('proceedToCheckout')}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
