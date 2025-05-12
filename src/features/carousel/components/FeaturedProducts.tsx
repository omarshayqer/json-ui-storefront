
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductsService } from '../services/useProductsService';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { useStyleConfig } from '@/hooks/useStyleConfig';
import { StyleConfig } from '@/config/page-config';
import { AnimatedElement } from '@/components/ui/animated-element';

interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

interface FeaturedProductsProps {
  title?: string;
  subtitle?: string;
  autoPlay?: boolean;
  interval?: number;
  limit?: number;
  style?: StyleConfig;
}

export default function FeaturedProducts({
  title = "Featured Products",
  subtitle = "Check out our most popular items",
  autoPlay = true,
  interval = 5000,
  limit = 6,
  style
}: FeaturedProductsProps) {
  const { getProducts, isLoading, error } = useProductsService();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const styleProps = useStyleConfig(style);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data.slice(0, limit));
    }

    loadProducts();
  }, [limit]);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setActiveIndex((current) => 
        current === products.length - 1 ? 0 : current + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, products.length]);

  if (isLoading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-pulse">Loading featured products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center text-red-500">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <AnimatedElement animation="fade-up" className="py-12 bg-gray-50" style={styleProps}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        {/* Desktop Carousel */}
        <div className="hidden md:block">
          <Carousel className="w-full">
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem key={product.id} className="basis-1/3 md:basis-1/3 lg:basis-1/4">
                  <div className="p-2">
                    <Card className="overflow-hidden h-full">
                      <Link to={`/product/${product.id}`}>
                        <div className="h-48 overflow-hidden relative">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                          {product.discountPrice && (
                            <Badge className="absolute top-2 right-2 bg-red-500">
                              Sale
                            </Badge>
                          )}
                        </div>
                      </Link>
                      <CardContent className="p-4">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="mt-2 flex items-center justify-between">
                          <div>
                            {product.discountPrice ? (
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-lg">
                                  ${product.discountPrice}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  ${product.price}
                                </span>
                              </div>
                            ) : (
                              <span className="font-semibold text-lg">${product.price}</span>
                            )}
                          </div>
                          <div className="text-yellow-500 flex">
                            {"★".repeat(Math.floor(product.rating))}
                            {"☆".repeat(5 - Math.floor(product.rating))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {products.map((product) => (
                <CarouselItem key={product.id} className="basis-full">
                  <div className="p-2">
                    <Card className="overflow-hidden">
                      <Link to={`/product/${product.id}`}>
                        <div className="h-48 overflow-hidden relative">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                          {product.discountPrice && (
                            <Badge className="absolute top-2 right-2 bg-red-500">
                              Sale
                            </Badge>
                          )}
                        </div>
                      </Link>
                      <CardContent className="p-4">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold hover:text-blue-600 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="mt-2">
                          {product.discountPrice ? (
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-lg">
                                ${product.discountPrice}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ${product.price}
                              </span>
                            </div>
                          ) : (
                            <span className="font-semibold text-lg">${product.price}</span>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4">
              {products.map((_, idx) => (
                <Button
                  key={idx}
                  variant={idx === activeIndex ? "default" : "ghost"}
                  size="sm"
                  className="w-3 h-3 p-0 rounded-full mx-1"
                  onClick={() => setActiveIndex(idx)}
                />
              ))}
            </div>
          </Carousel>
        </div>

        <div className="text-center mt-10">
          <Button asChild>
            <Link to="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </AnimatedElement>
  );
}
