
import { useState, useEffect } from 'react';
import { getProductById, Product } from '@/mocks/products';

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export function useProduct(id: string | undefined): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Product ID is required');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Use the mock data function
        const data = getProductById(id);
        
        // Add a small delay to simulate network request
        setTimeout(() => {
          if (data) {
            setProduct(data);
            setError(null);
          } else {
            throw new Error(`Product with ID ${id} not found`);
          }
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch product');
        setProduct(null);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}
