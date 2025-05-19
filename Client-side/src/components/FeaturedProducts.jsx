import React, { useState } from 'react';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'Natural Face Cream',
      price: 29.99,
      image: '/product-1.jpg',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Organic Shampoo',
      price: 24.99,
      image: '/product-2.jpg',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Luxury Body Oil',
      price: 34.99,
      image: '/product-3.jpg',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Herbal Face Mask',
      price: 19.99,
      image: '/product-4.jpg',
      rating: 4.6,
    },
  ]);

  return (
    <section className="py-16 bg-[#FFF9F6]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#2F2F2F] text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 