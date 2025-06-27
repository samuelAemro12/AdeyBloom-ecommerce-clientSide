import { useState, useEffect } from 'react';
import { FiFilter, FiSearch, FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { productService } from '../services/productService';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const [filters, setFilters] = useState({
    category: 'all',
    subCategory: 'all',
    priceRange: 'all',
    brand: 'all',
    rating: 'all',
    availability: 'all'
  });
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch real products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productService.getAllProducts();
        // The API returns { products: [...], totalPages, currentPage, totalProducts }
        const productsData = response.products || response;
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      if (filters.category !== 'all' && product.category !== filters.category) return false;
      if (filters.subCategory !== 'all' && product.subCategory !== filters.subCategory) return false;
      if (filters.brand !== 'all' && product.brand !== filters.brand) return false;
      if (filters.rating !== 'all' && product.rating < parseInt(filters.rating)) return false;
      if (filters.availability === 'in-stock' && product.stock === 0) return false;
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !product.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (product.price < min || product.price > max) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'reviews':
          return b.reviews - a.reviews;
        case 'newest':
          return b.isNew - a.isNew;
        default:
          return 0;
      }
    });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      subCategory: 'all',
      priceRange: 'all',
      brand: 'all',
      rating: 'all',
      availability: 'all'
    });
    setSortBy('featured');
    setSearchQuery('');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const renderProductCard = (product) => (
    <div key={product._id} className="group relative bg-white border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <Link to={`/product/${product._id}`} className="block">
        <img
          src={product.images && product.images[0] ? product.images[0] : '/placeholder-image.jpg'}
          alt={product.name}
          className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-[#C585D7] transition-colors">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.brand}</p>
        <div className="flex items-center justify-between mt-3">
          <p className="text-xl font-bold text-[#C585D7]">{formatPrice(product.price)}</p>
          <div className="flex items-center space-x-1 text-yellow-500">
            <FiStar className="w-5 h-5" />
            <span>{product.rating || 4.5}</span>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button className="flex-1 bg-[#C585D7] text-white py-2 px-4 rounded-lg hover:bg-[#008080] transition-colors flex items-center justify-center">
            <FiShoppingCart className="w-5 h-5 mr-2" />
            {t('addToCart')}
          </button>
          <button className="p-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
            <FiHeart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#FFF9F6] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#2F2F2F] tracking-tight">{t('exploreOurProducts')}</h1>
          <p className="mt-4 text-lg text-[#6A6A6A] max-w-2xl mx-auto">{t('discoverYourBeauty')}</p>
        </div>

        {/* Search and Filter */}
        <div className="sticky top-0 bg-[#FFF9F6]/80 backdrop-blur-sm z-10 py-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <FiSearch className="absolute top-3.5 left-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('searchProducts')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-[#C585D7] rounded-full focus:outline-none focus:border-[#008080] transition"
              />
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={sortBy}
                onChange={handleSortChange}
                className="px-4 py-3 border-2 border-[#C585D7] rounded-full focus:outline-none focus:border-[#008080] transition"
              >
                <option value="featured">{t('featured')}</option>
                <option value="price-low">{t('priceLowToHigh')}</option>
                <option value="price-high">{t('priceHighToLow')}</option>
                <option value="rating">{t('rating')}</option>
                <option value="reviews">{t('reviews')}</option>
                <option value="newest">{t('newest')}</option>
              </select>
              <button 
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                className="md:hidden p-3 bg-white border-2 border-[#C585D7] rounded-full text-[#C585D7] hover:bg-gray-50 transition"
              >
                <FiFilter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className={`md:col-span-1 ${isFilterMenuOpen ? 'block' : 'hidden'} md:block`}>
            <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-32">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#2F2F2F]">{t('filters')}</h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-[#C585D7] hover:underline"
                >
                  {t('clearAll')}
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <h3 className="font-semibold mb-2">{t('category')}</h3>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">{t('all')}</option>
                    <option value="skincare">{t('skincare')}</option>
                    <option value="makeup">{t('makeup')}</option>
                    <option value="haircare">{t('haircare')}</option>
                    <option value="fragrance">{t('fragrance')}</option>
                  </select>
                </div>

                {/* Sub-Category Filter */}
                <div>
                  <h3 className="font-semibold mb-2">{t('subCategory')}</h3>
                  <select
                    name="subCategory"
                    value={filters.subCategory}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">{t('all')}</option>
                    <option value="serums">{t('serums')}</option>
                    <option value="lips">{t('lips')}</option>
                    <option value="treatments">{t('treatments')}</option>
                    <option value="masks">{t('masks')}</option>
                    <option value="eyes">{t('eyes')}</option>
                    <option value="shampoo">{t('shampoo')}</option>
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <h3 className="font-semibold mb-2">{t('priceRange')}</h3>
                  <select
                    name="priceRange"
                    value={filters.priceRange}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">{t('all')}</option>
                    <option value="0-25">$0 - $25</option>
                    <option value="25-50">$25 - $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100-200">$100+</option>
                  </select>
                </div>

                {/* Brand Filter */}
                <div>
                  <h3 className="font-semibold mb-2">{t('brand')}</h3>
                  <select
                    name="brand"
                    value={filters.brand}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">{t('all')}</option>
                    <option value="GlowCo">GlowCo</option>
                    <option value="BeautyBloom">BeautyBloom</option>
                    <option value="HairLuxe">HairLuxe</option>
                    <option value="Essence">Essence</option>
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="font-semibold mb-2">{t('rating')}</h3>
                  <select
                    name="rating"
                    value={filters.rating}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">{t('all')}</option>
                    <option value="4">{t('4starsAndUp')}</option>
                    <option value="3">{t('3starsAndUp')}</option>
                    <option value="2">{t('2starsAndUp')}</option>
                    <option value="1">{t('1starAndUp')}</option>
                  </select>
                </div>

                {/* Availability Filter */}
                <div>
                  <h3 className="font-semibold mb-2">{t('availability')}</h3>
                  <select
                    name="availability"
                    value={filters.availability}
                    onChange={handleFilterChange}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="all">{t('all')}</option>
                    <option value="in-stock">{t('inStock')}</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 9 }).map((_, index) => (
                  <div key={index} className="bg-white p-5 rounded-xl shadow-lg animate-pulse">
                    <div className="w-full h-56 bg-gray-200 rounded-lg"></div>
                    <div className="mt-3 h-6 w-3/4 bg-gray-200 rounded"></div>
                    <div className="mt-2 h-4 w-1/2 bg-gray-200 rounded"></div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="h-8 w-1/4 bg-gray-200 rounded"></div>
                      <div className="h-6 w-1/4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(renderProductCard)}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-[#2F2F2F]">{t('noProductsFound')}</h3>
                <p className="text-[#6A6A6A] mt-2">{t('tryAdjustingFilters')}</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;