import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { productService } from '../services/productService';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-[#FFF9F6]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#2F2F2F] text-center mb-12">Featured Products</h2>
          <div className="text-center">Loading products...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-[#FFF9F6]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#2F2F2F] text-center mb-12">Featured Products</h2>
          <div className="text-center text-red-600">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-[#FFF9F6]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#2F2F2F] text-center mb-12">Featured Products</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center">No products found</div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts; 