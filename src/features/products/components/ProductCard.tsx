
import { Product } from '../hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list';
}

export function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const isGrid = variant === 'grid';

  return (
    <Card className={`overflow-hidden transition-shadow hover:shadow-md ${isGrid ? 'h-full' : 'flex flex-row'}`}>
      <div className={isGrid ? '' : 'w-1/3'}>
        <div className={`relative ${isGrid ? 'h-48' : 'h-full'}`}>
          <Image
            src={product.image}
            alt={product.name}
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className={isGrid ? '' : 'w-2/3'}>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
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
