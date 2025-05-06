
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContentProps {
  layout?: 'standard' | 'premium' | 'minimal';
}

export default function CartContent({ layout = 'standard' }: CartContentProps) {
  // Demo cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
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
    },
    {
      id: 3,
      name: "Leather Wallet",
      price: 49.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04"
    }
  ]);

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

  const handleCheckout = () => {
    toast.success("Proceeding to checkout!");
  };

  if (layout === 'premium') {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {cartItems.length > 0 ? (
              <div className="space-y-8">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden border-none shadow-md">
                    <div className="flex flex-col sm:flex-row">
                      <div className="w-full sm:w-40 h-40 bg-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                          <p className="text-lg font-medium text-gray-700 mt-2">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="h-8 w-8"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-500 hover:text-red-600"
                          >
                            <X className="h-5 w-5" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-400">
                  <ShoppingCart size={96} strokeWidth={1} />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
                <p className="mt-2 text-gray-500">Add some premium products to your cart</p>
                <div className="mt-6">
                  <Button>Continue Shopping</Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <Card className="border-none shadow-md sticky top-20">
              <CardHeader>
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${(calculateSubtotal() * 0.1).toFixed(2)}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(calculateSubtotal() * 1.1).toFixed(2)}</span>
                  </div>
                  <div className="pt-4">
                    <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
                    <div className="flex gap-2">
                      <Input id="promo" placeholder="Enter code" className="flex-1" />
                      <Button variant="outline">Apply</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  if (layout === 'minimal') {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h2 className="text-2xl font-medium mb-8">Shopping Cart ({cartItems.length})</h2>
        
        {cartItems.length > 0 ? (
          <div className="space-y-8">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center pb-4 border-b">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-500 text-sm mt-1">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-4 text-center text-sm">{item.quantity}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="h-7 w-7" 
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7 text-gray-400" 
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-6">
                <span className="font-medium">Total</span>
                <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <Button className="w-full" onClick={handleCheckout}>Checkout</Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg">
            <div className="mx-auto h-16 w-16 text-gray-400">
              <ShoppingCart size={64} strokeWidth={1} />
            </div>
            <h3 className="mt-2 text-base font-medium text-gray-900">Your cart is empty</h3>
          </div>
        )}
      </div>
    );
  }
  
  // Standard layout default
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <h2 className="text-2xl font-bold mb-4">Shopping Cart ({cartItems.length})</h2>
          
          {cartItems.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Product</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Subtotal</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{item.name}</div>
                      </TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex items-center border rounded">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <div className="mx-auto h-24 w-24 text-gray-400">
                <ShoppingCart size={96} strokeWidth={1} />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
              <p className="mt-2 text-gray-500">Looks like you haven't added any products to your cart yet.</p>
              <div className="mt-6">
                <Button>Continue Shopping</Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span>${(calculateSubtotal() * 0.08).toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(calculateSubtotal() * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Have a Promo Code?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input placeholder="Enter code" className="flex-1" />
                <Button variant="outline">Apply</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
