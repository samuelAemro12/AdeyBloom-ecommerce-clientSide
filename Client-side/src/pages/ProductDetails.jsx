import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from '../context/TranslationContext';
import { productService } from '../services/productService';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
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
        console.error('❌ Error fetching product:', error);
        console.error('❌ Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          config: error.config
        });
        setError(`Product not found: ${error.message}`);
        setProduct(null);
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
    addToCart(product, quantity);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden">
          <img
            src={product.images && product.images[0] ? product.images[0] : '/placeholder-image.jpg'}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-semibold text-pink-600">{formatPrice(product.price)}</p>
          <div className="prose max-w-none">
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Brand */}
          {product.brand && (
            <p className="text-gray-500"><strong>Brand:</strong> {product.brand}</p>
          )}

          {/* Category */}
          {product.category && (
            <p className="text-gray-500">
              <strong>Category:</strong> {typeof product.category === 'object' ? product.category.name : product.category}
            </p>
          )}

          {/* Stock Status */}
          <p className="text-gray-500">
            <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <label htmlFor="quantity" className="text-gray-700">{t('quantity')}:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-gray-300 rounded-md p-2"
              disabled={product.stock === 0}
            >
              {Array.from({ length: Math.min(10, product.stock) }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 px-6 rounded-md transition-colors ${
              product.stock === 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-pink-600 hover:bg-pink-700'
            } text-white`}
          >
            {product.stock === 0 ? t('outOfStock') : t('addToCart')}
          </button>

          {/* Additional Product Details */}
          {product.ingredients && (
            <div className="border-t pt-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">{t('ingredients')}</h2>
              <p className="text-gray-600">{product.ingredients}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 