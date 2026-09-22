import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../context/TranslationContext';
import { productService } from '../services/productService';
import WishlistButton from '../components/WishlistButton';
import { useAuth } from '../context/useAuth';
import { demoProduct } from '../../demo.js';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔍 Fetching product details for ID:', productId);
        console.log('🌐 API URL:', import.meta.env.VITE_API_URL);
        
        const productData = await productService.getProduct(productId);
        console.log('📦 Product data received:', productData);
        
        setProduct(productData);
      } catch (error) {
        // console.error('❌ Error fetching product:', error);
        // console.error('❌ Error details:', {
        //   message: error.message,
        //   response: error.response?.data,
        //   status: error.response?.status,
        //   config: error.config
        // });
        // setError(`Product not found: ${error.message}`);
        // setProduct(null);
        
        setProduct(demoProduct[productId]);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error || !product) {
    navigate('/404', { replace: true });
    return null;
  }

  const handleAddToCart = () => {
    if (!user) {
      navigate('/signin', { state: { from: `/product/${productId}` } });
      return;
    }
    addToCart(product, quantity);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_60px_-20px_rgba(197,133,215,0.25)] border border-white/60 bg-white">
          <img
            src={product.images && product.images[0] ? product.images[0] : '/placeholder-image.jpg'}
            alt={product.name}
            className="w-full h-auto max-h-[520px] object-cover"
          />
          {product.discount > 0 && (
            <span className="absolute top-4 left-4 bg-[#C585D7] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
              {Math.round(product.discount)}% OFF
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
            <WishlistButton productId={product._id} className="mt-1 shrink-0" />
          </div>

          <p className="text-2xl font-semibold text-[#C585D7]">{formatPrice(product.price, product.currency)}</p>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Brand + Category row */}
          <div className="flex flex-wrap gap-3">
            {product.brand && (
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {product.brand}
              </span>
            )}
            {product.category && (
              <span className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-purple-700">
                {typeof product.category === 'object' ? product.category.name : product.category}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <p className={`text-sm font-medium ${product.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            {product.stock > 0 ? `${product.stock} ${t('inStock')}` : t('outOfStock')}
          </p>

          {/* Quantity Input */}
          <div className="flex items-center gap-3">
            <label htmlFor="quantity" className="text-sm font-medium text-gray-700">{t('quantity')}:</label>
            <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1 || product.stock === 0}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                −
              </button>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  if (!isNaN(v) && v >= 1 && v <= Math.min(10, product.stock)) setQuantity(v);
                }}
                min={1}
                max={Math.min(10, product.stock)}
                disabled={product.stock === 0}
                className="w-14 h-10 text-center text-sm font-semibold border-x border-gray-200 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:bg-gray-50"
              />
              <button
                onClick={() => setQuantity((q) => Math.min(Math.min(10, product.stock), q + 1))}
                disabled={quantity >= Math.min(10, product.stock) || product.stock === 0}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3.5 px-6 rounded-2xl font-semibold text-sm transition-all ${
              product.stock === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#C585D7] hover:bg-[#B574C6] text-white shadow-[0_12px_28px_-10px_rgba(197,133,215,0.7)] hover:shadow-[0_16px_32px_-10px_rgba(197,133,215,0.85)]'
            }`}
          >
            {product.stock === 0 ? t('outOfStock') : t('addToCart')}
          </button>

          {/* Ingredients */}
          {product.ingredients && (
            <div className="border-t border-gray-100 pt-5 mt-2">
              <h2 className="text-base font-semibold mb-2 text-gray-800">{t('ingredients')}</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{product.ingredients}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 