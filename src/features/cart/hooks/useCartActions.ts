
import { useState } from 'react';
import { toast } from 'sonner';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variants?: string[];
}

export function useCartActions(initialItems: CartItem[] = []) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // Prepare the cart items for submission
      const orderData = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          variants: item.variants || []
        })),
        subtotal: calculateSubtotal(),
        tax: calculateSubtotal() * 0.1,
        total: calculateSubtotal() * 1.1
      };

      // This would typically go to a real API endpoint
      console.log('Submitting order:', orderData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Order successfully placed! Redirecting to payment...");
      // In a real app, we might redirect to a payment processor or confirmation page
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error("There was a problem processing your order. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return {
    cartItems,
    setCartItems,
    updateQuantity,
    removeItem,
    calculateSubtotal,
    handleCheckout,
    isCheckingOut
  };
}
