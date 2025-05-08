
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X, Plus, Minus, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCartActions, CartItem } from "../hooks/useCartActions";
import { toast } from "sonner";

interface MiniCartProps {
  position?: 'right' | 'left';
  theme?: 'light' | 'dark';
}

export default function MiniCart({ 
  position = 'right',
  theme = 'light'
}: MiniCartProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Demo cart items
  const initialCartItems: CartItem[] = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
    },
    {
      id: 2,
      name: "Wireless Headphones",
      price: 89.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901"
    }
  ];

  const {
    cartItems,
    updateQuantity,
    removeItem,
    calculateSubtotal
  } = useCartActions(initialCartItems);

  // Handle animation states
  useEffect(() => {
    if (isExpanded) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  // Position and theme classes
  const positionClasses = {
    right: 'right-0',
    left: 'left-0'
  };

  const themeClasses = {
    light: 'bg-white text-gray-800 border-gray-200',
    dark: 'bg-gray-800 text-white border-gray-700'
  };

  return (
    <div 
      className={cn(
        "fixed top-1/2 -translate-y-1/2 z-40 transition-all duration-300",
        positionClasses[position],
        isExpanded ? (position === 'right' ? 'translate-x-0' : 'translate-x-0') : 
                     (position === 'right' ? 'translate-x-[calc(100%-50px)]' : 'translate-x-[calc(-100%+50px)]')
      )}
    >
      <div 
        className={cn(
          "flex h-[400px] shadow-lg border overflow-hidden rounded-l-lg",
          themeClasses[theme]
        )}
      >
        {/* Cart Trigger */}
        <div 
          className={cn(
            "w-[50px] flex items-center justify-center cursor-pointer",
            theme === 'light' ? 'bg-brand text-white' : 'bg-gray-700',
            position === 'left' && 'order-2'
          )}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex flex-col items-center">
            <ShoppingCart className="h-6 w-6" />
            <span className="bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center mt-1">
              {cartItems.length}
            </span>
          </div>
        </div>
        
        {/* Cart Content */}
        <div 
          className={cn(
            "w-[300px] flex flex-col transition-opacity duration-300",
            isAnimating && !isExpanded ? 'opacity-0' : 'opacity-100'
          )}
        >
          <div className={cn(
            "px-4 py-3 border-b flex justify-between items-center",
            theme === 'light' ? 'border-gray-200' : 'border-gray-700'
          )}>
            <h3 className="font-medium">Your Cart ({cartItems.length})</h3>
            {position === 'right' && (
              <Button
                variant="ghost"
                size="icon"
                className={theme === 'dark' ? 'text-gray-300' : ''}
                onClick={() => setIsExpanded(false)}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            )}
            {position === 'left' && (
              <Button
                variant="ghost"
                size="icon"
                className={theme === 'dark' ? 'text-gray-300' : ''}
                onClick={() => setIsExpanded(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          
          <div className="flex-grow overflow-y-auto p-3 space-y-3">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className={cn(
                    "flex items-center p-2 rounded-lg",
                    theme === 'light' ? 'bg-gray-50' : 'bg-gray-700'
                  )}
                >
                  <div className="w-14 h-14 bg-white rounded overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-3 flex-grow">
                    <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-xs w-5 text-center">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs font-medium mr-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6" 
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <ShoppingCart className="h-10 w-10 text-gray-400 mb-2" />
                <p className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'}>
                  Your cart is empty
                </p>
              </div>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <div className={cn(
              "p-4 border-t",
              theme === 'light' ? 'border-gray-200' : 'border-gray-700'
            )}>
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal:</span>
                <span className="font-bold">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/cart">
                  <Button variant="outline" className="w-full">
                    View Cart
                  </Button>
                </Link>
                <Button className="w-full">
                  Checkout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
