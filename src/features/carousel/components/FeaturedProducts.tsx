
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useProducts } from "@/features/products/hooks/useProducts";
import { Link } from "react-router-dom";
import { AnimatedElement } from "@/components/ui/animated-element";

interface FeaturedProductsProps {
  autoplaySpeed?: number;
  variant?: 'minimal' | 'standard' | 'premium';
  limit?: number;
}

export default function FeaturedProducts({ 
  autoplaySpeed = 5000, 
  variant = 'standard',
  limit = 5
}: FeaturedProductsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { products, loading } = useProducts({ limit });

  // Autoplay functionality
  useEffect(() => {
    if (!products.length) return;
    
    const interval = setInterval(() => {
      setActiveIndex(current => (current + 1) % products.length);
    }, autoplaySpeed);
    
    return () => clearInterval(interval);
  }, [products.length, autoplaySpeed]);

  if (loading) {
    return (
      <div className="w-full h-96 bg-gray-100 animate-pulse flex items-center justify-center">
        <p className="text-gray-500">Loading featured products...</p>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="relative overflow-hidden bg-gray-50 py-4">
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {products.map((product, index) => (
              <CarouselItem key={product.id}>
                <Link to={`/product/${product.id}`} className="block">
                  <div className="flex flex-col sm:flex-row items-center p-4 gap-4">
                    <div className="w-full sm:w-1/3 aspect-square bg-white rounded">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-4" 
                      />
                    </div>
                    <div className="w-full sm:w-2/3 text-center sm:text-left">
                      <h3 className="text-xl font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500 mt-1 mb-3">{product.description}</p>
                      <p className="text-lg font-bold text-brand">${product.price.toFixed(2)}</p>
                      <Button size="sm" className="mt-3">View Details</Button>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    );
  }

  if (variant === 'premium') {
    return (
      <div className="relative w-full bg-gradient-to-r from-blue-50 to-indigo-50">
        <Carousel className="w-full">
          <CarouselContent>
            {products.map((product, index) => (
              <CarouselItem key={product.id}>
                <div className="h-[500px] flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-1/2 p-12 flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="max-h-[400px] max-w-full object-contain shadow-lg rounded-lg" 
                    />
                  </div>
                  <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h2>
                    <p className="text-gray-600 mb-6 text-lg">{product.description}</p>
                    <div className="flex items-center mb-8">
                      <span className="text-3xl font-bold text-brand mr-3">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xl text-gray-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-4">
                      <Link to={`/product/${product.id}`}>
                        <Button size="lg" className="font-medium">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors",
                  activeIndex === index ? "bg-brand" : "bg-gray-300"
                )}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </Carousel>
      </div>
    );
  }

  // Standard variant (default)
  return (
    <div className="relative overflow-hidden bg-gray-50">
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItem key={product.id}>
              <div className="h-[400px] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <AnimatedElement animation="fade-left" className="h-full bg-white flex items-center justify-center p-8">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-h-[300px] max-w-full object-contain" 
                  />
                </AnimatedElement>
                <AnimatedElement animation="fade-right" className="p-8 flex flex-col justify-center">
                  <span className="text-sm font-medium text-brand mb-2">Featured Product</span>
                  <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                  <p className="text-gray-500 mb-4">{product.description}</p>
                  <div className="flex items-center mb-6">
                    <span className="text-2xl font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-lg text-gray-400 line-through ml-2">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <Button>Shop Now</Button>
                  </Link>
                </AnimatedElement>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-1 md:left-2" />
        <CarouselNext className="-right-1 md:right-2" />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {products.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                activeIndex === index ? "bg-brand" : "bg-gray-300"
              )}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
