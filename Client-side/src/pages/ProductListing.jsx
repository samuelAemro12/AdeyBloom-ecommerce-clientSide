import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiSearch, FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../context/TranslationContext';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import { demoProduct } from '../../demo';

const PRICE_RANGES = [
  { label: 'All Prices', value: 'all' },
  { label: 'ETB 0 – 100', value: '0-100' },
  { label: 'ETB 100 – 500', value: '100-500' },
  { label: 'ETB 500 – 1,000', value: '500-1000' },
  { label: 'ETB 1,000 – 2,000', value: '1000-2000' },
  { label: 'ETB 2,000 – 5,000', value: '2000-5000' },
  { label: 'ETB 5,000+', value: '5000-999999' },
];

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 20;

  const [filters, setFilters] = useState({ priceRange: searchParams.get('priceRange') || 'all' });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const fetchProducts = async (page = 1, extra = {}) => {
    try {
      setLoading(true);
      setError(null);
      const params = { page, limit: productsPerPage, ...extra };

      if (filters.priceRange !== 'all') {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (!isNaN(min)) params.minPrice = min;
        if (!isNaN(max)) params.maxPrice = max;
      }
      if (searchQuery) params.search = searchQuery;

      const response = await productService.getAllProducts(params);
      setProducts(response.products || []);
      setTotalPages(response.totalPages || 1);
      setTotalProducts(response.totalProducts || 0);
      setCurrentPage(page);
    } catch {
      setProducts(demoProduct);
    } finally {
      setLoading(false);
    }
  };

  const updateURLParams = (newFilters, newSearch) => {
    const params = new URLSearchParams();
    if (newSearch) params.set('search', newSearch);
    if (newFilters.priceRange !== 'all') params.set('priceRange', newFilters.priceRange);
    setSearchParams(params);
  };

  useEffect(() => { fetchProducts(1, { search: searchQuery }); }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      fetchProducts(1, { search: searchQuery });
      updateURLParams(filters, searchQuery);
    }, 500);
    return () => clearTimeout(id);
  }, [searchQuery, filters]);

  const handleFilterChange = (priceRange) => {
    const newFilters = { ...filters, priceRange };
    setFilters(newFilters);
    updateURLParams(newFilters, searchQuery);
  };

  const clearFilters = () => {
    const newFilters = { priceRange: 'all' };
    setFilters(newFilters);
    setSearchQuery('');
    updateURLParams(newFilters, '');
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) fetchProducts(page, { search: searchQuery });
  };

  const hasActiveFilters = filters.priceRange !== 'all' || searchQuery.length > 0;

  // Pagination
  const Pagination = () => {
    const max = 5;
    let start = Math.max(1, currentPage - Math.floor(max / 2));
    let end = Math.min(totalPages, start + max - 1);
    if (end - start + 1 < max) start = Math.max(1, end - max + 1);
    const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

    return (
      <div className="flex items-center justify-center gap-1.5 mt-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-lg border border-cloud-gray flex items-center justify-center hover:border-primary-accent hover:text-primary-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <FiChevronLeft className="w-4 h-4" />
        </button>

        {start > 1 && (
          <>
            <button onClick={() => handlePageChange(1)} className="w-9 h-9 rounded-lg border border-cloud-gray text-sm hover:border-primary-accent hover:text-primary-accent transition-colors">1</button>
            {start > 2 && <span className="text-secondary-text px-1">…</span>}
          </>
        )}

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-9 h-9 rounded-lg border text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-primary-accent border-primary-accent text-white'
                : 'border-cloud-gray hover:border-primary-accent hover:text-primary-accent'
            }`}
          >
            {page}
          </button>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && <span className="text-secondary-text px-1">…</span>}
            <button onClick={() => handlePageChange(totalPages)} className="w-9 h-9 rounded-lg border border-cloud-gray text-sm hover:border-primary-accent hover:text-primary-accent transition-colors">{totalPages}</button>
          </>
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 rounded-lg border border-cloud-gray flex items-center justify-center hover:border-primary-accent hover:text-primary-accent disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <FiChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-accent mb-2">Shop</p>
          <h1 className="section-heading mb-3">{t('exploreOurProducts')}</h1>
          <p className="text-sm text-secondary-text max-w-xl mx-auto">{t('discoverYourBeauty')}</p>
          {totalProducts > 0 && !loading && (
            <p className="mt-3 text-xs text-secondary-text">
              Showing {((currentPage - 1) * productsPerPage) + 1}–{Math.min(currentPage * productsPerPage, totalProducts)} of {totalProducts} products
            </p>
          )}
        </div>

        {/* Search Bar – sticky */}
        <div className="sticky top-16 z-30 bg-background/90 backdrop-blur-sm py-3 mb-6 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-cloud-gray/30">
          <div className="max-w-2xl mx-auto flex gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-secondary-text w-4 h-4" />
              <input
                type="text"
                placeholder={t('searchProducts')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border-2 border-cloud-gray focus:border-primary-accent focus:outline-none transition-colors text-sm bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-secondary-text hover:text-primary-text"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
            {/* Mobile filter toggle */}
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`md:hidden flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-colors ${
                isFilterOpen || hasActiveFilters
                  ? 'border-primary-accent text-primary-accent bg-secondary-accent/30'
                  : 'border-cloud-gray text-primary-text'
              }`}
            >
              <FiFilter className="w-4 h-4" />
              {hasActiveFilters ? 'Filtered' : t('filters')}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar – Desktop (always visible) + Mobile (toggle) */}
          <AnimatePresence>
            {(isFilterOpen || true) && (
              <motion.aside
                className={`shrink-0 w-56 ${isFilterOpen ? 'block' : 'hidden md:block'}`}
                initial={false}
              >
                <div className="bg-white rounded-2xl border border-cloud-gray/50 p-5 sticky top-36">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-sm font-semibold text-primary-text">{t('filters')}</h2>
                    {hasActiveFilters && (
                      <button onClick={clearFilters} className="text-xs text-primary-accent hover:underline">
                        {t('clearAll')}
                      </button>
                    )}
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-secondary-text mb-3">
                      {t('priceRange')}
                    </h3>
                    <div className="space-y-1">
                      {PRICE_RANGES.map(({ label, value }) => (
                        <button
                          key={value}
                          onClick={() => handleFilterChange(value)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            filters.priceRange === value
                              ? 'bg-secondary-accent text-primary-accent font-medium'
                              : 'text-primary-text hover:bg-background'
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <main className="flex-1 min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 9 }).map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
                {totalPages > 1 && <Pagination />}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">🔍</p>
                <h3 className="text-xl font-serif font-semibold text-primary-text mb-2">{t('noProductsFound')}</h3>
                <p className="text-sm text-secondary-text mb-6">{t('tryAdjustingFilters')}</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary text-sm"
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
