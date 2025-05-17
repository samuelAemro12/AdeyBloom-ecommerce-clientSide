import { useState, useEffect } from 'react';
import { FiFilter, FiSearch, FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    brand: 'all',
    rating: 'all'
  });
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      if (filters.category !== 'all' && product.category !== filters.category) return false;
      if (filters.brand !== 'all' && product.brand !== filters.brand) return false;
      if (filters.rating !== 'all' && product.rating < parseInt(filters.rating)) return false;
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      
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
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      {/* Header with search and filter toggle */}
      <div className="sticky top-0 z-20 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-accent focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-primary-accent text-white rounded-lg hover:bg-opacity-90 transition"
            >
              <FiFilter />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filter sidebar */}
          <div className={`w-64 space-y-6 ${isFilterMenuOpen ? 'block' : 'hidden'} lg:block`}>
            {/* Sort */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Category</h3>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Categories</option>
                <option value="skincare">Skincare</option>
                <option value="makeup">Makeup</option>
                <option value="haircare">Haircare</option>
                <option value="fragrance">Fragrance</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Price Range</h3>
              <select
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Prices</option>
                <option value="0-25">Under $25</option>
                <option value="25-50">$25 - $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-1000">$100+</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Rating</h3>
              <select
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-accent"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                    <Link to={`/product/${product.id}`}>
                      <div className="relative pb-[100%]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="p-4">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-medium text-gray-900 mb-1 hover:text-primary-accent transition">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                        <div className="flex items-center gap-1">
                          <FiStar className="text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <button className="flex-1 flex justify-center items-center gap-2 bg-primary-accent text-white py-2 rounded hover:bg-opacity-90 transition">
                          <FiShoppingCart />
                          Add to Cart
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 transition">
                          <FiHeart />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing; 