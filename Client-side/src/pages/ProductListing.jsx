import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useTranslation } from '../context/TranslationContext';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import { demoProduct } from '../../demo';
const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [productsPerPage] = useState(20);
  
  // Filter and search state
  const [filters, setFilters] = useState({
    priceRange: searchParams.get('priceRange') || 'all'
  });
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  // Fetch products with pagination and filters
  const fetchProducts = async (page = 1, searchParams = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query parameters
      const params = {
        page,
        limit: productsPerPage,
        ...searchParams
      };

      // Add filters to query params
      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (min !== undefined) params.minPrice = min;
        if (max !== undefined) params.maxPrice = max;
        console.log('💰 Filtering by price range:', min, 'to', max);
      }
      if (searchQuery) {
        params.search = searchQuery;
        console.log('🔍 Searching for:', searchQuery);
      }

      console.log('🔍 Fetching products with params:', params);
      const response = await productService.getAllProducts(params);
      console.log('📦 API Response:', response);
      
      setProducts(response.products || []);
      setTotalPages(response.totalPages || 1);
      setTotalProducts(response.totalProducts || 0);
      setCurrentPage(page);
      setError(null);
    } catch (error) {
      console.error('❌ Error fetching products:', error);
      // setError('Failed to load products. Please try again later.');
setProducts(demoProduct);

    } finally {
      setLoading(false);
    }
  };

  // Update URL params when filters change
  const updateURLParams = (newFilters, newSearch) => {
    const params = new URLSearchParams();
    if (newSearch) params.set('search', newSearch);
    if (newFilters.priceRange !== 'all') params.set('priceRange', newFilters.priceRange);
    setSearchParams(params);
  };

  // Initial load
  useEffect(() => {
    fetchProducts(1, { search: searchQuery });
  }, []);

  // Refetch when filters or search changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts(1, { search: searchQuery });
      updateURLParams(filters, searchQuery);
    }, 500); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [searchQuery, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    console.log('🔧 Filter changed:', name, '=', value);
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    updateURLParams(newFilters, searchQuery);
  };

  const clearFilters = () => {
    const newFilters = {
      priceRange: 'all'
    };
    setFilters(newFilters);
    setSearchQuery('');
    updateURLParams(newFilters, '');
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchProducts(page, { search: searchQuery });
    }
  };

  // Pagination component
  const Pagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }




    return (
      <div className="flex items-center justify-center space-x-2 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>
        
        {startPage > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              1
            </button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}
        
        {pages.map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 rounded-lg border ${
              currentPage === page
                ? 'bg-[#C585D7] text-white border-[#C585D7]'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-[#FFF9F6] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#2F2F2F] tracking-tight">{t('exploreOurProducts')}</h1>
          <p className="mt-4 text-lg text-[#6A6A6A] max-w-2xl mx-auto">{t('discoverYourBeauty')}</p>
          {totalProducts > 0 && (
            <p className="mt-2 text-sm text-[#6A6A6A]">
              Showing {((currentPage - 1) * productsPerPage) + 1} - {Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts} products
            </p>
          )}
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
            <button 
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="md:hidden p-3 bg-white border-2 border-[#C585D7] rounded-full text-[#C585D7] hover:bg-gray-50 transition"
            >
              <FiFilter className="w-5 h-5" />
            </button>
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
                    <option value="0-100">ETB 0 - ETB 100</option>
                    <option value="100-500">ETB 100 - ETB 500</option>
                    <option value="500-1000">ETB 500 - ETB 1000</option>
                    <option value="1000-2000">ETB 1000 - ETB 2000</option>
                    <option value="2000-5000">ETB 2000 - ETB 5000</option>
                    <option value="5000-999999">ETB 5000+</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="md:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: productsPerPage }).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-[#2F2F2F]">{t('errorLoadingProducts')}</h3>
                <p className="text-[#6A6A6A] mt-2">{error}</p>
                <button
                  onClick={() => fetchProducts(1)}
                  className="mt-4 px-6 py-2 bg-[#C585D7] text-white rounded-lg hover:bg-[#008080] transition-colors"
                >
                  {t('tryAgain')}
                </button>
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                {totalPages > 1 && <Pagination />}
              </>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-[#2F2F2F]">{t('noProductsFound')}</h3>
                <p className="text-[#6A6A6A] mt-2">{t('tryAdjustingFilters')}</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-[#C585D7] text-white rounded-lg hover:bg-[#008080] transition-colors"
                >
                  {t('clearAllFilters')}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;