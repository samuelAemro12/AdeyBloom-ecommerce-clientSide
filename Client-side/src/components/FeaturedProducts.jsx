import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { productService } from '../services/productService';
import { useTranslation } from '../context/TranslationContext';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔍 Fetching featured products from API...');
        console.log('🌐 API URL:', import.meta.env.VITE_API_URL);
        
        // Use the new getFeaturedProducts method to get only 8 products
        const response = await productService.getFeaturedProducts(8);
        console.log('📦 API Response:', response);
        
        // The API returns { products: [...], totalPages, currentPage, totalProducts }
        const products = response.products || response;
        console.log('🎯 Products extracted:', products);
        
        setProducts(products);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching products:', err);
        console.error('❌ Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          config: err.config
        });
        setError(`Failed to load products: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-4">
              {t('featuredProducts')}
            </h2>
            <p className="text-lg text-secondary-text max-w-2xl mx-auto">
              {t('featuredProductsDesc')}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary-text mb-4">
              {t('featuredProducts')}
            </h2>
            <p className="text-lg text-secondary-text max-w-2xl mx-auto">
              {t('featuredProductsDesc')}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="bg-coral-rose/10 border border-coral-rose/20 rounded-lg p-8 max-w-md mx-auto">
              <p className="text-coral-rose font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-primary-accent text-white rounded-full hover:bg-brand-highlight transition-colors duration-300"
              >
                {t('tryAgain')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <FiStar className="text-primary-accent w-8 h-8 mr-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-primary-text">
              {t('featuredProducts')}
            </h2>
            <FiStar className="text-primary-accent w-8 h-8 ml-3" />
          </div>
          <p className="text-lg text-secondary-text max-w-2xl mx-auto">
            {t('featuredProductsDesc')}
          </p>
        </motion.div>
        
        {products.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          >
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="bg-card-bg border border-cloud-gray rounded-lg p-8 max-w-md mx-auto">
              <p className="text-secondary-text">{t('noProductsFound')}</p>
            </div>
          </motion.div>
        )}

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center"
        >
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-[#C585D7] hover:bg-[#008080] text-white rounded-full transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              {t('viewAllProducts')} 
              <FiArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 