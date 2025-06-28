import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { productService } from '../services/productService';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // Use the existing productService to search products
      const response = await productService.getAllProducts({ 
        search: searchQuery, 
        limit: 5 // Limit suggestions to 5 products
      });
      setSuggestions(response.products || []);
    } catch (error) {
      console.error('Search error:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      handleSearch(value);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  const handleSuggestionClick = (product) => {
    setQuery(product.name);
    setShowSuggestions(false);
    navigate(`/product/${product._id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
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

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={t('searchProducts')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-accent"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>

      {showSuggestions && (query.trim() || isLoading) && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">{t('loading')}</div>
          ) : suggestions.length > 0 ? (
            <ul className="py-2">
              {suggestions.map((product) => (
                <li
                  key={product._id}
                  onClick={() => handleSuggestionClick(product)}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.images && product.images[0] ? product.images[0] : '/placeholder-image.jpg'}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatPrice(product.price, product.currency)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
              <li className="px-4 py-2 text-center">
                <button
                  onClick={handleSubmit}
                  className="text-primary-accent hover:text-brand-highlight font-medium"
                >
                  {t('viewAllResults')}
                </button>
              </li>
            </ul>
          ) : query.trim() ? (
            <div className="p-4 text-center text-gray-500">
              {t('noProductsFound')}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 