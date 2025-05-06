
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useProduct } from '../hooks/useProduct';

interface ProductDetailProps {
  layout?: 'standard' | 'premium' | 'minimal';
  productId?: string;
}

export default function ProductDetail({ layout = 'standard' }: ProductDetailProps) {
  const { id } = useParams<{ id: string }>();
  const productId = id;
  const { toast } = useToast();
  const { product, loading, error } = useProduct(productId);

  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product?.name} has been added to your cart.`,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-200 rounded-lg h-96"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2 mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-red-500">Error Loading Product</h2>
        <p className="mt-2">{error || "Product not found"}</p>
      </div>
    );
  }

  // Minimal layout
  if (layout === 'minimal') {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <h1 className="text-2xl font-medium">{product.name}</h1>
            <p className="text-xl font-bold mt-2">${product.price.toFixed(2)}</p>
            <p className="mt-4">{product.description}</p>
            <Button 
              className="mt-6 w-full" 
              onClick={addToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Premium layout
  if (layout === 'premium') {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="overflow-hidden border-0 shadow-lg">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-gray-50 p-8">
                <div className="aspect-square bg-white p-4 rounded-lg shadow-sm">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain" 
                  />
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <span className="inline-block bg-brand-light text-brand-dark px-3 py-1 text-sm font-semibold rounded-full">
                    {product.category}
                  </span>
                </div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating.rate) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">({product.rating.count} reviews)</span>
                </div>
                <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                <div className="pt-6 space-y-4">
                  <Button 
                    className="w-full py-6 text-lg"
                    onClick={addToCart}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    className="w-full py-6 text-lg"
                    variant="outline"
                  >
                    Save for Later
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Standard layout (default)
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto object-contain" 
            style={{ maxHeight: '400px' }}
          />
        </div>
        <div>
          <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center mt-2 mb-4">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="ml-1">{product.rating.rate} ({product.rating.count} reviews)</span>
          </div>
          <p className="text-2xl font-bold text-brand-dark mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="flex space-x-4">
            <Button 
              className="flex-1"
              onClick={addToCart}
            >
              Add to Cart
            </Button>
            <Button variant="outline" className="flex-1">Save for Later</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
