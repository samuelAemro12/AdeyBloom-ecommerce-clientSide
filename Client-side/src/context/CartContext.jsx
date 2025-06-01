import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';

// Mock data for testing
const mockCartItems = [
  {
    id: 1,
    name: "Natural Face Cream",
    price: 29.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=400"
  },
  {
    id: 2,
    name: "Organic Lip Balm",
    price: 12.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400"
  }
];

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
      setLoading(false);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await cartService.getCart();
      setCartItems(data.items || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const data = await cartService.addToCart(productId, quantity);
      setCartItems(data.items);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add item to cart');
      return false;
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      const data = await cartService.updateCartItem(productId, quantity);
      setCartItems(data.items);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update cart item');
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const data = await cartService.removeFromCart(productId);
      setCartItems(data.items);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove item from cart');
      return false;
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      setCartItems([]);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to clear cart');
      return false;
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    refreshCart: fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext; 