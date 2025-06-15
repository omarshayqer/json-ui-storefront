
import { Product } from '../hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'list';
  displayVariant?: 'minimal' | 'standard' | 'detailed' | 'card' | 'tile' | 'compact';
}

export function ProductCard({ 
  product, 
  variant = 'grid', 
  displayVariant = 'standard' 
}: ProductCardProps) {
  const isGrid = variant === 'grid';

  // Compact variant - very small cards
  if (displayVariant === 'compact') {
    return (
      <Card className="overflow-hidden transition-shadow hover:shadow-md h-full">
        <Link to={`/product/${product.id}`} className="block">
          <div className="aspect-square relative">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
        </Link>
        <CardContent className="p-2">
          <Link to={`/product/${product.id}`} className="hover:underline">
            <h3 className="font-medium text-xs line-clamp-2 mb-1">{product.name}</h3>
          </Link>
          <p className="text-sm font-bold text-brand-dark">${product.price.toFixed(2)}</p>
        </CardContent>
      </Card>
    );
  }

  // Tile variant - square layout with overlay
  if (displayVariant === 'tile') {
    return (
      <Card className="overflow-hidden group relative h-full">
        <div className="aspect-square relative">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-white border-white">
                <Eye className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline" className="text-white border-white">
                <Heart className="w-4 h-4" />
              </Button>
              <Button size="sm" className="bg-brand hover:bg-brand-dark">
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Badge className="absolute top-2 left-2 bg-brand text-white">
            {product.category}
          </Badge>
        </div>
        <CardContent className="p-4 absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur">
          <Link to={`/product/${product.id}`} className="hover:underline">
            <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
          </Link>
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-bold text-brand-dark">${product.price.toFixed(2)}</p>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-xs ml-1">{product.rating.rate}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Card variant - more emphasis on visual design
  if (displayVariant === 'card') {
    return (
      <Card className="overflow-hidden transition-all hover:shadow-xl group h-full border-0 shadow-lg">
        <div className="relative">
          <Link to={`/product/${product.id}`} className={`relative ${isGrid ? 'h-56' : 'h-full'} block`}>
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
          <div className="absolute top-4 right-4">
            <Button size="sm" variant="outline" className="bg-white/80 backdrop-blur border-0">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <CardContent className="p-6">
          <Badge variant="outline" className="mb-3">
            {product.category}
          </Badge>
          <Link to={`/product/${product.id}`} className="hover:underline">
            <h3 className="font-bold text-xl mb-2">{product.name}</h3>
          </Link>
          <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating.rate) ? 'fill-current' : ''}`} />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.rating.count})</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-brand-dark">${product.price.toFixed(2)}</span>
            <Button className="bg-brand hover:bg-brand-dark">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Minimal variant
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

  // Detailed variant
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
