import React from 'react';
import { useCart } from '../context/CartContext';
import { FiTrash2 } from 'react-icons/fi';

const CartItem = ({ item }) => {
    const { updateCartItem, removeFromCart } = useCart();

    const handleQuantityChange = async (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity > 0) {
            await updateCartItem(item.product._id, newQuantity);
        }
    };

    const handleRemove = async () => {
        await removeFromCart(item.product._id);
    };

    return (
        <div className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-4">
                <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                />
                <div>
                    <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <select
                    value={item.quantity}
                    onChange={handleQuantityChange}
                    className="px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
                <button
                    onClick={handleRemove}
                    className="text-red-600 hover:text-red-800"
                >
                    <FiTrash2 className="w-5 h-5" />
                </button>
                <p className="font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default CartItem; 