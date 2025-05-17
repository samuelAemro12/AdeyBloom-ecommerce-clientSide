import { useState, useEffect } from 'react';
import { FiFilter, FiSearch, FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Dummy product data
const dummyProducts = [
  {
    id: 1,
    name: "Hydrating Face Serum",
    brand: "GlowCo",
    price: 29.99,
    originalPrice: 34.99,
    rating: 4.5,
    category: "skincare",
    subCategory: "serums",
    description: "A deeply hydrating serum with hyaluronic acid and vitamin B5 for plump, moisturized skin.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    stock: 15,
    tags: ["hydrating", "moisturizing", "sensitive-skin"],
    reviews: 128,
    isNew: true,
    ingredients: "Water, Hyaluronic Acid, Panthenol, Glycerin"
  },
  {
    id: 2,
    name: "Matte Lipstick - Ruby Red",
    brand: "BeautyBloom",
    price: 19.99,
    originalPrice: 24.99,
    rating: 4.8,
    category: "makeup",
    subCategory: "lips",
    description: "Long-lasting matte lipstick in a classic ruby red shade. Enriched with vitamin E.",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    stock: 23,
    tags: ["matte", "long-lasting", "classic"],
    reviews: 245,
    isNew: false,
    ingredients: "Isododecane, Silica, Vitamin E"
  },
  {
    id: 3,
    name: "Repairing Hair Mask",
    brand: "HairLuxe",
    price: 34.99,
    originalPrice: 39.99,
    rating: 4.3,
    category: "haircare",
    subCategory: "treatments",
    description: "Intensive repair mask for damaged hair with keratin and argan oil.",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    stock: 8,
    tags: ["repair", "damaged-hair", "moisturizing"],
    reviews: 89,
    isNew: false,
    ingredients: "Water, Keratin, Argan Oil, Glycerin"
  },
  {
    id: 4,
    name: "Rose & Vanilla Perfume",
    brand: "Essence",
    price: 89.99,
    rating: 4.9,
    category: "fragrance",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 5,
    name: "Vitamin C Brightening Cream",
    brand: "GlowCo",
    price: 45.99,
    rating: 4.6,
    category: "skincare",
    image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 6,
    name: "Waterproof Mascara",
    brand: "BeautyBloom",
    price: 24.99,
    rating: 4.4,
    category: "makeup",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 7,
    name: "Silk Smooth Shampoo",
    brand: "HairLuxe",
    price: 27.99,
    rating: 4.2,
    category: "haircare",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 8,
    name: "Ocean Breeze Perfume",
    brand: "Essence",
    price: 79.99,
    rating: 4.7,
    category: "fragrance",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 9,
    name: "Night Repair Serum",
    brand: "GlowCo",
    price: 59.99,
    rating: 4.8,
    category: "skincare",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 10,
    name: "Eyeshadow Palette - Sunset",
    brand: "BeautyBloom",
    price: 49.99,
    rating: 4.5,
    category: "makeup",
    image: "https://images.unsplash.com/photo-1583241475880-083f84372725?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 11,
    name: "Leave-in Conditioner",
    brand: "HairLuxe",
    price: 22.99,
    rating: 4.3,
    category: "haircare",
    image: "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 12,
    name: "Midnight Jasmine Perfume",
    brand: "Essence",
    price: 94.99,
    rating: 4.9,
    category: "fragrance",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 13,
    name: "Brightening Face Mask",
    brand: "GlowCo",
    price: 39.99,
    originalPrice: 45.99,
    rating: 4.7,
    category: "skincare",
    subCategory: "masks",
    description: "Illuminating face mask with vitamin C and niacinamide for brighter, even-toned skin.",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    stock: 20,
    tags: ["brightening", "evening", "radiance"],
    reviews: 156,
    isNew: true,
    ingredients: "Kaolin Clay, Vitamin C, Niacinamide"
  },
  {
    id: 14,
    name: "Volumizing Mascara",
    brand: "BeautyBloom",
    price: 22.99,
    originalPrice: 27.99,
    rating: 4.6,
    category: "makeup",
    subCategory: "eyes",
    description: "Dramatic volume mascara with buildable formula for bold, defined lashes.",
    image: "https://images.unsplash.com/photo-1631730359585-38a4935cbcae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    stock: 45,
    tags: ["volumizing", "long-lasting", "buildable"],
    reviews: 312,
    isNew: true,
    ingredients: "Beeswax, Carnauba Wax, Vitamin E"
  },
  {
    id: 15,
    name: "Clarifying Shampoo",
    brand: "HairLuxe",
    price: 24.99,
    originalPrice: 29.99,
    rating: 4.4,
    category: "haircare",
    subCategory: "shampoo",
    description: "Deep cleansing shampoo that removes buildup while maintaining moisture balance.",
    image: "https://images.unsplash.com/photo-1585751119414-ef2636f8aede?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    stock: 30,
    tags: ["clarifying", "deep-cleanse", "balanced"],
    reviews: 178,
    isNew: false,
    ingredients: "Water, Sodium Laureth Sulfate, Cocamidopropyl Betaine"
  }
];

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
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

  // Use dummy data with randomized loading time
  useEffect(() => {
    const loadingTime = Math.random() * 1000 + 500; // Random time between 500ms and 1500ms
    setTimeout(() => {
      setProducts(dummyProducts);
      setLoading(false);
    }, loadingTime);
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
          {/* Enhanced Filter sidebar */}
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
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Category</h3>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value, subCategory: 'all' })}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Categories</option>
                <option value="skincare">Skincare</option>
                <option value="makeup">Makeup</option>
                <option value="haircare">Haircare</option>
                <option value="fragrance">Fragrance</option>
              </select>
            </div>

            {/* Sub-Category Filter - Shows relevant options based on main category */}
            {filters.category !== 'all' && (
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-semibold mb-3">Sub-Category</h3>
                <select
                  value={filters.subCategory}
                  onChange={(e) => setFilters({ ...filters, subCategory: e.target.value })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="all">All {filters.category} Products</option>
                  {filters.category === 'skincare' && (
                    <>
                      <option value="serums">Serums</option>
                      <option value="moisturizers">Moisturizers</option>
                      <option value="masks">Masks</option>
                      <option value="cleansers">Cleansers</option>
                    </>
                  )}
                  {filters.category === 'makeup' && (
                    <>
                      <option value="lips">Lips</option>
                      <option value="eyes">Eyes</option>
                      <option value="face">Face</option>
                    </>
                  )}
                  {/* Add more sub-categories for other categories */}
                </select>
              </div>
            )}

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

            {/* Availability Filter */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-3">Availability</h3>
              <select
                value={filters.availability}
                onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Items</option>
                <option value="in-stock">In Stock</option>
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

          {/* Enhanced Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-accent"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Product Image */}
                    <div className="relative h-48">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {product.brand}
                      </p>
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Price and Rating */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-bold text-gray-900">
                          ${product.price}
                        </span>
                        <div className="flex items-center">
                          <FiStar className="text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">
                            {product.rating}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button 
                          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium
                            ${product.stock > 0 
                              ? 'bg-primary-accent text-white hover:bg-opacity-90' 
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                          disabled={product.stock === 0}
                        >
                          <FiShoppingCart />
                          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                        <button 
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                          aria-label="Add to Wishlist"
                        >
                          <FiHeart />
                        </button>
                      </div>

                      {/* Stock Status */}
                      {product.stock > 0 && product.stock < 10 && (
                        <p className="text-xs text-red-500 mt-2">
                          Only {product.stock} left in stock
                        </p>
                      )}
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