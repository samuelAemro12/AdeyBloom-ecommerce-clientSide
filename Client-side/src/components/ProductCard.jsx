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
      return new Intl.NumberFormat('en-ET', {
        style: 'currency',
        currency: c,
        minimumFractionDigits: 2,
      }).format(p);
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
      className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/78 shadow-[0_24px_60px_-34px_rgba(47,47,47,0.38)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-32px_rgba(197,133,215,0.42)] flex flex-col group backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-secondary-accent/55 to-transparent pointer-events-none" />

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

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary-text/25 via-primary-text/5 to-transparent flex items-center justify-center"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/95 text-primary-text p-2.5 rounded-full shadow-md"
            onClick={handleCardClick}
            aria-label="Quick view"
          >
            <FiEye className="w-4 h-4" />
          </motion.button>
        </motion.div>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {inCart && user && (
            <span className="glass-pill !bg-brand-highlight !text-white !border-brand-highlight/40 text-[10px] font-semibold px-2 py-0.5">
              {cartQuantity} in cart
            </span>
          )}
          {discount && discount > 0 && (
            <span className="glass-pill !bg-primary-accent !text-white !border-primary-accent/40 text-[10px] font-semibold px-2 py-0.5">
              {Math.round(discount)}% off
            </span>
          )}
          {stock === 0 && (
            <span className="glass-pill !bg-coral-rose !text-white !border-coral-rose/40 text-[10px] font-semibold px-2 py-0.5">
              {t('outOfStock')}
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3" onClick={(e) => e.stopPropagation()}>
          <WishlistButton productId={_id} />
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        {brand && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-secondary-text/85 mb-2">
            {brand}
          </p>
        )}
        <h3
          className="text-[15px] font-semibold text-primary-text mb-3 line-clamp-2 cursor-pointer hover:text-primary-accent transition-colors leading-snug flex-1"
          onClick={handleCardClick}
        >
          {name}
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <div className="glass-pill px-2.5 py-1 text-[11px] text-secondary-text">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-3 h-3 ${i < Math.floor(displayRating) ? 'text-yellow-400 fill-current' : 'text-cloud-gray'}`}
              />
            ))}
          </div>
          <span className="text-[11px] text-secondary-text">{reviewCount} reviews</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-primary-accent">{formatPrice(price, currency)}</span>
            {originalPrice && originalPrice > price && (
              <span className="text-xs text-secondary-text line-through">
                {formatPrice(originalPrice, currency)}
              </span>
            )}
          </div>

          {user && stock > 0 && (
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => handleQuantityChange(-1, e)}
                disabled={quantity <= 1}
                className="w-7 h-7 rounded-full border border-cloud-gray/70 bg-white flex items-center justify-center hover:border-primary-accent hover:text-primary-accent disabled:opacity-40 transition-colors"
              >
                <FiMinus className="w-3 h-3" />
              </button>
              <span className="text-xs font-semibold text-primary-text w-5 text-center">{quantity}</span>
              <button
                onClick={(e) => handleQuantityChange(1, e)}
                disabled={quantity >= Math.min(10, stock)}
                className="w-7 h-7 rounded-full border border-cloud-gray/70 bg-white flex items-center justify-center hover:border-primary-accent hover:text-primary-accent disabled:opacity-40 transition-colors"
              >
                <FiPlus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        <motion.button
          onClick={handleAddToCart}
          disabled={isAdding || stock === 0}
          whileHover={!isAdding && stock > 0 ? { scale: 1.02 } : {}}
          whileTap={!isAdding && stock > 0 ? { scale: 0.97 } : {}}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-all duration-250 ${
            isAdding
              ? 'bg-sage-green text-white'
              : stock === 0
              ? 'bg-gray-100 text-secondary-text cursor-not-allowed'
              : !user
              ? 'bg-primary-text text-white hover:bg-primary-accent'
              : 'bg-primary-accent text-white hover:bg-brand-highlight shadow-[0_18px_28px_-18px_rgba(197,133,215,0.9)]'
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
