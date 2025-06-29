import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import { useTranslation } from '../context/TranslationContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Toast from '../components/Toast';

const Wishlist = () => {
  const { wishlistItems, loading, error, removeFromWishlist, moveToCart, refreshWishlist } = useWishlist();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [processingItems, setProcessingItems] = useState(new Set());
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Redirect if not authenticated
  if (!user) {
    navigate('/signin', { state: { from: '/wishlist' } });
    return null;
  }

  const handleMoveToCart = async (productId) => {
    if (processingItems.has(productId)) return;
    
    setProcessingItems(prev => new Set(prev).add(productId));
    try {
      const success = await moveToCart(productId, 1);
      if (success) {
        setToast({ 
          show: true, 
          message: t('productMovedToCart'), 
          type: 'success' 
        });
        await refreshWishlist();
      } else {
        setToast({ 
          show: true, 
          message: t('failedToMoveToCart'), 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error('Error moving to cart:', error);
      setToast({ 
        show: true, 
        message: t('failedToMoveToCart'), 
        type: 'error' 
      });
    } finally {
      setProcessingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleRemove = async (productId) => {
    if (processingItems.has(productId)) return;
    
    setProcessingItems(prev => new Set(prev).add(productId));
    try {
      const success = await removeFromWishlist(productId);
      if (success) {
        setToast({ 
          show: true, 
          message: t('productRemovedFromWishlist'), 
          type: 'success' 
        });
        await refreshWishlist();
      } else {
        setToast({ 
          show: true, 
          message: t('failedToRemoveFromWishlist'), 
          type: 'error' 
        });
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      setToast({ 
        show: true, 
        message: t('failedToRemoveFromWishlist'), 
        type: 'error' 
      });
    } finally {
      setProcessingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 bg-[#FFF9F6] min-h-[80vh]">
        <div className="text-center max-w-md mx-auto">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#C585D7] text-white px-6 py-2 rounded-full hover:bg-[#008080] transition-colors"
          >
            {t('tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 bg-[#FFF9F6] min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md mx-auto"
        >
          <FiHeart className="w-16 h-16 text-[#C585D7] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#2F2F2F] mb-4">{t('wishlistEmpty')}</h2>
          <p className="text-[#6A6A6A] mb-8">
            {t('cartEmptyMessage')}
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-[#C585D7] text-white px-8 py-3 rounded-full hover:bg-[#008080] transition-colors"
          >
            {t('startShopping')}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 bg-[#FFF9F6] min-h-[80vh]">
      <Toast 
        show={toast.show} 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
      
      <h1 className="text-4xl font-bold text-[#2F2F2F] mb-12 text-center">{t('myWishlist')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {wishlistItems.map((item) => {
          const isProcessing = processingItems.has(item.product._id);
          return (
            <div key={item.product._id} className="relative">
              <ProductCard product={item.product} />
              
              {/* Action Buttons Overlay */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <motion.button
                  onClick={() => handleMoveToCart(item.product._id)}
                  disabled={isProcessing || item.product.stock === 0}
                  className={`p-3 rounded-full shadow-lg transition-all ${
                    isProcessing 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : item.product.stock === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                  whileHover={!isProcessing && item.product.stock > 0 ? { scale: 1.1 } : {}}
                  whileTap={!isProcessing && item.product.stock > 0 ? { scale: 0.9 } : {}}
                  title={item.product.stock === 0 ? t('outOfStock') : t('moveToCart')}
                >
                  <FiShoppingBag className="w-4 h-4" />
                </motion.button>
                
                <motion.button
                  onClick={() => handleRemove(item.product._id)}
                  disabled={isProcessing}
                  className={`p-3 rounded-full shadow-lg transition-all ${
                    isProcessing 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-red-500 text-white hover:bg-red-600'
                  }`}
                  whileHover={!isProcessing ? { scale: 1.1 } : {}}
                  whileTap={!isProcessing ? { scale: 0.9 } : {}}
                  title={t('removeFromWishlist')}
                >
                  <FiTrash2 className="w-4 h-4" />
                </motion.button>
              </div>
              
              {/* Processing Indicator */}
              {isProcessing && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-2xl">
                  <div className="bg-white p-3 rounded-full">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#C585D7]"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist; 