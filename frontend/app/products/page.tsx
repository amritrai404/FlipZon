// app/products/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';
import axios from '@/lib/axios';
import { Loader2 } from 'lucide-react';

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-20 px-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Our Products</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => {
               const slug = slugify(product.title);
              return (
                <ProductCard key={product._id} product={product} slug={slug} />
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductPage;
