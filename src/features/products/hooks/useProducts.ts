
import { useState, useEffect } from 'react';

interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

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
        // Build query params
        const params = new URLSearchParams();
        if (limit) params.append('limit', limit.toString());
        if (category) params.append('category', category);
        
        // Fetch products
        const queryString = params.toString() ? `?${params.toString()}` : '';
        const response = await fetch(`/api/products${queryString}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, category]);

  return { products, loading, error };
}
