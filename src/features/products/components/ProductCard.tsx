
import { Product } from '../hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list';
  displayVariant?: 'minimal' | 'standard' | 'detailed';
}

export function ProductCard({ 
  product, 
  variant = 'grid', 
  displayVariant = 'standard' 
}: ProductCardProps) {
  const isGrid = variant === 'grid';

  // Render different card layouts based on the displayVariant prop
  if (displayVariant === 'minimal') {
    return (
      <Card className={`overflow-hidden transition-shadow hover:shadow-md ${isGrid ? 'h-full' : 'flex flex-row'}`}>
        <div className={isGrid ? '' : 'w-1/4'}>
          <Link to={`/product/${product.id}`} className={`relative ${isGrid ? 'h-40' : 'h-full'} block`}>
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </Link>
        </div>
        <div className={isGrid ? '' : 'w-3/4'}>
          <CardHeader className="p-3">
            <Link to={`/product/${product.id}`} className="hover:underline">
              <h3 className="font-medium text-md line-clamp-1">{product.name}</h3>
            </Link>
            <p className="text-lg font-bold text-brand-dark">${product.price.toFixed(2)}</p>
          </CardHeader>
          <CardFooter className="p-3">
            <Button className="w-full bg-brand hover:bg-brand-dark text-sm py-1">Add to Cart</Button>
          </CardFooter>
        </div>
      </Card>
    );
  }

  if (displayVariant === 'detailed') {
    return (
      <Card className={`overflow-hidden transition-shadow hover:shadow-md ${isGrid ? 'h-full' : 'flex flex-row'}`}>
        <div className={isGrid ? '' : 'w-1/3'}>
          <Link to={`/product/${product.id}`} className={`relative ${isGrid ? 'h-48' : 'h-full'} block`}>
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </Link>
        </div>
        <div className={isGrid ? '' : 'w-2/3'}>
          <CardHeader className="p-4">
            <span className="inline-block bg-brand-light text-brand-dark px-2 py-1 text-xs font-semibold rounded-full mb-2">
              {product.category}
            </span>
            <div className="flex justify-between items-start">
              <Link to={`/product/${product.id}`} className="hover:underline">
                <h3 className="font-semibold text-xl">{product.name}</h3>
              </Link>
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium">{product.rating.rate} ({product.rating.count} reviews)</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-brand-dark mt-2">${product.price.toFixed(2)}</p>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-gray-700">{product.description}</p>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-500 mr-2">Stock Status:</span>
              <span className="text-sm font-medium text-green-600">In Stock</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 flex gap-2">
            <Button className="flex-1 bg-brand hover:bg-brand-dark">Add to Cart</Button>
            <Button className="flex-1" variant="outline">Save for Later</Button>
          </CardFooter>
        </div>
      </Card>
    );
  }

  // Default 'standard' variant
  return (
    <Card className={`overflow-hidden transition-shadow hover:shadow-md ${isGrid ? 'h-full' : 'flex flex-row'}`}>
      <div className={isGrid ? '' : 'w-1/3'}>
        <Link to={`/product/${product.id}`} className={`relative ${isGrid ? 'h-48' : 'h-full'} block`}>
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
          />
        </Link>
      </div>
      <div className={isGrid ? '' : 'w-2/3'}>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <Link to={`/product/${product.id}`} className="hover:underline">
              <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
            </Link>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm">{product.rating.rate}</span>
            </div>
          </div>
          <p className="text-xl font-bold text-brand-dark">${product.price.toFixed(2)}</p>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className={`text-gray-500 ${isGrid ? 'line-clamp-2' : 'line-clamp-3'}`}>{product.description}</p>
          <div className="mt-2">
            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
              {product.category}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4">
          <Button className="w-full bg-brand hover:bg-brand-dark">Add to Cart</Button>
        </CardFooter>
      </div>
    </Card>
  );
}
