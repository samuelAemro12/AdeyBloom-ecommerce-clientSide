import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';

const CartItem = ({ item }) => {
    const { updateCartItem, removeFromCart,clearAllFromCart } = useCart();
    const { t } = useTranslation();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const handleQuantityChange = async (newQuantity) => {
        if (newQuantity < 1 || newQuantity > item.product.stock) return;
        
        setIsUpdating(true);
        try {
            await updateCartItem(item.product._id, newQuantity);
        } catch (error) {
            console.error('Error updating quantity:', error);
        } finally {
            setIsUpdating(false);
        }
    };


    const handleRemove = async () => {
        setIsRemoving(true);
        try {
            await removeFromCart(item.product._id);
        } catch (error) {
            console.error('Error removing item:', error);
        } finally {
            setIsRemoving(false);
        }
    };

    

        const clearAllFromCarts = async () => {
        setIsRemoving(true);
        try {
            await clearAllFromCart();
        } catch (error) {
            console.error('Error removing item:', error);
        } finally {
            setIsRemoving(false);
        }
    };

    const formatPrice = (price, currencyCode = 'ETB') => {
        if (!price || isNaN(price)) return `${currencyCode} 0.00`;
        
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
            return `${config.symbol}${price.toFixed(2)}`;
        }
    };

    const totalPrice = item.product.price * item.quantity;

    return (
        <motion.div 
            className="flex items-center justify-between py-6 border-b border-gray-100 last:border-b-0"
            layout
        >
            {/* Product Image and Info */}
            <div className="flex items-center space-x-4 flex-1">
                <img
                    src={item.product.images && item.product.images[0] ? item.product.images[0] : '/placeholder-image.jpg'}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-primary-text truncate">{item.product.name}</h3>
                    {item.product.brand && (
                        <p className="text-sm text-secondary-text">{item.product.brand}</p>
                    )}
                    <p className="text-lg font-bold text-primary-accent">
                        {formatPrice(item.product.price, item.product.currency)}
                    </p>
                    {item.product.stock < item.quantity && (
                        <p className="text-sm text-coral-rose">
                            {t('only')} {item.product.stock} {t('leftInStock')}
                        </p>
                    )}
                </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <motion.button
                        onClick={() => handleQuantityChange(item.quantity - 1)}
                        disabled={isUpdating || item.quantity <= 1}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FiMinus className="w-4 h-4" />
                    </motion.button>
                    
                    <span className="px-4 py-2 border-2 border-primary-accent rounded-full text-primary-text font-semibold min-w-[60px] text-center">
                        {isUpdating ? '...' : item.quantity}
                    </span>
                    
                    <motion.button
                        onClick={() => handleQuantityChange(item.quantity + 1)}
                        disabled={isUpdating || item.quantity >= item.product.stock}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FiPlus className="w-4 h-4" />
                    </motion.button>
                </div>

                {/* Total Price */}
                <div className="text-right min-w-[100px]">
                    <p className="font-bold text-lg text-primary-accent">
                        {formatPrice(totalPrice, item.product.currency)}
                    </p>
                    {item.quantity > 1 && (
                        <p className="text-sm text-secondary-text">
                            {t('each')}: {formatPrice(item.product.price, item.product.currency)}
                        </p>
                    )}
                </div>

                {/* Remove Button */}
                <motion.button
                    onClick={handleRemove}
                    disabled={isRemoving}
                    className="p-2 text-coral-rose hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title={t('removeFromCart')}
                >
                    <FiTrash2 className="w-5 h-5" />
                </motion.button>


                {/* <button onClick={clearAllFromCarts}>
                    clear all from cart
                </button> */}
            </div>
        </motion.div>
    );
};

export default CartItem; 