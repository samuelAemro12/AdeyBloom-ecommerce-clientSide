import { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from '../context/TranslationContext';

const WishlistButton = ({ productId, className = '' }) => {
    const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
    const { user } = useAuth();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);

    const isInWishlist = wishlistItems.some(
        item => item.product._id === productId
    );

    const handleWishlistToggle = async () => {
        if (!user) {
            // Redirect to login or show login modal
            return;
        }

        setIsLoading(true);
        try {
            if (isInWishlist) {
                await removeFromWishlist(productId);
            } else {
                await addToWishlist(productId);
            }
        } catch (error) {
            console.error('Wishlist operation failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleWishlistToggle}
            disabled={isLoading}
            className={`p-2 rounded-full transition-colors ${
                isInWishlist 
                    ? 'text-pink-500 hover:text-pink-600' 
                    : 'text-gray-400 hover:text-pink-500'
            } ${className}`}
            title={isInWishlist ? t('removeFromWishlist') : t('addToWishlist')}
        >
            {isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                    />
                    <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            ) : (
                <svg 
                    className="h-5 w-5" 
                    fill={isInWishlist ? 'currentColor' : 'none'} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth="2" 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
            )}
        </button>
    );
};

export default WishlistButton; 