
import { useState, useEffect } from 'react';
import { getProducts, Product } from '@/mocks/products';

interface UseProductsParams {
  limit?: number;
  category?: string;
}

export function useProducts({ limit, category }: UseProductsParams = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Use the mock data instead of fetching from API
        const data = getProducts({ limit, category });
        
        // Add a small delay to simulate network request
        setTimeout(() => {
          setProducts(data);
          setLoading(false);
          setError(null);
        }, 500);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setProducts([]);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, category]);

  return { products, loading, error };
}

export type { Product };
