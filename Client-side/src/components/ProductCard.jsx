import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/useAuth';
import { FiShoppingCart, FiPlus, FiMinus, FiStar, FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';
import WishlistButton from './WishlistButton';
import { useTranslation } from '../context/TranslationContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, isInCart, getCartItemQuantity } = useCart();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!product) {
    return null;
  }

  // Use actual data from backend, with fallbacks for missing data
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
    reviewCount = 0
  } = product;

  // Handle missing essential data
  if (!name || !_id) {
    console.warn('Product missing essential data:', product);
    return null;
  }

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    // Check if user is authenticated
    // if (!user) {
    //   navigate('/signin', { state: { from: '/products' } });
    //   return;
    // }
    
    if (stock === 0) return;
    
    setIsAdding(true);
    try {
      const result = await addToCart(product, quantity);
      if (result.success) {
        // Success feedback is handled by the context
        setTimeout(() => setIsAdding(false), 1000);
      } else {
        // Error feedback is handled by the context
        setIsAdding(false);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
    }
  };

  const handleQuantityChange = (value, e) => {
    e.stopPropagation();
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= Math.min(10, stock)) {
      setQuantity(newQuantity);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${_id}`);
  };

  const formatPrice = (price, currencyCode = 'ETB') => {
    if (!price || isNaN(price)) return `${currencyCode} 0.00`;
    
    // Define currency symbols and formatting options
    const currencyConfig = {
      'ETB': { symbol: 'ETB', locale: 'en-ET' },
      'USD': { symbol: '$', locale: 'en-US' },
      'EUR': { symbol: '€', locale: 'de-DE' },
      'GBP': { symbol: '£', locale: 'en-GB' }
    };
    
    const config = currencyConfig[currencyCode] || currencyConfig['ETB'];
    
    try {
      return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2
      }).format(price);
    } catch (error) {
      // Fallback formatting
      return `${config.symbol}${price.toFixed(2)}`;
    }
  };

  // Calculate display rating (ensure it's between 0 and 5)
  const displayRating = Math.max(0, Math.min(5, rating || 0));
  const displayReviewCount = Math.max(0, reviewCount || 0);

  // Check if product is in cart (only if user is authenticated)
  const inCart = user ? isInCart(_id) : false;
  const cartQuantity = user ? getCartItemQuantity(_id) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-card-bg rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-cloud-gray/20 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div 
        className="relative cursor-pointer overflow-hidden"
        onClick={handleCardClick}
      >
        <motion.img
          src={images && images[0] ? images[0] : '/placeholder-image.jpg'}
          alt={name}
          className="w-full h-64 object-cover transition-transform duration-500"
          animate={{ scale: isHovered ? 1.05 : 1 }}
        />
        
        {/* Overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-white/90 text-primary-text p-3 rounded-full shadow-lg"
            onClick={handleCardClick}
          >
            <FiEye className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Wishlist Button */}
        <div className="absolute top-4 right-4">
          <WishlistButton productId={_id} />
        </div>

        {/* Cart Badge */}
        {user && inCart && (
          <motion.div 
            className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {cartQuantity} in cart
          </motion.div>
        )}

        {/* Discount Badge */}
        {discount && discount > 0 && (
          <motion.span 
            className={`absolute ${user && inCart ? 'top-12' : 'top-4'} left-4 bg-primary-accent text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {Math.round(discount)}% {t('off')}
          </motion.span>
        )}

        {/* Stock Status */}
        {stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-coral-rose text-white px-4 py-2 rounded-full font-semibold">
              {t('outOfStock')}
            </span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Brand */}
        {brand && (
          <p className="text-sm text-secondary-text mb-1 font-medium">{brand}</p>
        )}
        
        {/* Title */}
        <h3 
          className="text-lg font-semibold text-primary-text mb-2 line-clamp-2 cursor-pointer hover:text-primary-accent transition-colors"
          onClick={handleCardClick}
        >
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FiStar 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(displayRating) ? 'text-yellow-400 fill-current' : 'text-cloud-gray'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-secondary-text ml-2">
            ({displayReviewCount} {t('reviews')})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary-accent">
              {formatPrice(price, currency)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-secondary-text line-through text-sm">
                {formatPrice(originalPrice, currency)}
              </span>
            )}
          </div>
          
          {/* Quantity Controls - Only show if user is authenticated */}
          {user && (
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={(e) => handleQuantityChange(-1, e)}
                className="p-1 rounded-full hover:bg-secondary-accent transition-colors"
                disabled={quantity <= 1}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiMinus className="w-4 h-4 text-secondary-text" />
              </motion.button>
              <span className="px-3 py-1 border-2 border-primary-accent rounded-full text-primary-text font-semibold min-w-[40px] text-center">
                {quantity}
              </span>
              <motion.button
                onClick={(e) => handleQuantityChange(1, e)}
                className="p-1 rounded-full hover:bg-secondary-accent transition-colors"
                disabled={quantity >= Math.min(10, stock)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiPlus className="w-4 h-4 text-secondary-text" />
              </motion.button>
            </div>
          )}
        </div>
        
        {/* Add to Cart Button */}
        <div className="flex space-x-2">
          <motion.button
            onClick={handleAddToCart}
            disabled={isAdding || stock === 0}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-full transition-all duration-300 font-semibold text-lg shadow-lg ${
              isAdding 
                ? 'bg-green-600 text-white shadow-green-200' 
                : stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                  : !user
                    ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200'
                    : 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-purple-200 transform hover:-translate-y-1'
            }`}
            whileHover={!isAdding && stock > 0 ? { scale: 1.02 } : {}}
            whileTap={!isAdding && stock > 0 ? { scale: 0.98 } : {}}
          >
            <FiShoppingCart className="w-5 h-5" />
            <span className="font-bold">
              {isAdding 
                ? t('addedToCart') 
                : stock === 0 
                  ? t('outOfStock') 
                  : !user
                    ? t('signInToAddToCart')
                    : t('addToCart')
              }
            </span>
          </motion.button>
          
          {/* Wishlist Button - More Prominent */}
          <WishlistButton 
            productId={_id} 
            className="p-3 bg-white border-2 border-pink-300 hover:border-pink-400 hover:bg-pink-50 transition-colors duration-300 rounded-full shadow-lg"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard; 