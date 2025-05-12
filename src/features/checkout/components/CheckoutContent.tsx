
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCheckoutService } from '../services/useCheckoutService';
import { useToast } from '@/components/ui/use-toast';
import { useStyleConfig } from '@/hooks/useStyleConfig';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Check, ChevronRight, CreditCard, Truck, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface CheckoutContentProps {
  layout?: 'standard' | 'minimal' | 'premium';
  style?: any; 
}

export default function CheckoutContent({ layout = 'standard', style }: CheckoutContentProps) {
  const [step, setStep] = useState(1);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });
  
  const { processCheckout, isLoading, error } = useCheckoutService();
  const { toast } = useToast();
  const styleProps = useStyleConfig(style);
  const { t } = useTranslation();
  
  // Mock cart items
  const cartItems = [
    { id: '1', name: 'Product 1', price: 19.99, quantity: 2 },
    { id: '2', name: 'Product 2', price: 29.99, quantity: 1 }
  ];
  
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const handleCheckout = async () => {
    try {
      await processCheckout(cartItems);
      toast({
        title: 'Order Placed',
        description: 'Your order has been successfully placed!',
        variant: 'default',
      });
      // In a real app, you would redirect to order confirmation
    } catch (err) {
      // Error handling is done in the service
      toast({
        title: 'Checkout Failed',
        description: error || 'There was an error processing your order.',
        variant: 'destructive',
      });
    }
  };
  
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="container mx-auto px-4 py-8" style={styleProps}>
      {/* Page header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">{t('checkout.title')}</h1>
        <p className="text-gray-500">Complete your purchase</p>
      </div>
      
      {/* Checkout steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
            <Truck size={20} />
          </div>
          <div className={`h-1 w-12 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
          <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
            <CreditCard size={20} />
          </div>
          <div className={`h-1 w-12 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`}></div>
          <div className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
            <Check size={20} />
          </div>
        </div>
      </div>
      
      {/* Checkout form */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Step 1: Shipping */}
          <Collapsible open={step === 1} className="w-full">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2" size={20} /> 
                  {t('checkout.shippingInfo')}
                </CardTitle>
                <CardDescription>Enter your shipping details</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Shipping form would go here */}
                <div className="space-y-4">
                  <p>Form fields would go here in a real implementation</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link to="/cart">
                  <Button variant="ghost">{t('checkout.backToCart')}</Button>
                </Link>
                <Button onClick={nextStep}>
                  Next <ChevronRight className="ml-2" size={16} />
                </Button>
              </CardFooter>
            </Card>
          </Collapsible>
          
          {/* Step 2: Payment */}
          <Collapsible open={step === 2} className="w-full">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2" size={20} /> 
                  {t('checkout.paymentInfo')}
                </CardTitle>
                <CardDescription>Enter your payment details</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Payment form would go here */}
                <div className="space-y-4">
                  <p>Credit card form fields would go here in a real implementation</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={prevStep}>Back</Button>
                <Button onClick={nextStep}>
                  Next <ChevronRight className="ml-2" size={16} />
                </Button>
              </CardFooter>
            </Card>
          </Collapsible>
          
          {/* Step 3: Review */}
          <Collapsible open={step === 3} className="w-full">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="mr-2" size={20} /> 
                  {t('checkout.orderSummary')}
                </CardTitle>
                <CardDescription>Review and confirm your order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Items:</h3>
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between py-2 border-b">
                        <div>
                          <p>{item.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col space-y-4">
                <div className="w-full flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="w-full flex flex-col sm:flex-row justify-between gap-2">
                  <Button variant="ghost" onClick={prevStep}>Back</Button>
                  <Button 
                    disabled={isLoading} 
                    onClick={handleCheckout} 
                    className="w-full sm:w-auto"
                  >
                    {isLoading ? 'Processing...' : t('checkout.placeOrder')}
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </Collapsible>
        </div>
        
        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{t('checkout.orderSummary')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} <span className="text-gray-500">x{item.quantity}</span>
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between font-bold mt-4">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
