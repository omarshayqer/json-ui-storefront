
import { useState } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export function useProductsService() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const apiEndpoint = '/api/products';
  
  const getProducts = async (): Promise<Product[]> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be a real API call
      // const response = await axios.get(apiEndpoint);
      // return response.data;
      
      // For demo purposes, return mock data
      const mockProducts: Product[] = Array.from({ length: 10 }, (_, i) => ({
        id: `product-${i + 1}`,
        name: `Product ${i + 1}`,
        price: 99.99 + i * 10,
        discountPrice: i % 3 === 0 ? (99.99 + i * 10) * 0.8 : undefined,
        description: `This is the description for Product ${i + 1}. It features high-quality materials and modern design.`,
        image: '/placeholder.svg',
        category: i % 2 === 0 ? 'Electronics' : 'Clothing',
        rating: 3 + (i % 3),
        reviews: 10 + i * 5,
        inStock: i % 5 !== 0
      }));
      
      return mockProducts;
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
      return [];
    } finally {
      setIsLoading(false);
    }
  };
  
  const getProductById = async (id: string): Promise<Product | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be a real API call
      // const response = await axios.get(`${apiEndpoint}/${id}`);
      // return response.data;
      
      // For demo purposes, return mock data
      const mockProduct: Product = {
        id,
        name: `Product ${id}`,
        price: 99.99,
        discountPrice: parseInt(id) % 3 === 0 ? 79.99 : undefined,
        description: `This is the description for Product ${id}. It features high-quality materials and modern design.`,
        image: '/placeholder.svg',
        category: parseInt(id) % 2 === 0 ? 'Electronics' : 'Clothing',
        rating: 4,
        reviews: 25,
        inStock: true
      };
      
      return mockProduct;
    } catch (err) {
      console.error(`Error fetching product ${id}:`, err);
      setError('Failed to load product details. Please try again later.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    error,
    getProducts,
    getProductById
  };
}
