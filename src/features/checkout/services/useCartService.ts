
import { useState, useEffect } from 'react';
import axios from 'axios';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variants?: Record<string, string>;
}

export function useCartService() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const apiEndpoint = '/api/cart';
  
  useEffect(() => {
    // Load cart from localStorage on component mount
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);
  
  const getCartItems = (): CartItem[] => {
    // For demo purposes, return mock data if cartItems is empty
    if (cartItems.length === 0) {
      return [
        {
          id: '1',
          name: 'Sample Product 1',
          price: 29.99,
          quantity: 1,
          image: '/placeholder.svg'
        },
        {
          id: '2',
          name: 'Sample Product 2',
          price: 49.99,
          quantity: 2,
          image: '/placeholder.svg'
        }
      ];
    }
    return cartItems;
  };
  
  const addToCart = async (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would make a POST request to add the item
      // const response = await axios.post(apiEndpoint, { ...item, quantity });
      
      // For demo purposes, we're just updating the local state
      const existingItem = cartItems.find(i => i.id === item.id);
      
      let updatedCart;
      if (existingItem) {
        updatedCart = cartItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        updatedCart = [...cartItems, { ...item, quantity }];
      }
      
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      return { success: true };
    } catch (err) {
      console.error('Add to cart error:', err);
      setError('Failed to add item to cart');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const removeFromCart = async (itemId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would make a DELETE request
      // const response = await axios.delete(`${apiEndpoint}/${itemId}`);
      
      const updatedCart = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      return { success: true };
    } catch (err) {
      console.error('Remove from cart error:', err);
      setError('Failed to remove item from cart');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateQuantity = async (itemId: string, quantity: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would make a PUT request
      // const response = await axios.put(`${apiEndpoint}/${itemId}`, { quantity });
      
      const updatedCart = cartItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
      
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      
      return { success: true };
    } catch (err) {
      console.error('Update quantity error:', err);
      setError('Failed to update quantity');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    cartItems: getCartItems(),
    isLoading,
    error,
    getCartItems,
    addToCart,
    removeFromCart,
    updateQuantity
  };
}
