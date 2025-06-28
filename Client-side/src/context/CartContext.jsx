import React, { createContext, useContext, useState, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';

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
      setError(null);
      const response = await cartService.getCart();
      // The backend returns cart with products array, each item has product and quantity
      setCartItems(response.products || []);
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError(err.response?.data?.message || 'Failed to fetch cart');
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      setError(null);
      const response = await cartService.addToCart(product._id, quantity);
      setCartItems(response.products || []);
      return { success: true };
    } catch (err) {
      console.error('Error adding to cart:', err);
      const errorMessage = err.response?.data?.message || 'Failed to add item to cart';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      setError(null);
      const response = await cartService.updateCartItem(productId, quantity);
      setCartItems(response.products || []);
      return { success: true };
    } catch (err) {
      console.error('Error updating cart item:', err);
      const errorMessage = err.response?.data?.message || 'Failed to update cart item';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setError(null);
      const response = await cartService.removeFromCart(productId);
      setCartItems(response.products || []);
      return { success: true };
    } catch (err) {
      console.error('Error removing from cart:', err);
      const errorMessage = err.response?.data?.message || 'Failed to remove item from cart';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      await cartService.clearCart();
      setCartItems([]);
      return { success: true };
    } catch (err) {
      console.error('Error clearing cart:', err);
      const errorMessage = err.response?.data?.message || 'Failed to clear cart';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.product._id === productId);
  };

  const getCartItemQuantity = (productId) => {
    const item = cartItems.find(item => item.product._id === productId);
    return item ? item.quantity : 0;
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
    itemCount: getCartItemCount(),
    isInCart,
    getCartItemQuantity,
    refreshCart: fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext; 