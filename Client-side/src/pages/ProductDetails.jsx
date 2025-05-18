import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Mock product data for testing
const mockProduct = {
  id: 1,
  name: "Natural Face Cream",
  price: 29.99,
  description: "A luxurious natural face cream that nourishes and hydrates your skin. Made with organic ingredients and essential oils.",
  image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400",
  details: {
    "Brand": "Natural Beauty",
    "Size": "50ml",
    "Skin Type": "All skin types",
    "Key Ingredients": "Aloe Vera, Jojoba Oil, Vitamin E",
    "Benefits": "Hydrating, Nourishing, Anti-aging"
  }
};

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // For testing, we'll use mock data
        // Simulate product not found for IDs other than 1
        if (productId === "1") {
          setProduct(mockProduct);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!product) {
    navigate('/404', { replace: true });
    return null;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-2xl font-semibold text-pink-600">${product.price}</p>
          <div className="prose max-w-none">
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <label htmlFor="quantity" className="text-gray-700">Quantity:</label>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-gray-300 rounded-md p-2"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-pink-600 text-white py-3 px-6 rounded-md hover:bg-pink-700 transition-colors"
          >
            Add to Cart
          </button>

          {/* Additional Product Details */}
          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Product Details</h2>
            <ul className="space-y-2">
              {product.details && Object.entries(product.details).map(([key, value]) => (
                <li key={key} className="flex">
                  <span className="font-medium w-32 text-gray-600">{key}:</span>
                  <span className="text-gray-800">{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 