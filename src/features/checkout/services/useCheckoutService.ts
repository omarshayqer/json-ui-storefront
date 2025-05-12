
import axios from 'axios';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variants?: Record<string, string>;
}

export function useCheckoutService() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const apiEndpoint = '/api/checkout';
  
  const processCheckout = async (items: CartItem[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(apiEndpoint, {
        items,
        paymentMethod: 'credit-card',
        shippingAddress: {
          // In a real app, this would come from form data
          // For demo purposes, using placeholder
          address: 'Demo Address',
          city: 'Demo City',
          state: 'Demo State',
          zipCode: '12345',
        }
      });
      
      // Clear cart after successful checkout
      localStorage.removeItem('cart');
      
      return response.data;
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to process checkout. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    error,
    processCheckout
  };
}
