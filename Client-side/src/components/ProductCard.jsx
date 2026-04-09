import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/useAuth';
import useRequireAuth from '../context/useRequireAuth';
import { FiShoppingCart, FiPlus, FiMinus, FiStar, FiEye, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import WishlistButton from './WishlistButton';
import { useTranslation } from '../context/TranslationContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, isInCart, getCartItemQuantity } = useCart();
  const { user } = useAuth();
  const requireAuth = useRequireAuth();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!product) return null;

  const {
    _id,
    name,
    brand,
    price,
    originalPrice,
    discount,
    currency = 'ETB',
    images = [],
    stock = 0,
    rating = 0,
    reviewCount = 0,
  } = product;

  if (!name || !_id) return null;

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (stock === 0) return;
    const proceed = requireAuth(async () => {
      setIsAdding(true);
      try {
        const result = await addToCart(product, quantity);
        if (!result?.success) setIsAdding(false);
        else setTimeout(() => setIsAdding(false), 1500);
      } catch {
        setIsAdding(false);
      }
    }, { intent: { type: 'cart', productId: _id, quantity } });
    if (!proceed) return;
  };

  const handleQuantityChange = (value, e) => {
    e.stopPropagation();
    const next = quantity + value;
    if (next >= 1 && next <= Math.min(10, stock)) setQuantity(next);
  };

  const handleCardClick = () => navigate(`/product/${_id}`);

  const formatPrice = (p, c = 'ETB') => {
    if (!p || isNaN(p)) return `${c} 0.00`;
    try {
      return new Intl.NumberFormat('en-ET', { style: 'currency', currency: c, minimumFractionDigits: 2 }).format(p);
    } catch {
      return `${c} ${p.toFixed(2)}`;
    }
  };

  const displayRating = Math.max(0, Math.min(5, rating || 0));
  const inCart = user ? isInCart(_id) : false;
  const cartQuantity = user ? getCartItemQuantity(_id) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl overflow-hidden border border-cloud-gray/50 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden cursor-pointer bg-card-bg"
        style={{ paddingBottom: '100%' }}
        onClick={handleCardClick}
      >
        <motion.img
          src={images?.[0] || '/placeholder-image.jpg'}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.4 }}
        />
        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/15 flex items-center justify-center"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white text-primary-text p-2.5 rounded-full shadow-md"
            onClick={handleCardClick}
            aria-label="Quick view"
          >
            <FiEye className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {inCart && user && (
            <span className="bg-brand-highlight text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {cartQuantity} in cart
            </span>
          )}
          {discount && discount > 0 && (
            <span className="bg-primary-accent text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {Math.round(discount)}% off
            </span>
          )}
          {stock === 0 && (
            <span className="bg-coral-rose text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {t('outOfStock')}
            </span>
          )}
        </div>

        {/* Wishlist */}
        <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
          <WishlistButton productId={_id} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {brand && (
          <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary-text mb-1">{brand}</p>
        )}
        <h3
          className="text-sm font-semibold text-primary-text mb-2 line-clamp-2 cursor-pointer hover:text-primary-accent transition-colors leading-snug flex-1"
          onClick={handleCardClick}
        >
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-3 h-3 ${i < Math.floor(displayRating) ? 'text-yellow-400 fill-current' : 'text-cloud-gray'}`}
              />
            ))}
          </div>
          <span className="text-[11px] text-secondary-text">({reviewCount})</span>
        </div>

        {/* Price Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-primary-accent">{formatPrice(price, currency)}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-secondary-text line-through">{formatPrice(originalPrice, currency)}</span>
            )}
          </div>

          {/* Quantity controls (only when logged in) */}
          {user && stock > 0 && (
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => handleQuantityChange(-1, e)}
                disabled={quantity <= 1}
                className="w-6 h-6 rounded-full border border-cloud-gray flex items-center justify-center hover:border-primary-accent hover:text-primary-accent disabled:opacity-40 transition-colors"
              >
                <FiMinus className="w-3 h-3" />
              </button>
              <span className="text-xs font-semibold text-primary-text w-5 text-center">{quantity}</span>
              <button
                onClick={(e) => handleQuantityChange(1, e)}
                disabled={quantity >= Math.min(10, stock)}
                className="w-6 h-6 rounded-full border border-cloud-gray flex items-center justify-center hover:border-primary-accent hover:text-primary-accent disabled:opacity-40 transition-colors"
              >
                <FiPlus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Add to Cart */}
        <motion.button
          onClick={handleAddToCart}
          disabled={isAdding || stock === 0}
          whileHover={!isAdding && stock > 0 ? { scale: 1.02 } : {}}
          whileTap={!isAdding && stock > 0 ? { scale: 0.97 } : {}}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-250 ${
            isAdding
              ? 'bg-sage-green text-white'
              : stock === 0
              ? 'bg-gray-100 text-secondary-text cursor-not-allowed'
              : !user
              ? 'bg-gray-800 text-white hover:bg-primary-accent'
              : 'bg-primary-accent text-white hover:bg-brand-highlight'
          }`}
        >
          {isAdding ? (
            <>
              <FiCheck className="w-4 h-4" />
              Added!
            </>
          ) : stock === 0 ? (
            t('outOfStock')
          ) : !user ? (
            <>
              <FiShoppingCart className="w-4 h-4" />
              {t('signInToAddToCart')}
            </>
          ) : (
            <>
              <FiShoppingCart className="w-4 h-4" />
              {t('addToCart')}
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
