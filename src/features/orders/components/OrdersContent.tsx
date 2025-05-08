
import React from 'react';
import { Package, Calendar, TruckIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface OrdersContentProps {
  layout?: 'minimal' | 'standard' | 'premium';
  showTracking?: boolean;
  showReturns?: boolean;
}

const mockOrders = [
  {
    id: 'ORD-1234',
    date: '2025-04-28',
    total: 129.99,
    items: 3,
    status: 'Delivered',
    trackingNumber: 'TRK-98765',
  },
  {
    id: 'ORD-5678',
    date: '2025-04-15',
    total: 79.50,
    items: 2,
    status: 'Shipped',
    trackingNumber: 'TRK-43210',
  },
  {
    id: 'ORD-9012',
    date: '2025-04-01',
    total: 199.99,
    items: 1,
    status: 'Processing',
  },
];

export default function OrdersContent({ layout = 'standard', showTracking = false, showReturns = false }: OrdersContentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className={`grid gap-8 ${layout === 'minimal' ? '' : 'max-w-4xl mx-auto'}`}>
        <div className="flex justify-between items-center">
          <h1 className={`${layout === 'premium' ? 'text-3xl' : 'text-2xl'} font-bold`}>Your Orders</h1>
          
          {layout !== 'minimal' && (
            <div>
              <Button variant="outline">Filter</Button>
            </div>
          )}
        </div>
        
        {mockOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-lg font-medium">No orders found</h2>
            <p className="mt-2 text-gray-500">When you place orders, they will appear here.</p>
            <Button className="mt-6">Continue Shopping</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <Card key={order.id} className={layout === 'premium' ? 'border-2 shadow-md' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Order #{order.id}</CardTitle>
                    <Badge variant={
                      order.status === 'Delivered' ? 'default' : 
                      order.status === 'Shipped' ? 'secondary' : 'outline'
                    }>
                      {order.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(order.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p>{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                        <p className="font-medium">${order.total.toFixed(2)}</p>
                      </div>
                      <div className="space-x-2">
                        {showTracking && order.trackingNumber && (
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            Track
                          </Button>
                        )}
                        <Button variant="default" size="sm">Details</Button>
                        {showReturns && order.status === 'Delivered' && (
                          <Button variant="outline" size="sm">Return</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {layout === 'premium' && (
          <div className="bg-muted/50 p-4 rounded-lg mt-4">
            <h3 className="font-medium">Premium Benefits</h3>
            <p className="text-sm text-muted-foreground">
              As a premium customer, you enjoy free express shipping and extended returns.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
