import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiPackage } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { productService } from '../services/productService';
import { useTranslation } from '../context/TranslationContext';
import { demoProduct } from '../../demo.js';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.45 } },
};

const curationTags = ['Glow essentials', 'Silky textures', 'Daily rituals'];

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productService.getFeaturedProducts(8);
        let list = [];
        if (response?.products) list = response.products;
        else if (Array.isArray(response)) list = response;
        setProducts(list);
      } catch {
        setProducts(demoProduct);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="relative py-24">
      <div className="absolute inset-x-0 top-10 h-64 bg-[radial-gradient(circle_at_center,_rgba(197,133,215,0.12),_transparent_68%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-frame px-5 py-14 sm:px-8 lg:px-12">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="section-kicker mb-4">Handpicked For You</p>
            <h2 className="section-heading mb-4">{t('featuredProducts')}</h2>
            <p className="section-copy max-w-2xl mx-auto">
              {t('featuredProductsDesc')}
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {curationTags.map((label) => (
              <span key={label} className="glass-pill text-xs font-medium text-primary-text/80">
                {label}
              </span>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
            </div>
          ) : products.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {products.map((product) => (
                <motion.div key={product._id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <FiPackage className="w-12 h-12 text-cloud-gray mx-auto mb-4" />
              <p className="text-secondary-text">{t('noProductsFound')}</p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary-accent hover:bg-brand-highlight text-white rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:scale-105 shadow-[0_18px_34px_-20px_rgba(197,133,215,0.9)]"
            >
              {t('viewAllProducts')}
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
